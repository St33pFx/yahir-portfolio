/* ═══════════════════════════════════════════
   WORK SHADER — animated grainy gradient
   Colors: #f0fde6 (light) + #0c0c0c (dark)
   Moving blurry blobs + film grain
   Pure WebGL, no libraries
   ═══════════════════════════════════════════ */

(function () {
  const canvas = document.getElementById('workShader');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', { alpha: false, premultipliedAlpha: false });
  if (!gl) return;

  // ── Shaders ──
  const vsSource = `
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
      vUv = aPosition * 0.5 + 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  const fsSource = `
    precision highp float;
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simplex 3D noise
    vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
    vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v){
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 1.0/7.0;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }

    // FBM with domain warping
    float fbm(vec3 p) {
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * snoise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv;
      float aspect = uResolution.x / uResolution.y;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

      float t = uTime * 0.08;

      // Domain warping — creates organic moving blobs
      vec3 q = vec3(p * 0.3, t);
      float w1 = fbm(q);
      float w2 = fbm(q + vec3(w1 * 0.6, 0.0, t * 0.2));
      float w3 = fbm(q + vec3(0.0, w2 * 0.4, t * 0.15));

      // Very low frequency = very blurry blobs
      float blob = fbm(vec3(p * 0.2 + w3 * 0.4, t * 0.1));

      // Site colors
      // Light: #f0fde6 = vec3(0.941, 0.992, 0.902)
      // Dark:  #0c0c0c = vec3(0.047, 0.047, 0.047)
      vec3 light = vec3(0.941, 0.992, 0.902);
      vec3 dark  = vec3(0.047, 0.047, 0.047);

      // Map: mostly light with subtle dark blobs
      // Push the blend heavily toward light (0.65 to 1.0 range)
      float mask = smoothstep(-0.6, 0.4, blob);
      mask = 0.65 + mask * 0.35;

      vec3 color = mix(dark, light, mask);

      // Film grain — high frequency noise
      float grain = fract(sin(dot(gl_FragCoord.xy + uTime * 37.0, vec2(12.9898, 78.233))) * 43758.5453);
      float grain2 = fract(sin(dot(gl_FragCoord.xy * 1.1 + uTime * 53.0, vec2(39.346, 11.135))) * 22578.5453);
      float combinedGrain = (grain + grain2) * 0.5;
      color += (combinedGrain - 0.5) * 0.08;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // ── Compile shaders ──
  function compile(type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  const vs = compile(gl.VERTEX_SHADER, vsSource);
  const fs = compile(gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.useProgram(program);

  // ── Fullscreen quad ──
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPosition');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // ── Uniforms ──
  const uTime = gl.getUniformLocation(program, 'uTime');
  const uRes  = gl.getUniformLocation(program, 'uResolution');

  // ── Resize to viewport ──
  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  // ── Animate ──
  const start = performance.now();
  function animate() {
    requestAnimationFrame(animate);
    gl.uniform1f(uTime, (performance.now() - start) * 0.001);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  animate();
})();
