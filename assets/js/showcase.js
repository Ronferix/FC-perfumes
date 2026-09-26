/* ==========================================================================
   Carrusel «Familias» de la portada: nombre de la familia y, debajo, su
   perfume para empezar (families.json → starter) con tamaños fijos para
   que la sección no salte al cambiar. Navegación manual: flechas, teclado y deslizar.
   El HTML de la primera diapositiva viene prerenderizado (funciona sin JS).
   ========================================================================== */
import { esc } from "./data.js";
import { IngredientStage, loadIngredients } from "./ingredients.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r) => r.querySelector(s);

export async function initShowcase(root, D) {
  const stage = $(".sc-stage", root);
  const available = await loadIngredients();
  const n = D.families.length;
  let i = 0, ing = null;

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

    const visual = $(".sc-visual", root);
    ing?.destroy();
    visual.className = "sc-visual";
    ing = new IngredientStage(visual, p, { notes: D.notes, available, captions: false, cycle: false, sizes: "(max-width: 860px) 55vw, 24vw" });

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
