"""
Fotos de estudio: frasco + ingredientes generados con Gemini sobre un color de croma
(azul #0000FF, o verde #00FF00 / magenta #FF00FF para frascos azules; ver tools/ia_prompts.py).
Recorta el fondo (croma detectado y calibrado por imagen), recorta al contenido y publica
dos tamaños en WebP con transparencia.

  entrada: _ia/estudio/<id>.png            (la imagen tal cual sale de Gemini)
  salida:  assets/img/estudio/<id>-420.webp y <id>-760.webp
           _ia/estudio/revisar/<id>.png    (vista previa sobre gris y sobre el fondo de su familia)

Uso: python tools/estudio.py <id> [<id> ...]     (sin ids: todas las de _ia/estudio)
"""
import json
import statistics
import sys
from pathlib import Path
from PIL import Image, ImageChops, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "_ia" / "estudio"
OUT = ROOT / "assets" / "img" / "estudio"
REV = SRC / "revisar"
WIDTHS = (420, 760)


def key_color(im):
    """Alfa por croma, calibrado con el fondo real de cada imagen (Gemini no da el color exacto: su azul
    ronda (0, 60, 210) y la sombra del piso es más oscura). El color se detecta en los bordes:
      azul     dominancia b − max(r, g)
      verde    dominancia g − max(r, b)
      magenta  dominancia min(r, b) − g
    Lo claro y neutro (blancos, azúcar, pétalos) se conserva. Devuelve (RGBA, nombre del croma)."""
    r, g, b = im.split()
    doms = {
        "azul": ImageChops.subtract(b, ImageChops.lighter(r, g)),
        "verde": ImageChops.subtract(g, ImageChops.lighter(r, b)),
        "magenta": ImageChops.subtract(ImageChops.darker(r, b), g),
    }
    w, h = im.size
    pts = [(x, y) for x in range(0, w, 8) for y in (2, h - 3)] + [(x, y) for y in range(0, h, 8) for x in (2, w - 3)]
    name, bg = max(((k, statistics.median(d.getpixel(p) for p in pts)) for k, d in doms.items()), key=lambda kv: kv[1])
    hi, lo = bg * 0.85, 45                                             # ≥ hi fondo (y su sombra); ≤ lo objeto
    alpha = doms[name].point(lambda v: 255 if v <= lo else 0 if v >= hi else round(255 * (hi - v) / (hi - lo)))
    # quitar el reflejo del fondo (metales, bordes): el croma nunca más de 4 por encima de los otros canales
    over = lambda c, ref: ImageChops.subtract(c, ref.point(lambda v: min(255, v + 4)))   # exceso ≥ 0
    if name == "azul":
        b = ImageChops.subtract(b, over(b, ImageChops.lighter(r, g)))
    elif name == "verde":
        g = ImageChops.subtract(g, over(g, ImageChops.lighter(r, b)))
    else:
        ex = over(ImageChops.darker(r, b), g)                          # magenta: r y b bajan juntos
        r, b = ImageChops.subtract(r, ex), ImageChops.subtract(b, ex)
    return Image.merge("RGBA", (r, g, b, alpha)), name


def cut(pid):
    im = Image.open(SRC / f"{pid}.png").convert("RGB")
    rgba, key = key_color(im)
    a = rgba.getchannel("A")
    # motas casi transparentes fuera; el contorno pierde 1 px (ahí vive el halo del croma mezclado) y se suaviza
    a = a.point(lambda v: 0 if v < 12 else v).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    rgba.putalpha(a)
    box = a.point(lambda v: 255 if v > 40 else 0).getbbox()
    pad = round(max(im.size) * 0.02)
    box = (max(0, box[0] - pad), max(0, box[1] - pad), min(im.width, box[2] + pad), min(im.height, box[3] + pad))
    rgba = rgba.crop(box)

    OUT.mkdir(parents=True, exist_ok=True)
    for w in WIDTHS:
        w2 = min(w, rgba.width)
        rgba.resize((w2, round(rgba.height * w2 / rgba.width)), Image.LANCZOS).save(OUT / f"{pid}-{w}.webp", quality=88, method=6)
    preview(pid, rgba)
    return key, rgba.size


def preview(pid, rgba):
    """Para revisar el recorte: sobre gris neutro y sobre el fondo de su familia."""
    fams = {f["id"]: f for f in json.loads((ROOT / "data" / "families.json").read_text(encoding="utf-8"))}
    perf = {p["id"]: p for p in json.loads((ROOT / "data" / "perfumes.json").read_text(encoding="utf-8"))}
    bg = fams[perf[pid]["family"]]["theme"]["bg"] if pid in perf else "#808080"
    REV.mkdir(parents=True, exist_ok=True)
    sheet = Image.new("RGB", (rgba.width * 2, rgba.height), "#808080")
    sheet.paste(Image.new("RGB", rgba.size, bg), (rgba.width, 0))
    sheet.paste(rgba, (0, 0), rgba)
    sheet.paste(rgba, (rgba.width, 0), rgba)
    sheet.save(REV / f"{pid}.png")


if __name__ == "__main__":
    ids = sys.argv[1:] or sorted(p.stem for p in SRC.glob("*.png"))
    for pid in ids:
        print(pid, *cut(pid))
