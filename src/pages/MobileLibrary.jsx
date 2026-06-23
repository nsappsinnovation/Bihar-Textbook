import React from 'react';
import { Globe, Laptop, MapPin } from 'lucide-react';
import MissionLandingLayout from '../components/MissionLandingLayout';

const MobileLibrary = () => {
  const pageData = {
    themeName: 'purple',
    hero: {
      title: "Mobile Library Initiative",
      highlight: "Reaching the Remotest Corners of Bihar",
      description: "Equipped with textbooks, reference books, and digital learning kiosks, our mobile library vans travel across districts to bring knowledge directly to unserved and rural communities.",
      image: "https://i.dawn.com/primary/2020/11/5fa1c8942bb12.jpg",
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
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
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
          image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=600",
          description: "Bringing educational resources to the most remote villages, ensuring no student is left behind."
        },
        {
          title: "Digital Kiosks",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
          description: "Equipped with tablets and laptops for digital learning and e-book access on the go."
        },
        {
          title: "Vast Collection",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
          description: "A wide variety of textbooks, reference materials, and storybooks for all age groups."
        },
        {
          title: "Guided Learning",
          image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600",
          description: "Educators travel with the vans to assist students, conduct reading sessions, and provide guidance."
        }
      ]
    }
  };

  return <MissionLandingLayout {...pageData} />;
};

export default MobileLibrary;
