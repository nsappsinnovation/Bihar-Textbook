import React from 'react';
import Hero from '../components/Hero';
import CoreMissions from '../components/CoreMissions';
import EventsSection from '../components/EventsSection';
import KeyParticipant from "../components/KeyParticipant";
import FlagshipEvents from "../components/FlagshipEvents";
import StakeHolder from "../components/StakeHolder";

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <KeyParticipant />
      <EventsSection />
      <FlagshipEvents />
      <CoreMissions />
      <StakeHolder />
    </div>
  )
}

export default Home;
