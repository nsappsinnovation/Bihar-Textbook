/**
 * "Uploading… 42%" with a spinner and progress bar.
 * variant "overlay": covers its (relative) parent, e.g. an image drop zone.
 * variant "inline": a compact row, e.g. under a file input or inside a table cell.
 * At 100% the file is sent and the server is still saving it, so it reads "Processing…".
 */
export default function UploadProgress({ percent = 0, variant = 'inline', label = 'Uploading' }) {
  const done = percent >= 100;
  const text = done ? 'Processing…' : `${label}… ${percent}%`;

  const bar = (
    <div className="w-full h-1.5 rounded-full bg-blue-100 overflow-hidden">
      <div
        className={`h-full rounded-full bg-blue-600 transition-[width] duration-200 ${done ? 'animate-pulse' : ''}`}
        style={{ width: `${Math.max(percent, 4)}%` }}
      />
    </div>
  );

  if (variant === 'overlay') {
    return (
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/90 backdrop-blur-sm px-6"
        role="status"
        aria-live="polite"
      >
        <span className="w-8 h-8 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-bold text-blue-700">{text}</span>
        <div className="w-full max-w-[200px]">{bar}</div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-1.5 w-full px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 text-blue-700 text-xs font-bold">
        <span className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
        <span>{text}</span>
      </div>
      {bar}
    </div>
  );
}
