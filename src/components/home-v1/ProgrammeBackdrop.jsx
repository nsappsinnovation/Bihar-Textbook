import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../home-shared/useLeaders";

// Faint line sketches along the edges of the "Beyond the printed page" section, one theme at a time
// (languages, VR, audio, sign language, games, heritage). Each scene cross-fades into the next.
// Every scene has a narrow left cluster (0 0 240 640), kept below the heading in the page margin,
// and a wider right cluster (0 0 520 640) that fills the empty space beside the heading.

const HOLD = 6000; // ms each scene stays before the next fades in

const Txt = ({ x, y, size = 30, children, className, style }) => (
  <text x={x} y={y} className={className} style={style} fontSize={size} fontFamily="Georgia, 'Noto Serif Devanagari', serif" fill="currentColor" stroke="none" textAnchor="middle">
    {children}
  </text>
);

const SCENES = [
  // 1. Languages: speech bubbles with scripts, a globe
  {
    link: "/ling",
    color: "#1f7a4d",
    left: (
      <>
        <path d="M40 90h110a18 18 0 0 1 18 18v52a18 18 0 0 1-18 18H88l-26 22v-22H40a18 18 0 0 1-18-18v-52a18 18 0 0 1 18-18z" />
        <Txt x={95} y={148} size={40}>अ</Txt>
        <path d="M60 330h90a16 16 0 0 1 16 16v44a16 16 0 0 1-16 16h-18v20l-22-20H60a16 16 0 0 1-16-16v-44a16 16 0 0 1 16-16z" />
        <Txt x={105} y={382} size={34}>ع</Txt>
        <circle cx="120" cy="540" r="42" />
        <ellipse cx="120" cy="540" rx="18" ry="42" />
        <path d="M78 540h84M84 518h72M84 562h72" />
      </>
    ),
    right: (
      <>
        <path d="M300 60h140a20 20 0 0 1 20 20v60a20 20 0 0 1-20 20h-28v26l-30-26h-82a20 20 0 0 1-20-20V80a20 20 0 0 1 20-20z" />
        <Txt x={370} y={126} size={42}>A</Txt>
        <path d="M150 130h100a16 16 0 0 1 16 16v44a16 16 0 0 1-16 16h-66l-22 18v-18h-12a16 16 0 0 1-16-16v-44a16 16 0 0 1 16-16z" />
        <Txt x={200} y={184} size={36}>ह</Txt>
        <path d="M360 430h110a18 18 0 0 1 18 18v50a18 18 0 0 1-18 18h-70l-26 22v-22h-14a18 18 0 0 1-18-18v-50a18 18 0 0 1 18-18z" />
        <Txt x={415} y={488} size={36}>字</Txt>
        <path d="M250 300c20-14 40-14 60 0s40 14 60 0" strokeDasharray="3 7" />
      </>
    ),
  },
  // 2. Virtual reality: headset, ringed planet, stars, wireframe cube
  {
    link: "/vr-dashboard",
    color: "#1d5bd8",
    left: (
      <>
        <path d="M30 150a22 22 0 0 1 22-22h136a22 22 0 0 1 22 22v44a22 22 0 0 1-22 22h-34a16 16 0 0 1-13-7l-9-13a12 12 0 0 0-20 0l-9 13a16 16 0 0 1-13 7H52a22 22 0 0 1-22-22z" />
        <path d="M58 168h36M146 168h36" />
        <path d="M70 380l50-28 50 28v56l-50 28-50-28z M70 380l50 28 50-28 M120 408v56" />
        <path d="M60 560l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" />
      </>
    ),
    right: (
      <>
        <circle cx="380" cy="130" r="54" />
        <ellipse cx="380" cy="130" rx="104" ry="24" transform="rotate(-18 380 130)" />
        <path d="M200 90l5 12 12 5-12 5-5 12-5-12-12-5 12-5z M470 290l4 9 9 4-9 4-4 9-4-9-9-4 9-4z M260 210h.01 M300 60h.01 M500 60h.01" strokeWidth="3" />
        <circle cx="420" cy="470" r="30" />
        <path d="M390 470c10 8 50 8 60 0" />
        <path d="M300 540c30-40 90-60 150-40" strokeDasharray="3 7" />
      </>
    ),
  },
  // 3. Audio: headphones, sound waves, music notes
  {
    link: "/audio-library-dashboard",
    color: "#6a4fd3",
    left: (
      <>
        <path d="M44 220v-40a76 76 0 0 1 152 0v40" />
        <rect x="30" y="206" width="36" height="66" rx="14" />
        <rect x="174" y="206" width="36" height="66" rx="14" />
        <path d="M70 430v-60l60-14v60" />
        <ellipse cx="58" cy="432" rx="14" ry="10" />
        <ellipse cx="118" cy="418" rx="14" ry="10" />
      </>
    ),
    right: (
      <>
        <path d="M180 140v40M205 115v90M230 130v60M255 95v130M280 120v80M305 140v40M330 105v110M355 128v64M380 140v40" />
        <path d="M430 440v-70l40 14" />
        <ellipse cx="418" cy="442" rx="14" ry="10" />
        <path d="M250 480c30-20 60 20 90 0s60 20 90 0" strokeDasharray="3 7" />
        <circle cx="460" cy="110" r="26" />
        <path d="M452 98l18 12-18 12z" />
      </>
    ),
  },
  // 4. Sign language: open hands with motion arcs
  {
    link: "/sign-learn",
    color: "#0f8a6a",
    left: (
      <>
        <path d="M80 330V190a14 14 0 0 1 28 0v110M108 290V168a14 14 0 0 1 28 0v122M136 290V184a14 14 0 0 1 28 0v130M164 314v-86a14 14 0 0 1 28 0v130c0 60-40 96-88 96-34 0-54-16-72-44l-30-48a14 14 0 0 1 24-14l30 40" />
        <path d="M60 150a70 70 0 0 1 40-40M200 130a70 70 0 0 1 20 50" strokeDasharray="4 6" />
      </>
    ),
    right: (
      <>
        <path d="M300 250V130a12 12 0 0 1 24 0v90M324 214V112a12 12 0 0 1 24 0v102M348 214V126a12 12 0 0 1 24 0v104M372 236v-66a12 12 0 0 1 24 0v104c0 50-34 82-74 82-28 0-46-14-60-36l-26-40a12 12 0 0 1 20-12l26 34" />
        <path d="M270 90a60 60 0 0 1 40-30M420 110a60 60 0 0 1 14 40" strokeDasharray="4 6" />
        <circle cx="450" cy="470" r="34" />
        <path d="M436 470l10 10 20-22" />
      </>
    ),
  },
  // 5. Games and life skills: puzzle, dice, shopping cart, coins
  {
    link: "/life-skills",
    color: "#c0265a",
    left: (
      <>
        <path d="M60 110h40v-8a14 14 0 0 1 28 0v8h40v40h8a14 14 0 0 1 0 28h-8v40h-40v-8a14 14 0 0 0-28 0v8H60v-40h-8a14 14 0 0 1 0-28h8z" />
        <rect x="60" y="380" width="96" height="96" rx="18" transform="rotate(-10 108 428)" />
        <path d="M86 402h.01M130 396h.01M108 428h.01M86 460h.01M130 454h.01" strokeWidth="7" />
      </>
    ),
    right: (
      <>
        <path d="M200 90h28l26 110h130l22-80H244" />
        <circle cx="270" cy="228" r="12" />
        <circle cx="370" cy="228" r="12" />
        <circle cx="440" cy="460" r="30" />
        <circle cx="440" cy="460" r="20" />
        <path d="M434 452h14M434 460h12M440 452c8 0 8 16-6 16l12 12" />
        <ellipse cx="380" cy="500" rx="30" ry="10" />
        <path d="M350 500v14c0 6 14 10 30 10s30-4 30-10v-14" />
      </>
    ),
  },
  // 6. Heritage and more: stupa, scroll, AI chip
  {
    link: "/heritage-dashboard",
    color: "#a8590b",
    left: (
      <>
        <path d="M40 300h160M56 300v-20h128v20M76 280a44 44 0 0 1 88 0M120 236v-26M112 216h16M104 204h32" />
        <path d="M70 300v60M110 300v60M150 300v60M190 300v60M40 360h160" />
        <path d="M66 470c0-12 10-18 20-18h96v84H86c-10 0-20-6-20-18z M86 452v84 M104 480h58M104 500h48" />
      </>
    ),
    right: (
      <>
        <rect x="360" y="90" width="90" height="90" rx="16" />
        <rect x="384" y="114" width="42" height="42" rx="6" />
        <path d="M380 90V70M405 90V70M430 90V70M380 200v-20M405 200v-20M430 200v-20M360 110h-20M360 135h-20M360 160h-20M470 110h-20M470 135h-20M470 160h-20" />
        <path d="M180 120l30-50 30 50z M180 120h60 M210 70V50" />
        <path d="M380 480c0-30 30-50 60-50s60 20 60 50" strokeDasharray="3 7" />
        <path d="M400 480h80M410 480v36M470 480v36M396 516h88" />
      </>
    ),
  },
];

const SHAPES = new Set(["path", "circle", "ellipse", "rect"]);

// Prepares a cluster's elements for the entrance: solid shapes draw themselves in (pathLength=1),
// dashed lines and text fade in, and everything floats gently, each on its own delay.
function animate(nodes) {
  let n = 0;
  const walk = (list) =>
    Children.map(list, (node) => {
      if (!isValidElement(node)) return node;
      if (node.type !== Txt && !SHAPES.has(node.type)) {
        return cloneElement(node, {}, walk(node.props.children));
      }
      const i = n++;
      const style = { "--d": `${i * 90}ms`, "--f": `${(i % 5) * -1.3}s` };
      if (node.type === Txt) return cloneElement(node, { className: "pb-txt", style });
      const draws = !node.props.strokeDasharray;
      return cloneElement(node, { className: draws ? "pb-draw" : "pb-fade", style, ...(draws ? { pathLength: 1 } : {}) });
    });
  return walk(nodes);
}

const PREPARED = SCENES.map((scene) => ({ ...scene, left: animate(scene.left), right: animate(scene.right) }));

// Only the entering scene animates; the leaving one simply fades with its layer
const STYLES = `
.pb-on .pb-draw { stroke-dasharray: 1; animation: pb-draw 1.8s ease-out var(--d) both, pb-float 7s ease-in-out var(--f) infinite; }
.pb-on .pb-fade, .pb-on .pb-txt { animation: pb-fade 1.4s ease-out var(--d) both, pb-float 7s ease-in-out var(--f) infinite; }
.pb-draw, .pb-fade, .pb-txt { transform-box: fill-box; transform-origin: center; }
@keyframes pb-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes pb-fade { from { opacity: 0; transform: translateY(6px) scale(0.96); } to { opacity: 1; transform: none; } }
@keyframes pb-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -4px; } }
@media (prefers-reduced-motion: reduce) { .pb-on .pb-draw, .pb-on .pb-fade, .pb-on .pb-txt { animation: none; } }
`;

// onChange(link, color) reports the theme on show, so the matching card can light up
export default function ProgrammeBackdrop({ onChange }) {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  // Only cycle while the section is on screen, and never for reduced motion
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.1 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    onChange?.(SCENES[index].link, SCENES[index].color);
  }, [index, onChange]);

  useEffect(() => {
    if (!running) return undefined;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % SCENES.length), HOLD);
    return () => clearTimeout(timer);
  }, [index, running]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <style>{STYLES}</style>
      {PREPARED.map((scene, i) => {
        const on = i === index;
        const layer = `absolute top-0 h-full transition-[opacity,transform] duration-[1600ms] ease-in-out ${
          on ? "pb-on translate-y-0 opacity-[0.3]" : "translate-y-1.5 opacity-0"
        }`;
        const svgProps = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", preserveAspectRatio: "xMidYMid meet" };
        return (
          <div key={i} style={{ color: scene.color }}>
            {/* Soft colour wash behind the sketches */}
            <div
              className={`absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full blur-3xl transition-opacity duration-[1600ms] ${on ? "opacity-[0.12]" : "opacity-0"}`}
              style={{ backgroundColor: scene.color }}
            />
            <div
              className={`absolute -bottom-32 -left-32 hidden h-[26rem] w-[26rem] rounded-full blur-3xl transition-opacity duration-[1600ms] md:block ${on ? "opacity-[0.08]" : "opacity-0"}`}
              style={{ backgroundColor: scene.color }}
            />
            <svg
              viewBox="0 0 240 640"
              {...svgProps}
              className={`${layer} left-0 top-[34%]! hidden h-[66%]! w-[170px] [mask-image:linear-gradient(to_right,#000_35%,transparent_85%)] md:block`}
            >
              {scene.left}
            </svg>
            <svg
              viewBox="0 0 520 640"
              {...svgProps}
              className={`${layer} right-0 w-[300px] [mask-image:linear-gradient(to_left,#000_55%,transparent)] md:w-[520px]`}
            >
              {scene.right}
            </svg>
          </div>
        );
      })}
    </div>
  );
}
