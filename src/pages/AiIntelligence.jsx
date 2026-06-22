import React from 'react';
import { Brain, Activity, Zap } from 'lucide-react';
import MissionLandingLayout from '../components/MissionLandingLayout';

const AiIntelligence = () => {
  const pageData = {
    themeName: 'blue',
    hero: {
      title: "AI Intelligence Programs",
      highlight: "Smart Adaptive Tutoring for Every Student",
      description: "Leveraging artificial intelligence to provide personalized learning experiences and real-time support for 21st-century learners.",
      image: "/images/ai/hero_new.png",
      action: {
        label: "Start Learning",
        path: "/ai-intelligence-dashboard"
      },
      features: [
        {
          icon: <Brain />,
          title: "Adaptive Learning",
          description: "Educational content that automatically adjusts to each student's unique learning pace."
        },
        {
          icon: <Activity />,
          title: "Data Driven Insights",
          description: "Deep performance analytics based on real-time data to help students improve."
        },
        {
          icon: <Zap />,
          title: "Smart Recommendations",
          description: "Get suggested topics and exercises to instantly improve weak areas and reinforce strengths."
        }
      ]
    },
    overview: {
      title: "Program Overview",
      heading: "The Future of Learning with AI Intelligence",
      description: "AI Intelligence in education transforms how students learn and teachers teach. By utilizing advanced algorithms, we create a dynamic educational environment that understands the unique needs of every learner.",
      image: "/images/ai/program_overview.png",
      points: [
        "Personalized learning paths for every student",
        "Instant feedback and detailed step-by-step explanations",
        "Predictive analytics to identify and bridge learning gaps",
        "24/7 intelligent tutoring and support assistance"
      ]
    },
    modules: {
      title: "AI Modules",
      heading: "Smart Learning Journey",
      items: [
        {
          title: "Smart Assessment",
          image: "/images/ai/step1.png",
          description: "Analyze student strengths and weaknesses through adaptive quizzes and initial screening."
        },
        {
          title: "Personalized Roadmap",
          image: "/images/ai/step2.png",
          description: "Generate a custom learning path with curated content matching the student's pace and style."
        },
        {
          title: "Real-time Feedback",
          image: "/images/ai/step3.png",
          description: "Instant corrections and explanations for exercises to ensure concept mastery."
        },
        {
          title: "Progress Analytics",
          image: "/images/ai/step4.png",
          description: "Comprehensive dashboards for students and teachers to track improvement over time."
        }
      ]
    }
  };

  return <MissionLandingLayout {...pageData} />;
};

export default AiIntelligence;
