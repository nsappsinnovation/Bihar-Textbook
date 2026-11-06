import { motion } from 'framer-motion';
import useMissions from '../../components/home-shared/useMissions';
import ProgrammeIcon from '../../components/home-v1/ProgrammeIcon';

// Engagement panel for the 8 "Learning Playground" feature cards (VR Lab, Audio Library, Sign
// Language, ...) shown on the homepage. Pulls the same list the homepage renders (useMissions),
// so titles/icons/order always match what visitors actually see.
//
// UI only for now — `visits` is a placeholder (always 0) until the click-tracking write path
// (see dashboard task: frontend-only counter, backend pending) is wired up. Once that's live,
// replace the `visits: 0` below with the real per-feature counts and this panel needs no
// other changes — it already sorts by count and renders whatever numbers it's given.
export default function FeatureEngagement() {
  const missions = useMissions();

  const rows = (missions || [])
    .map((m) => ({ ...m, visits: 0 }))
    .sort((a, b) => b.visits - a.visits);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-gray-100/50"
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-sm font-bold text-gray-800">Feature Engagement</p>
          <p className="text-xs text-gray-400 mt-0.5">Visits per Learning Playground card — see what kids love most</p>
        </div>
      </div>

      {missions === null ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="h-20 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl bg-gray-50 border border-gray-100 p-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-600">
                <ProgrammeIcon
                  link={r.link}
                  className="h-4 w-4"
                  fallback={r.image ? <img src={r.image} alt="" className="h-4 w-4 object-contain" /> : null}
                />
              </span>
              <p className="mt-2 text-lg font-bold text-gray-800 tabular-nums">{r.visits.toLocaleString()}</p>
              <p className="text-[11px] font-semibold text-gray-500 truncate">{r.title}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
