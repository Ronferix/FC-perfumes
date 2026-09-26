"""
Genera el HTML estático que depende de los datos (sin dependencias externas).

  python tools/prerender.py

- index.html:     primera diapositiva del carrusel «Familias» (perfume para empezar: families.json → starter)
- catalogo.html:  lista completa dentro de <noscript> (funciona sin JavaScript)
- Enlaces de WhatsApp con data-wa: se reescriben con el número de data/config.json

Ejecutar cada vez que se editen los archivos de /data.
"""
import html
import json
import re
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent.parent
load = lambda n: json.loads((ROOT / "data" / f"{n}.json").read_text(encoding="utf-8"))
config, families, perfumes, notes = load("config"), load("families"), load("perfumes"), load("notes")
perfumes = [p for p in perfumes if p.get("published", True)]
fam_by = {f["id"]: f for f in families}
e = lambda s: html.escape(str(s), quote=True)


def in_family(fid):
    main = sorted([p for p in perfumes if p["family"] == fid], key=lambda p: p["order"])
    also = sorted([p for p in perfumes if fid in p.get("alsoIn", [])], key=lambda p: p["order"])
    return main + also


def wa(text):
    phone = re.sub(r"\D", "", config["whatsapp"].get("phone", ""))
    return f"https://wa.me/{phone}?text={quote(text)}" if phone else f"https://wa.me/?text={quote(text)}"


def wa_perfume(p):
    label = f"{p['name']} de {re.sub(r'\s*\(.*\)', '', p['brand'])}"
    return wa(config["whatsapp"]["perfumeMessage"].replace("{perfume}", label))


def notes_line(p):
    return " · ".join(notes[n]["es"] for n in p["keyNotes"])


ARROW_L = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
ARROW_R = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
PLAY = ('<svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12" stroke="currentColor" stroke-width="1.5"/></svg>'
        '<svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>')


def showcase_html():
    """Primera diapositiva estática (funciona sin JS); showcase.js cambia de familia con las flechas."""
    by = {p["id"]: p for p in perfumes}
    f = families[0]
    p = by[f["starter"]]
    t = f["theme"]
    return f"""        <p class="sc-name display" aria-live="polite">{e(f['name'])}</p>
        <div class="sc-stage" style="--bg:{t['bg']};--bg2:{t['bg2']};--ink:{t['ink']};--muted:{t['muted']};--accent:{t['accent']}">
          <div class="sc-bg" aria-hidden="true"><div class="bg-layer is-on"></div><div class="bg-layer"></div></div>
          <button class="g-btn sc-prev" type="button" aria-label="Familia anterior">{ARROW_L}</button>
          <a class="sc-perfume" href="catalogo.html#/{f['id']}/{p['id']}">
            <span class="sc-visual"><img class="ing-bottle" src="assets/img/perfumes/{p['image']}-840.webp" width="420" height="560" alt="{e(p['alt'])}" loading="lazy"></span>
            <span class="sc-pname">{e(p['name'])}</span>
            <span class="sc-pbrand">{e(p['brand'])}</span>
          </a>
          <button class="g-btn sc-next" type="button" aria-label="Familia siguiente">{ARROW_R}</button>
        </div>"""


def noscript_html():
    out = ['    <div class="ns">', '      <h1 class="display">Colección</h1>',
           '      <p class="muted">Pregúntanos por cualquier perfume: el enlace abre WhatsApp con el nombre ya escrito.</p>']
    for f in families:
        out.append(f'      <section><h2>{e(f["name"])}</h2><ul>')
        for p in in_family(f["id"]):
            nl = notes_line(p) or "Información por confirmar"
            out.append(f'        <li><strong>{e(p["name"])}</strong> — {e(p["brand"])}. {e(nl)}. '
                       f'<a href="{e(wa_perfume(p))}" rel="noopener">Preguntar por WhatsApp</a></li>')
        out.append("      </ul></section>")
    out.append("    </div>")
    return "\n".join(out)


def inject(text, name, content):
    pat = re.compile(rf"(<!-- prerender:{name} -->)(.*?)(\s*<!-- /prerender:{name} -->)", re.S)
    if not pat.search(text):
        raise SystemExit(f"Marcador prerender:{name} no encontrado")
    return pat.sub(lambda m: m.group(1) + "\n" + content + m.group(3), text)


def fix_wa(text):
    msgs = {"general": config["whatsapp"]["generalMessage"], "advice": config["whatsapp"]["adviceMessage"]}
    return re.sub(r'data-wa="(\w+)" href="[^"]*"', lambda m: f'data-wa="{m.group(1)}" href="{e(wa(msgs.get(m.group(1), msgs["general"])))}"', text)


idx = ROOT / "index.html"
t = idx.read_text(encoding="utf-8")
t = inject(t, "showcase", showcase_html())
idx.write_text(fix_wa(t), encoding="utf-8", newline="\n")

cat = ROOT / "catalogo.html"
t = cat.read_text(encoding="utf-8")
cat.write_text(inject(t, "noscript", noscript_html()), encoding="utf-8", newline="\n")

print(f"OK: {len(families)} familias, {len(perfumes)} perfumes")
