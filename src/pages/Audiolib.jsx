import React from 'react';
import { Headphones, BookOpen, Rocket } from 'lucide-react';
import MissionLandingLayout from '../components/MissionLandingLayout';

const Audiolib = () => {
  const pageData = {
    themeName: 'blue',
    hero: {
      title: "Enriching Audio Learning Programs",
      highlight: "Empowering Education Through Auditory Immersion",
      description: "Interactive audio-book learning programs designed for Grades 8–12 students, offering a vast library of knowledge and stories.",
      image: "/images/audio/audio.png",
      action: {
        label: "Start Listening",
        path: "/audio-library-dashboard"
      },
      features: [
        {
          icon: <Headphones />,
          title: "Hands-Free Learning",
          description: "Learn while walking, traveling, or relaxing with our seamless audio player."
        },
        {
          icon: <BookOpen />,
          title: "Huge Audio Library",
          description: "Access a curated collection of stories, lessons, and academic resources."
        },
        {
          icon: <Rocket />,
          title: "Learn Anytime, Anywhere",
          description: "Perfect for students, families, and professionals looking to grow their skills on the go."
        }
      ]
    },
    overview: {
      title: "Program Overview",
      heading: "Empowering Learning Through Auditory Resources",
      description: "Our Audio Learning initiative helps students gain knowledge through listening, making education more flexible and accessible. With engaging narration, students can explore stories, concepts, and skills without being limited to traditional reading methods.",
      image: "/images/generated/audiolib_shared_learning.png",
      points: [
        "Supports learning for all reading preferences and abilities",
        "Improves listening, comprehension, and vocabulary",
        "Perfect for multitasking and active learning",
        "Encourages family engagement and shared learning"
      ]
    },
    modules: {
      title: "Audio Modules",
      heading: "Interactive Audio Learning Journey",
      items: [
        {
          title: "Diverse Content and Accessibility",
          image: "/images/generated/audiolib_diverse_content.png",
          description: "Audiobooks offer a vast library of knowledge and stories, making learning accessible to everyone, including learners with different reading preferences."
        },
        {
          title: "Professional Development",
          image: "/images/generated/audiolib_professional_development.png",
          description: "Audiobooks are an excellent resource for professional growth, helping learners build new skills through structured audio learning."
        },
        {
          title: "Active and Hands-Free Learning",
          image: "/images/generated/audiolib_hands_free.png",
          description: "Audiobooks support hands-free learning for active students—perfect during workouts, traveling, or daily routines."
        },
        {
          title: "Shared Learning and Engagement",
          image: "/images/generated/audiolib_shared_learning.png",
          description: "Audiobooks are great for shared learning, especially for families. Parents and children can enjoy stories together."
        }
      ]
    }
  };

  return <MissionLandingLayout {...pageData} />;
};

export default Audiolib;
