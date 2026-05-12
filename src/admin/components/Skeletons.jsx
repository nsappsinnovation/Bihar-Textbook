/**
 * Skeleton Loading Components
 * Beautiful shimmer loading states for various UI elements
 */

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100/50">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl skeleton" />
        <div className="w-24 h-8 skeleton" />
      </div>
      <div className="w-20 h-8 skeleton mb-2" />
      <div className="w-32 h-4 skeleton mb-3" />
      <div className="w-24 h-5 skeleton rounded-full" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100/50 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="w-48 h-8 skeleton" />
          <div className="flex gap-2">
            <div className="w-32 h-9 skeleton rounded-xl" />
            <div className="w-24 h-9 skeleton rounded-xl" />
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg skeleton" />
            <div className="flex-1 h-4 skeleton" />
            <div className="w-20 h-4 skeleton" />
            <div className="w-16 h-6 skeleton rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="w-40 h-5 skeleton mb-2" />
          <div className="w-56 h-3 skeleton" />
        </div>
        <div className="w-24 h-8 skeleton rounded-lg" />
      </div>
      <div className="w-full h-56 skeleton rounded-xl" />
    </div>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full skeleton mb-4" />
        <div className="w-32 h-5 skeleton mb-2" />
        <div className="w-24 h-4 skeleton mb-4" />
        <div className="w-full h-px bg-gray-100 mb-4" />
        <div className="w-full space-y-2">
          <div className="w-full h-4 skeleton" />
          <div className="w-3/4 h-4 skeleton" />
          <div className="w-full h-4 skeleton" />
        </div>
      </div>
    </div>
  );
}
