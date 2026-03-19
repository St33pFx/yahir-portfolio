import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CONFIGS = {
  hero: {
    blobs: [
      { radius: 7, detail: 4, color: '#b3f381', opacity: 0.5, x: -10, y: 3, z: -4, rot: { x: 0.04, y: 0.06, z: 0.02 }, dSpeed: 0.3, dAmp: 0.2, fSpeed: 0.3, fAmp: 2 },
      { radius: 5, detail: 3, color: '#e36085', opacity: 0.45, x: 11, y: -2, z: -6, rot: { x: -0.05, y: 0.04, z: -0.03 }, dSpeed: 0.35, dAmp: 0.25, fSpeed: 0.4, fAmp: 1.5 },
      { radius: 9, detail: 4, color: '#b3f381', opacity: 0.35, x: 1, y: -6, z: -8, rot: { x: 0.03, y: -0.05, z: 0.04 }, dSpeed: 0.25, dAmp: 0.18, fSpeed: 0.25, fAmp: 2.5 },
      { radius: 4, detail: 3, color: '#e36085', opacity: 0.55, x: -13, y: -7, z: -3, rot: { x: -0.03, y: 0.07, z: -0.02 }, dSpeed: 0.4, dAmp: 0.28, fSpeed: 0.45, fAmp: 1.2 },
    ],
    camZ: 35,
    showDelay: 1100,
    triggerOnScroll: false,
  },
  work: {
    blobs: [
      { radius: 8, detail: 4, color: '#0c0c0c', opacity: 0.12, x: -9, y: 5, z: -5, rot: { x: 0.03, y: 0.05, z: 0.02 }, dSpeed: 0.25, dAmp: 0.2, fSpeed: 0.2, fAmp: 2.5 },
      { radius: 6, detail: 3, color: '#0c0c0c', opacity: 0.1, x: 10, y: -4, z: -7, rot: { x: -0.04, y: 0.03, z: -0.02 }, dSpeed: 0.3, dAmp: 0.22, fSpeed: 0.3, fAmp: 2 },
      { radius: 10, detail: 4, color: '#0c0c0c', opacity: 0.08, x: 0, y: -8, z: -10, rot: { x: 0.02, y: -0.04, z: 0.03 }, dSpeed: 0.2, dAmp: 0.15, fSpeed: 0.18, fAmp: 3 },
    ],
    camZ: 35,
    showDelay: 0,
    triggerOnScroll: true,
  },
};

function noise3D(x, y, z) {
  return Math.sin(x * 1.2 + y * 0.8) * 0.5
       + Math.sin(y * 1.5 + z * 1.1) * 0.3
       + Math.cos(z * 1.3 + x * 0.9) * 0.4
       + Math.sin(x * 0.5 + y * 0.7 + z * 0.6) * 0.3;
}

export default function BlobCanvas({ id, variant }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const config = CONFIGS[variant];
    if (!config) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
    camera.position.z = config.camZ;

    const blobs = config.blobs.map(cfg => {
      const geo = new THREE.IcosahedronGeometry(cfg.radius, cfg.detail);
      const edges = new THREE.EdgesGeometry(geo, 15);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(cfg.color),
        transparent: true,
        opacity: cfg.opacity,
      });
      const lines = new THREE.LineSegments(edges, mat);
      const srcPos = geo.attributes.position.array.slice();
      lines.position.set(cfg.x, cfg.y, cfg.z);
      scene.add(lines);
      return {
        lines, geo, srcPos, radius: cfg.radius,
        cx: cfg.x, cy: cfg.y,
        baseX: cfg.x, baseY: cfg.y,
        rot: cfg.rot,
        dSpeed: cfg.dSpeed, dAmp: cfg.dAmp,
        fSpeed: cfg.fSpeed, fAmp: cfg.fAmp,
      };
    });

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let scrollObs;
    let showTimer;

    if (config.triggerOnScroll) {
      const section = document.getElementById('work');
      if (section) {
        scrollObs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) canvas.classList.add('visible');
            else canvas.classList.remove('visible');
          });
        }, { threshold: 0.05 });
        scrollObs.observe(section);
      }
    } else if (config.showDelay > 0) {
      showTimer = setTimeout(() => canvas.classList.add('visible'), config.showDelay);
    }

    const timer = new THREE.Timer();
    let animId;

    function deform(blob, time) {
      const pos = blob.geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const ox = blob.srcPos[i * 3];
        const oy = blob.srcPos[i * 3 + 1];
        const oz = blob.srcPos[i * 3 + 2];
        const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const nx = ox / len, ny = oy / len, nz = oz / len;
        const n = noise3D(
          nx * 2 + time * blob.dSpeed,
          ny * 2 + time * blob.dSpeed * 0.7,
          nz * 2 + time * blob.dSpeed * 0.5
        );
        const d = 1 + n * blob.dAmp;
        pos.array[i * 3] = ox * d;
        pos.array[i * 3 + 1] = oy * d;
        pos.array[i * 3 + 2] = oz * d;
      }
      pos.needsUpdate = true;
      const newEdges = new THREE.EdgesGeometry(blob.geo, 15);
      blob.lines.geometry.dispose();
      blob.lines.geometry = newEdges;
    }

    function avoidCollisions(minDist) {
      for (let i = 0; i < blobs.length; i++) {
        for (let j = i + 1; j < blobs.length; j++) {
          const a = blobs[i], b = blobs[j];
          const dx = a.cx - b.cx, dy = a.cy - b.cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minD = (a.radius + b.radius) * minDist;
          if (dist < minD && dist > 0) {
            const push = (minD - dist) * 0.02;
            const nx = dx / dist, ny = dy / dist;
            a.cx += nx * push; a.cy += ny * push;
            b.cx -= nx * push; b.cy -= ny * push;
          }
        }
      }
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      timer.update();
      const dt = timer.getDelta();
      const t = timer.getElapsed();

      mouse.x += (mouse.tx - mouse.x) * 0.03;
      mouse.y += (mouse.ty - mouse.y) * 0.03;

      avoidCollisions(1.8);

      blobs.forEach(b => {
        b.lines.rotation.x += b.rot.x * dt;
        b.lines.rotation.y += b.rot.y * dt;
        b.lines.rotation.z += b.rot.z * dt;
        b.cx = b.baseX + Math.sin(t * b.fSpeed) * b.fAmp;
        b.cy = b.baseY + Math.cos(t * b.fSpeed * 0.7) * b.fAmp * 0.8;
        b.lines.position.x = b.cx + mouse.x * 0.8;
        b.lines.position.y = b.cy + mouse.y * 0.5;
        deform(b, t);
      });

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      if (scrollObs) scrollObs.disconnect();
      if (showTimer) clearTimeout(showTimer);
      blobs.forEach(b => {
        b.geo.dispose();
        b.lines.geometry.dispose();
        b.lines.material.dispose();
      });
      renderer.dispose();
    };
  }, [variant]);

  const classExtra = variant === 'hero' ? 'blob-canvas--hero' : 'blob-canvas--work';

  return <canvas ref={canvasRef} className={`blob-canvas ${classExtra}`} id={id} />;
}
