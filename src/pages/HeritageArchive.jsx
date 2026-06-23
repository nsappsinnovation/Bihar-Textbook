import React from 'react';
import { Landmark, Database, Search } from 'lucide-react';
import MissionLandingLayout from '../components/MissionLandingLayout';

const HeritageArchive = () => {
  const pageData = {
    themeName: 'amber',
    hero: {
      title: "Education Heritage Archive",
      highlight: "Preserving the Legacy of Education",
      description: "A centralized digital repository safeguarding Bihar's rich educational history and artifacts for future generations.",
      image: "/images/heritage/heritage archive.png",
      action: {
        label: "Start Learning",
        path: "/heritage-dashboard"
      },
      features: [
        {
          icon: <Landmark />,
          title: "Historical Preservation",
          description: "Protection and preservation of rare books, manuscripts, and fragile documents."
        },
        {
          icon: <Database />,
          title: "Digital Accessibility",
          description: "High-quality digital versions accessible to everyone, anywhere in the world."
        },
        {
          icon: <Search />,
          title: "Research Ready",
          description: "A searchable database designed specifically for historians, researchers, and academicians."
        }
      ]
    },
    overview: {
      title: "Program Overview",
      heading: "Saving Our Educational History",
      description: "The Heritage Archive project is a monumental effort to digitize and preserve the educational artifacts of the region. From ancient manuscripts to early textbooks, we are ensuring knowledge of the past is preserved.",
      image: "/assets/library-heritage.png",
      points: [
        "Active preservation of rare and fragile educational documents",
        "High-quality digital scanning for maximum detail retention",
        "Global online public access to historical educational records",
        "Comprehensive educational resource for researchers and students"
      ]
    },
    modules: {
      title: "Preservation Workflow",
      heading: "Historical Archiving Journey",
      items: [
        {
          title: "Document Collection",
          image: "/images/generated/heritage_collection.png",
          description: "Gathering historical textbooks, manuscripts, and educational records from across Bihar."
        },
        {
          title: "Digitization Phase",
          image: "/images/generated/heritage_archive_indian.png",
          description: "High-resolution scanning and OCR processing to convert physical copies into digital formats."
        },
        {
          title: "Digital Cataloging",
          image: "/images/generated/pustak_digital.png",
          description: "Organizing digital assets into a searchable and structured database for global access."
        },
        {
          title: "Public Access Portal",
          image: "/images/generated/mobile_digital_kiosks.png",
          description: "Making the archive available to researchers, students, and historians worldwide online."
        }
      ]
    }
  };

  return <MissionLandingLayout {...pageData} />;
};

export default HeritageArchive;
