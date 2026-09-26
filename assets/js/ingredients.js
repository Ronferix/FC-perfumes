/* ==========================================================================
   IngredientStage — el frasco rodeado de sus ingredientes reales.
   Recorre la pirámide: salida → corazón → fondo. Cada fase muestra las
   imágenes (sin fondo) de sus notas. Si el perfume tiene video, lo usa.
   Imágenes: assets/img/ingredients/<id>.webp (lista en manifest.json).
   ========================================================================== */
import { bottleSrc, esc, noteName } from "./data.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const PHASES = [["top", "Salida"], ["heart", "Corazón"], ["base", "Fondo"]];
// Posiciones alrededor del frasco (x, y en %; z: delante/detrás)
const SLOTS = [
  [18, 30, 1], [82, 34, 1], [13, 66, 3], [86, 70, 3], [30, 86, 3], [72, 88, 1], [26, 12, 1], [76, 12, 1],
];

let manifest = null;
export async function loadIngredients() {
  if (!manifest) manifest = fetch("assets/img/ingredients/manifest.json").then((r) => (r.ok ? r.json() : [])).catch(() => []);
  return new Set(await manifest);
}

/** ¿Hay imágenes suficientes para animar este perfume? */
export function hasIngredients(p, notes, available) {
  if (!p.notes) return false;
  return PHASES.some(([k]) => p.notes[k].some((n) => available.has(notes[n]?.img)));
}

export class IngredientStage {
  /**
   * @param {HTMLElement} el contenedor
   * @param {object} p perfume
   * @param {object} opts { notes, available:Set, phaseMs, bottleClass, sizes, captions, cycle }
   */
  constructor(el, p, { notes, available, phaseMs = 3400, bottleClass = "", sizes = "40vw", captions = true, cycle = true } = {}) {
    this.el = el; this.p = p; this.notes = notes; this.phaseMs = phaseMs;
    this.i = 0; this.timer = 0; this.visible = true;
    const phases = p.notes ? PHASES.map(([k, label]) => {
      const seen = new Set();
      const items = p.notes[k].map((n) => ({ n, img: notes[n]?.img })).filter((x) => x.img && available.has(x.img) && !seen.has(x.img) && seen.add(x.img)).slice(0, 4);
      return { k, label, notes: p.notes[k], items };
    }) : [];
    this.phases = phases;

    const media = p.video
      ? `<video class="ing-video" src="${p.video}" poster="${p.image ? bottleSrc(p, 840) : ""}" autoplay muted loop playsinline aria-hidden="true"></video>`
      : p.image
        ? `<img class="ing-bottle ${bottleClass}" src="${bottleSrc(p, 840)}" srcset="${bottleSrc(p, 420)} 420w, ${bottleSrc(p, 840)} 840w" sizes="${sizes}" width="420" height="560" alt="${esc(p.alt)}">`
        : "";
    let slot = 0;
    const sprites = p.video ? "" : phases.map((ph, pi) => ph.items.map((it, j) => {
      const [x, y, z] = SLOTS[(slot++ + pi) % SLOTS.length];
      const s = 22 + ((j * 7 + pi * 5) % 9);           // tamaño relativo 22–30 %
      const r = ((j * 37 + pi * 23) % 40) - 20;       // giro -20..20°
      const d = 5 + ((j + pi) % 4) * 0.9;             // duración de flotación
      return `<img class="ing" data-phase="${ph.k}" src="assets/img/ingredients/${it.img}.webp" alt="" aria-hidden="true" loading="lazy" decoding="async"
        style="--x:${x}%;--y:${y}%;--s:${s}%;--r:${r}deg;--d:${d}s;--delay:${j * 90}ms;z-index:${z}">`;
    }).join("")).join("");

    el.classList.add("ing-stage");
    el.innerHTML = `${sprites}${media}${captions && phases.length ? `<p class="ing-caption" aria-live="off"><span class="ing-phase"></span><span class="ing-notes"></span></p>` : ""}`;
    if (captions && phases.length) {
      // texto accesible completo (no depende de la animación)
      el.setAttribute("aria-label", phases.map((ph) => `${ph.label}: ${ph.notes.map((n) => noteName(notes, n)).join(", ")}`).join(". "));
    }
    this.show(0);
    if (!cycle) el.classList.add("is-static");
    else if (!reduced && phases.length > 1) {
      this.io = new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; this.visible ? this.play() : this.pause(); });
      this.io.observe(el);
    } else if (reduced) el.classList.add("is-static");
  }

  show(i) {
    if (!this.phases.length) return;
    this.i = i % this.phases.length;
    const ph = this.phases[this.i];
    this.el.dataset.phase = ph.k;
    const cap = this.el.querySelector(".ing-caption");
    if (cap) {
      cap.querySelector(".ing-phase").textContent = ph.label;
      cap.querySelector(".ing-notes").textContent = ph.notes.map((n) => noteName(this.notes, n)).join(" · ");
      cap.classList.remove("in"); void cap.offsetWidth; cap.classList.add("in");
    }
  }
  play() { this.pause(); this.timer = setInterval(() => { if (!document.hidden) this.show(this.i + 1); }, this.phaseMs); }
  pause() { clearInterval(this.timer); }
  destroy() { this.pause(); this.io?.disconnect(); }
}
