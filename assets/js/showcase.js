/* ==========================================================================
   Carrusel «Familias» de la portada: nombre de la familia y, debajo, su
   perfume para empezar (families.json → starter, en foto fija) con tamaños fijos para
   que la sección no salte al cambiar. Navegación manual: flechas, teclado y deslizar.
   El HTML de la primera diapositiva viene prerenderizado (funciona sin JS).
   ========================================================================== */
import { esc, studioImg } from "./data.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r) => r.querySelector(s);

export function initShowcase(root, D) {
  const stage = $(".sc-stage", root);
  const n = D.families.length;
  let i = 0;

  function show(idx, animate = true) {
    i = ((idx % n) + n) % n;
    const f = D.families[i];
    const p = D.perfById[f.starter] || D.inFamily(f.id)[0];

    $(".sc-name", root).textContent = f.shortName || f.name;
    const link = $(".sc-perfume", root);
    link.href = `catalogo.html#/${f.id}/${p.id}`;
    link.setAttribute("aria-label", `${p.name} de ${p.brand}, familia ${f.name}. Ver ficha`);
    $(".sc-pname", root).textContent = p.name;
    $(".sc-pbrand", root).textContent = p.brand;

    // foto fija: el frasco con sus ingredientes si ya tiene foto de estudio, si no el frasco solo
    $(".sc-visual", root).innerHTML = studioImg(p, { sizes: "(max-width: 860px) 64vw, 360px" });

    if (animate && !reduced) [$(".sc-name", root), link].forEach((el) => { el.classList.remove("in"); void el.offsetWidth; el.classList.add("in"); });
  }

  $(".sc-prev", root).addEventListener("click", () => show(i - 1));
  $(".sc-next", root).addEventListener("click", () => show(i + 1));
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(i + 1);
    if (e.key === "ArrowLeft") show(i - 1);
  });
  let x0 = null;
  stage.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") x0 = e.clientX; });
  stage.addEventListener("pointerup", (e) => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1)); });

  show(0, false);
}
