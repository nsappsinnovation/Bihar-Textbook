import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Knowconfig } from './knowus/Knowconfig';
import { Galleryconfig } from './gallery/Galleryconfig';

const dropdownPanelClass =
  "dropdown-menu bnav-dropdown absolute left-0 top-full mt-3 w-64 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50 max-h-96 overflow-y-auto scrollbar-hide py-2";

const dropdownItemClass = (subActive) =>
  `block px-4 py-2.5 text-sm transition-all ${
    subActive
      ? "bg-[#124d9c]/[0.08] text-[#124d9c] font-bold border-l-4 border-[#124d9c]"
      : "text-[#111111] hover:bg-black/[0.03] hover:text-[#124d9c]"
  }`;

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const currentLang = (i18n.language || 'en').toLowerCase();
  const isHindi = currentLang.startsWith('hi');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleToggleLanguage = () => {
    const nextLang = isHindi ? 'en' : 'hi';
    i18n.changeLanguage(nextLang);
  };

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
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

  const getLinkClass = (path) => `bnav-link ${isActive(path) ? "bnav-link--active" : ""}`;

  const getMobileLinkClass = (path) => `bnav-mobile-link ${isActive(path) ? "bnav-mobile-link--active" : ""}`;

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

  // Transparent over the home hero until the page scrolls; frosted ivory everywhere else
  const isSolid = !isHomePage || scrolled || isOpen;

  return (
    <header className={`bnav font-manrope ${isSolid ? "bnav--solid" : ""} ${scrolled ? "bnav--scrolled" : ""} ${isOpen ? "bnav--open" : ""}`}>

      <div className="hv1-shell bnav-inner">
        {/* LEFT: Logo */}
        <div className="flex items-center shrink-0">
          <Link to="/">
            <img loading="eager" decoding="async"
              src="/logo.webp"
              alt="BSTBPC Logo"
              className="h-11 md:h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* CENTER: Navigation (Desktop) */}
        <nav className="bnav-links" aria-label="Primary navigation">
          <Link to="/" className={getLinkClass("/")}>{t("nav.home")}</Link>

          <div className="relative group">
            <span className={getLinkClass("/know-us")}>
              {t("nav.knowUs")} <ChevronDown size={13} />
            </span>
            <div data-lenis-prevent="true" className={dropdownPanelClass}>
              {Knowconfig.map(item => (
                <Link
                  key={item.id}
                  to={`/know-us/${item.id}`}
                  className={dropdownItemClass(location.pathname === `/know-us/${item.id}`)}
                >
                  {t(`nav.knowUsLinks.${item.id}`, item.label)}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative group">
            <span className={getLinkClass("/books")}>
              {t("nav.books")} <ChevronDown size={13} />
            </span>
            <div data-lenis-prevent="true" className={dropdownPanelClass}>
              {[...Array(12)].map((_, index) => {
                const classId = index + 1;
                return (
                  <Link
                    key={classId}
                    to={`/books/${classId}`}
                    className={dropdownItemClass(location.pathname === `/books/${classId}`)}
                  >
                    {t("nav.classN", { classId })}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="relative group">
            <span className={getLinkClass("/gallery")}>
              {t("nav.gallery")} <ChevronDown size={13} />
            </span>
            <div data-lenis-prevent="true" className={dropdownPanelClass}>
              {Galleryconfig.map(item => (
                <Link
                  key={item.id}
                  to={`/gallery/${item.id}`}
                  className={dropdownItemClass(location.pathname === `/gallery/${item.id}`)}
                >
                  {t(`nav.galleryLinks.${item.id}`, item.label)}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/blog" className={getLinkClass("/blog")}>{t("nav.gyanKendra")}</Link>
          <div className="relative group">
            <span className={`bnav-link ${isNotificationsActive ? "bnav-link--active" : ""}`}>
              {t("nav.notifications", "Notifications")} <ChevronDown size={13} />
            </span>
            <div data-lenis-prevent="true" className={dropdownPanelClass}>
              {notificationsLinks.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={dropdownItemClass(isActive(item.to))}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative group">
            <span className={`bnav-link ${isPolicyActive ? "bnav-link--active" : ""}`}>
              {t("nav.policy", "Policy")} <ChevronDown size={13} />
            </span>
            <div data-lenis-prevent="true" className={dropdownPanelClass}>
              {policyLinks.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={dropdownItemClass(isActive(item.to))}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/contact" className={getLinkClass("/contact")}>{t("nav.contact")}</Link>
        </nav>

        {/* RIGHT: Translate, Login & Hamburger */}
        <div className="bnav-actions">
          <button
            onClick={handleToggleLanguage}
            className="bnav-lang"
            title="Change Language / भाषा बदलें"
          >
            <span className={`text-[16px] -mt-0.5 leading-none ${isHindi ? 'text-[#124d9c] font-extrabold' : 'text-[#66645f]'}`}>अ</span>
            <span className="text-[rgba(17,17,17,0.25)] text-sm leading-none">/</span>
            <span className={`text-[13px] tracking-wide leading-none ${!isHindi ? 'text-[#124d9c] font-extrabold' : 'text-[#66645f]'}`}>EN</span>
          </button>

          <Link to="/login" className="bnav-button bnav-desktop-only">
            {t("nav.login")} <ArrowUpRight size={17} aria-hidden="true" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bnav-menu-button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      {isOpen && (
        <div data-lenis-prevent="true" className="bnav-mobile">
          <div className="bnav-mobile-inner">
            <Link to="/" onClick={() => setIsOpen(false)} className={getMobileLinkClass("/")}>
              {t("nav.home")}
            </Link>

            <button onClick={() => toggleDropdown('know')} className={getMobileLinkClass("/know-us")}>
              <span>{t("nav.knowUs")}</span>
              <ChevronDown size={20} className={`transition-transform duration-200 ${activeDropdown === 'know' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'know' && (
              <div className="bnav-mobile-sub">
                {Knowconfig.map(item => (
                  <Link
                    key={item.id}
                    to={`/know-us/${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className={location.pathname === `/know-us/${item.id}` ? "bnav-mobile-sub--active" : ""}
                  >
                    {t(`nav.knowUsLinks.${item.id}`, item.label)}
                  </Link>
                ))}
              </div>
            )}

            <button onClick={() => toggleDropdown('books')} className={getMobileLinkClass("/books")}>
              <span>{t("nav.books")}</span>
              <ChevronDown size={20} className={`transition-transform duration-200 ${activeDropdown === 'books' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'books' && (
              <div className="bnav-mobile-sub">
                {[...Array(12)].map((_, index) => {
                  const classId = index + 1;
                  return (
                    <Link
                      key={classId}
                      to={`/books/${classId}`}
                      onClick={() => setIsOpen(false)}
                      className={location.pathname === `/books/${classId}` ? "bnav-mobile-sub--active" : ""}
                    >
                      {t("nav.classN", { classId })}
                    </Link>
                  );
                })}
              </div>
            )}

            <button onClick={() => toggleDropdown('gallery')} className={getMobileLinkClass("/gallery")}>
              <span>{t("nav.gallery")}</span>
              <ChevronDown size={20} className={`transition-transform duration-200 ${activeDropdown === 'gallery' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'gallery' && (
              <div className="bnav-mobile-sub">
                {Galleryconfig.map(item => (
                  <Link
                    key={item.id}
                    to={`/gallery/${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className={location.pathname === `/gallery/${item.id}` ? "bnav-mobile-sub--active" : ""}
                  >
                    {t(`nav.galleryLinks.${item.id}`, item.label)}
                  </Link>
                ))}
              </div>
            )}

            <button
              onClick={() => toggleDropdown('notifications')}
              className={`bnav-mobile-link ${isNotificationsActive ? "bnav-mobile-link--active" : ""}`}
            >
              <span>{t("nav.notifications", "Notifications")}</span>
              <ChevronDown size={20} className={`transition-transform duration-200 ${activeDropdown === 'notifications' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'notifications' && (
              <div className="bnav-mobile-sub">
                {notificationsLinks.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={isActive(item.to) ? "bnav-mobile-sub--active" : ""}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <button
              onClick={() => toggleDropdown('policy')}
              className={`bnav-mobile-link ${isPolicyActive ? "bnav-mobile-link--active" : ""}`}
            >
              <span>{t("nav.policy", "Policy")}</span>
              <ChevronDown size={20} className={`transition-transform duration-200 ${activeDropdown === 'policy' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'policy' && (
              <div className="bnav-mobile-sub">
                {policyLinks.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={isActive(item.to) ? "bnav-mobile-sub--active" : ""}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            <Link to="/contact" onClick={() => setIsOpen(false)} className={getMobileLinkClass("/contact")}>
              {t("nav.contact")}
            </Link>

            <Link to="/login" onClick={() => setIsOpen(false)} className="bnav-button">
              {t("nav.login")} <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
