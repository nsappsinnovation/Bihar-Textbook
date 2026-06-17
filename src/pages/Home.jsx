
import CoreMissions from '../components/CoreMissions'
import MissionGrid from '../components/MissionGrid';
import React from 'react';
import Hero from '../components/Hero';
import KeyParticipant from "../components/KeyParticipant";
import FlagshipEvents from "../components/FlagshipEvents";
import StakeHolder from "../components/StakeHolder";


const Home = () => {
  return (
    <div className="bg-white">
      <Hero />

      <MissionGrid />
      <FlagshipEvents />
      <CoreMissions />
      <KeyParticipant />

      <StakeHolder />
    </div>
  )
}

export default Home;
