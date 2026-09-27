import React, { lazy, Suspense } from "react";
import V2Hero from "../../components/home-v2/V2Hero";

const V2Marquee = lazy(() => import("../../components/home-v2/V2Marquee"));
const V2Stats = lazy(() => import("../../components/home-v2/V2Stats"));
const V2Features = lazy(() => import("../../components/home-v2/V2Features"));
const V2About = lazy(() => import("../../components/home-v2/V2About"));
const V2Quotes = lazy(() => import("../../components/home-v2/V2Quotes"));
const NoticeBoard = lazy(() => import("../navbar_pages/NoticeBoard"));

// Home page, version 2 ("Editorial"): serif headlines, image collages with floating
// labels and tinted panels. Backgrounds run white, sky, white, navy, cream, blue.
export default function HomeV2() {
  return (
    <div className="bg-white">
      <V2Hero />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <V2Marquee />
        <V2Stats />
        <V2Features />
        <V2About />
        <V2Quotes />
        <NoticeBoard tone="blue" />
      </Suspense>
    </div>
  );
}
