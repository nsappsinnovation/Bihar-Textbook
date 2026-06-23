import React from 'react';
import { Globe, Laptop, MapPin } from 'lucide-react';
import MissionLandingLayout from './MissionLandingLayout';

const MobileLibrary = () => {
  const pageData = {
    themeName: 'purple',
    hero: {
      title: "Mobile Library Initiative",
      highlight: "Reaching the Remotest Corners of Bihar",
      description: "Equipped with textbooks, reference books, and digital learning kiosks, our mobile library vans travel across districts to bring knowledge directly to unserved and rural communities.",
      image: "/images/generated/mobile_library_van.png",
      action: {
        label: "Track the Van",
        path: "/"
      },
      features: [
        {
          icon: <Globe />,
          title: "State-wide Reach",
          description: "Covering all remote districts."
        },
        {
          icon: <Laptop />,
          title: "Tech-Enabled",
          description: "Digital kiosks on wheels."
        },
        {
          icon: <MapPin />,
          title: "Community Access",
          description: "Village-to-village routes."
        }
      ]
    },
    overview: {
      title: "Initiative Overview",
      heading: "Delivering Education To Your Doorstep",
      description: "The Mobile Library is designed to bridge the gap in educational access by bringing a wealth of reading materials and digital resources straight to students who cannot easily reach traditional libraries.",
      image: "/images/generated/mobile_overview.png",
      points: [
        "Reach unserved areas",
        "Promote literacy in villages",
        "Provide access to technology",
        "Encourage community learning"
      ]
    },
    modules: {
      title: "Features",
      heading: "Explore The Library Van",
      items: [
        {
          title: "Remote Access",
          image: "/images/generated/mobile_remote_access.png",
          description: "Bringing educational resources to the most remote villages, ensuring no student is left behind."
        },
        {
          title: "Digital Kiosks",
          image: "/images/generated/mobile_digital_kiosks.png",
          description: "Equipped with tablets and laptops for digital learning and e-book access on the go."
        },
        {
          title: "Vast Collection",
          image: "/images/generated/mobile_vast_collection.png",
          description: "A wide variety of textbooks, reference materials, and storybooks for all age groups."
        },
        {
          title: "Guided Learning",
          image: "/images/generated/mobile_guided_learning.png",
          description: "Educators travel with the vans to assist students, conduct reading sessions, and provide guidance."
        }
      ]
    }
  };

  return <MissionLandingLayout {...pageData} />;
};

export default MobileLibrary;

