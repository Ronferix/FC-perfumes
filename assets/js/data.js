/* ==========================================================================
   Datos y utilidades compartidas. Todo el contenido vive en /data/*.json.
   ========================================================================== */

const cache = {};
async function json(name) {
  if (!cache[name]) cache[name] = fetch(`data/${name}.json`).then((r) => {
    if (!r.ok) throw new Error(`No se pudo cargar data/${name}.json`);
    return r.json();
  });
  return cache[name];
}

export async function loadData() {
  const [config, families, perfumes, notes] = await Promise.all([json("config"), json("families"), json("perfumes"), json("notes")]);
  const published = perfumes.filter((p) => p.published !== false);
  const famById = Object.fromEntries(families.map((f) => [f.id, f]));
  const perfById = Object.fromEntries(published.map((p) => [p.id, p]));
  /** Perfumes de una familia: primero los de familia principal, después los que también pertenecen */
  const inFamily = (fid) => [
    ...published.filter((p) => p.family === fid).sort((a, b) => a.order - b.order),
    ...published.filter((p) => p.alsoIn?.includes(fid)).sort((a, b) => a.order - b.order),
  ];
  return { config, families, perfumes: published, notes, famById, perfById, inFamily };
}

/* ---------- WhatsApp ---------- */
export function waHref(config, text) {
  const phone = (config.whatsapp?.phone || "").replace(/\D/g, "");
  const base = phone ? `https://wa.me/${phone}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}
export function waPerfume(config, p) {
  const label = `${p.name} de ${p.brand.replace(/\s*\(.*\)/, "")}`;
  return waHref(config, config.whatsapp.perfumeMessage.replace("{perfume}", label));
}

/* ---------- Imágenes ---------- */
export function bottleSrc(p, w = 420) { return `assets/img/perfumes/${p.image}-${w}.webp`; }
export function bottleImg(p, { sizes = "(max-width: 700px) 60vw, 22vw", eager = false, cls = "" } = {}) {
  if (!p.image) return plate(p);
  return `<img class="${cls}" src="${bottleSrc(p, 420)}" srcset="${bottleSrc(p, 420)} 420w, ${bottleSrc(p, 840)} 840w" sizes="${sizes}" width="420" height="560" alt="${esc(p.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}
export function plate(p) {
  return `<div class="plate" role="img" aria-label="${esc(p.name)}: fotografía pendiente"><div><strong>${esc(p.name)}</strong><span>Fotografía pendiente</span></div></div>`;
}

export const noteName = (notes, id) => notes[id]?.es || id;

export function esc(s = "") {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export const WA_ICON = `<svg class="wa-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>`;
