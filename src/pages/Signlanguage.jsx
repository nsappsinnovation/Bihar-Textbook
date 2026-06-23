import React from 'react';
import { Users, Target, BookOpen } from 'lucide-react';
import MissionLandingLayout from '../components/MissionLandingLayout';

const Signlanguage = () => {
  const pageData = {
    themeName: 'blue',
    hero: {
      title: "Learn Sign Language",
      highlight: "Master ASL with Fun and Engaging Lessons!",
      description: "Interactive and engaging lessons designed for 8th to 12th class students.",
      image: "/images/hello.png",
      imageClassName: "scale-[1.4] lg:-translate-x-48",
      action: {
        label: "Start Learning",
        path: "/sign-learn"
      },
      features: [
        {
          icon: <Users />,
          title: "For Grades 8–12",
          description: "Tailored content for middle and high school students."
        },
        {
          icon: <Target />,
          title: "Curriculum Aligned",
          description: "Meets educational standards for sign language learning."
        },
        {
          icon: <BookOpen />,
          title: "100+ Video Lessons",
          description: "Comprehensive library of step-by-step ASL tutorials."
        }
      ]
    },
    overview: {
      title: "Program Overview",
      heading: "Empowering Communication Through Sign Language",
      description: "Empowering Communication Through Sign Language means creating inclusive learning experiences that rely on visual clarity, structured expression, and accessibility. By combining sign language with thoughtfully designed visuals, we enable learners of all abilities to understand, express, and connect—without barriers imposed by spoken language.",
      image: "/images/generated/sign_numbers.png",
      points: [
        "A visual-first approach to inclusive learning and expression",
        "Bridging communication gaps through accessible visual language",
        "Making language accessible through signs, visuals, and clarity",
        "Designed to support understanding beyond spoken words"
      ]
    },
    modules: {
      title: "Language Modules",
      heading: "Interactive Sign Language Journey",
      items: [
        {
          title: "Sign Language Basics: Numbers (1-10)",
          image: "/images/generated/sign_numbers.png",
          description: "Visual introduction to numbers 1 to 10 using clear and easy-to-follow sign language gestures."
        },
        {
          title: "Hindi Swar (स्वर) in Sign Language",
          image: "/images/generated/sign_hindi_swar.png",
          description: "Visual learning of Hindi vowels from अ to अं (अंग) using clear and expressive sign language gestures."
        },
        {
          title: "Greetings in Sign Language: Good Morning",
          image: "/images/generated/sign_greetings.png",
          description: "Step-by-step demonstration of how to sign common greetings like 'Good Morning' clearly."
        },
        {
          title: "Sign Language Alphabets (A-Z)",
          image: "/images/generated/sign_alphabets.png",
          description: "Complete visual guide to signing alphabets from A to Z for spelling and name signs."
        }
      ]
    }
  };

  return <MissionLandingLayout {...pageData} />;
};

export default Signlanguage;
