import React from 'react';
import { Calendar, MapPin, History } from 'lucide-react';
import MissionLandingLayout from '../components/MissionLandingLayout';

const PustakMela = () => {
  const pageData = {
    themeName: 'amber',
    hero: {
      title: "Bihar Pustak Mela",
      highlight: "Celebrating the Joy of Reading & Culture",
      description: "The Bihar Pustak Mela is an annual celebration of literature, heritage, and education, bringing together authors, publishers, and readers from across the country.",
      image: "/images/pustak mela/pustak mela.png",
      action: {
        label: "Explore Books",
        path: "/books/1"
      },
      features: [
        {
          icon: <Calendar />,
          title: "Annual Event",
          description: "A fixture in Bihar's cultural calendar."
        },
        {
          icon: <MapPin />,
          title: "Patna & More",
          description: "Rotating across major cities in Bihar."
        },
        {
          icon: <History />,
          title: "Promoting Literacy",
          description: "25Yrs+ of Legacy."
        }
      ]
    },
    overview: {
      title: "Program Overview",
      heading: "A Hub for Knowledge & Innovation",
      description: "Our mission is to foster a reading culture and provide a platform for educational excellence. We bring the best of literature and educational tools directly to the people of Bihar.",
      image: "/images/pustak mela/image.png",
      points: [
        "Promoting local and national publishers",
        "Fostering literacy among youth",
        "Showcasting digital educational tools",
        "Celebrating regional languages & arts"
      ]
    },
    modules: {
      title: "Highlights",
      heading: "Experience Pustak Mela",
      items: [
        {
          title: "Author Interactions",
          image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=600",
          description: "Meet your favorite authors, attend book signings, and participate in engaging literary discussions."
        },
        {
          title: "Digital Learning Expo",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
          description: "Experience the latest in educational technology, including e-books and interactive learning platforms."
        },
        {
          title: "Children's Corner",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
          description: "A dedicated space for young readers with storytelling, competitions, and fun educational games."
        },
        {
          title: "Cultural Showcase",
          image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600",
          description: "Celebrate Bihar's rich heritage through cultural performances and traditional art exhibitions."
        }
      ]
    }
  };

  return <MissionLandingLayout {...pageData} />;
};

export default PustakMela;
