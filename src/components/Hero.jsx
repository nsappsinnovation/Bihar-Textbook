import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Threads from './Threads';

// #124d9c, the brand mid-blue, as the shader's 0–1 colour channels
const THREAD_COLOR = [0.071, 0.302, 0.612];

const Hero = () => {
    const { t } = useTranslation();
    const heroRef = useRef(null);

    const features = [
        `${t("hero.feat1Line1", "QUALITY")} ${t("hero.feat1Line2", "CONTENT")}`,
        `${t("hero.feat2Line1", "LEARNING")} ${t("hero.feat2Line2", "FOR ALL")}`,
        `${t("hero.feat3Line1", "INCLUSIVE")} ${t("hero.feat3Line2", "EDUCATION")}`,
        `${t("hero.feat4Line1", "EMPOWERING")} ${t("hero.feat4Line2", "BIHAR")}`,
    ];

    // Publishing leads; the eight sections of the site follow as what else we offer
    const marqueeLines = [
        t("hero.marquee1", "Publishing the textbooks that reach every Bihar Board classroom, from Class 1 to Class 12."),
        t("hero.marquee2", "Beyond the printed page: virtual reality labs, audiobooks, sign language, AI, cyber safety, heritage and life skills."),
    ];

    // Two identical copies make the loop seamless; only the first is read out
    const marqueeCopy = (hidden) => (
        <div className="hv1-marquee-copy" aria-hidden={hidden || undefined}>
            {marqueeLines.map((line, i) => (
                <React.Fragment key={i}>
                    <span>{line}</span>
                    <span className="hv1-marquee-sep">✦</span>
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <section className="hv1 font-manrope" id="top" aria-labelledby="hv1-title" ref={heroRef}>
            {/* Decorative WebGL backdrop, behind the grid and the text */}
            <div className="hv1-threads" aria-hidden="true">
                <Threads
                    color={THREAD_COLOR}
                    amplitude={1}
                    distance={0}
                    enableMouseInteraction
                    interactionTarget={heroRef}
                />
            </div>

            <div className="hv1-shell hv1-inner">
                {/* Masthead band */}
                <div className="hv1-masthead">
                    <div className="hv1-movement">
                        <span>{t("hero.tagline", "Empowering minds. Enriching futures.")}</span>
                        <strong>{t("hero.floatingText", "Ensuring access to quality textbooks for learners across Bihar.")}</strong>
                    </div>
                </div>

                {/* Title band */}
                <div className="hv1-title-block">
                    <p className="hv1-eyebrow">{features.join(" · ")}</p>

                    <h1 id="hv1-title" className="hv1-heading">
                        {t("hero.titlePart1", "Bihar State")}{" "}
                        <span className="hv1-heading-accent">{t("hero.titleHighlight", "Textbook")}</span>
                        <br />
                        {t("hero.titlePart2", "Publishing")}{" "}
                        {t("hero.titlePart3", "Corporation Ltd.")}
                    </h1>
                </div>
            </div>

            {/* Running strip along the bottom edge */}
            <div className="hv1-marquee-wrap">
                <div className="hv1-marquee-track">
                    <div className="hv1-marquee">
                        {marqueeCopy(false)}
                        {marqueeCopy(true)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
