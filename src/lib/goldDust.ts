/**
 * Poussière d'or : particules discrètes qui montent lentement en fond de page,
 * une petite traînée derrière le curseur, et un éclat au moment d'invoquer une muse.
 * Un seul canvas fixé sur la fenêtre, piloté par ce module.
 */

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Mote = { x: number; y: number; r: number; vy: number; vx: number; t: number; s: HTMLCanvasElement };
type Spark = { x: number; y: number; vx: number; vy: number; r: number; life: number; decay: number; s: HTMLCanvasElement };

function sprite(r: number, g: number, b: number) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const x = c.getContext("2d")!;
  const grd = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, `rgba(${r},${g},${b},1)`);
  grd.addColorStop(0.25, `rgba(${r},${g},${b},.55)`);
  grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
  x.fillStyle = grd;
  x.fillRect(0, 0, 64, 64);
  return c;
}

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let sprites: HTMLCanvasElement[] = [];
let motes: Mote[] = [];
let sparks: Spark[] = [];
let W = 0;
let H = 0;
let raf = 0;
let running = false;
const mouse = { x: -999, y: -999 };

function resize() {
  if (!canvas || !ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const n = Math.round((W * H) / 30000);
  motes = Array.from({ length: n }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: 0.6 + Math.random() * 1.8,
    vy: -(0.03 + Math.random() * 0.1),
    vx: (Math.random() - 0.5) * 0.05,
    t: Math.random() * 6.28,
    s: sprites[(Math.random() * sprites.length) | 0],
  }));
}

function draw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  for (const m of motes) {
    if (running) {
      m.t += 0.008;
      m.x += m.vx + Math.sin(m.t) * 0.04;
      m.y += m.vy;
      const dx = m.x - mouse.x;
      const dy = m.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 9000) {
        const f = (9000 - d2) / 9000;
        m.x += dx * 0.006 * f;
        m.y += dy * 0.006 * f;
      }
      if (m.y < -10) {
        m.y = H + 10;
        m.x = Math.random() * W;
      }
    }
    ctx.globalAlpha = 0.25 + 0.4 * (0.5 + 0.5 * Math.sin(m.t * 1.7));
    const s = m.r * 6;
    ctx.drawImage(m.s, m.x - s / 2, m.y - s / 2, s, s);
  }
  for (let i = sparks.length - 1; i >= 0; i--) {
    const p = sparks[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.965;
    p.vy = p.vy * 0.965 - 0.015;
    p.life -= p.decay;
    if (p.life <= 0) {
      sparks.splice(i, 1);
      continue;
    }
    ctx.globalAlpha = p.life;
    const s = p.r * 7 * (0.6 + p.life * 0.4);
    ctx.drawImage(p.s, p.x - s / 2, p.y - s / 2, s, s);
  }
  ctx.globalAlpha = 1;
  if (running) raf = requestAnimationFrame(draw);
}

function onMove(e: PointerEvent) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  if (running && Math.random() < 0.12) emitGoldDust(e.clientX, e.clientY, 1, 0.35);
}
function onLeave() {
  mouse.x = mouse.y = -999;
}

export function startGoldDust(el: HTMLCanvasElement) {
  canvas = el;
  ctx = el.getContext("2d");
  if (!ctx) return;
  if (!sprites.length) sprites = [sprite(214, 184, 120), sprite(232, 206, 150), sprite(196, 164, 104)];
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onMove);
  document.addEventListener("pointerleave", onLeave);
  if (reduceMotion()) {
    running = false;
    draw();
  } else {
    running = true;
    draw();
  }
}

export function stopGoldDust() {
  running = false;
  cancelAnimationFrame(raf);
  window.removeEventListener("resize", resize);
  window.removeEventListener("pointermove", onMove);
  document.removeEventListener("pointerleave", onLeave);
  canvas = null;
  ctx = null;
}

/** Éclat de particules à un point de l'écran (coordonnées de la fenêtre). */
export function emitGoldDust(x: number, y: number, n: number, speed: number) {
  if (!running || reduceMotion()) return;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = speed * (0.3 + Math.random());
    sparks.push({
      x,
      y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
      r: 0.8 + Math.random() * 2.2,
      life: 1,
      decay: 0.006 + Math.random() * 0.012,
      s: sprites[(Math.random() * sprites.length) | 0],
    });
  }
}

/** Fait passer la poussière au-dessus de l'écran d'invocation (ou la remet en fond). */
export function setGoldDustOver(over: boolean) {
  canvas?.classList.toggle("over", over);
}
