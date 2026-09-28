import { ImageOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Shown instead of a gallery grid while it loads (grey tiles) or when nothing is published yet.
 * Nothing is requested for empty galleries, no stand-in images.
 */
export default function GalleryStatus({ loading, tiles = 6 }) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-hidden>
        {Array.from({ length: tiles }, (_, i) => (
          <div key={i} className="aspect-[4/3] rounded-3xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-white rounded-3xl border border-dashed border-slate-300">
      <ImageOff className="w-12 h-12 text-slate-300 mb-4" />
      <h3 className="text-lg font-bold text-slate-700">{t('galleryPage.empty.title', 'Nothing published yet')}</h3>
      <p className="text-slate-400 text-sm mt-1">{t('galleryPage.empty.desc', 'New items will appear here as soon as they are published.')}</p>
    </div>
  );
}
