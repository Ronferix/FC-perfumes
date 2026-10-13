"""
Plan y prompts de las fotos de estudio (frasco + ingredientes) para Gemini.
Uso: python tools/ia_prompts.py

Escribe:
  _ia/PROMPTS.md            el plan (tabla) y el prompt de cada perfume, en orden de familia
  _ia/estudio/plan.json     lo mismo en datos (id, familia, croma, ingredientes, referencia, prompt)
  _ia/estudio/ref/<id>.png  la foto real del frasco sobre blanco, lista para adjuntar en Gemini

Reglas (decididas con el negocio, 12-oct-2026):
- Siempre se adjunta la foto real del frasco: Gemini no debe inventar el frasco.
- Fondo de croma plano para recortarlo con tools/estudio.py. Azul #0000FF por omisión; verde #00FF00
  si el frasco tiene azul, turquesa o morado; magenta #FF00FF si además lleva ingredientes verdes.
  El prompt prohíbe ese color en el frasco y en los ingredientes.
- Solo ingredientes de sus notas verificadas, sólidos y dentro del cuadro con margen.
- La luz es la de su familia; el fondo del sitio la completa.
"""
import colorsys
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IA = ROOT / "_ia"
REF = IA / "estudio" / "ref"
load = lambda n: json.loads((ROOT / "data" / f"{n}.json").read_text(encoding="utf-8"))
F, N, P = load("families"), load("notes"), load("perfumes")
ING = json.loads((ROOT / "tools" / "ingredients.json").read_text(encoding="utf-8"))   # img de la nota → descripción en inglés
for d in ("referencias", "entrada/frascos", "estudio/ref"):
    (IA / d).mkdir(parents=True, exist_ok=True)

LIGHT_EN = {
    "dulces": "warm, low late-afternoon studio light from the left, glossy highlights",
    "amaderados": "moody lateral backlight with deep soft shadows between the objects",
    "florales": "soft, diffuse morning daylight",
    "especiados": "warm ember-like key light with a subtle amber rim light",
    "citricos": "bright, high midday light with fresh sparkling highlights",
    "atalcados": "hazy, veiled soft light with no hard shadows",
    "ambarados": "golden sunset light glowing through amber",
    "cuero": "raking studio light from the left that reveals texture",
    "nicho": "dramatic gallery spotlight from above",
}
KEYS = {
    "azul": ("pure solid chroma-key blue #0000FF", "blue, cyan, turquoise, purple, lilac or violet", "blue"),
    "verde": ("pure solid chroma-key green #00FF00", "green, lime, olive or mint-green (no leaves, stems or green herbs)", "green"),
    "magenta": ("pure solid chroma-key magenta #FF00FF", "magenta, pink, fuchsia, purple or violet", "magenta"),
}

# Ingredientes que chocan con su croma: se piden en una variante real de otro color (o sin hojas)
ADJUST = {
    "azul": {"bunch of purple grapes": "bunch of deep red grapes",
             "bundle of lavender stems": "small bundle of dried lavender in muted grey-mauve tones",
             "dark purple plums, one halved": "dark red plums, one halved",
             "purple heliotrope flower cluster": "small cluster of pale cream-white heliotrope flowers",
             "purple passion flower": "cream-white passion flower"},
    "magenta": {"bundle of lavender stems": "small bundle of dried lavender in muted grey tones",
                "dark purple plums, one halved": "dark red plums, one halved",
                "pink grapefruit cut in half": "grapefruit cut in half with ruby-red flesh",
                "pink peppercorns": "red peppercorns",
                "purple violet flowers": "small white violet flowers"},
    "verde": {" with green leaves": "", " with leaves": "", "dried patchouli leaves": "dried dark brown patchouli leaves",
              "sage leaves sprig": "dried grey sage leaves", "tuberose white flower stem": "tuberose white flowers without green stem",
              "pineapple with a cut slice": "pineapple slices without the green crown"},
}


def adjust(items, key):
    out = []
    for it in items:
        for a, b in ADJUST.get(key, {}).items():
            it = it.replace(a, b)
        out.append(it)
    return out

def hue_family(r, g, b):
    h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    if s < .25 or v < .15:
        return None
    d = h * 360
    return "blue" if 170 <= d < 260 else "purple" if 260 <= d < 300 else "green" if 75 <= d < 170 else "pink" if d >= 300 or d < 15 else None


def bottle_colors(p):
    """% del frasco (píxeles opacos) en cada familia de color."""
    im = Image.open(ROOT / f"assets/img/perfumes/{p['image']}-420.webp").convert("RGBA")
    im.thumbnail((140, 190))
    c, t = {}, 0
    for r, g, b, a in im.get_flattened_data():
        if a < 200:
            continue
        t += 1
        f = hue_family(r, g, b)
        if f:
            c[f] = c.get(f, 0) + 1
    return {k: round(100 * v / t) for k, v in c.items()}


def ingredients(p, n=7):
    """Ingredientes visibles de sus notas (notas clave primero), sin repetir; el almizcle (algodón) no se ve."""
    out, notes = [], []
    for k in [*p.get("keyNotes", []), *[x for ph in (p.get("notes") or {}).values() for x in ph]]:
        img = N.get(k, {}).get("img")
        d = ING.get(img)
        if d and d not in out and img != "algodon":
            out.append(d)
            notes.append(k)
    return out[:n], notes[:n]


def choose_key(p, notes):
    c = bottle_colors(p)
    if c.get("blue", 0) + c.get("purple", 0) < 10:
        return "azul", c
    ing = {hue_family(*(int(N[x]["color"][i:i + 2], 16) for i in (1, 3, 5))) for x in notes if N.get(x, {}).get("color")}
    if c.get("green", 0) >= 10 or "green" in ing:
        return ("magenta" if c.get("pink", 0) < 10 else "revisar"), c
    return "verde", c


def prompt(p, f, items, key):
    bg, banned, word = KEYS["azul" if key == "revisar" else key]
    return ("Use the attached photo as the exact product reference. Create a premium, professional perfume advertising still life: "
            "this exact perfume bottle surrounded by its real ingredients. BOTTLE: keep it 100% faithful to the reference — identical shape, "
            "cap, label, logo, colors, materials and proportions. Reproduce only the text visible in the reference, exactly as written; never "
            "add words, logos or labels. Front view, centered, camera at bottle height, the bottle is about 62% of the frame height and is "
            f"never covered: its label stays fully visible. INGREDIENTS (only these): {'; '.join(items)}. Arrange them around the bottle in a "
            "compact, balanced composition: a few in front at the lower corners slightly overlapping the base of the bottle, others beside "
            "and slightly behind it, with natural depth of field. Every ingredient is solid with crisp, clean edges. FRAMING: the whole "
            "group, every ingredient included, sits fully inside the frame with a clear margin of empty background on all four sides; "
            f"nothing touches or is cut off by the edges of the image. LIGHT: {LIGHT_EN[f['id']]}, soft shadows only between the objects. "
            f"BACKGROUND: {bg}, perfectly flat and uniform, filling every part of the frame behind the objects — no gradient, no floor, no "
            "table, no horizon, no vignette, no cast shadow or reflection on the background. COLOR RULE: do not use "
            f"{banned} anywhere in the ingredients, and no {word} rim light or {word} reflections on the bottle or the ingredients (metal "
            "and glossy surfaces reflect warm neutral tones only). No smoke, mist, powder, water drops, splashes or glass props. "
            "Photorealistic, high-end commercial photography, sharp, high resolution, vertical 3:4.")


def reference(p):
    """Foto real del frasco aplanada sobre blanco (Gemini no recibe bien la transparencia)."""
    src = next((IA / "referencias" / f"{p['id']}{e}" for e in (".png", ".jpg", ".jpeg", ".webp") if (IA / "referencias" / f"{p['id']}{e}").exists()),
               ROOT / f"assets/img/perfumes/{p['image']}-840.webp")
    im = Image.open(src).convert("RGBA")
    bg = Image.new("RGB", im.size, "white")
    bg.paste(im, mask=im.getchannel("A"))
    out = REF / f"{p['id']}.png"
    bg.save(out)
    return out.relative_to(ROOT).as_posix()


PLAN = []
for f in F:
    for p in sorted((x for x in P if x["family"] == f["id"] and x.get("published", True)), key=lambda x: x["order"]):
        if not p.get("image"):
            PLAN.append({"id": p["id"], "family": f["id"], "status": "sin foto del frasco"})
            continue
        items, notes = ingredients(p)
        key, colors = choose_key(p, notes)
        items = adjust(items, key)
        PLAN.append({"id": p["id"], "name": p["name"], "family": f["id"], "key": key, "bottle_colors": colors,
                     "ingredients": items, "reference": reference(p), "prompt": prompt(p, f, items, key),
                     "status": "hecha" if p.get("studio") else "pendiente"})
(IA / "estudio" / "plan.json").write_text(json.dumps(PLAN, indent=1, ensure_ascii=False), encoding="utf-8")

L = ["# Fotos de estudio — plan y prompts", "",
     "Carpeta de trabajo; **no se publica**. Generado por `python tools/ia_prompts.py`.", "",
     "Por cada perfume, en un chat nuevo de Gemini: adjunta `_ia/estudio/ref/<id>.png`, pega su prompt y guarda el resultado como "
     "`_ia/estudio/<id>.png`. Luego `python tools/estudio.py <id>`, revisa `_ia/estudio/revisar/<id>.png`, marca `\"studio\": true` "
     "en `data/perfumes.json` y ejecuta `python tools/prerender.py`.", "",
     "| # | Perfume | Familia | Fondo | Ingredientes | Estado |", "|---|---|---|---|---|---|"]
for i, x in enumerate(PLAN, 1):
    L.append(f"| {i} | {x.get('name', x['id'])} | {x['family']} | {x.get('key', '—')} | {len(x.get('ingredients', []))} | {x['status']} |")
L.append("")
for x in PLAN:
    if "prompt" in x:
        L += [f"## {x['name']} — `{x['id']}` · {x['family']} · fondo {x['key']}", "", f"Referencia: `{x['reference']}`", "", "```", x["prompt"], "```", ""]
L += ["## Frascos sin foto", "",
      "Para un perfume sin foto, primero hace falta su frasco: adjunta la foto oficial y guarda el resultado sobre blanco en "
      "`_ia/entrada/frascos/<id>.png`; `python tools/importar_ia.py` lo recorta y lo publica.", ""]
(IA / "PROMPTS.md").write_text("\n".join(L), encoding="utf-8")

cnt = {}
for x in PLAN:
    cnt[x.get("key", x["status"])] = cnt.get(x.get("key", x["status"]), 0) + 1
print(f"OK: {len(PLAN)} perfumes · " + ", ".join(f"{k}: {v}" for k, v in cnt.items()))
