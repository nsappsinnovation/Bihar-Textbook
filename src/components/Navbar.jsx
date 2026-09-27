import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { HiOutlineLanguage } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { Knowconfig } from './knowus/Knowconfig';
import { Galleryconfig } from './gallery/Galleryconfig';

// Header styled after the Purchase Preference Portal's: a thin brand stripe, a frosted
// bar, the logo with the corporation's name, a segmented language switch and a Login pill.

const NAME_EN = "Bihar State Textbook Publishing Corporation Ltd.";
const NAME_HI = "बिहार राज्य पाठ्यपुस्तक प्रकाशन निगम लि.";

const dropdownPanelClass =
  "dropdown-menu absolute left-0 top-full mt-3 w-64 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50 max-h-96 overflow-y-auto scrollbar-hide rounded-xl border border-[#0b2b4f]/10 bg-white py-2 shadow-[0_20px_45px_-18px_rgba(11,43,79,0.35)]";

const dropdownItemClass = (subActive) =>
  `block border-l-2 px-4 py-2.5 text-sm transition-colors ${
    subActive
      ? "border-[#124d9c] bg-[#e9f1fc] font-bold text-[#124d9c]"
      : "border-transparent text-slate-700 hover:bg-slate-50 hover:text-[#124d9c]"
  }`;

// "English | हिन्दी" segmented switch, ported from the portal's LanguageToggle
function LanguageToggle({ isHindi, onChange, className = "" }) {
  return (
    <div
      role="group"
      aria-label="Language / भाषा"
      className={`items-center gap-1 rounded-xl bg-slate-100 p-1 text-xs font-semibold ring-1 ring-slate-200 ${className}`}
    >
      <HiOutlineLanguage className="mx-1 h-4 w-4 text-slate-400" aria-hidden="true" />
      {[
        ["en", "English"],
        ["hi", "हिन्दी"],
      ].map(([code, label]) => {
        const active = (code === "hi") === isHindi;
        return (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            aria-pressed={active}
            className={`rounded-lg px-2.5 py-1.5 transition ${
              active ? "bg-white text-[#124d9c] shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Over the home page hero the bar is see-through, so it sits on the hero's canvas; it frosts once the page scrolls
  const isHome = location.pathname === "/";
  const solid = !isHome || scrolled || isOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentLang = (i18n.language || 'en').toLowerCase();
  const isHindi = currentLang.startsWith('hi');

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    if (path === "/books") {
      return (
        location.pathname.startsWith("/books") ||
        location.pathname.startsWith("/class/") ||
        location.pathname.startsWith("/book/")
      );
    }
    if (path === "/notice") {
      return location.pathname.startsWith("/notice");
    }
    return location.pathname.startsWith(path);
  };

  const linkClass = (active) =>
    `relative inline-flex cursor-pointer items-center gap-1 whitespace-nowrap py-2 text-[14px] font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-mango after:transition-transform ${
      active ? "text-[#124d9c] after:scale-x-100" : "text-[#0b2b4f] after:scale-x-0 hover:text-[#124d9c]"
    }`;

  const mobileLinkClass = (active) =>
    `flex w-full items-center justify-between border-b border-slate-200 py-4 text-left text-xl font-semibold ${
      active ? "text-[#124d9c]" : "text-[#0b2b4f]"
    }`;

  // "Notifications" groups Notice and Tenders, so it stays highlighted on either page
  const notificationsLinks = [
    { to: "/notice", label: t("nav.notice") },
    { to: "/tenders", label: t("nav.tenders") },
  ];
  const isNotificationsActive = isActive("/notice") || isActive("/tenders");

  // "Policy" groups CSR Policy and RTI
  const policyLinks = [
    { to: "/csr-policy", label: t("nav.csrPolicy") },
    { to: "/rti", label: t("nav.documentsLinks.rti", "RTI") },
  ];
  const isPolicyActive = isActive("/csr-policy") || isActive("/rti");

  const dropdowns = [
    {
      key: "know",
      label: t("nav.knowUs"),
      active: isActive("/know-us"),
      items: Knowconfig.map((item) => ({ to: `/know-us/${item.id}`, label: t(`nav.knowUsLinks.${item.id}`, item.label) })),
    },
    {
      key: "books",
      label: t("nav.books"),
      active: isActive("/books"),
      items: Array.from({ length: 12 }, (_, i) => ({ to: `/books/${i + 1}`, label: t("nav.classN", { classId: i + 1 }) })),
    },
    {
      key: "gallery",
      label: t("nav.gallery"),
      active: isActive("/gallery"),
      items: Galleryconfig.map((item) => ({ to: `/gallery/${item.id}`, label: t(`nav.galleryLinks.${item.id}`, item.label) })),
    },
  ];
  const trailingDropdowns = [
    { key: "notifications", label: t("nav.notifications", "Notifications"), active: isNotificationsActive, items: notificationsLinks },
    { key: "policy", label: t("nav.policy", "Policy"), active: isPolicyActive, items: policyLinks },
  ];

  const renderDropdown = (dd) => (
    <div key={dd.key} className="relative group">
      <span className={linkClass(dd.active)}>
        {dd.label} <ChevronDown size={13} aria-hidden="true" />
      </span>
      <div data-lenis-prevent="true" className={dropdownPanelClass}>
        {dd.items.map((item) => (
          <Link key={item.to} to={item.to} className={dropdownItemClass(location.pathname === item.to)}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );

  const renderMobileDropdown = (dd) => (
    <React.Fragment key={dd.key}>
      <button type="button" onClick={() => toggleDropdown(dd.key)} className={mobileLinkClass(dd.active)}>
        <span>{dd.label}</span>
        <ChevronDown size={20} className={`transition-transform duration-200 ${activeDropdown === dd.key ? 'rotate-180' : ''}`} />
      </button>
      {activeDropdown === dd.key && (
        <div className="flex flex-col gap-3 border-b border-slate-200 py-3 pl-1">
          {dd.items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={`text-base font-semibold ${location.pathname === item.to ? "text-[#124d9c]" : "text-slate-600"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </React.Fragment>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 font-manrope">
      <div className="h-1 bg-gradient-to-r from-[#124d9c] via-mango to-[#124d9c]" />
      <div className={`border-b transition-colors duration-300 ${solid ? "border-[#0b2b4f]/10 bg-white/85 backdrop-blur-md" : "border-transparent bg-transparent"}`}>
        {/* Same side padding and max width as the page sections (from xl up, where the links fit) */}
        <div className="px-4 sm:px-6 lg:px-8 xl:px-24">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-4">
          {/* LEFT: brand mark */}
          <Link to="/" className="flex min-w-0 shrink-0 items-center gap-3">
            <img loading="eager" decoding="async" src="/logo.webp" alt="BSTBPC Logo" className="h-12 w-auto shrink-0 object-contain" />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-bold text-[#0b2b4f] xl:hidden">BSTBPC</span>
              <span className="hidden max-w-[230px] text-[13.5px] font-bold text-[#0b2b4f] xl:block">{isHindi ? NAME_HI : NAME_EN}</span>
              <span className="block truncate text-xs text-slate-500">{t("homeV1.govOfBihar", "Government of Bihar")}</span>
            </span>
          </Link>

          {/* CENTER: navigation (desktop) */}
          <nav className="hidden items-center gap-[clamp(12px,1.4vw,26px)] lg:flex" aria-label="Primary navigation">
            <Link to="/" className={linkClass(isActive("/"))}>{t("nav.home")}</Link>
            {dropdowns.map(renderDropdown)}
            <Link to="/blog" className={linkClass(isActive("/blog"))}>{t("nav.gyanKendra")}</Link>
            {trailingDropdowns.map(renderDropdown)}
            <Link to="/contact" className={linkClass(isActive("/contact"))}>{t("nav.contact")}</Link>
          </nav>

          {/* RIGHT: language, login, menu */}
          <div className="flex shrink-0 items-center gap-2">
            <LanguageToggle isHindi={isHindi} onChange={changeLanguage} className="hidden sm:inline-flex" />
            <Link
              to="/login"
              className="hidden items-center gap-1.5 rounded-full border border-[#0b2b4f]/20 bg-white/60 px-4 py-2 text-sm font-semibold text-[#0b2b4f] backdrop-blur transition hover:border-[#124d9c] hover:bg-white lg:inline-flex"
            >
              {t("nav.login")} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="grid h-11 w-11 place-items-center rounded-xl text-[#0b2b4f] transition hover:bg-white/70 lg:hidden"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation" : "Open navigation"}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div data-lenis-prevent="true" className="fixed inset-x-0 bottom-0 top-[80px] overflow-y-auto bg-[#f4f8fe] px-5 pb-8 lg:hidden">
          <LanguageToggle isHindi={isHindi} onChange={changeLanguage} className="my-4 inline-flex" />
          <Link to="/" onClick={() => setIsOpen(false)} className={mobileLinkClass(isActive("/"))}>
            {t("nav.home")}
          </Link>
          {dropdowns.map(renderMobileDropdown)}
          <Link to="/blog" onClick={() => setIsOpen(false)} className={mobileLinkClass(isActive("/blog"))}>
            {t("nav.gyanKendra")}
          </Link>
          {trailingDropdowns.map(renderMobileDropdown)}
          <Link to="/contact" onClick={() => setIsOpen(false)} className={mobileLinkClass(isActive("/contact"))}>
            {t("nav.contact")}
          </Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#124d9c] px-6 py-3.5 text-sm font-bold text-white"
          >
            {t("nav.login")} <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
