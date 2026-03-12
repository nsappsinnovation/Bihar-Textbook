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
      title: "Cyber Awareness & Online Safety",
      image: "/images/skills/c1.png",
      description:
        "Learn the most important cyber safety rules to stay protected while using mobile phones, apps, and websites.",
      details: [
        "Safe browsing habits",
        "Avoid fake links and scams",
        "Understand digital footprints",
        "Privacy settings basics",
        "Safe social media usage",
      ],
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
              src= "/images/skills/c.png"
              alt="Cyber Security Illustration"
              className="w-[620px] h-auto object-contain"
            />
          </div>

          {/* RIGHT: Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Cyber Security
            </h1>

            <p className="mt-4 text-lg font-semibold text-blue-500">
              Learn Online Safety, Scam Protection & Secure Digital Habits!
            </p>

            <p className="mt-4 text-slate-600 max-w-md">
              Practical cyber security lessons designed to protect students from
              phishing, malware, OTP fraud, fake links, and online threats.
            </p>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-blue-500 text-xl">🛡️</div>
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
                <div className="text-blue-500 text-xl">🔐</div>
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
                <div className="text-blue-500 text-xl">⚡</div>
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
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                  Program Overview
                </h2>

                <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                  Protecting Students Through
                  <br />
                  <span className="text-slate-400">Cyber Security Awareness</span>
                </h3>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed font-light">
                Cyber Security is not only for hackers or IT professionals — it
                is a daily life skill. Students today use smartphones, social
                media, online payments, email, and apps every day. This makes
                them a target for scams, phishing, fraud, and malware.
              </p>

              <p className="text-lg text-slate-600 leading-relaxed font-light">
                This program helps learners build strong cyber awareness,
                recognize threats early, protect personal data, secure accounts,
                and develop safe online habits that prevent cyber attacks.
              </p>

              <div className="space-y-4">
                {[
                  "Learn how cyber attacks happen in real life (not only theory)",
                  "Understand phishing, scam calls, OTP fraud and fake links",
                  "Build strong password habits and enable Two-Factor Authentication",
                  "Learn safe browsing, safe downloads, and device protection",
                  "Protect your identity, privacy, and personal data online",
                  "Improve cyber hygiene for students, families, and daily life",
                  "Understand malware, ransomware and basic cyber threats",
                  "Become confident in online safety and responsible internet use",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm font-bold text-slate-700"
                  >
                    <CheckCircle2 size={18} className="text-blue-600 mt-[2px]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Images */}
            <div className="lg:col-span-7 lg:mt-[120px]">
              <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl md:col-span-2">
                <img
                  src="/images/skills/c1.png"
                  alt="Cyber Security"
                  className="w-full aspect-[16/9] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
                    Cyber Awareness
                  </p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl">
                <img
                  src="/images/skills/c1.png"
                  alt="Phishing"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
                    Phishing Protection
                  </p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl">
                <img
                  src="/images/skills/cybert.png"
                  alt="Passwords"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
                    Account Safety
                  </p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-[40px] border border-slate-100 shadow-xl md:col-span-2">
                <img
                  src="/images/skills/c4.png"
                  alt="Device Security"
                  className="w-full aspect-[16/9] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
                    Malware & Device Protection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto border border-slate-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* LEFT */}
            <div className="p-10 border-b md:border-b-0 border-slate-300">
              <h2 className="text-red-600 font-bold text-lg uppercase tracking-wide mb-6">
                Trending Pages on Cyber Security
              </h2>

              <div className="space-y-10">
                {trendingPages.map((item, i) => (
                  <Link
                    key={i}
                    to={`/cyber/trending/${item.slug}`}
                    className="flex gap-4 group"
                  >
                    {/* Arrow like SkillsYouNeed */}
                    <span
                      className="mt-[6px] w-0 h-0 
                      border-t-[5px] border-b-[5px] border-l-[7px]
                      border-t-transparent border-b-transparent border-l-slate-700"
                    />

                    <div>
                      <h3 className="text-blue-900 font-bold uppercase group-hover:underline">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-slate-700 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      <p className="mt-2 text-slate-500 text-xs">{item.section}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="p-10">
              <h2 className="text-red-600 font-bold text-lg uppercase tracking-wide mb-2">
                Quizzes on Cyber Security
              </h2>

              <p className="text-slate-700 text-sm mb-6">
                Develop your cyber safety skills with our interactive quizzes
              </p>

              <div className="space-y-10">
                {quizzes.map((quiz, i) => (
                  <Link
                    key={i}
                    to={`/cyber/quiz/${quiz.slug}`}
                    className="flex gap-4 group"
                  >
                    {/* Arrow */}
                    <span
                      className="mt-[6px] w-0 h-0 
                      border-t-[5px] border-b-[5px] border-l-[7px]
                      border-t-transparent border-b-transparent border-l-slate-700"
                    />

                    <div>
                      <h3 className="text-blue-900 font-bold uppercase group-hover:underline">
                        {quiz.title}
                      </h3>

                      <p className="mt-2 text-slate-700 text-sm leading-relaxed">
                        {quiz.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Optional banner image space */}
              <div className="mt-10 rounded-xl overflow-hidden border border-slate-300">
                <img
                  src="/images/skills/c2.png"
                  alt="Cyber Security Banner"
                  className="w-full h-[250px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CyberSecurity;
