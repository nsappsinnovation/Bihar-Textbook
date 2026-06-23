import React from 'react';
import { Shield, Lock, Zap } from 'lucide-react';
import MissionLandingLayout from '../components/MissionLandingLayout';

const CyberSecurity = () => {
  const pageData = {
    themeName: 'emerald',
    hero: {
      title: "Cyber Security Awareness",
      highlight: "Learn Online Safety, Scam Protection & Secure Digital Habits!",
      description: "Practical cyber security lessons designed to protect students from phishing, malware, OTP fraud, fake links, and online threats.",
      image: "/images/skills/c.png",
      imageClassName: "scale-[1.4] lg:-translate-x-48",
      action: {
        label: "Start Learning",
        path: "/cyber-security-dashboard"
      },
      features: [
        {
          icon: <Shield />,
          title: "Scam Protection",
          description: "Learn to identify and avoid common online scams and phishing attacks."
        },
        {
          icon: <Lock />,
          title: "Account Security",
          description: "Master password management and two-factor authentication."
        },
        {
          icon: <Zap />,
          title: "Device Protection",
          description: "Understand malware and how to keep your devices clean and updated."
        }
      ]
    },
    overview: {
      title: "Program Overview",
      heading: "Protecting Students in the Digital Age",
      description: "Our Cyber Security initiative is dedicated to educating students about the risks of the digital world. By teaching practical safety habits, we empower the next generation to use technology responsibly and safely.",
      image: "/images/generated/cyber_ai_images.png",
      points: [
        "Understand phishing, scam calls, and fake links",
        "Build strong password habits and enable 2FA",
        "Protect your identity and personal data online",
        "Learn to recognize AI deepfakes and fake profiles"
      ]
    },
    modules: {
      title: "Security Modules",
      heading: "Interactive Security Journey",
      items: [
        {
          title: "AI Deepfakes & Photo Safety",
          image: "/images/generated/cyber_deepfakes.png",
          description: "Learn how AI-generated images and deepfake photos can be misused online and how to protect yourself on social media."
        },
        {
          title: "Phishing & Scams",
          image: "/images/generated/cyber_phishing.png",
          description: "Understand how attackers trick humans using fake emails, calls, messages, and emotional pressure."
        },
        {
          title: "AI-Generated Images",
          image: "/images/generated/cyber_ai_images.png",
          description: "Learn how AI-generated images can be used to spread misinformation and how to recognize them."
        },
        {
          title: "Passwords & Account Protection",
          image: "/images/skills/cybert.png",
          description: "Learn how to protect your accounts using strong passwords, password managers, and good login habits."
        },
        {
          title: "Two-Factor Authentication (2FA)",
          image: "/images/skills/c4.png",
          description: "Learn why 2FA is the best defense against hacking and how to enable it on your accounts."
        },
        {
          title: "Malware & Device Security",
          image: "/images/skills/c5.png",
          description: "Understand how malware infects devices and how antivirus, updates, and backups protect your system."
        }
      ]
    }
  };

  return <MissionLandingLayout {...pageData} />;
};

export default CyberSecurity;
