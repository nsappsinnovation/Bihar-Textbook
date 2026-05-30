import React from 'react';
import { Languages, BookOpen, Globe } from 'lucide-react';
import MissionLandingLayout from '../components/MissionLandingLayout';

const Linguistic = () => {
  const pageData = {
    themeName: 'blue',
    hero: {
      title: "Diverse Linguistic Learning Programs",
      highlight: "Empowering Multilingual Education Through Immersion",
      description: "Interactive multilingual learning programs designed for Grades 8–12 students, covering regional and global languages.",
      image: "/images/linguistic/l.png",
      action: {
        label: "Start Learning",
        path: "/ling"
      },
      features: [
        {
          icon: <Globe />,
          title: "Multilingual Learning",
          description: "Support for learning and understanding multiple languages to build global communication skills."
        },
        {
          icon: <BookOpen />,
          title: "Language Skill Development",
          description: "Focus on reading, writing, speaking, and listening skills to strengthen language proficiency."
        },
        {
          icon: <Languages />,
          title: "Cultural & Communication Awareness",
          description: "Learn languages alongside cultural context to improve communication and understanding across communities."
        }
      ]
    },
    overview: {
      title: "Program Overview",
      heading: "Preserving Bihar's Linguistic Heritage",
      description: "Our Linguistics initiative is dedicated to the documentation, study, and promotion of Bihar's diverse regional languages and dialects. By creating comprehensive educational resources, we foster an inclusive environment where students can stay rooted in their cultural identity while achieving academic excellence.",
      image: "/images/linguistic/l6.png",
      points: [
        "Detailed documentation of endangered and native dialects",
        "Creation of specialized textbooks for multilingual education",
        "Promotes cultural pride and inclusive learning",
        "Advanced research and language preservation strategies"
      ]
    },
    modules: {
      title: "Language Modules",
      heading: "Interactive Language Learning Journey",
      items: [
        {
          title: "Multilingual Storytelling Sessions",
          image: "/images/linguistic/l1.png",
          description: "Students explore regional and global languages through guided storytelling and immersive audio-visual lessons."
        },
        {
          title: "Live Conversation Practice",
          image: "/images/linguistic/l2.png",
          description: "Real-time speaking sessions with guided pronunciation and peer interaction."
        },
        {
          title: "Regional Language Labs",
          image: "/images/linguistic/l3.png",
          description: "Dedicated digital labs for Hindi, Tamil, Telugu, Bengali and more."
        },
        {
          title: "Global Language Immersion",
          image: "/images/linguistic/l3.png",
          description: "Explore French, Spanish, Arabic and other global languages through immersive tools."
        },
        {
          title: "Inclusive Language Learning",
          image: "/images/linguistic/l5.png",
          description: "Accessible language education with subtitles, audio support and inclusive design."
        }
      ]
    }
  };

  return <MissionLandingLayout {...pageData} />;
};

export default Linguistic;
