import React from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";


import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const CyberSecurity = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  // ✅ Trending Pages (Cyber Security)
  const trendingPages = [
    {
      title: "Phishing Attacks",
      slug: "phishing-attacks",
      description:
        "Learn how phishing works, how scammers trap users, and how to identify fake links, emails, and OTP scams.",
      section: "From our Cyber Awareness section.",
    },
    {
      title: "Malware & Viruses",
      slug: "malware-and-viruses",
      description:
        "Understand malware types like viruses, trojans, spyware, and worms — and how they infect systems.",
      section: "From our Threats & Malware section.",
    },
    {
      title: "Ransomware Attacks",
      slug: "ransomware-attacks",
      description:
        "Learn how ransomware locks files, demands payment, and how backups + safe habits prevent damage.",
      section: "From our Cyber Threats section.",
    },
    {
      title: "Password Security",
      slug: "password-security",
      description:
        "Learn how to create strong passwords, avoid password reuse, and protect accounts from hacking.",
      section: "From our Digital Safety section.",
    },
    {
      title: "OTP & UPI Fraud",
      slug: "otp-upi-fraud",
      description:
        "Understand how OTP scams and UPI fraud happen and how to protect your money and identity online.",
      section: "From our Online Scam Protection section.",
    },
    {
      title: "Two-Factor Authentication (2FA)",
      slug: "two-factor-authentication",
      description:
        "Understand why 2FA is essential and how it protects your account even if passwords leak.",
      section: "From our Account Protection section.",
    },
  ];

  // ✅ Quizzes (Cyber Security)
  const quizzes = [
    {
      title: "Cyber Security Awareness Quiz",
      slug: "cyber-security-awareness-quiz",
      description:
        "Test your cyber safety knowledge: scams, phishing, passwords, and safe browsing habits.",
    },
    {
      title: "Can You Spot a Phishing Link?",
      slug: "spot-a-phishing-link",
      description:
        "Check if you can detect fake links, suspicious emails, and scam messages like a pro.",
    },
    {
      title: "Password Strength Self Assessment",
      slug: "password-strength-self-assessment",
      description:
        "Find out how secure your password habits are and learn how to improve them.",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // ✅ Process Steps (Carousel)
  const processSteps = [
   {
  title: "AI Deepfakes & Photo Safety",
  image: "/images/skills/deep.png",
  description:
    "Learn how AI-generated images and deepfake photos can be misused online and how to protect yourself on social media.",
  details: [
    "Identify deepfake and AI-generated photos",
    "Risks of fake social media profiles",
    "Protect your personal photos online",
    "Verify suspicious images and profiles",
    "Safe social media sharing practices"
  ]
},
    {
      title: "Phishing, Scams & Social Engineering",
      image: "/images/skills/c2.png",
      description:
        "Understand how attackers trick humans using fake emails, calls, messages, and emotional pressure.",
      details: [
        "Email & SMS phishing",
        "Fake job & loan scams",
        "UPI/OTP scam patterns",
        "Suspicious message detection",
        "Real-world scam examples",
      ],
    },
    {
  title: "AI-Generated Images & Online Safety",
  image: "/images/skills/ai.png",
  description:
    "Learn how AI-generated images can be used to spread misinformation or create fake identities online, and how to recognize and verify them.",
  details: [
    "Understand how AI-generated images are created",
    "Identify fake or AI-generated profile photos",
    "Recognize manipulated or misleading images online",
    "Learn tools and tips to verify image authenticity",
    "Protect your photos from misuse on social media"
  ]
},
    {
      title: "Passwords & Account Protection",
      image: "/images/skills/cybert.png",
      description:
        "Learn how to protect your accounts using strong passwords, password managers, and good login habits.",
      details: [
        "Strong password rules",
        "Password reuse dangers",
        "Password manager basics",
        "Secure login habits",
        "Account recovery safety",
      ],
    },
    {
      title: "Two-Factor Authentication (2FA)",
      image: "/images/skills/c4.png",
      description:
        "Learn why 2FA is the best defense against hacking and how to enable it on your accounts.",
      details: [
        "Why 2FA matters",
        "OTP vs Authenticator apps",
        "Avoid SIM swap attacks",
        "Secure backup codes",
        "Best 2FA practices",
      ],
    },
    {
      title: "Malware, Ransomware & Device Security",
      image: "/images/skills/c5.png",
      description:
        "Understand how malware infects devices and how antivirus, updates, and backups protect your system.",
      details: [
        "Virus vs Trojan vs Spyware",
        "Ransomware basics",
        "Safe downloads rules",
        "Updates & patching importance",
        "Backup and recovery habits",
      ],
    },
  ];

  return (
    <div>
      {/* ================= HERO ================= */}
      <div className="min-h-screen bg-white flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* LEFT: Image */}
          <div className="flex justify-center">
            <img
              src="/images/skills/c.png"
              alt="Cyber Security Illustration"
              className="w-[620px] h-auto object-contain"
            />
          </div>

          {/* RIGHT: Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Cyber Security
            </h1>

            <p className="mt-4 text-lg font-semibold text-yellow-500">
              Learn Online Safety, Scam Protection & Secure Digital Habits!
            </p>

            <p className="mt-4 text-slate-600 max-w-md">
              Practical cyber security lessons designed to protect students from
              phishing, malware, OTP fraud, fake links, and online threats.
            </p>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-yellow-500 text-xl"></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Real-World Cyber Safety
                  </h3>
                  <p className="text-sm text-slate-600">
                    Learn safety rules for phones, apps, UPI, email, and social media.
                  </p>
                </div>
              </div>

              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-yellow-500 text-xl"></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Account Protection Skills
                  </h3>
                  <p className="text-sm text-slate-600">
                    Strong passwords, 2FA, privacy settings, and scam detection.
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-yellow-500 text-xl"></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Step-by-Step Learning Modules
                  </h3>
                  <p className="text-sm text-slate-600">
                    Lessons + real examples + quizzes to build cyber awareness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PROGRAM OVERVIEW ================= */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

            {/* Left Content */}
            <div className="lg:col-span-5 space-y-10 sticky top-32">
              <div className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                  Program Overview
                </h2>

                <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                  Empowering Students Through
                  <br />
                  <span className="text-slate-400">
                    Basic Learning Skills
                  </span>
                </h3>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed font-light">
                Basic Life Skills focuses on essential everyday knowledge that every student
                must know to stay safe, independent, and responsible in society.
              </p>



              <div className="space-y-4">
                {[


                  "Understand phishing, scam calls, OTP fraud and fake links",
                  "Build strong password habits and enable Two-Factor Authentication",
                  "Protect your identity, privacy, and personal data online","Understand malware, ransomware and basic cyber threats",
                  "Understand risks of AI-generated images, deepfakes, and fake profiles on social media",
                  "Learn how photos can be misused or edited using AI tools and how to verify authenticity",
                  "Learn how to protect your photos and personal content from misuse online"

                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm font-bold text-slate-700"
                  >
                    <CheckCircle2 size={18} className="text-yellow-600 mt-[2px]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Images */}
            <div className="lg:col-span-7 grid grid-cols-1 gap-4">
              <div className=" mt-24 relative group overflow-hidden rounded-[40px] bottomborder border-slate-100 shadow-xl">
                <img
                  src="/images/skills/c1.png"
                  alt="Facility"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Our Facility</p>
                  <h4 className="text-2xl font-bold"></h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image 2 */}

      </section>
      {/* ================= CAROUSEL ================= */}
      <section className="py-32 bg-slate-900 px-6 rounded-[60px] mx-4 mb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                Learning Path
              </h2>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Learn Cyber Security <br />
                Step-by-Step
              </h3>
            </div>

            <div className="flex gap-3">
              <button
                onClick={scrollLeft}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
              >
                ←
              </button>
              <button
                onClick={scrollRight}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 scrollbar-hide"
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: i * 0.1 }}
                className="snap-start flex-shrink-0 w-[85%] sm:w-[60%] lg:w-[32%]
                           bg-white/5 backdrop-blur-md border border-white/10 p-12
                           rounded-[40px] hover:border-blue-500/50 transition-all duration-500 group"
              >
                <div className="mb-10 rounded-3xl bg-white flex items-center justify-center h-64 sm:h-72 lg:h-80 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="h-full w-full object-cover "
                  />
                </div>

                <h4 className="text-xl font-black text-white mb-6 uppercase tracking-tight">
                  {step.title}
                </h4>

                <p className="text-blue-100/60 leading-relaxed font-light mb-8 text-sm">
                  {step.description}
                </p>

                <div className="space-y-3 border-t border-white/5 pt-8">
                  {step.details.map((detail, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-3 text-[11px] font-bold text-blue-100/40 uppercase tracking-widest"
                    >
                      <div className="w-1 h-1 rounded-full bg-blue-500" />
                      {detail}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRENDING + QUIZZES ================= */}

    </div>
  );
};

export default CyberSecurity;
