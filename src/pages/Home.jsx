import Hero from '../components/Hero'
import CoreMissions from '../components/CoreMissions'
import EventsSection from '../components/EventsSection'
import KeyParticipant from "../components/KeyParticipant";
import FlagshipEvents from "../components/FlagshipEvents";
import StakeHolder from "../components/StakeHolder";

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <EventsSection />
      <CoreMissions />
      <KeyParticipant />
      <FlagshipEvents />
      <StakeHolder />
    </div>
  )
}

export default Home
