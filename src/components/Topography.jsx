import { Mesh, Program, Renderer, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

// Animated contour-line background, ported from the Startup Bihar hackathon
// "Now it's your turn" section and recoloured to the site's blues.

const hexToRgb = (hex) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match
    ? [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255]
    : [1, 1, 1];
};

const vertex = /* glsl */ `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = /* glsl */ `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uBands;
uniform float uThickness;
uniform float uScale;
uniform float uGlow;
uniform float uOpacity;
uniform float uMorph;
uniform vec3 uLow;
uniform vec3 uMid;
uniform vec3 uHigh;
uniform vec2 uMouse;
uniform float uMouseActive;
out vec4 fragColor;

float bez(float t, vec4 controls) {
  float wave = 6.2831853 * t;
  return 0.5 * (controls.x * sin(wave) + controls.y * cos(wave) + controls.z * sin(2.0 * wave) + controls.w * cos(2.0 * wave));
}

void main() {
  vec2 resolution = iResolution.xy;
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 sampleUv = (uv - 0.5) / max(uScale, 0.001) + 0.5;
  float t = iTime * 0.08;
  vec4 a = uMorph * vec4(sin(t + 1.0), sin(t * 0.8 - 2.0), sin(t * 1.2 + 3.0), sin(t - 4.0));
  vec4 b = uMorph * vec4(sin(t + 9.0), sin(t * 1.1 - 8.0), sin(t * 0.7 + 7.0), sin(t - 6.0));
  vec4 c = uMorph * vec4(sin(t + 5.0), sin(t * 0.9 + 2.0), sin(t + 5.0), sin(t - 5.0));
  vec4 d = uMorph * vec4(sin(t - 1.0), sin(t - 3.0), sin(t + 8.0), sin(t + 9.0));
  vec2 p1 = vec2(bez(sampleUv.x, a), bez(sampleUv.x, b));
  vec2 p2 = vec2(bez(sampleUv.y, c), bez(sampleUv.y, d));
  float field = distance(p1, p2);
  vec2 mouseDistance = uv - uMouse;
  mouseDistance.x *= resolution.x / max(resolution.y, 1.0);
  field += exp(-dot(mouseDistance, mouseDistance) / 0.055) * 0.22 * uMouseActive;

  float bands = field * uBands;
  float lineDistance = min(fract(bands), 1.0 - fract(bands));
  float aa = fwidth(bands) + 0.0001;
  float line = 1.0 - smoothstep(uThickness - aa, uThickness + aa, lineDistance);
  float halo = (1.0 - smoothstep(uThickness, uThickness + uGlow + aa, lineDistance)) * 0.42;
  float elevation = clamp(field / (uMorph * 2.4 + 0.001), 0.0, 1.0);
  vec3 color = mix(uLow, uMid, smoothstep(0.0, 0.55, elevation));
  color = mix(color, uHigh, smoothstep(0.55, 1.0, elevation));
  float alpha = clamp(line + halo, 0.0, 1.0) * uOpacity;
  fragColor = vec4(color * alpha, alpha);
}
`;

export default function Topography({
  className = '',
  lowColor = '#1e63d6',
  midColor = '#60a5fa',
  highColor = '#f8fafc',
  speed = 0.24,
  bands = 6.2,
  thickness = 0.018,
  scale = 0.9,
  glow = 0.028,
  opacity = 0.34,
  morphAmount = 2.5,
  mouseInteraction = true,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let renderer;
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      });
    } catch {
      return undefined;
    }
    const gl = renderer.gl;
    // The shader is GLSL ES 3.0; without WebGL2 the section keeps its static background.
    if (!gl || !renderer.isWebgl2) return undefined;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: new Float32Array([1, 1]) },
        iTime: { value: 0 },
        uBands: { value: bands },
        uThickness: { value: thickness },
        uScale: { value: scale },
        uGlow: { value: glow },
        uOpacity: { value: opacity },
        uMorph: { value: morphAmount },
        uLow: { value: new Float32Array(hexToRgb(lowColor)) },
        uMid: { value: new Float32Array(hexToRgb(midColor)) },
        uHigh: { value: new Float32Array(hexToRgb(highColor)) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseActive: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, width), Math.max(1, height));
      program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // Track the pointer on the window so the lines still react while the
    // cursor is over the section's content, which sits above the canvas.
    const currentMouse = [0.5, 0.5];
    const targetMouse = [0.5, 0.5];
    let currentActive = 0;
    let targetActive = 0;
    const onPointerMove = (event) => {
      if (!mouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      targetActive = inside ? 1 : 0;
      if (inside) {
        targetMouse[0] = x;
        targetMouse[1] = 1 - y;
      }
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    const startedAt = performance.now();
    const render = (time) => {
      frame = 0;
      program.uniforms.iTime.value = reduceMotion ? 0 : (time - startedAt) * 0.001 * speed;
      currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.05;
      currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.05;
      currentActive += (targetActive - currentActive) * 0.05;
      program.uniforms.uMouse.value[0] = currentMouse[0];
      program.uniforms.uMouse.value[1] = currentMouse[1];
      program.uniforms.uMouseActive.value = currentActive;
      renderer.render({ scene: mesh });
      if (!reduceMotion) frame = requestAnimationFrame(render);
    };
    const start = () => {
      if (visible && pageVisible && frame === 0) frame = requestAnimationFrame(render);
    };
    const stop = () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      frame = 0;
    };
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };
    intersectionObserver.observe(container);
    document.addEventListener('visibilitychange', onVisibilityChange);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pointermove', onPointerMove);
      canvas.remove();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [bands, glow, highColor, lowColor, midColor, morphAmount, mouseInteraction, opacity, scale, speed, thickness]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
