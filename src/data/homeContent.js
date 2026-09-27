// Home page content shared by the original home page and its /v1, /v2 versions
import { FiBookOpen, FiCreditCard, FiSun, FiTruck, FiUsers, FiZap } from "react-icons/fi";
import { RiGraduationCapLine, RiLeafLine } from "react-icons/ri";

export const testimonials = [
  { id: 1, quote: "\"Education must build character, discipline, and a spirit of service to the nation.\"", name: "Dr. Rajendra Prasad", role: "FIRST PRESIDENT OF INDIA | FROM BIHAR" },
  { id: 2, quote: "\"The purpose of education is not only employment, but the awakening of social responsibility.\"", name: "Jayaprakash Narayan", role: "LOKNAYAK | SOCIAL REFORMER" },
  { id: 3, quote: "\"Education is the strongest foundation on which a modern and progressive Bihar can be built.\"", name: "Satyendra Narayan Sinha", role: "FORMER CHIEF MINISTER | EDUCATION REFORMER" },
  { id: 4, quote: "\"The progress of Bihar depends on schools, colleges, good governance, and equal opportunity for all.\"", name: "Shri Krishna Sinha", role: "FIRST CHIEF MINISTER OF BIHAR" },
  { id: 5, quote: "\"Knowledge becomes meaningful when it is used for public service and social development.\"", name: "Anugrah Narayan Sinha", role: "BIHAR VIBHUTI | EDUCATIONIST" },
  { id: 6, quote: "\"Education should not remain a privilege of a few; it must become the strength of every common student.\"", name: "Karpoori Thakur", role: "JAN NAYAK | FORMER CHIEF MINISTER" },
  { id: 7, quote: "\"The doors of education must remain open for the poor, the backward, and the marginalized.\"", name: "Karpoori Thakur", role: "JAN NAYAK | FORMER CHIEF MINISTER" },
  { id: 8, quote: "\"Educating children, especially girls, is the most powerful way to change the future of Bihar.\"", name: "Shri Nitish Kumar", role: "Ex-CHIEF MINISTER, BIHAR" },
  { id: 9, quote: "\"A society moves forward when every child receives education, dignity, and opportunity.\"", name: "Jagjivan Ram", role: "NATIONAL LEADER | SOCIAL JUSTICE LEADER" },
  { id: 10, quote: "\"Education gives confidence to the weak, dignity to the poor, and strength to democracy.\"", name: "Jagjivan Ram", role: "NATIONAL LEADER | SOCIAL JUSTICE LEADER" },
  { id: 11, quote: "\"Education creates the intellectual strength required for public life, self-governance, and national progress.\"", name: "Dr. Sachchidananda Sinha", role: "EDUCATIONIST | CONSTITUENT ASSEMBLY PRESIDENT" },
  { id: 12, quote: "\"The real power of learning lies in creating responsible citizens and a just society.\"", name: "Dr. Sachchidananda Sinha", role: "EDUCATIONIST | CONSTITUENT ASSEMBLY PRESIDENT" },
  { id: 13, quote: "\"Good education must reach the village, the poor household, and the first-generation learner.\"", name: "Ramdhari Singh Dinkar", role: "RASHTRAKAVI | EDUCATIONAL THINKER" },
  { id: 14, quote: "\"Learning is the light that removes fear, inequality, and darkness from society.\"", name: "Ramdhari Singh Dinkar", role: "RASHTRAKAVI | EDUCATIONAL THINKER" },
  { id: 15, quote: "\"A strong education system is the path to a strong Bihar, a strong society, and a strong India.\"", name: "Shri Nitish Kumar", role: "Ex-CHIEF MINISTER, BIHAR" }
];

export const getInitials = (name) => {
  const map = {
    "Dr. Rajendra Prasad": "RP",
    "Jayaprakash Narayan": "JN",
    "Satyendra Narayan Sinha": "SS",
    "Shri Krishna Sinha": "SK",
    "Anugrah Narayan Sinha": "AS",
    "Karpoori Thakur": "KT",
    "Shri Nitish Kumar": "NK",
    "Jagjivan Ram": "JR",
    "Dr. Sachchidananda Sinha": "DS",
    "Ramdhari Singh Dinkar": "RS"
  };
  if (map[name]) return map[name];
  const words = name.replace(/^(Dr\.\s*)/i, '').trim().split(' ');
  if (words.length >= 2) return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

export const defaultMissions = [
    {
        id: 1,
        titleKey: "missionGrid.vr.title",
        defaultTitle: "Virtual Reality Lab",
        descKey: "missionGrid.vr.desc",
        defaultDesc: "Immersive Learning Experiences",
        image: "/images/missions/headset.webp",
        hoverImage: "/images/missions/headsethov.webp",
        link: "/vr-dashboard",
    },
    {
        id: 2,
        titleKey: "missionGrid.audio.title",
        defaultTitle: "Audio Library",
        descKey: "missionGrid.audio.desc",
        defaultDesc: "Accessible Digital Content",
        image: "/images/missions/audio-book.webp",
        hoverImage: "/images/missions/audio-bookhov.webp",
        link: "/audio-library-dashboard",
    },
    {
        id: 3,
        titleKey: "missionGrid.sign.title",
        defaultTitle: "Sign Language",
        descKey: "missionGrid.sign.desc",
        defaultDesc: "Inclusive Educational Tools",
        image: "/images/missions/friend.webp",
        hoverImage: "/images/missions/friendhov.webp",
        link: "/sign-learn",
    },
    {
        id: 4,
        titleKey: "missionGrid.diverse.title",
        defaultTitle: "Diverse Language",
        descKey: "missionGrid.diverse.desc",
        defaultDesc: "Universal Digital Access",
        image: "/images/missions/diverse.webp",
        hoverImage: "/images/missions/diversehov.webp",
        link: "/ling",
    },
    {
        id: 5,
        titleKey: "missionGrid.ai.title",
        defaultTitle: "AI Intelligence",
        descKey: "missionGrid.ai.desc",
        defaultDesc: "Smart Adaptive Tutoring",
        image: "/images/missions/ai.webp",
        hoverImage: "/images/missions/aihov.webp",
        link: "/ai-intelligence-dashboard",
    },
    {
        id: 7,
        titleKey: "missionGrid.cyber.title",
        defaultTitle: "Cyber Security",
        descKey: "missionGrid.cyber.desc",
        defaultDesc: "Digital Safety & Ethics",
        image: "/images/missions/cyber-security.webp",
        hoverImage: "/images/missions/cyber-securityhov.webp",
        link: "/cyber-security-dashboard",
    },
    {
        id: 8,
        titleKey: "missionGrid.heritage.title",
        defaultTitle: "Heritage Archive",
        descKey: "missionGrid.heritage.desc",
        defaultDesc: "Cultural Document Preservation",
        image: "/images/missions/history.webp",
        hoverImage: "/images/missions/historyhov.webp",
        link: "/heritage-dashboard",
    },
    {
        id: 10,
        titleKey: "missionGrid.skills.title",
        defaultTitle: "Basic Learning Skills",
        descKey: "missionGrid.skills.desc",
        defaultDesc: "Communication & Life Skills",
        image: "/images/missions/abilities.webp",
        hoverImage: "/images/missions/abilitieshov.webp",
        link: "/life-skills",
    }
];

// The eight pillars, shared with the other home page versions
export const coreMissions = [
  {
    id: 1,
    titleKey: "coreMissions.items.title0",
    descKey: "coreMissions.items.desc0",
    title: "Accessible Learning Resources",
    icon: FiUsers,
    color: "#6366f1",
    description:
      "Making textbooks and learning resources accessible to learners across Bihar.",
  },
  {
    id: 2,
    titleKey: "coreMissions.items.title1",
    descKey: "coreMissions.items.desc1",
    title: "Curriculum-Based Content",
    icon: FiBookOpen,
    color: "#eab308",
    description:
      "Publishing textbooks prepared in accordance with the curriculum and academic framework of Bihar.",
  },
  {
    id: 3,
    titleKey: "coreMissions.items.title2",
    descKey: "coreMissions.items.desc2",
    title: "Local Language & Context",
    icon: FiSun,
    color: "#22c55e",
    description:
      "Providing learning materials across subjects and languages relevant to learners in Bihar.",
  },
  {
    id: 4,
    titleKey: "coreMissions.items.title3",
    descKey: "coreMissions.items.desc3",
    title: "Statewide Textbook Supply",
    icon: FiTruck,
    color: "#3b82f6",
    description:
      "Supporting the printing and distribution of textbooks to destinations across Bihar.",
  },
  {
    id: 5,
    titleKey: "coreMissions.items.title4",
    descKey: "coreMissions.items.desc4",
    title: "Affordable Textbooks",
    icon: FiCreditCard,
    color: "#ef4444",
    description:
      "Supporting access to textbooks for school students through the state's textbook publishing system.",
  },
  {
    id: 6,
    titleKey: "coreMissions.items.title5",
    descKey: "coreMissions.items.desc5",
    title: "Learning Support Materials",
    icon: FiZap,
    color: "#f97316",
    description:
      "Providing textbooks, workbooks, handbooks and other educational materials for students and educators.",
  },
  {
    id: 7,
    titleKey: "coreMissions.items.title6",
    descKey: "coreMissions.items.desc6",
    title: "Digital Access",
    icon: RiGraduationCapLine,
    color: "#a855f7",
    description:
      "Making textbooks available online for students to access learning materials digitally.",
  },
  {
    id: 8,
    titleKey: "coreMissions.items.title7",
    descKey: "coreMissions.items.desc7",
    title: "Efficient Publishing",
    icon: RiLeafLine,
    color: "#db2777",
    description:
      "Coordinating textbook printing, publishing and supply to support timely availability of learning materials.",
  },
];
