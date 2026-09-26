/* ==========================================================================
   Catálogo — galería olfativa → familia → ficha, en una sola pantalla.
   Rutas con hash (compartibles y compatibles con "atrás"):
     #/                 galería de familias
     #/lista            lista accesible
     #/dulces           familia abierta
     #/dulces/khamrah   ficha de perfume
   ========================================================================== */
import { loadData, waPerfume, bottleImg, bottleSrc, esc, noteName, plate, WA_ICON } from "./data.js";
import { Atmosphere } from "./fx.js";
import { IngredientStage, loadIngredients } from "./ingredients.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const desktop = matchMedia("(min-width: 901px)");
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const app = $("#app");
const views = { gallery: $("#view-gallery"), family: $("#view-family"), perfume: $("#view-perfume"), list: $("#view-list") };
const LIST_THEME = { mode: "light", bg: "#f4eee4", bg2: "#e6dccc", ink: "#1d1814", muted: "#6b6158", accent: "#a9834a", titleStyle: "roman" };

let D, fx, available = new Set(), ing = null;
const state = { view: null, gi: 0, fam: null, perf: null, playing: !reduced, first: true };

init();

async function init() {
  $(".stage__status").textContent = "Cargando la colección…";
  try { D = await loadData(); }
  catch (e) {
    $(".stage__status").textContent = "No pudimos cargar la colección. Intenta recargar la página.";
    return;
  }
  $(".stage__status").textContent = "";
  available = await loadIngredients();
  fx = new Atmosphere($(".stage__fx"));
  buildGallery();
  buildList();
  bindKeys();
  window.addEventListener("hashchange", () => route());
  route(true);
}

/* ---------------------------------------------------------------- rutas */
function parse() {
  const seg = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  if (!seg.length) return { view: "gallery" };
  if (seg[0] === "lista") return { view: "list" };
  const fam = D.famById[seg[0]];
  if (!fam) return { view: "gallery" };
  if (seg[1]) {
    const perf = D.perfById[seg[1]];
    if (perf && (perf.family === fam.id || perf.alsoIn?.includes(fam.id))) return { view: "perfume", fam, perf };
  }
  return { view: "family", fam };
}

function route(initial = false) {
  const r = parse();
  if (!initial && !reduced && document.startViewTransition) {
    const vt = document.startViewTransition(() => render(r));
    vt.finished.finally(() => $$(".card img").forEach((i) => (i.style.viewTransitionName = "")));
  } else render(r);
}

function render(r) {
  const prev = state.view;
  state.view = r.view;
  app.dataset.view = r.view;
  Object.entries(views).forEach(([k, el]) => (el.hidden = k !== r.view));

  if (r.view === "gallery") {
    if (state.fam) state.gi = D.families.indexOf(state.fam);
    showFamily(state.gi, { animate: prev !== null });
    startAuto();
  } else stopAuto();

  if (r.view === "family") { state.fam = r.fam; renderFamily(r.fam, prev === "perfume" ? state.perf : null); }
  if (r.view === "perfume") { state.fam = r.fam; state.perf = r.perf; renderPerfume(r.fam, r.perf); }
  if (r.view === "list") { applyTheme(LIST_THEME, "lista"); fx.setMood({ motifs: ["haze"], palette: ["#ffffff", "#e6dccc", "#f3e7da"], tempo: 0.3, mode: "light" }); }

  renderCrumbs(r);
  if (r.view !== "perfume") { ing?.destroy(); ing = null; }
  document.title = [r.perf?.name, r.fam?.name, r.view === "list" ? "Lista" : null, "Colección — Perfumes FC"].filter(Boolean).join(" · ");

  if (!state.first) {
    const h = views[r.view].querySelector("h1");
    h?.focus({ preventScroll: true });
    views[r.view].scrollTop = 0;
  }
  state.first = false;
}

function renderCrumbs(r) {
  const items = [`<li><a href="#/">Colección</a></li>`];
  if (r.view === "list") items.push(`<li aria-current="page">Lista</li>`);
  if (r.fam) items.push(r.view === "perfume" ? `<li><a href="#/${r.fam.id}">${esc(r.fam.shortName || r.fam.name)}</a></li>` : `<li aria-current="page">${esc(r.fam.shortName || r.fam.name)}</li>`);
  if (r.perf) items.push(`<li aria-current="page">${esc(r.perf.name)}</li>`);
  if (r.view === "gallery") items[0] = `<li aria-current="page">Colección</li>`;
  $(".crumbs ol").innerHTML = items.join("");
}

/* ---------------------------------------------------------------- tema y atmósfera */
function applyTheme(t, key) {
  ["bg", "bg2", "ink", "muted", "accent"].forEach((k) => app.style.setProperty(`--${k}`, t[k]));
  app.dataset.title = t.titleStyle || "roman";
  document.body.dataset.mode = t.mode;
  document.body.style.setProperty("--bar-ink", t.ink);
  document.body.style.setProperty("--bar-bg", t.bg);
  $('meta[name="theme-color"]').content = t.bg;
  if (app.dataset.themeKey === key) return;
  app.dataset.themeKey = key;
  const layers = $$(".bg-layer");
  const on = layers.find((l) => l.classList.contains("is-on"));
  const next = layers.find((l) => l !== on);
  next.style.background = `radial-gradient(85% 70% at 70% 62%, ${t.bg2} 0%, transparent 68%), radial-gradient(60% 55% at 8% 0%, ${t.bg2}66 0%, transparent 70%), ${t.bg}`;
  next.classList.add("is-on");
  on?.classList.remove("is-on");
}
const familyMood = (f) => ({ ...f.motion, mode: f.theme.mode });
const perfumeMood = (p, f) => ({ motifs: p.animation.motifs, palette: p.animation.palette, tempo: f.motion.tempo, mode: f.theme.mode });

/* ---------------------------------------------------------------- galería */
function buildGallery() {
  $(".g-n").textContent = String(D.families.length).padStart(2, "0");
  $(".g-tabs").innerHTML = D.families.map((f, i) => `<li><button class="g-tab" type="button" data-i="${i}">${esc(f.shortName || f.name)}</button></li>`).join("");
  $(".g-tabs").addEventListener("click", (e) => { const b = e.target.closest(".g-tab"); if (b) userNav(+b.dataset.i); });
  $(".g-prev").addEventListener("click", () => userNav(state.gi - 1));
  $(".g-next").addEventListener("click", () => userNav(state.gi + 1));
  $(".g-play").addEventListener("click", () => { state.playing = !state.playing; state.playing ? startAuto() : stopAuto(); updatePlay(); });
  updatePlay();

  // Pausa mientras se lee o se interactúa con los controles
  const g = views.gallery;
  [".g-slide", ".g-nav"].forEach((sel) => {
    const el = $(sel, g);
    el.addEventListener("pointerenter", () => hold.add(sel));
    el.addEventListener("pointerleave", () => hold.delete(sel));
    el.addEventListener("focusin", () => hold.add(sel + "f"));
    el.addEventListener("focusout", () => hold.delete(sel + "f"));
  });

  // Deslizar en pantallas táctiles
  let x0 = null;
  g.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") x0 = e.clientX; });
  g.addEventListener("pointerup", (e) => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 50) userNav(state.gi + (dx < 0 ? 1 : -1)); });

  // Parallax sutil de los frascos
  if (!reduced) g.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const b = $(".g-bottles"); const r = g.getBoundingClientRect();
    b.style.setProperty("--px", `${((e.clientX - r.left) / r.width - 0.5) * -14}px`);
    b.style.setProperty("--py", `${((e.clientY - r.top) / r.height - 0.5) * -10}px`);
  });
}

function userNav(i) {
  state.playing = false; stopAuto(); updatePlay();
  showFamily(i, { animate: true, announce: true });
}

function showFamily(i, { animate = true, announce = false } = {}) {
  const n = D.families.length;
  i = ((i % n) + n) % n;
  state.gi = i;
  const f = D.families[i];
  state.fam = f;
  applyTheme(f.theme, f.id);
  fx.setFocus(desktop.matches ? 0.72 : 0.5, desktop.matches ? 0.55 : 0.62);
  fx.setMood(familyMood(f));

  const count = D.inFamily(f.id).length;
  const slide = $(".g-slide");
  $(".g-i").textContent = String(i + 1).padStart(2, "0");
  $(".g-name").textContent = f.name;
  $(".g-concept").textContent = f.concept;
  $(".g-desc").textContent = f.description;
  $(".g-cta").href = `#/${f.id}`;
  $(".g-cta").setAttribute("aria-label", `Explorar la familia ${f.name}`);
  $(".g-num").textContent = `${count} perfume${count === 1 ? "" : "s"}`;

  const ps = D.inFamily(f.id).filter((p) => p.image).slice(0, 3);
  const [c, l, r] = ps;
  const bottles = $(".g-bottles");
  bottles.innerHTML = [l && `<img class="gb-l" src="${bottleSrc(l, 420)}" alt="" width="420" height="560">`,
    c && `<img class="gb-c" src="${bottleSrc(c, 840)}" alt="" width="420" height="560">`,
    r && `<img class="gb-r" src="${bottleSrc(r, 420)}" alt="" width="420" height="560">`].filter(Boolean).join("");

  if (animate && !reduced) { [slide, bottles].forEach((el) => { el.classList.remove("in"); void el.offsetWidth; el.classList.add("in"); }); }
  else { slide.classList.remove("in"); bottles.classList.add("in"); }

  $$(".g-tab").forEach((b, k) => b.setAttribute("aria-current", k === i ? "true" : "false"));
  $$(".g-tab")[i].scrollIntoView({ block: "nearest", inline: "center", behavior: reduced ? "auto" : "smooth" });
  if (announce) $(".g-live").textContent = `${f.name}. Familia ${i + 1} de ${n}. ${count} perfumes.`;
  if (state.view === "gallery" && location.hash && location.hash !== "#/") history.replaceState(null, "", "#/");

  // precarga discreta de la siguiente familia
  D.inFamily(D.families[(i + 1) % n].id).filter((p) => p.image).slice(0, 3).forEach((p, k) => { const im = new Image(); im.src = bottleSrc(p, k === 0 ? 840 : 420); });
  resetProgress();
}

/* ---------- reproducción automática ---------- */
const hold = new Set();
let raf = 0, t0 = 0, elapsed = 0;
const bar = () => $(".g-progress span");
function startAuto() {
  cancelAnimationFrame(raf);
  if (!state.playing || state.view !== "gallery") return;
  t0 = performance.now() - elapsed;
  raf = requestAnimationFrame(tick);
}
function stopAuto() { cancelAnimationFrame(raf); }
function resetProgress() { elapsed = 0; t0 = performance.now(); bar().style.transform = "scaleX(0)"; }
function tick(now) {
  if (!state.playing || state.view !== "gallery") return;
  const dur = (D.config.autoplaySeconds || 9) * 1000;
  if (hold.size || document.hidden) t0 = now - elapsed;
  else elapsed = now - t0;
  bar().style.transform = `scaleX(${Math.min(1, elapsed / dur)})`;
  if (elapsed >= dur) showFamily(state.gi + 1, { animate: true });
  raf = requestAnimationFrame(tick);
}
function updatePlay() {
  const b = $(".g-play");
  b.dataset.state = state.playing ? "playing" : "paused";
  b.setAttribute("aria-label", state.playing ? "Pausar el recorrido automático" : "Reanudar el recorrido automático");
  if (!state.playing) bar().style.transform = "scaleX(0)";
}

/* ---------------------------------------------------------------- familia */
function notesLine(p) { return p.keyNotes.map((n) => noteName(D.notes, n)).join(" · "); }
function brandLabel(p) { return p.brand; }

function renderFamily(f, fromPerf) {
  applyTheme(f.theme, f.id);
  fx.setFocus(0.6, 0.5);
  fx.setMood(familyMood(f));
  const list = D.inFamily(f.id);
  views.family.innerHTML = `
    <div class="f-wrap">
      <header class="f-head">
        <a class="f-back" href="#/">← Todas las familias</a>
        <p class="eyebrow f-concept">${esc(f.concept)}</p>
        <h1 class="display f-name" tabindex="-1">${esc(f.name)}</h1>
        <p class="f-desc">${esc(f.description)}</p>
        <p class="f-count">${list.length} perfume${list.length === 1 ? "" : "s"}</p>
        <div class="f-arrows">
          <button class="g-btn f-left" type="button" aria-label="Ver perfumes anteriores"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>
          <button class="g-btn f-right" type="button" aria-label="Ver más perfumes"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>
        </div>
      </header>
      <ol class="f-track" aria-label="Perfumes de la familia ${esc(f.name)}">
        ${list.map((p, i) => `
          <li class="card" style="--i:${i}">
            <a class="card__link" href="#/${f.id}/${p.id}" data-id="${p.id}">
              <span class="card__stage">${bottleImg(p, { sizes: "(max-width: 900px) 45vw, 272px" })}</span>
              <span class="card__name">${esc(p.name)}</span>
              <span class="card__brand">${esc(brandLabel(p))}</span>
              ${p.keyNotes.length ? `<span class="card__notes">${esc(notesLine(p))}</span>` : `<span class="card__notes">Información por confirmar</span>`}
              ${p.family !== f.id ? `<span class="card__also">También en ${esc(D.famById[p.family].shortName || D.famById[p.family].name)}</span>` : ""}
            </a>
          </li>`).join("")}
      </ol>
    </div>`;

  const track = $(".f-track", views.family);
  // La animación del fondo adopta la del perfume enfocado
  track.addEventListener("pointerover", (e) => { const a = e.target.closest(".card__link"); if (a) fx.setMood(perfumeMood(D.perfById[a.dataset.id], f)); });
  track.addEventListener("focusin", (e) => { const a = e.target.closest(".card__link"); if (a) fx.setMood(perfumeMood(D.perfById[a.dataset.id], f)); });
  track.addEventListener("pointerleave", () => fx.setMood(familyMood(f)));
  // Elemento compartido: el frasco "viaja" a la ficha
  track.addEventListener("click", (e) => { const a = e.target.closest(".card__link"); const img = a?.querySelector("img"); if (img) img.style.viewTransitionName = "bottle"; });
  // Rueda vertical → desplazamiento horizontal (solo escritorio)
  track.addEventListener("wheel", (e) => {
    if (!desktop.matches || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    if (track.scrollWidth <= track.clientWidth) return;
    e.preventDefault(); track.scrollLeft += e.deltaY;
  }, { passive: false });
  const step = () => Math.max(260, track.clientWidth * 0.7);
  $(".f-left", views.family).addEventListener("click", () => track.scrollBy({ left: -step(), behavior: reduced ? "auto" : "smooth" }));
  $(".f-right", views.family).addEventListener("click", () => track.scrollBy({ left: step(), behavior: reduced ? "auto" : "smooth" }));

  if (fromPerf) {
    const a = $(`.card__link[data-id="${fromPerf.id}"]`, views.family);
    if (a) {
      a.scrollIntoView({ block: "nearest", inline: "center" });
      const img = a.querySelector("img"); if (img) img.style.viewTransitionName = "bottle";
    }
  }
}

/* ---------------------------------------------------------------- ficha */
function renderPerfume(f, p) {
  applyTheme(f.theme, f.id);
  fx.setFocus(desktop.matches ? 0.28 : 0.5, desktop.matches ? 0.5 : 0.3);
  fx.setMood(perfumeMood(p, f));
  const list = D.inFamily(f.id);
  const i = list.indexOf(p);
  const prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];
  const home = D.famById[p.family];
  const others = [p.family, ...(p.alsoIn || [])].filter((id) => id !== f.id).map((id) => D.famById[id]);
  const dot = (n) => `<span class="dot" style="--c:${D.notes[n]?.color || "#ccc"}" aria-hidden="true"></span>`;

  const pyramid = p.notes
    ? `<div class="p-pyr">${[["top", "Salida", "Primera impresión"], ["heart", "Corazón", "Alma del perfume"], ["base", "Fondo", "Lo que perdura"]]
        .map(([k, t, s]) => `<section data-phase="${k}"><h2>${t}<small>${s}</small></h2><ul>${p.notes[k].map((n) => `<li>${dot(n)}${esc(noteName(D.notes, n))}</li>`).join("")}</ul></section>`).join("")}</div>`
    : p.keyNotes.length
      ? `<div class="p-key"><span>Notas principales</span>${p.keyNotes.map((n) => `<span class="note">${dot(n)}${esc(noteName(D.notes, n))}</span>`).join("")}</div>`
      : "";

  const facts = [
    ["Familia", [home, ...others.filter((o) => o.id !== home.id)].map((x) => `<a href="#/${x.id}">${esc(x.shortName || x.name)}</a>`).join(" · ")],
    p.concentration && ["Presentación", esc([p.concentration, p.presentation].filter(Boolean).join(" · "))],
    p.genderByBrand && ["La marca lo presenta como", esc(p.genderByBrand)],
    p.year && ["Lanzamiento", p.year],
  ].filter(Boolean);

  views.perfume.innerHTML = `
    <article class="p" aria-labelledby="p-name">
      <div class="p-visual">
        ${p.image ? `<div class="p-stage"></div>` : plate(p)}
      </div>
      <div class="p-info">
        <p class="eyebrow p-brand">${esc([p.brand, p.line].filter(Boolean).join(" · "))}</p>
        <h1 class="display p-name" id="p-name" tabindex="-1">${esc(p.name)}</h1>
        ${p.aka?.length ? `<p class="p-aka">También lo encuentras como ${p.aka.map(esc).join(", ")}</p>` : ""}
        <p class="p-desc">${esc(p.description)}</p>
        ${pyramid}
        <dl class="p-facts">${facts.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>
        <a class="btn p-cta" href="${waPerfume(D.config, p)}" target="_blank" rel="noopener">${WA_ICON} Preguntar por este perfume</a>
        <p class="p-avail">Disponibilidad y presentaciones: te las confirmamos por WhatsApp.</p>
        ${list.length > 1 ? `<nav class="p-pager" aria-label="Otros perfumes de ${esc(f.name)}">
          <a href="#/${f.id}/${prev.id}" rel="prev"><small>Anterior</small>${esc(prev.name)}</a>
          <a href="#/${f.id}/${next.id}" rel="next"><small>Siguiente</small>${esc(next.name)}</a>
        </nav>` : ""}
      </div>
      <a class="p-close" href="#/${f.id}" aria-label="Cerrar y volver a ${esc(f.name)}">×</a>
    </article>`;

  ing?.destroy(); ing = null;
  const st = $(".p-stage", views.perfume);
  if (st) {
    ing = new IngredientStage(st, p, { notes: D.notes, available, bottleClass: "p-bottle", sizes: "(max-width: 900px) 70vw, 40vw", captions: false });
    // la fase activa también se resalta en la pirámide de notas
    const sync = () => { const k = st.dataset.phase; $$(".p-pyr section", views.perfume).forEach((s) => s.classList.toggle("is-active", s.dataset.phase === k)); };
    sync(); new MutationObserver(sync).observe(st, { attributes: true, attributeFilter: ["data-phase"] });
  }
  if (!reduced && desktop.matches) {
    const img = $(".p-bottle", views.perfume);
    views.perfume.onpointermove = img ? (e) => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      img.style.translate = `${x * -12}px ${y * -8}px`;
    } : null;
  }
}

/* ---------------------------------------------------------------- lista */
function buildList() {
  views.list.innerHTML = `
    <div class="l-wrap">
      <a class="l-back" href="#/">← Volver a la galería</a>
      <h1 class="display" tabindex="-1">Toda la colección</h1>
      <p>${D.perfumes.length} perfumes organizados por familia. Algunos aparecen en más de una, porque comparten carácter con ambas.</p>
      ${D.families.map((f) => `
        <section class="l-fam" aria-labelledby="l-${f.id}">
          <h2 id="l-${f.id}"><a href="#/${f.id}">${esc(f.name)}</a><span>${esc(f.concept)}</span></h2>
          <ul>${D.inFamily(f.id).map((p) => `
            <li><a href="#/${f.id}/${p.id}"><span class="l-name">${esc(p.name)}</span><span class="l-brand">${esc(p.brand)}</span><span class="l-notes">${esc(notesLine(p)) || "Información por confirmar"}</span></a></li>`).join("")}
          </ul>
        </section>`).join("")}
    </div>`;
}

/* ---------------------------------------------------------------- teclado */
function bindKeys() {
  document.addEventListener("keydown", (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "Escape") {
      if (state.view === "perfume") location.hash = `#/${state.fam.id}`;
      else if (state.view === "family" || state.view === "list") location.hash = "#/";
      return;
    }
    if (state.view !== "gallery") return;
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (e.key === "ArrowRight") { e.preventDefault(); userNav(state.gi + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); userNav(state.gi - 1); }
  });
}
