import React, { lazy, Suspense } from "react";
import V1Hero from "../../components/home-v1/V1Hero";

const V1Programmes = lazy(() => import("../../components/home-v1/V1Programmes"));
const EvolutionMap = lazy(() => import("../../components/EvolutionMap"));
const V1About = lazy(() => import("../../components/home-v1/V1About"));
const CoreMissions = lazy(() => import("../../components/missions/CoreMissions"));
const V1Notices = lazy(() => import("../../components/home-v1/V1Notices"));
const KeyParticipant = lazy(() => import("../../components/KeyParticipant"));
const StakeHolder = lazy(() => import("../../components/StakeHolder"));
const V1Bookshelf = lazy(() => import("../../components/home-v1/V1Bookshelf"));

// Home page, version 1: modelled on the Purchase Preference Portal, kept calm and spacious.
// Pillars, Voices and Leadership are the original home page's sections, shared with "/".
// Backgrounds alternate: sky hero, white, sky, near-white, navy, white, pale sky, navy, near-white.
export default function HomeV1() {
  return (
    <div className="bg-white">
      <V1Hero />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <V1Bookshelf />
        <V1Programmes />
        <EvolutionMap />
        <V1About />
        <CoreMissions />
        <V1Notices />
        <KeyParticipant />
        <StakeHolder />
      </Suspense>
    </div>
  );
}
