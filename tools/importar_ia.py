"""
Importa los resultados de IA dejados en _ia/entrada/ y los integra al sitio.

  python tools/importar_ia.py

- entrada/frascos/<id>.(png|jpg|jpeg|webp)  → recorte del fondo blanco → assets/img/perfumes/<id>-420|840.webp
- entrada/ingredientes/hoja-XX.(png|jpg)    → se corta en 2×2 → assets/img/ingredients/<id>.webp + manifest.json
- entrada/videos/<id>.mp4                    → assets/video/<id>.mp4 y perfumes.json → "video"
Los archivos procesados se mueven a _ia/procesado/. Después ejecuta tools/prerender.py.
Requiere Pillow (pip install pillow).
"""
import json
import shutil
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
IA = ROOT / "_ia"
DONE = IA / "procesado"
PERF_JSON = ROOT / "data" / "perfumes.json"
MANIFEST = ROOT / "assets/img/ingredients/manifest.json"
IMG_EXT = {".png", ".jpg", ".jpeg", ".webp"}


def cut_white(im, thresh=14):
    """Quita el fondo blanco conectado a los bordes (conserva los brillos internos del vidrio)."""
    im = im.convert("RGB")
    w, h = im.size
    work, key = im.copy(), (255, 0, 254)
    step = max(8, min(w, h) // 80)
    seeds = [(x, 0) for x in range(0, w, step)] + [(x, h - 1) for x in range(0, w, step)] + \
            [(0, y) for y in range(0, h, step)] + [(w - 1, y) for y in range(0, h, step)]
    for s in seeds:
        if work.getpixel(s) != key and min(work.getpixel(s)) > 225:
            ImageDraw.floodfill(work, s, key, thresh=thresh)
    r, g, b = work.split()
    mask = ImageChops.multiply(ImageChops.multiply(r.point(lambda v: 255 if v == 255 else 0), g.point(lambda v: 255 if v == 0 else 0)),
                               b.point(lambda v: 255 if v == 254 else 0))
    alpha = ImageChops.invert(mask).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1))
    out = im.convert("RGBA")
    out.putalpha(alpha)
    bbox = alpha.point(lambda v: 255 if v > 30 else 0).getbbox()
    return out.crop(bbox) if bbox else out


def done(f):
    DONE.mkdir(parents=True, exist_ok=True)
    shutil.move(str(f), DONE / f.name)


perfumes = json.loads(PERF_JSON.read_text(encoding="utf-8"))
by = {p["id"]: p for p in perfumes}
log = []

# ---- frascos
for f in sorted((IA / "entrada/frascos").glob("*")):
    if f.suffix.lower() not in IMG_EXT or f.stem not in by:
        continue
    b = cut_white(Image.open(f))
    H, W = 1400, 1050
    s = min(H * .94 / b.height, W * .9 / b.width)
    b = b.resize((round(b.width * s), round(b.height * s)), Image.LANCZOS)
    can = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    can.alpha_composite(b, ((W - b.width) // 2, H - b.height - int(H * .02)))
    for w in (420, 840):
        can.resize((w, int(w * 4 / 3)), Image.LANCZOS).save(ROOT / f"assets/img/perfumes/{f.stem}-{w}.webp", quality=82, method=6, alpha_quality=88)
    by[f.stem]["image"] = f.stem
    by[f.stem]["imageSource"] = "ia"
    done(f)
    log.append(f"frasco {f.stem}")

# ---- ingredientes (hojas 2×2)
sheets = json.loads((IA / "hojas-ingredientes.json").read_text(encoding="utf-8"))
available = set(json.loads(MANIFEST.read_text(encoding="utf-8"))) if MANIFEST.exists() else set()
for f in sorted((IA / "entrada/ingredientes").glob("hoja-*")):
    if f.suffix.lower() not in IMG_EXT:
        continue
    n = int(f.stem.split("-")[1])
    ids = sheets[n - 1]
    im = Image.open(f).convert("RGB")
    w, h = im.size
    for j, iid in enumerate(ids):
        x, y = (j % 2) * w // 2, (j // 2) * h // 2
        q = cut_white(im.crop((x, y, x + w // 2, y + h // 2)))
        q.thumbnail((520, 520), Image.LANCZOS)
        q.save(ROOT / f"assets/img/ingredients/{iid}.webp", quality=80, method=6, alpha_quality=85)
        available.add(iid)
    done(f)
    log.append(f"hoja {n:02d}: {', '.join(ids)}")
MANIFEST.write_text(json.dumps(sorted(available), ensure_ascii=False), encoding="utf-8")

# ---- videos
(ROOT / "assets/video").mkdir(parents=True, exist_ok=True)
for f in sorted((IA / "entrada/videos").glob("*.mp4")):
    if f.stem not in by:
        continue
    shutil.copy(f, ROOT / f"assets/video/{f.stem}.mp4")
    by[f.stem]["video"] = f"assets/video/{f.stem}.mp4"
    mb = f.stat().st_size / 1e6
    done(f)
    log.append(f"video {f.stem} ({mb:.1f} MB{' — conviene comprimirlo' if mb > 4 else ''})")

PERF_JSON.write_text(json.dumps(perfumes, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("\n".join(log) or "Nada nuevo en _ia/entrada/")
print(f"Ingredientes disponibles: {len(available)}")
