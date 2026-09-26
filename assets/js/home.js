import { loadData, waHref } from "./data.js";
import { initShowcase } from "./showcase.js";

/* Cabecera: fondo sólido al desplazarse */
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* El logo de la barra solo aparece cuando el logo completo del hero ya no se ve */
const heroLogo = document.querySelector(".hero__logo");
if (heroLogo) {
  new IntersectionObserver(([e]) => header.classList.toggle("hero-logo-visible", e.isIntersecting), { rootMargin: `-${header.offsetHeight}px 0px 0px 0px` }).observe(heroLogo);
}

/* Aparición progresiva */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
}, { rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

loadData().then((D) => {
  /* Enlaces de WhatsApp desde la configuración (el HTML ya trae un valor por defecto) */
  const msg = { general: D.config.whatsapp.generalMessage, advice: D.config.whatsapp.adviceMessage };
  document.querySelectorAll("[data-wa]").forEach((a) => { a.href = waHref(D.config, msg[a.dataset.wa] || msg.general); });
  const sc = document.querySelector(".showcase");
  if (sc) initShowcase(sc, D);
}).catch(() => { /* sin datos: la página conserva su contenido estático */ });
