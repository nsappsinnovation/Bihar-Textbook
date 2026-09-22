import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MoltenMetal from './MoltenMetal';

const Star = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 0c.6 5.7 5.7 10.8 12 12-6.3 1.2-11.4 6.3-12 12-.6-5.7-5.7-10.8-12-12C6.3 10.8 11.4 5.7 12 0z" />
    </svg>
);

const Hero = () => {
    const { t } = useTranslation();

    const books = [
        { key: 'textbooks', label: t("hero.book1", "TEXTBOOKS") },
        { key: 'audiobooks', label: t("hero.book2", "AUDIO BOOKS") },
        { key: 'workbooks', label: t("hero.book3", "WORKBOOKS") },
    ];

    return (
        <section className="hv1 font-manrope" id="top" aria-labelledby="hv1-title">
            <div className="hv1-molten" aria-hidden="true">
                <MoltenMetal
                    color1="#eaf1fb"
                    color2="#3b82f6"
                    color3="#0b2b4f"
                    speed={0.22}
                    scale={4}
                    detail={3}
                    glow={1.15}
                    coreSize={0.1}
                    swirl={1}
                    fold={-0.2}
                    blackPoint={0.03}
                    brightness={1.1}
                    colorMode="molten"
                    grain
                    grainIntensity={0.04}
                    mouseInteraction
                    mouseStrength={0.25}
                    opacity={0.5}
                    lightMode
                    backgroundColor="#f7f4ee"
                />
            </div>

            <div className="hv1-shell hv1-layout">
                {/* LEFT: copy */}
                <div className="hv1-copy">
                    <p className="hv1-eyebrow">{t("hero.tagline", "Empowering minds. Enriching futures.")}</p>

                    <h1 id="hv1-title" className="hv1-heading">
                        {t("hero.titlePart1", "Bihar State")}{" "}
                        <span className="hv1-heading-accent">{t("hero.titleHighlight", "Textbook")}</span>
                        <br />
                        {t("hero.titlePart2", "Publishing")}{" "}
                        {t("hero.titlePart3", "Corporation Ltd.")}
                    </h1>

                    <div className="hv1-cta-row">
                        <Link to="/#missions-grid" className="hv1-cta">
                            <span>{t("hero.exploreNow", "Explore Now")}</span>
                            <i aria-hidden="true"><ArrowRight size={18} /></i>
                        </Link>
                    </div>

                    <p className="hv1-provide">
                        <span className="hv1-provide-lead">{t("hero.provideLead", "BSTBPC provides")}</span>
                        <span className="hv1-drop">
                            <span>{t("hero.word1", "Textbooks")}</span>
                            <span>{t("hero.word2", "Audiobooks")}</span>
                            <span>{t("hero.word3", "Workbooks")}</span>
                            <span>{t("hero.word4", "EVERYTHING!")}</span>
                        </span>
                    </p>
                </div>

                {/* RIGHT: book shelf */}
                <div className="hv1-shelf" aria-hidden="true">
                    {books.map((book, i) => (
                        // The slot is the hover target and never moves, so straightening
                        // the book can't pull it out from under the cursor
                        <div key={book.key} className={`hv1-book-slot hv1-book-slot--${i + 1}`}>
                            <div className={`hv1-book hv1-book--${i + 1}`}>
                                <span className="hv1-book-star"><Star /></span>
                                <span className="hv1-book-label">{book.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
