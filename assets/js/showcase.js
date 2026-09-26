/* ==========================================================================
   Carrusel «Familias» de la portada: una familia a la vez, con su perfume
   para empezar (families.json → starter) animado con sus ingredientes.
   El HTML de la primera diapositiva viene prerenderizado (funciona sin JS).
   ========================================================================== */
import { esc, noteName } from "./data.js";
import { Atmosphere } from "./fx.js";
import { IngredientStage, loadIngredients } from "./ingredients.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r) => r.querySelector(s);
const PHASE_MS = 3400;
const SLIDE_MS = PHASE_MS * 3 + 800; // da tiempo a ver salida, corazón y fondo

export async function initShowcase(root, D) {
  const stage = $(".sc-stage", root);
  stage.removeAttribute("style"); // el tema pasa a la sección completa
  const available = await loadIngredients();
  const fx = new Atmosphere($(".sc-fx", root), { density: 0.7 });
  const n = D.families.length;
  const tabs = [...root.querySelectorAll(".g-tab")];
  const bar = $(".g-progress span", root);
  const playBtn = $(".g-play", root);
  let i = 0, playing = !reduced, ing = null, raf = 0, t0 = 0, elapsed = 0, inView = false;
  const hold = new Set();

  function applyTheme(t) {
    ["bg", "bg2", "ink", "muted", "accent"].forEach((k) => root.style.setProperty(`--${k}`, t[k]));
    root.dataset.mode = t.mode;
    root.dataset.title = t.titleStyle || "roman";
    const layers = [...root.querySelectorAll(".bg-layer")];
    const on = layers.find((l) => l.classList.contains("is-on")) || layers[0];
    const next = layers.find((l) => l !== on);
    next.style.background = `radial-gradient(70% 75% at 72% 55%, ${t.bg2} 0%, transparent 70%), radial-gradient(50% 50% at 5% 0%, ${t.bg2}55 0%, transparent 70%), ${t.bg}`;
    next.classList.add("is-on"); on.classList.remove("is-on");
  }

  function show(idx, { animate = true, announce = false } = {}) {
    i = ((idx % n) + n) % n;
    const f = D.families[i];
    const p = D.perfById[f.starter] || D.inFamily(f.id)[0];
    applyTheme(f.theme);
    fx.setFocus(0.72, 0.5);
    fx.setMood({ motifs: p.animation.motifs, palette: p.animation.palette, tempo: f.motion.tempo, mode: f.theme.mode });

    const slide = $(".sc-slide", root);
    $(".sc-i", root).textContent = String(i + 1).padStart(2, "0");
    $(".sc-name", root).textContent = f.name;
    $(".sc-concept", root).textContent = f.concept;
    $(".sc-desc", root).textContent = f.description;
    $(".sc-pname", root).innerHTML = `${esc(p.name)} <span class="sc-pbrand">${esc(p.brand)}</span>`;
    $(".sc-pnotes", root).textContent = p.keyNotes.map((k) => noteName(D.notes, k)).join(" · ");
    $(".sc-fam", root).href = `catalogo.html#/${f.id}`;
    $(".sc-fam", root).setAttribute("aria-label", `Ver la familia ${f.name}`);
    $(".sc-perf", root).href = `catalogo.html#/${f.id}/${p.id}`;
    $(".sc-perf", root).textContent = `Ver ${p.name}`;

    const visual = $(".sc-visual", root);
    ing?.destroy();
    visual.className = "sc-visual";
    ing = new IngredientStage(visual, p, { notes: D.notes, available, phaseMs: PHASE_MS, sizes: "(max-width: 860px) 60vw, 30vw" });

    if (animate && !reduced) [slide, visual].forEach((el) => { el.classList.remove("in"); void el.offsetWidth; el.classList.add("in"); });
    tabs.forEach((t, k) => t.setAttribute("aria-current", k === i ? "true" : "false"));
    tabs[i].scrollIntoView?.({ block: "nearest", inline: "center", behavior: "auto" });
    if (announce) $(".sc-live", root).textContent = `${f.name}. Para empezar: ${p.name} de ${p.brand}.`;
    elapsed = 0; t0 = performance.now(); bar.style.transform = "scaleX(0)";
  }

  /* ---- reproducción automática (solo cuando la sección está a la vista) ---- */
  function tick(now) {
    if (!playing) return;
    if (hold.size || !inView || document.hidden) t0 = now - elapsed;
    else elapsed = now - t0;
    bar.style.transform = `scaleX(${Math.min(1, elapsed / SLIDE_MS)})`;
    if (elapsed >= SLIDE_MS) show(i + 1);
    raf = requestAnimationFrame(tick);
  }
  function start() { cancelAnimationFrame(raf); if (playing) { t0 = performance.now() - elapsed; raf = requestAnimationFrame(tick); } updatePlay(); }
  function updatePlay() {
    playBtn.dataset.state = playing ? "playing" : "paused";
    playBtn.setAttribute("aria-label", playing ? "Pausar el recorrido automático" : "Reanudar el recorrido automático");
    if (!playing) bar.style.transform = "scaleX(0)";
  }
  function userNav(k) { playing = false; cancelAnimationFrame(raf); updatePlay(); show(k, { announce: true }); }

  $(".g-prev", root).addEventListener("click", () => userNav(i - 1));
  $(".g-next", root).addEventListener("click", () => userNav(i + 1));
  playBtn.addEventListener("click", () => { playing = !playing; start(); });
  tabs.forEach((t, k) => t.addEventListener("click", (e) => { e.preventDefault(); userNav(k); }));
  [".sc-slide", ".sc-nav"].forEach((sel) => {
    const el = $(sel, root);
    el.addEventListener("pointerenter", () => hold.add(sel));
    el.addEventListener("pointerleave", () => hold.delete(sel));
    el.addEventListener("focusin", () => hold.add(sel + "f"));
    el.addEventListener("focusout", () => hold.delete(sel + "f"));
  });
  root.addEventListener("keydown", (e) => {
    if (e.target.closest("a, button") && !e.target.closest(".sc-nav")) return;
    if (e.key === "ArrowRight") userNav(i + 1);
    if (e.key === "ArrowLeft") userNav(i - 1);
  });
  let x0 = null;
  stage.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") x0 = e.clientX; });
  stage.addEventListener("pointerup", (e) => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 50) userNav(i + (dx < 0 ? 1 : -1)); });
  new IntersectionObserver(([e]) => { inView = e.isIntersecting; }, { threshold: 0.35 }).observe(root);

  root.classList.add("is-ready");
  show(0, { animate: false });
  start();
}
