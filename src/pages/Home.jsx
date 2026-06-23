
import CoreMissions from '../missions/CoreMissions'
import MissionGrid from '../missions/MissionGrid';
import React from 'react';
import Hero from '../components/Hero';
import KeyParticipant from "../components/KeyParticipant";
import NoticeBoard from "../components/NoticeBoard";
import StakeHolder from "../components/StakeHolder";


const Home = () => {
  return (
    <div className="bg-white">
      <Hero />

      <MissionGrid />
      <NoticeBoard />
      <CoreMissions />
      <KeyParticipant />

      <StakeHolder />
    </div>
  )
}

export default Home;

