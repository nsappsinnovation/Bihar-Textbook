import Hero from '../components/Hero'
import CoreMissions from '../components/CoreMissions'
import EventsSection from '../components/EventsSection'

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <EventsSection />
      <CoreMissions />
      {/* Other sections will follow */}
    </div>
  )
}

export default Home
