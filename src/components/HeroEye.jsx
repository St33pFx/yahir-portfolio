import { useEffect, useRef } from 'react';

// ── Constants ──
const D = 480;          // internal draw resolution (pixels)
const CX = D / 2;
const CY = D / 2;
const R  = D * 0.43;    // outer eye radius
const IR = R * 0.52;    // iris radius
const PR = IR * 0.44;   // pupil radius
const MAX_OFFSET = R * 0.17; // max pupil travel

// 8×8 Bayer ordered-dither matrix (values 0-63)
const B8 = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
];

// Deterministic PRNG (mulberry32) — keeps veins consistent every frame
function mulberry(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Pre-generate vein paths once (sclera veins don't move with the iris)
function buildVeins() {
  const veins = [];
  for (let i = 0; i < 18; i++) {
    const rng = mulberry(i * 1337 + 7);
    const angle = rng() * Math.PI * 2;
    const startR = IR * 1.07;
    let vx = CX + Math.cos(angle) * startR;
    let vy = CY + Math.sin(angle) * startR;
    const pts = [{ x: vx, y: vy }];
    for (let j = 0; j < 14; j++) {
      const a = angle + (rng() - 0.5) * 0.55;
      vx += Math.cos(a) * R * 0.033;
      vy += Math.sin(a) * R * 0.033;
      pts.push({ x: vx, y: vy });
    }
    veins.push({ pts, w: 0.5 + rng() * 0.7 });
  }
  return veins;
}
const VEINS = buildVeins();

// ── Eye drawing — bright/white palette for dark hero background ──
function drawEye(ec, px, py) {
  ec.clearRect(0, 0, D, D);

  ec.save();
  ec.beginPath();
  ec.arc(CX, CY, R, 0, Math.PI * 2);
  ec.clip();

  // Sclera — bright white with slight warm falloff toward edges
  const sg = ec.createRadialGradient(CX - R * 0.22, CY - R * 0.18, 0, CX, CY, R);
  sg.addColorStop(0,    '#ffffff');
  sg.addColorStop(0.45, '#f0f0f0');
  sg.addColorStop(0.78, '#c8c8c8');
  sg.addColorStop(1,    '#707070');
  ec.fillStyle = sg;
  ec.fillRect(0, 0, D, D);

  // Veins — subtle reddish on white sclera
  VEINS.forEach(v => {
    ec.beginPath();
    ec.moveTo(v.pts[0].x, v.pts[0].y);
    for (let i = 1; i < v.pts.length; i++) ec.lineTo(v.pts[i].x, v.pts[i].y);
    ec.strokeStyle = 'rgba(180, 60, 60, 0.32)';
    ec.lineWidth = v.w;
    ec.stroke();
  });

  // Iris — mid-grey so dither creates visible texture on dark bg via screen blend
  const ix = CX + px * 0.55;
  const iy = CY + py * 0.55;

  const ig = ec.createRadialGradient(ix, iy, 0, ix, iy, IR);
  ig.addColorStop(0,    '#555555');
  ig.addColorStop(0.30, '#404040');
  ig.addColorStop(0.60, '#333333');
  ig.addColorStop(0.85, '#252525');
  ig.addColorStop(1,    '#181818');
  ec.beginPath();
  ec.arc(ix, iy, IR, 0, Math.PI * 2);
  ec.fillStyle = ig;
  ec.fill();

  // Iris fiber texture (lighter lines visible through grey iris)
  for (let i = 0; i < 110; i++) {
    const a  = (i / 110) * Math.PI * 2;
    const r1 = IR * 0.22;
    const r2 = IR * (0.46 + (i % 5) * 0.1);
    ec.beginPath();
    ec.moveTo(ix + Math.cos(a) * r1, iy + Math.sin(a) * r1);
    ec.lineTo(ix + Math.cos(a) * r2, iy + Math.sin(a) * r2);
    ec.strokeStyle = 'rgba(120,120,120,0.14)';
    ec.lineWidth = 0.8;
    ec.stroke();
  }

  // Limbal ring
  const lr = ec.createRadialGradient(ix, iy, IR * 0.76, ix, iy, IR);
  lr.addColorStop(0, 'rgba(0,0,0,0)');
  lr.addColorStop(1, 'rgba(0,0,0,0.85)');
  ec.beginPath();
  ec.arc(ix, iy, IR, 0, Math.PI * 2);
  ec.fillStyle = lr;
  ec.fill();

  // Pupil — fully black (invisible on dark bg via screen = transparent void)
  const pupX = CX + px;
  const pupY = CY + py;
  ec.beginPath();
  ec.arc(pupX, pupY, PR, 0, Math.PI * 2);
  ec.fillStyle = '#000';
  ec.fill();

  // Pupil highlight (white dot — will show bright via screen blend)
  ec.beginPath();
  ec.arc(pupX - PR * 0.28, pupY - PR * 0.30, PR * 0.22, 0, Math.PI * 2);
  ec.fillStyle = 'rgba(255,255,255,0.95)';
  ec.fill();

  // Secondary highlight
  ec.beginPath();
  ec.arc(pupX + PR * 0.19, pupY - PR * 0.08, PR * 0.09, 0, Math.PI * 2);
  ec.fillStyle = 'rgba(255,255,255,0.5)';
  ec.fill();

  // Edge vignette
  const sv = ec.createRadialGradient(CX, CY, R * 0.64, CX, CY, R);
  sv.addColorStop(0, 'rgba(0,0,0,0)');
  sv.addColorStop(1, 'rgba(0,0,0,0.78)');
  ec.beginPath();
  ec.arc(CX, CY, R, 0, Math.PI * 2);
  ec.fillStyle = sv;
  ec.fill();

  ec.restore();

  // Outer ring
  ec.beginPath();
  ec.arc(CX, CY, R, 0, Math.PI * 2);
  ec.strokeStyle = '#ffffff';
  ec.lineWidth = R * 0.018;
  ec.stroke();
}

// ── Bayer ordered dithering (in-place, reads from ec, writes to dc) ──
function applyDither(ec, dc, outData) {
  const src = ec.getImageData(0, 0, D, D).data;
  const od  = outData.data;

  for (let y = 0; y < D; y++) {
    for (let x = 0; x < D; x++) {
      const i = (y * D + x) * 4;
      const a = src[i + 3];
      if (a < 5) { od[i] = od[i+1] = od[i+2] = 0; od[i+3] = 0; continue; }

      const gray      = src[i] * 0.299 + src[i+1] * 0.587 + src[i+2] * 0.114;
      const threshold = (B8[(y % 8) * 8 + (x % 8)] / 64) * 255;
      const v         = gray > threshold ? 255 : 0;

      od[i] = od[i+1] = od[i+2] = v;
      od[i+3] = a;
    }
  }
  dc.putImageData(outData, 0, 0);
}

// ── React component ──
export default function HeroEye() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Offscreen canvas for drawing the eye (pre-dither)
    const eyeCanvas = document.createElement('canvas');
    eyeCanvas.width  = D;
    eyeCanvas.height = D;
    const ec = eyeCanvas.getContext('2d', { willReadFrequently: true });

    // Offscreen canvas that receives the dithered output
    const ditherCanvas = document.createElement('canvas');
    ditherCanvas.width  = D;
    ditherCanvas.height = D;
    const dc = ditherCanvas.getContext('2d');

    // Pre-allocated output ImageData (reused every frame)
    const outData = dc.createImageData(D, D);

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false; // crisp upscaled pixels

    const state = { mx: 0, my: 0, sx: 0, sy: 0 };
    let rafId;

    const onMouseMove = (e) => { state.mx = e.clientX; state.my = e.clientY; };
    window.addEventListener('mousemove', onMouseMove);

    const resize = () => {
      const hero = canvas.parentElement;
      if (!hero) return;
      canvas.width  = hero.clientWidth;
      canvas.height = hero.clientHeight;
      ctx.imageSmoothingEnabled = false;
    };
    resize();
    window.addEventListener('resize', resize);

    // Pause rendering when tab is not visible — saves CPU/GPU
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    function tick() {
      rafId = requestAnimationFrame(tick);

      // Smoothly interpolate pupil toward cursor
      const rect = canvas.getBoundingClientRect();
      const relX  = state.mx - (rect.left + rect.width  * 0.5);
      const relY  = state.my - (rect.top  + rect.height * 0.5);
      const dist  = Math.sqrt(relX * relX + relY * relY);
      const maxD  = Math.max(rect.width, rect.height) * 0.55;
      const angle = Math.atan2(relY, relX);
      const f     = Math.min(dist / maxD, 1);

      state.sx += (Math.cos(angle) * f * MAX_OFFSET - state.sx) * 0.06;
      state.sy += (Math.sin(angle) * f * MAX_OFFSET - state.sy) * 0.06;

      // Draw, dither, blit
      drawEye(ec, state.sx, state.sy);
      applyDither(ec, dc, outData);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Centre the eye, scale it to ~82% of the shorter viewport axis
      const size = Math.min(canvas.width, canvas.height) * 0.82;
      const dx   = (canvas.width  - size) * 0.5;
      const dy   = (canvas.height - size) * 0.5;
      ctx.drawImage(ditherCanvas, dx, dy, size, size);
    }
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      id="heroEye"
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0,           // starts hidden — GSAP animates it in
        mixBlendMode: 'screen',
      }}
    />
  );
}
