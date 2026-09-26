/* ==========================================================================
   Atmosphere — capa atmosférica en canvas 2D, sin dependencias.
   Cada "mood" combina 1–2 motivos derivados de las notas del perfume
   (ver data/notes.json) y una paleta. Los cambios de mood se funden.
   ========================================================================== */

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[(Math.random() * arr.length) | 0];

/* ---------- sprites cacheados (glows suaves) ---------- */
const spriteCache = new Map();
function sprite(color, size = 64) {
  const key = color + size;
  if (spriteCache.has(key)) return spriteCache.get(key);
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, color);
  grd.addColorStop(0.35, hexA(color, 0.55));
  grd.addColorStop(1, hexA(color, 0));
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  spriteCache.set(key, c);
  return c;
}
function hexA(hex, a) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((x) => x + x).join("") : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
let grainPattern = null;
function grain(ctx) {
  if (grainPattern) return grainPattern;
  const c = document.createElement("canvas");
  c.width = c.height = 140;
  const g = c.getContext("2d");
  for (let i = 0; i < 900; i++) {
    g.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,.5)" : "rgba(0,0,0,.5)";
    g.fillRect(Math.random() * 140, Math.random() * 140, 1, 1);
  }
  grainPattern = ctx.createPattern(c, "repeat");
  return grainPattern;
}

/* ---------- motivos ---------- */
/* Cada motivo: budget (fracción del presupuesto), spawn(), update() -> vivo, draw(). */
const MOTIFS = {
  /* Frutas: gotas jugosas que caen despacio */
  drops: {
    budget: 0.38,
    spawn(s, W, H, pre) {
      const r = rand(3, 8) * s.scale;
      return { x: rand(0, W), y: pre ? rand(-20, H) : -20, r, vy: rand(16, 36) * s.tempo, amp: rand(6, 18), ph: rand(0, TAU), c: pick(s.palette) };
    },
    update(p, dt, W, H, t) { p.y += p.vy * dt; p.x += Math.sin(t * 1.1 + p.ph) * p.amp * dt; return p.y < H + 30; },
    draw(g, p, a) {
      g.globalAlpha = a * 0.35; const sp = sprite(p.c); g.drawImage(sp, p.x - p.r * 3, p.y - p.r * 3, p.r * 6, p.r * 6);
      g.globalAlpha = a * 0.85; g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, p.r, 0, TAU); g.fill();
      g.globalAlpha = a * 0.55; g.fillStyle = "#fff"; g.beginPath(); g.arc(p.x - p.r * 0.35, p.y - p.r * 0.35, p.r * 0.28, 0, TAU); g.fill();
    },
  },

  /* Cítricos: salpicaduras que estallan cerca del frasco y chispas de luz */
  splash: {
    budget: 0.9,
    tick(s, dt, W, H) {
      s.timer = (s.timer ?? rand(0.2, 1)) - dt * s.tempo;
      if (s.timer <= 0 && s.items.length < s.max) {
        s.timer = rand(1.3, 2.4);
        const cx = s.focus.x * W + rand(-W * 0.22, W * 0.22), cy = s.focus.y * H + rand(-H * 0.18, H * 0.12);
        const n = (rand(12, 20) * Math.min(1, s.max / 30)) | 0;
        for (let i = 0; i < n; i++) {
          const ang = rand(-Math.PI, 0) + rand(-0.3, 0.3), v = rand(60, 190) * s.scale;
          s.items.push({ k: 0, x: cx, y: cy, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, r: rand(1.4, 3.8) * s.scale, life: 0, max: rand(1, 1.7), c: pick(s.palette) });
        }
      }
      if (Math.random() < dt * 3 * s.tempo) s.items.push({ k: 1, x: rand(0, W), y: rand(0, H), life: 0, max: rand(0.6, 1.3), r: rand(2, 5) * s.scale, c: pick(s.palette) });
    },
    update(p, dt) {
      p.life += dt;
      if (p.k === 0) { p.vy += 170 * dt; p.x += p.vx * dt; p.y += p.vy * dt; }
      return p.life < p.max;
    },
    draw(g, p, a) {
      const f = 1 - p.life / p.max;
      if (p.k === 0) {
        g.globalAlpha = a * f * 0.9; g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, p.r, 0, TAU); g.fill();
      } else {
        const tw = Math.sin((p.life / p.max) * Math.PI);
        g.globalAlpha = a * tw * 0.8; g.strokeStyle = p.c; g.lineWidth = 1;
        g.beginPath(); g.moveTo(p.x - p.r, p.y); g.lineTo(p.x + p.r, p.y); g.moveTo(p.x, p.y - p.r); g.lineTo(p.x, p.y + p.r); g.stroke();
      }
    },
  },

  /* Dulces: hilos viscosos (caramelo, miel, vainilla) que bajan y sueltan una gota */
  drip: {
    budget: 0.06,
    spawn(s, W, H, pre) {
      const w = rand(6, 13) * s.scale;
      return { x: rand(W * 0.04, W * 0.96), w, len: pre ? rand(0, H * 0.3) : 0, max: rand(H * 0.08, H * 0.32), sp: rand(7, 18) * s.tempo, c: pick(s.palette), drop: null, fade: 1, done: false };
    },
    update(p, dt, W, H) {
      if (!p.done) {
        p.len += p.sp * dt * (1 - (p.len / p.max) * 0.7);
        if (p.len >= p.max * 0.97) { p.done = true; p.drop = { y: p.len + p.w, vy: 10 }; }
      } else {
        p.fade -= dt * 0.25;
        if (p.drop) { p.drop.vy += 90 * dt; p.drop.y += p.drop.vy * dt; if (p.drop.y > H + 20) p.drop = null; }
      }
      return p.fade > 0;
    },
    draw(g, p, a) {
      const grd = g.createLinearGradient(p.x - p.w, 0, p.x + p.w, 0);
      grd.addColorStop(0, hexA(p.c, 0.55)); grd.addColorStop(0.45, p.c); grd.addColorStop(0.6, hexA("#ffffff", 0.7)); grd.addColorStop(1, hexA(p.c, 0.55));
      g.globalAlpha = a * p.fade * 0.85; g.fillStyle = grd;
      g.beginPath();
      g.moveTo(p.x - p.w / 2, -4); g.lineTo(p.x - p.w / 2, p.len);
      g.arc(p.x, p.len, p.w * 0.75, Math.PI, 0, true);
      g.lineTo(p.x + p.w / 2, -4); g.closePath(); g.fill();
      if (p.drop) { g.fillStyle = p.c; g.beginPath(); g.ellipse(p.x, p.drop.y, p.w * 0.6, p.w * 0.8, 0, 0, TAU); g.fill(); }
    },
  },

  /* Florales: pétalos a la deriva, con giro orgánico */
  petals: {
    budget: 0.32,
    spawn(s, W, H, pre) {
      const rx = rand(5, 11) * s.scale;
      return { x: rand(-W * 0.1, W), y: pre ? rand(0, H) : -20, rx, ry: rx * rand(0.45, 0.6), rot: rand(0, TAU), vr: rand(-0.8, 0.8), vx: rand(6, 20) * s.tempo, vy: rand(12, 26) * s.tempo, amp: rand(10, 26), ph: rand(0, TAU), c: pick(s.palette) };
    },
    update(p, dt, W, H, t) { p.x += (p.vx + Math.sin(t * 0.8 + p.ph) * p.amp) * dt; p.y += p.vy * dt; p.rot += p.vr * dt; return p.y < H + 30 && p.x < W + 40; },
    draw(g, p, a, t) {
      g.save(); g.translate(p.x, p.y); g.rotate(p.rot);
      g.scale(1, 0.55 + 0.45 * Math.abs(Math.cos(t * 0.9 + p.ph)));
      g.globalAlpha = a * 0.8; g.fillStyle = p.c;
      g.beginPath(); g.ellipse(0, 0, p.rx, p.ry, 0, 0, TAU); g.fill();
      g.globalAlpha = a * 0.35; g.fillStyle = "#fff"; g.beginPath(); g.ellipse(-p.rx * 0.2, -p.ry * 0.15, p.rx * 0.5, p.ry * 0.3, 0, 0, TAU); g.fill();
      g.restore();
    },
  },

  /* Especias: chispas que suben en espiral y titilan */
  embers: {
    budget: 0.7,
    spawn(s, W, H, pre) {
      return { x0: rand(0, W), y: pre ? rand(0, H) : H + 10, vy: -rand(18, 46) * s.tempo, ang: rand(0, TAU), w: rand(0.6, 2.2) * (Math.random() < 0.5 ? -1 : 1), rad: rand(6, 26), r: rand(0.9, 2.4) * s.scale, ph: rand(0, TAU), c: pick(s.palette) };
    },
    update(p, dt) { p.y += p.vy * dt; p.ang += p.w * dt; p.x = p.x0 + Math.cos(p.ang) * p.rad; return p.y > -20; },
    draw(g, p, a, t) {
      const fl = 0.55 + 0.45 * Math.sin(t * 7 + p.ph);
      g.globalAlpha = a * fl * 0.6; g.drawImage(sprite(p.c), p.x - p.r * 5, p.y - p.r * 5, p.r * 10, p.r * 10);
      g.globalAlpha = a * fl; g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, p.r * 0.7, 0, TAU); g.fill();
    },
  },

  /* Resinas, oud, incienso: humo lento que asciende y se abre */
  smoke: {
    budget: 0.3,
    spawn(s, W, H, pre) {
      const max = rand(8, 14);
      return { x: rand(W * 0.15, W * 0.85), y: pre ? rand(H * 0.2, H) : H + 40, r: rand(30, 70) * s.scale, vy: -rand(9, 20) * s.tempo, vx: rand(-6, 6), gr: rand(5, 12), life: pre ? rand(0, max) : 0, max, ph: rand(0, TAU), c: pick(s.palette) };
    },
    update(p, dt, W, H, t) { p.life += dt; p.y += p.vy * dt; p.x += (p.vx + Math.sin(t * 0.4 + p.ph) * 8) * dt; p.r += p.gr * dt; return p.life < p.max; },
    draw(g, p, a) { g.globalAlpha = a * 0.13 * Math.sin((p.life / p.max) * Math.PI); g.drawImage(sprite(p.c, 96), p.x - p.r, p.y - p.r, p.r * 2, p.r * 2); },
  },

  /* Maderas: motas de polvo en un haz de luz lateral */
  motes: {
    budget: 0.8,
    frame(g, s, W, H, a) {
      g.save(); g.globalAlpha = a * 0.09;
      const grd = g.createLinearGradient(0, 0, W, H);
      grd.addColorStop(0, hexA(s.palette[2] || "#ffffff", 0)); grd.addColorStop(0.45, hexA(s.palette[2] || "#ffffff", 1)); grd.addColorStop(0.62, hexA(s.palette[2] || "#ffffff", 0));
      g.fillStyle = grd; g.beginPath(); g.moveTo(W * 0.1, 0); g.lineTo(W * 0.42, 0); g.lineTo(W * 0.95, H); g.lineTo(W * 0.5, H); g.closePath(); g.fill(); g.restore();
    },
    spawn(s, W, H) { return { x: rand(0, W), y: rand(0, H), r: rand(0.6, 1.9) * s.scale, vx: rand(-4, 4) * s.tempo, vy: rand(-3, 5) * s.tempo, ph: rand(0, TAU), life: 0, max: rand(6, 14), c: pick(s.palette) }; },
    update(p, dt, W, H, t) { p.life += dt; p.x += (p.vx + Math.sin(t * 0.3 + p.ph) * 3) * dt; p.y += p.vy * dt; return p.life < p.max && p.y < H + 5 && p.y > -5; },
    draw(g, p, a, t, W, H) {
      // más brillantes dentro del haz diagonal
      const u = (p.x / W) - (p.y / H) * 0.52 - 0.27;
      const inBeam = Math.max(0, 1 - Math.abs(u) * 5);
      g.globalAlpha = a * Math.sin((p.life / p.max) * Math.PI) * (0.25 + inBeam * 0.75);
      g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, p.r, 0, TAU); g.fill();
    },
  },

  /* Ámbar: resplandores grandes que respiran */
  glow: {
    budget: 0.07,
    spawn(s, W, H) { const m = Math.min(W, H); return { x: rand(0, W), y: rand(0, H), r: rand(m * 0.25, m * 0.55), vx: rand(-7, 7) * s.tempo, vy: rand(-5, 5) * s.tempo, ph: rand(0, TAU), c: pick(s.palette), life: 0, max: rand(14, 24) }; },
    update(p, dt, W, H) { p.life += dt; p.x += p.vx * dt; p.y += p.vy * dt; return p.life < p.max; },
    draw(g, p, a, t) {
      const env = Math.sin((p.life / p.max) * Math.PI);
      g.globalAlpha = a * env * (0.28 + 0.14 * Math.sin(t * 0.7 + p.ph));
      g.drawImage(sprite(p.c, 128), p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    },
  },

  /* Almizcle / polvo: bruma casi inmóvil y motas de talco */
  haze: {
    budget: 0.35,
    spawn(s, W, H) {
      const m = Math.min(W, H), big = Math.random() < 0.3;
      return big
        ? { k: 0, x: rand(0, W), y: rand(0, H), r: rand(m * 0.18, m * 0.4), vx: rand(-4, 4), vy: rand(-3, 3), life: 0, max: rand(12, 20), c: pick(s.palette) }
        : { k: 1, x: rand(0, W), y: rand(0, H), r: rand(0.7, 1.6) * s.scale, vx: rand(-3, 3), vy: rand(-5, -1), life: 0, max: rand(6, 12), c: pick(s.palette) };
    },
    update(p, dt) { p.life += dt; p.x += p.vx * dt; p.y += p.vy * dt; return p.life < p.max; },
    draw(g, p, a) {
      const env = Math.sin((p.life / p.max) * Math.PI);
      if (p.k === 0) { g.globalAlpha = a * env * 0.32; g.drawImage(sprite(p.c, 128), p.x - p.r, p.y - p.r, p.r * 2, p.r * 2); }
      else { g.globalAlpha = a * env * 0.55; g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, p.r, 0, TAU); g.fill(); }
    },
  },

  /* Aromático, verde, acuático: hilos de aire que cruzan */
  breeze: {
    budget: 0.14,
    spawn(s, W, H, pre) {
      const len = rand(W * 0.2, W * 0.5);
      return { x: pre ? rand(-len, W) : -len, y0: rand(H * 0.08, H * 0.92), amp: rand(8, 28), fq: rand(0.004, 0.012), sp: rand(40, 90) * s.tempo, ph: rand(0, TAU), len, lw: rand(0.7, 1.6), c: pick(s.palette) };
    },
    update(p, dt, W) { p.x += p.sp * dt; return p.x < W + 10; },
    draw(g, p, a, t) {
      g.lineWidth = p.lw; g.strokeStyle = p.c;
      const steps = 16;
      for (let i = 0; i < steps; i++) {
        const x1 = p.x + (p.len * i) / steps, x2 = p.x + (p.len * (i + 1)) / steps;
        const y1 = p.y0 + Math.sin(x1 * p.fq + p.ph + t * 0.6) * p.amp, y2 = p.y0 + Math.sin(x2 * p.fq + p.ph + t * 0.6) * p.amp;
        g.globalAlpha = a * 0.55 * Math.sin(((i + 0.5) / steps) * Math.PI);
        g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
      }
    },
  },

  /* Cuero: luz rasante que barre una superficie con grano */
  sheen: {
    budget: 0.25,
    frame(g, s, W, H, a, t) {
      g.save();
      g.globalAlpha = a * 0.07; g.fillStyle = grain(g); g.fillRect(0, 0, W, H);
      const cyc = ((t * s.tempo) / 7) % 1, x = -W * 0.6 + cyc * W * 2.2;
      const grd = g.createLinearGradient(x, 0, x + W * 0.5, H * 0.35);
      const col = s.palette[2] || "#ffffff";
      grd.addColorStop(0, hexA(col, 0)); grd.addColorStop(0.5, hexA(col, 1)); grd.addColorStop(1, hexA(col, 0));
      g.globalAlpha = a * 0.16; g.fillStyle = grd; g.fillRect(0, 0, W, H);
      g.restore();
    },
    spawn(s, W, H) { return MOTIFS.motes.spawn(s, W, H); },
    update(p, dt, W, H, t) { return MOTIFS.motes.update(p, dt, W, H, t); },
    draw(g, p, a) { g.globalAlpha = a * 0.4 * Math.sin((p.life / p.max) * Math.PI); g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, p.r, 0, TAU); g.fill(); },
  },
};

export const MOTIF_NAMES = Object.keys(MOTIFS);

/* ---------- motor ---------- */
export class Atmosphere {
  constructor(canvas, { density = 1, dprCap = 1.5 } = {}) {
    this.c = canvas;
    this.g = canvas.getContext("2d");
    this.density = density;
    this.dprCap = dprCap;
    this.systems = [];
    this.t = 0;
    this.focus = { x: 0.62, y: 0.55 };
    this.mode = "light";
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.onScreen = true;
    this._loop = this._loop.bind(this);
    this._resize();
    new ResizeObserver(() => this._resize()).observe(canvas);
    document.addEventListener("visibilitychange", () => (document.hidden ? this._stop() : this._start()));
    new IntersectionObserver(([e]) => { this.onScreen = e.isIntersecting; this.onScreen ? this._start() : this._stop(); }).observe(canvas);
  }

  _resize() {
    const r = this.c.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, r.width < 700 ? 1.25 : this.dprCap);
    this.W = Math.max(1, r.width); this.H = Math.max(1, r.height);
    this.c.width = Math.round(this.W * dpr); this.c.height = Math.round(this.H * dpr);
    this.g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const base = Math.min(110, Math.max(22, (this.W * this.H) / 14000)) * this.density * (this.W < 700 ? 0.6 : 1);
    this.base = base;
    this.scale = this.W < 700 ? 0.8 : 1;
    this.systems.forEach((s) => { s.max = Math.max(3, Math.round(base * MOTIFS[s.type].budget * s.weight * 1.8)); s.scale = this.scale; });
    if (this.reduced) this._static();
  }

  /** mood: { motifs: [a, b], palette: [...], tempo, mode: 'light'|'dark' } */
  setMood(mood) {
    if (!mood) return;
    this.mode = mood.mode || this.mode;
    const key = JSON.stringify([mood.motifs, mood.palette]);
    if (key === this._key) return;
    this._key = key;
    this.systems.forEach((s) => (s.target = 0));
    (mood.motifs || []).slice(0, 2).forEach((type, i) => {
      if (!MOTIFS[type]) return;
      const weight = i === 0 ? 1 : 0.45;
      const s = { type, weight, palette: mood.palette || ["#ffffff"], tempo: mood.tempo ?? 0.6, items: [], fade: 0, target: 1, focus: this.focus, scale: this.scale };
      s.max = Math.max(3, Math.round(this.base * MOTIFS[type].budget * weight * 1.8));
      // precalentar para que no aparezca vacío
      const M = MOTIFS[type];
      if (M.spawn) for (let k = 0; k < s.max * 0.8; k++) s.items.push(M.spawn(s, this.W, this.H, true));
      this.systems.push(s);
    });
    if (this.reduced) { this.systems = this.systems.filter((s) => s.target === 1); this.systems.forEach((s) => (s.fade = 1)); this._static(); }
    else this._start();
  }

  setFocus(x, y) { this.focus.x = x; this.focus.y = y; }

  _start() { if (this.reduced || this.running || document.hidden || !this.onScreen) return; this.running = true; this.last = performance.now(); requestAnimationFrame(this._loop); }
  _stop() { this.running = false; }

  _loop(now) {
    if (!this.running) return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now; this.t += dt;
    this._step(dt); this._draw();
    requestAnimationFrame(this._loop);
  }

  _step(dt) {
    const { W, H, t } = this;
    for (const s of this.systems) {
      s.fade += (s.target - s.fade) * Math.min(1, dt * 1.4);
      const M = MOTIFS[s.type];
      if (M.tick && s.target) M.tick(s, dt, W, H);
      else if (M.spawn && s.target && s.items.length < s.max && Math.random() < dt * (s.max / 4)) s.items.push(M.spawn(s, W, H, false));
      s.items = s.items.filter((p) => M.update(p, dt, W, H, t));
    }
    this.systems = this.systems.filter((s) => s.target === 1 || s.fade > 0.02);
  }

  _draw() {
    const { g, W, H, t } = this;
    g.globalCompositeOperation = "source-over";
    g.globalAlpha = 1;
    g.clearRect(0, 0, W, H);
    for (const s of this.systems) {
      const M = MOTIFS[s.type];
      g.globalCompositeOperation = this.mode === "dark" && ["embers", "glow", "motes", "sheen", "splash", "smoke"].includes(s.type) ? "lighter" : "source-over";
      if (M.frame) M.frame(g, s, W, H, s.fade, t);
      for (const p of s.items) M.draw(g, p, s.fade, t, W, H);
    }
    g.globalAlpha = 1; g.globalCompositeOperation = "source-over";
  }

  _static() {
    // Movimiento reducido: una sola imagen fija, sin animación
    this.systems.forEach((s) => (s.fade = s.target));
    this._draw();
  }
}
