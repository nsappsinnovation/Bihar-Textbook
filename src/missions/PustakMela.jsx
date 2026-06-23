import React from 'react';
import { Calendar, MapPin, History } from 'lucide-react';
import MissionLandingLayout from './MissionLandingLayout';

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
          image: "/images/generated/pustak_author.png",
          description: "Meet your favorite authors, attend book signings, and participate in engaging literary discussions."
        },
        {
          title: "Digital Learning Expo",
          image: "/images/generated/pustak_digital.png",
          description: "Experience the latest in educational technology, including e-books and interactive learning platforms."
        },
        {
          title: "Children's Corner",
          image: "/images/generated/pustak_children.png",
          description: "A dedicated space for young readers with storytelling, competitions, and fun educational games."
        },
        {
          title: "Cultural Showcase",
          image: "/images/generated/pustak_cultural.png",
          description: "Celebrate Bihar's rich heritage through cultural performances and traditional art exhibitions."
        }
      ]
    }
  };

  return <MissionLandingLayout {...pageData} />;
};

export default PustakMela;

