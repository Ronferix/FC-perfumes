"""
Genera _ia/PROMPTS.md (prompts para Gemini/Veo), las hojas de ingredientes y los
cuadros iniciales de video. Uso: python tools/ia_prompts.py
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IA = ROOT / "_ia"
load = lambda n: json.loads((ROOT / "data" / f"{n}.json").read_text(encoding="utf-8"))
F, N = load("families"), load("notes")
PF = {p["id"]: p for p in load("perfumes")}
ING = json.loads((ROOT / "tools" / "ingredients.json").read_text(encoding="utf-8"))
for d in ("referencias", "cuadros-video", "entrada/frascos", "entrada/ingredientes", "entrada/videos"):
    (IA / d).mkdir(parents=True, exist_ok=True)

# Frascos que ya tienen imagen de estudio generada con IA
AI_DONE = {p["id"] for p in PF.values() if p.get("imageSource") == "ia"}
PENDING = sorted(p["id"] for p in PF.values() if p.get("image") and p["id"] not in AI_DONE)

BOTTLE_PROMPT = ("Use the attached photo as the exact product reference. Recreate this exact perfume bottle as a premium studio product "
    "photograph. Keep the bottle 100% faithful to the reference: identical shape, cap, label, logo, colors, materials and proportions. "
    "Reproduce only the text that is visible in the reference, exactly as written; never add any other words, slogans or labels. "
    "Do not redesign, add or remove anything. Full bottle, front view, centered, camera at bottle height, the bottle fills about 80% "
    "of the frame height. Background: pure seamless white (#FFFFFF), completely uniform, no gradient, no floor, no reflection, no cast "
    "shadow, no box, no props. Soft high-end studio lighting with crisp specular highlights. Photorealistic, sharp, high resolution, vertical 3:4.")

LIGHT_EN = {
    "dulces": "warm low late-afternoon light with glossy highlights", "amaderados": "moody side backlight with soft shadows",
    "florales": "soft diffuse morning daylight", "especiados": "warm ember glow with small points of light",
    "citricos": "bright high midday light with fresh sparkles", "atalcados": "hazy veiled soft light, no hard shadows",
    "ambarados": "golden sunset light glowing through amber", "cuero": "raking studio light revealing texture",
    "nicho": "gallery spotlight from above on a dark set",
}
POS = ["top-left", "top-right", "bottom-left", "bottom-right"]
ids = list(ING)
SHEETS = [ids[i:i + 4] for i in range(0, len(ids), 4)]
(IA / "hojas-ingredientes.json").write_text(json.dumps(SHEETS, indent=1), encoding="utf-8")


def sheet_prompt(sh):
    items = "; ".join(f"{POS[j]}: {ING[x]}" for j, x in enumerate(sh))
    return (f"Studio photograph of {len(sh)} separate ingredients arranged in a 2x2 grid, each one alone and centered in its own quadrant "
            f"with generous empty white space around it; nothing touches, overlaps or crosses the middle lines. {items}. Pure seamless white "
            "background (#FFFFFF), no shadows, no reflections, no props, no text, no labels. Soft diffuse studio light, photorealistic, "
            "high detail, slight 3/4 top angle, square 1:1.")


def video_prompt(f, p):
    def names(k):
        out = []
        for n in p["notes"][k]:
            d = ING.get(N[n].get("img"))
            if d and d not in out:
                out.append(d)
        return ", ".join(out[:4])
    return (f"Keep the perfume bottle from the first frame perfectly still, centered and unchanged for the whole video: same shape, label, "
            f"text and colors; do not add any text. Solid flat background color {f['theme']['bg']} filling the entire frame for the whole "
            "video, no floor, no horizon, no vignette. Real ingredients from the perfume's notes float gently into frame and drift slowly "
            f"around the bottle in three calm waves: first {names('top')}; then {names('heart')}; finally {names('base')}. Ingredients stay "
            f"beside and behind the bottle, never covering the label. {LIGHT_EN[f['id']]}, "
            "slow motion, locked-off static camera, shallow depth of field, photorealistic luxury perfume commercial. The last second returns "
            "to a composition similar to the first frame so the clip can loop.")


# Cuadros iniciales de video: el frasco (imagen actual) sobre el color de su familia, 16:9
for f in F:
    p = PF[f["starter"]]
    can = Image.new("RGBA", (1920, 1080), f["theme"]["bg"])
    b = Image.open(ROOT / f"assets/img/perfumes/{p['image']}-840.webp")
    b = b.resize((int(b.width * 1080 * .9 / b.height), int(1080 * .9)), Image.LANCZOS)
    can.alpha_composite(b, ((1920 - b.width) // 2, 1080 - b.height - 20))
    can.convert("RGB").save(IA / "cuadros-video" / f"{p['id']}.jpg", quality=92)

L = ["# Prompts de IA — Perfumes FC", "",
     "Carpeta de trabajo para generar imágenes y videos con Google (Gemini «Nano Banana» y Veo/Flow). **No se publica**: la web no usa esta carpeta.", "",
     "- `referencias/`: fotos oficiales de los frascos pendientes; súbelas a Gemini como referencia.",
     "- `cuadros-video/`: cuadro inicial de cada video (frasco real sobre el color de su familia).",
     "- `entrada/frascos/`, `entrada/ingredientes/`, `entrada/videos/`: deja aquí los resultados, nombrados como se indica, y ejecuta `python tools/importar_ia.py`.", "",
     "## 1. Frascos de estudio (Gemini → Imágenes, relación 3:4)", "",
     "Adjunta `referencias/<id>` y usa este prompt tal cual. Guarda el resultado como `entrada/frascos/<id>.png` (o .jpeg).", "",
     "```", BOTTLE_PROMPT, "```", "",
     "Revisa que el texto de la etiqueta y los colores coincidan con la referencia; si Gemini inventa algo, regenera.", "",
     f"Frascos pendientes ({len(PENDING)}): " + ", ".join(PENDING) + ".", "",
     "## 2. Ingredientes (Gemini → Imágenes, relación 1:1)", "",
     "Cada imagen trae 4 ingredientes en cuadrícula 2×2 (se corta automáticamente en cuatro). Guarda cada resultado como `entrada/ingredientes/hoja-XX.png`.", ""]
for i, sh in enumerate(SHEETS, 1):
    L += [f"**Hoja {i:02d}** — {', '.join(sh)}", "```", sheet_prompt(sh), "```", ""]
L += ["## 3. Videos de la portada (Veo 3 en Flow o en Gemini → Videos)", "",
      "1. Entra a **Flow** (labs.google/flow) con tu cuenta Pro, o en Gemini elige **Videos**. Flow da más control y más créditos.",
      "2. Elige **Frames to Video** (de cuadro a video) y sube `cuadros-video/<id>.jpg`: así se conserva el frasco real.",
      "3. Formato **16:9**, 8 segundos. El audio no importa: la web lo reproduce silenciado.",
      "4. Pega el prompt. Si el frasco se deforma o aparece texto nuevo, regenera.",
      "5. Guarda el MP4 como `entrada/videos/<id>.mp4`.", "",
      "El fondo debe ser **exactamente el color indicado** para que el video se funda con la sección (Veo no genera fondos transparentes).", ""]
for f in F:
    p = PF[f["starter"]]
    L += [f"### {f['name']} → {p['name']} ({p['brand']}) — `{p['id']}` · fondo `{f['theme']['bg']}`", "```", video_prompt(f, p), "```", ""]
(IA / "PROMPTS.md").write_text("\n".join(L), encoding="utf-8")

# Copia las referencias de los frascos pendientes (desde la carpeta de fotos oficiales, si existe)
print(f"OK: {len(SHEETS)} hojas de ingredientes, {len(PENDING)} frascos pendientes")
