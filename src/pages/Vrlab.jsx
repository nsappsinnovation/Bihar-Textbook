import React from 'react';
import { Rocket, Target, Landmark } from 'lucide-react';
import MissionLandingLayout from '../components/MissionLandingLayout';

const Vrlab = () => {
  const pageData = {
    themeName: 'blue',
    hero: {
      title: "Immersive Virtual Reality Lab",
      highlight: "Explore Interactive VR Educational Adventures!",
      description: "Immersive VR learning experiences designed for Grades 8–12 students, bridging the gap between theory and reality.",
      image: "/images/vr/vr.png",
      action: {
        label: "Start Exploring",
        path: "/vr-dashboard"
      },
      features: [
        {
          icon: <Rocket />,
          title: "For Grades 8-12",
          description: "Tailored VR content specifically designed for middle and high school curriculums."
        },
        {
          icon: <Target />,
          title: "Curriculum Aligned",
          description: "Every module meets national educational standards for VR-based immersive learning."
        },
        {
          icon: <Landmark />,
          title: "Immersive VR Lessons",
          description: "Explore science labs, history tours, and space adventures in full 3D interactive environments."
        }
      ]
    },
    overview: {
      title: "Program Overview",
      heading: "Empowering Learning Through VR Education Tours",
      description: "Empowering Learning Through VR Education Tours means creating immersive learning experiences built on visual clarity, guided exploration, and accessibility. By combining virtual reality with thoughtfully designed visuals, we help learners connect with complex concepts.",
      image: "/images/vr/i3.png",
      points: [
        "Supports learning through full VR immersion and guided structure",
        "Bridges learning gaps through interactive virtual experiences",
        "Makes education engaging through exploration and storytelling",
        "Designed to support understanding beyond traditional textbooks"
      ]
    },
    modules: {
      title: "VR Modules",
      heading: "Interactive VR Learning Journey",
      items: [
        {
          title: "Explore Ancient History",
          image: "/images/vr/v1.png",
          description: "Step into ancient temples and monuments through immersive VR and explore history like you are really there."
        },
        {
          title: "Virtual Science Lab",
          image: "/images/vr/v2.png",
          description: "Experience futuristic science labs and explore DNA, biology, and experiments in a safe virtual environment."
        },
        {
          title: "Space Exploration",
          image: "/images/vr/v3.png",
          description: "Travel through galaxies, planets, and space missions using VR for an exciting astronomy learning experience."
        },
        {
          title: "Classroom VR Tours",
          image: "/images/vr/i2.png",
          description: "Students learn together using VR headsets in a guided classroom tour designed for interactive learning."
        }
      ]
    }
  };

  return <MissionLandingLayout {...pageData} />;
};

export default Vrlab;
