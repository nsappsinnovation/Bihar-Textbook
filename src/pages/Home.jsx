
import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';

const MissionGrid = lazy(() => import('../components/missions/MissionGrid'));
const EvolutionMap = lazy(() => import('../components/EvolutionMap'));
const NoticeBoard = lazy(() => import('./navbar_pages/NoticeBoard'));
const CoreMissions = lazy(() => import('../components/missions/CoreMissions'));
const KeyParticipant = lazy(() => import('../components/KeyParticipant'));
const StakeHolder = lazy(() => import('../components/StakeHolder'));

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <MissionGrid />
        <EvolutionMap />
        <NoticeBoard />
        <CoreMissions />
        <KeyParticipant />
        <StakeHolder />
      </Suspense>
    </div>
  )
}

export default Home;

