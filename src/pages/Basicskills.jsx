import React from 'react';
import { Shield, Award, Users } from 'lucide-react';
import MissionLandingLayout from '../components/MissionLandingLayout';

const Basicskills = () => {
  const pageData = {
    themeName: 'emerald',
    hero: {
      title: "Essential Basic Life Skills",
      highlight: "Learn Essential Daily Skills for Safe & Smart Living",
      description: "Practical lessons teaching students road safety, traffic rules, ATM usage, and responsible everyday behavior in modern society.",
      image: "/images/skills/a.png",
      imageClassName: "scale-[1.4] lg:-translate-x-48",
      action: {
        label: "Start Learning",
        path: "/life-skills"
      },
      features: [
        {
          icon: <Shield />,
          title: "Road Awareness",
          description: "Learn vital traffic signals, road crossing rules, and public safety protocols."
        },
        {
          icon: <Award />,
          title: "Financial Basics",
          description: "Understand modern banking, ATM usage, and safe money handling habits."
        },
        {
          icon: <Users />,
          title: "Everyday Responsibility",
          description: "Build discipline, situational awareness, and responsible behavior in public environments."
        }
      ]
    },
    overview: {
      title: "Program Overview",
      heading: "Empowering Students Through Basic Learning Skills",
      description: "Basic Life Skills focuses on essential everyday knowledge that every student must know to stay safe, independent, and responsible in their community and beyond.",
      image: "/images/skills/i.png",
      points: [
        "Complete understanding of traffic signals and safety rules",
        "Mastery of safe road crossing and pedestrian techniques",
        "Knowledge of essential banking and ATM usage procedures",
        "Basic money management and responsible saving habits"
      ]
    },
    modules: {
      title: "Skills Modules",
      heading: "Step-by-Step Learning Journey",
      items: [
        {
          title: "Road Safety & Signals",
          image: "/images/skills/a1.png",
          description: "Learn the meaning of traffic lights and how to follow signals properly to stay safe on the roads."
        },
        {
          title: "How to Use an ATM",
          image: "/images/skills/i1.png",
          description: "A step-by-step guide to safely using an ATM machine for banking needs."
        },
        {
          title: "Safe Road Crossing",
          image: "/images/skills/a2.png",
          description: "Understand the correct way to cross the road and avoid accidents in public areas."
        },
        {
          title: "Public Walking Rules",
          image: "/images/skills/a3.png",
          description: "Learn safe walking habits while using roads and navigating crowded public areas."
        },
        {
          title: "Basic Money Handling",
          image: "/images/skills/image.png",
          description: "Learn how to manage and count money responsibly in your daily life."
        }
      ]
    }
  };

  return <MissionLandingLayout {...pageData} />;
};

export default Basicskills;
