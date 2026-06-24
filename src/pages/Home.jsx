
import CoreMissions from '../components/missions/CoreMissions'
import MissionGrid from '../components/missions/MissionGrid';
import React from 'react';
import Hero from '../components/Hero';
import KeyParticipant from "../components/KeyParticipant";
import NoticeBoard from "./navbar_pages/NoticeBoard";
import StakeHolder from "../components/StakeHolder";
import EvolutionMap from '../components/EvolutionMap';


const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <MissionGrid />
      <EvolutionMap />
      <NoticeBoard />
      <CoreMissions />
      <KeyParticipant />
      <StakeHolder />
    </div>
  )
}

export default Home;

