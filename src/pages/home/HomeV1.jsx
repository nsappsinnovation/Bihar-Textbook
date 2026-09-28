import React, { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import V1Hero from "../../components/home-v1/V1Hero";

const V1Programmes = lazy(() => import("../../components/home-v1/V1Programmes"));
const EvolutionMap = lazy(() => import("../../components/EvolutionMap"));
const V1About = lazy(() => import("../../components/home-v1/V1About"));
const CoreMissions = lazy(() => import("../../components/missions/CoreMissions"));
const V1Notices = lazy(() => import("../../components/home-v1/V1Notices"));
const KeyParticipant = lazy(() => import("../../components/KeyParticipant"));
const StakeHolder = lazy(() => import("../../components/StakeHolder"));
const V1Bookshelf = lazy(() => import("../../components/home-v1/V1Bookshelf"));

// A section further down the page: its code, data and images load only when the reader scrolls
// near it (a screen ahead), with a placeholder of similar height until then.
function WhenNear({ minHeight, children }) {
  const { ref, inView } = useInView({ rootMargin: "800px 0px", triggerOnce: true });
  const placeholder = <div style={{ minHeight }} />;
  return (
    <div ref={ref}>
      {inView ? <Suspense fallback={placeholder}>{children}</Suspense> : placeholder}
    </div>
  );
}

// Home page, version 1: modelled on the Purchase Preference Portal, kept calm and spacious.
// Pillars, Voices and Leadership are the original home page's sections, shared with "/".
// Backgrounds alternate: sky hero, white, sky, near-white, navy, white, pale sky, navy, near-white.
export default function HomeV1() {
  return (
    <div className="bg-white">
      <V1Hero />
      {/* Right below the hero (and the "/#missions-grid" target): loaded straight away */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <V1Bookshelf />
        <V1Programmes />
      </Suspense>
      <WhenNear minHeight={720}>
        <EvolutionMap />
      </WhenNear>
      <WhenNear minHeight={560}>
        <V1About />
      </WhenNear>
      <WhenNear minHeight={640}>
        <CoreMissions />
      </WhenNear>
      <WhenNear minHeight={600}>
        <V1Notices />
      </WhenNear>
      <WhenNear minHeight={640}>
        <KeyParticipant />
      </WhenNear>
      <WhenNear minHeight={360}>
        <StakeHolder />
      </WhenNear>
    </div>
  );
}
