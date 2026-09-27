// Hand-drawn line icons for the learning programmes, on a 24px grid.
// Each has three layers:
//   fill  — a soft duotone wash (faint at rest, stronger on hover)
//   line  — the outline, always visible
//   extra — a small detail that pops in on hover (waves, sparkle, check…)
// Colour comes from `currentColor`, so the parent sets it (accent at rest, white on hover).
// The parent Link must carry the `group` class for the hover layers to react.

const ICONS = {
  // VR headset
  "/vr-dashboard": {
    fill: <path d="M3 9.5A2.5 2.5 0 0 1 5.5 7h13A2.5 2.5 0 0 1 21 9.5v5a2.5 2.5 0 0 1-2.5 2.5h-3.1a2 2 0 0 1-1.6-.8l-.8-1.1a1.2 1.2 0 0 0-2 0l-.8 1.1a2 2 0 0 1-1.6.8H5.5A2.5 2.5 0 0 1 3 14.5z" />,
    line: (
      <>
        <path d="M3 9.5A2.5 2.5 0 0 1 5.5 7h13A2.5 2.5 0 0 1 21 9.5v5a2.5 2.5 0 0 1-2.5 2.5h-3.1a2 2 0 0 1-1.6-.8l-.8-1.1a1.2 1.2 0 0 0-2 0l-.8 1.1a2 2 0 0 1-1.6.8H5.5A2.5 2.5 0 0 1 3 14.5z" />
        <path d="M3 11.5H1.5M21 11.5h1.5" />
        <path d="M6.5 10.5h2.5M15 10.5h2.5" />
      </>
    ),
    extra: <path d="M19.5 1.8l.55 1.25 1.25.55-1.25.55-.55 1.25-.55-1.25-1.25-.55 1.25-.55z" fill="currentColor" />,
  },

  // Headphones
  "/audio-library-dashboard": {
    fill: (
      <>
        <rect x="3" y="13.5" width="4" height="7" rx="1.6" />
        <rect x="17" y="13.5" width="4" height="7" rx="1.6" />
      </>
    ),
    line: (
      <>
        <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
        <rect x="3" y="13.5" width="4" height="7" rx="1.6" />
        <rect x="17" y="13.5" width="4" height="7" rx="1.6" />
      </>
    ),
    extra: <path d="M10 15.5v2M12 14v5M14 15.5v2" />,
  },

  // Raised signing hand
  "/sign-learn": {
    fill: <path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V5a1.5 1.5 0 0 1 3 0v1.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.3a5.6 5.6 0 0 1-4.8-2.7L3.6 14.5a1.5 1.5 0 0 1 2.5-1.6L8 15.5z" />,
    line: (
      <>
        <path d="M8 15.5V6.5a1.5 1.5 0 0 1 3 0V12" />
        <path d="M11 11V5a1.5 1.5 0 0 1 3 0v6" />
        <path d="M14 11V6.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.3a5.6 5.6 0 0 1-4.8-2.7L3.6 14.5a1.5 1.5 0 0 1 2.5-1.6L8 15.5" />
      </>
    ),
    extra: <path d="M19.5 4.5a4.5 4.5 0 0 1 1.6 3M4.6 7.4a4.5 4.5 0 0 1 1.3-2.7" />,
  },

  // Two speech bubbles with a letter
  "/ling": {
    fill: <path d="M4 3.5h9a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2H8.5L5 14.5V12H4a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2z" />,
    line: (
      <>
        <path d="M4 3.5h9a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2H8.5L5 14.5V12H4a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2z" />
        <path d="M18 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1v2.5L15.5 16H11a2 2 0 0 1-2-2v-.5" />
        <path d="M6.3 10l2.2-5 2.2 5M7.1 8.3h2.8" />
      </>
    ),
    extra: <path d="M13 12.8h.01M15.5 12.8h.01M18 12.8h.01" strokeWidth="2.2" />,
  },

  // Chip with a spark
  "/ai-intelligence-dashboard": {
    fill: <rect x="6" y="6" width="12" height="12" rx="3" />,
    line: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="3" />
        <path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" />
      </>
    ),
    extra: <path d="M12 8.6l.95 2.45L15.4 12l-2.45.95L12 15.4l-.95-2.45L8.6 12l2.45-.95z" fill="currentColor" stroke="none" />,
  },

  // Shield with lock
  "/cyber-security-dashboard": {
    fill: <path d="M12 2.8l7.5 3v5.7c0 4.6-3.2 8.3-7.5 9.9-4.3-1.6-7.5-5.3-7.5-9.9V5.8z" />,
    line: (
      <>
        <path d="M12 2.8l7.5 3v5.7c0 4.6-3.2 8.3-7.5 9.9-4.3-1.6-7.5-5.3-7.5-9.9V5.8z" />
        <rect x="9" y="11" width="6" height="4.8" rx="1.2" />
        <path d="M10.2 11V9.6a1.8 1.8 0 0 1 3.6 0V11" />
      </>
    ),
    extra: <path d="M17 17.5l1.6 1.6 3-3.2" strokeWidth="1.9" />,
  },

  // Columned monument with a flag
  "/heritage-dashboard": {
    fill: <path d="M3 9l9-5 9 5z" />,
    line: (
      <>
        <path d="M3 9l9-5 9 5z" />
        <path d="M5 9v8.5M9.5 9v8.5M14.5 9v8.5M19 9v8.5" />
        <path d="M3.5 17.5h17M2 20.5h20" />
      </>
    ),
    extra: <path d="M12 4V1.2l2.8 1.1L12 3.4" fill="currentColor" />,
  },

  // Puzzle piece
  "/life-skills": {
    fill: <path d="M10 3H6a1 1 0 0 0-1 1v4.5h1.3a2 2 0 1 1 0 4H5V19a1 1 0 0 0 1 1h4.5v-1.3a2 2 0 1 1 4 0V20H18a1 1 0 0 0 1-1v-5.5h-1.3a2 2 0 1 1 0-4H19V4a1 1 0 0 0-1-1h-4v1.3a2 2 0 1 1-4 0z" />,
    line: <path d="M10 3H6a1 1 0 0 0-1 1v4.5h1.3a2 2 0 1 1 0 4H5V19a1 1 0 0 0 1 1h4.5v-1.3a2 2 0 1 1 4 0V20H18a1 1 0 0 0 1-1v-5.5h-1.3a2 2 0 1 1 0-4H19V4a1 1 0 0 0-1-1h-4v1.3a2 2 0 1 1-4 0z" />,
    extra: <path d="M21.2 1.8l.45 1.05 1.05.45-1.05.45-.45 1.05-.45-1.05-1.05-.45 1.05-.45z" fill="currentColor" />,
  },
};

// Renders the drawn icon for a programme link, or `fallback` (e.g. an uploaded image) for unknown links
export default function ProgrammeIcon({ link, className = "h-7 w-7", fallback = null }) {
  const icon = ICONS[link];
  if (!icon) return fallback;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`overflow-visible ${className}`}
    >
      <g fill="currentColor" stroke="none" className="opacity-15 transition-opacity duration-300 group-hover:opacity-25 group-focus-visible:opacity-25">
        {icon.fill}
      </g>
      {icon.line}
      <g className="origin-center scale-50 opacity-0 transition duration-300 [transform-box:fill-box] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
        {icon.extra}
      </g>
    </svg>
  );
}
