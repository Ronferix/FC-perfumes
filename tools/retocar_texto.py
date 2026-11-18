"""
Corrige texto diminuto que Gemini escribe mal en la etiqueta (p. ej. «RAIDS» por «PRIDE»).
Tapa la palabra con el color de la etiqueta alrededor y escribe la correcta, ajustada a la caja,
con el color de la tinta original y el mismo suavizado (se dibuja a 8x y se reduce).

  python tools/retocar_texto.py <id> <x0> <y0> <x1> <y1> "<texto>" [regular|negrita]

Trabaja sobre _ia/estudio/<id>.png (antes de tools/estudio.py) y guarda la original como <id>.orig.png
la primera vez. Revisa el resultado con zoom contra la foto oficial del frasco.
"""
import statistics
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = {"regular": "C:/Windows/Fonts/arial.ttf", "negrita": "C:/Windows/Fonts/arialbd.ttf"}


def retocar(pid, box, text, weight="regular"):
    src = ROOT / "_ia" / "estudio" / f"{pid}.png"
    orig = src.with_name(f"{pid}.orig.png")
    if not orig.exists():
        orig.write_bytes(src.read_bytes())
    im = Image.open(src).convert("RGB")
    x0, y0, x1, y1 = box
    lum = lambda c: sum(c) / 3
    # fondo: mediana del anillo alrededor de la caja; tinta: mediana de lo que contrasta dentro
    ring = [im.getpixel((x, y)) for x in range(x0 - 4, x1 + 5) for y in (y0 - 3, y1 + 3)]
    bg = tuple(int(statistics.median(c[i] for c in ring)) for i in range(3))
    inside = [im.getpixel((x, y)) for x in range(x0, x1 + 1) for y in range(y0, y1 + 1)]
    ink_px = [c for c in inside if abs(lum(c) - lum(bg)) > 28] or [(255, 255, 255)]
    ink = tuple(int(statistics.median(c[i] for c in ink_px)) for i in range(3))
    ImageDraw.Draw(im).rectangle((x0 - 2, y0 - 2, x1 + 2, y1 + 2), fill=bg)

    S, w, h = 8, x1 - x0 + 1, y1 - y0 + 1
    font = ImageFont.truetype(FONTS[weight], h * S * 2)
    big = Image.new("L", (int(font.getlength(text)) + 4 * S, h * S * 4), 0)
    ImageDraw.Draw(big).text((2 * S, h * S), text, fill=255, font=font)
    big = big.crop(big.getbbox())
    scale = min(w / big.width, h / big.height)          # cabe en la caja sin deformarse
    small = big.resize((max(1, round(big.width * scale)), max(1, round(big.height * scale))), Image.LANCZOS)
    im.paste(Image.new("RGB", small.size, ink), (x0 + (w - small.width) // 2, y0 + (h - small.height) // 2), small)
    im.save(src)
    return bg, ink, small.size


if __name__ == "__main__":
    pid, *nums = sys.argv[1:6]
    print(retocar(pid, tuple(int(n) for n in nums), sys.argv[6], sys.argv[7] if len(sys.argv) > 7 else "regular"))
