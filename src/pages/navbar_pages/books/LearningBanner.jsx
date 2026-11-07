import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

// Promotes the 8 Learning Playground features (VR Lab, Audio Library, ...) from inside the
// Books section. The banner image itself has its figure/cards on the right and plain empty
// space on the left — text + button are positioned there so nothing overlaps the artwork.
// Links to the homepage's Learning Playground section (id="missions-grid" in
// src/components/home-v1/V1Programmes.jsx); ScrollToTop already handles the hash scroll.
// Badge + heading + description + button — identical content whether it's overlaid on the
// banner (tablet/desktop, where there's enough height for it) or stacked below it (mobile).
function PromoContent({ className }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      className={className}
    >
      {/* "Discover" badge — the whole point of the banner is pointing at the 8 features */}
      <span className="inline-flex items-center gap-1 mb-1.5 sm:mb-2 bg-blue-600/10 text-blue-700 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full whitespace-nowrap">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
        </span>
        <Sparkles size={12} className="shrink-0" aria-hidden="true" />
        {t("booksPage.learningBanner.badge", "8 Interactive Tools")}
      </span>

      <h2 className="text-lg sm:text-xl md:text-2xl font-display font-black text-slate-900 leading-tight tracking-tight">
        {t("booksPage.learningBanner.title", "Beyond the Textbook")}
      </h2>
      <p className="text-slate-600 text-xs md:text-sm mt-1.5 leading-relaxed">
        {t("booksPage.learningBanner.desc", "VR, AI tutoring, audio books, sign language & more — all in one place.")}
      </p>

      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block mt-3 sm:mt-4">
        <Link
          to="/#missions-grid"
          className="group inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 px-6 rounded-full transition-colors shadow-md shadow-blue-600/20"
        >
          {t("booksPage.learningBanner.cta", "Explore Now")}
          <ArrowUpRight
            size={16}
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function LearningBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mb-6 w-full rounded-2xl overflow-hidden shadow-sm bg-white"
    >
      {/* Full banner, full size, untouched — no crop, no forced height. On sm+ (tall enough
          to fit text over it) the promo text overlays the image's own empty left-hand space.
          On phones the image alone is often too short vertically for that text to fit without
          overflowing, so there it's shown as its own block below the image instead — never
          overlaid, so nothing ever gets clipped. */}
      <div className="relative">
        <img
          src="/discover.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="block w-full h-auto"
        />

        {/* Soft sheen sweeping across the banner on a loop — reads as "premium", not flashy */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg]"
          initial={{ x: "-120%" }}
          animate={{ x: "320%" }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
        />

        {/* Tablet/desktop: overlaid on the image's own empty left-hand space */}
        <div className="hidden sm:flex absolute inset-0 items-center">
          <PromoContent className="pl-8 md:pl-10 max-w-[36%]" />
        </div>
      </div>

      {/* Phones: stacked below the (fully visible) image instead of overlaid */}
      <div className="sm:hidden p-4">
        <PromoContent />
      </div>
    </motion.div>
  );
}
