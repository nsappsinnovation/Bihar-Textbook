import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

import { BookOpen, Award, Users, Printer, Truck, ShieldCheck, ArrowLeft, ArrowRight, History, Target, CheckCircle2, FileText, Globe, Lock, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const CyberSecurity = () => {

  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  const stats = [
    {
      label: "Cyber Awareness",
      value: "50K+",
      sub: "Students trained in safety",
      icon: <Users size={20} />
    },
    {
      label: "Safety Rating",
      value: "100%",
      sub: "Secure practices taught",
      icon: <ShieldCheck size={20} />
    },
    {
      label: "Learning Modules",
      value: "10+",
      sub: "Topics covered in detail",
      icon: <BookOpen size={20} />
    },
    {
      label: "Threat Protection",
      value: "24/7",
      sub: "Active monitoring tips",
      icon: <Shield size={20} />
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const processSteps = [
    {
      title: "AI Deepfakes & Photo Safety",
      image: "/images/skills/deep.png",
      description:
        "Learn how AI-generated images and deepfake photos can be misused online and how to protect yourself on social media.",
      details: [
        "Identify deepfake photos",
        "Risks of fake profiles",
        "Protect personal photos",
      ],
    },
    {
      title: "Phishing & Scams",
      image: "/images/skills/c2.png",
      description:
        "Understand how attackers trick humans using fake emails, calls, messages, and emotional pressure.",
      details: [
        "Email & SMS phishing",
        "UPI/OTP scam patterns",
        "Suspicious link detection",
      ],
    },
    {
      title: "AI-Generated Images",
      image: "/images/skills/ai.png",
      description:
        "Learn how AI-generated images can be used to spread misinformation and how to recognize them.",
      details: [
        "Understand AI creation",
        "Identify fake profile photos",
        "Verify image authenticity",
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
        "Secure login habits",
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
        "Best 2FA practices",
      ],
    },
    {
      title: "Malware & Device Security",
      image: "/images/skills/c5.png",
      description:
        "Understand how malware infects devices and how antivirus, updates, and backups protect your system.",
      details: [
        "Virus vs Trojan vs Spyware",
        "Ransomware basics",
        "Safe downloads rules",
      ],
    },
  ];

  return (
    <div className="relative">
      {/* Back Button */}
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-25 left-4 md:left-6 lg:left-8 w-11 h-11 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-blue-500 hover:shadow-lg transition-all border border-slate-50 z-50 group"
      >
        <ArrowLeft size={22} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="bg-white flex items-center pt-0 pb-0 -mt-20">
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
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Cyber Security Awareness
            </h1>

            {/* Highlight text */}
            <p className="mt-4 text-lg font-semibold text-emerald-500">
              Learn Online Safety, Scam Protection & Secure Digital Habits!
            </p>

            {/* Description */}
            <p className="mt-4 text-slate-600 max-w-md">
              Practical cyber security lessons designed to protect students from phishing, malware, OTP fraud, fake links, and online threats.
            </p>

            {/* Action Button */}
            <div className="mt-8">
              <Link to="/cyber-security-dashboard">
                <button className="px-8 py-4 bg-emerald-600 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-emerald-200 flex items-center gap-2">
                  Start Learning <ArrowRight size={18} />
                </button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-emerald-500 text-xl"><Shield size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Scam Protection
                  </h3>
                  <p className="text-sm text-slate-600">
                    Learn to identify and avoid common online scams and phishing attacks.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-emerald-500 text-xl"><Lock size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Account Security
                  </h3>
                  <p className="text-sm text-slate-600">
                    Master password management and two-factor authentication.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="md:col-span-2 p-5 border rounded-xl shadow-sm flex gap-4">
                <div className="text-emerald-500 text-xl"><Zap size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Device Protection
                  </h3>
                  <p className="text-sm text-slate-600">
                    Understand malware and how to keep your devices clean and updated.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Program Overview */}
      <section className="pt-2 pb-10 bg-white px-6 -mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="space-y-10">
              <div className="space-y-2">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600">
                  Program Overview
                </h2>
                <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                  Protecting Students in the{" "}
                  <br />
                  <span className="text-slate-400">
                    Digital Age
                  </span>
                </h3>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed font-light -mt-6">
                Our Cyber Security initiative is dedicated to educating students about the risks of the digital world. By teaching practical safety habits, we empower the next generation to use technology responsibly and safely.
              </p>

              <div className="space-y-4 -mt-5">
                {[
                  "Understand phishing, scam calls, and fake links",
                  "Build strong password habits and enable 2FA",
                  "Protect your identity and personal data online",
                  "Learn to recognize AI deepfakes and fake profiles"
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm font-bold text-slate-700"
                  >
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative group overflow-hidden rounded-[40px] shadow-xl border border-slate-100">
              <img
                src="/images/skills/c1.png"
                alt="Cyber Security Overview"
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-10 bg-white px-6 -mt-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600">
                Security Modules
              </h2>
             <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Interactive Security Journey
              </h3>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={scrollLeft}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={scrollRight}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Carousel Track */}
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 no-scrollbar"
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: i * 0.1 }}
                className="snap-start flex-shrink-0 w-[75%] sm:w-[50%] lg:w-[23%]
                         bg-white border border-slate-200 p-8 rounded-[32px] 
                         shadow-xl hover:shadow-xl transition-all duration-500 group relative flex flex-col"
              >
                {/* Image */}
                <div className="mb-8 rounded-2xl overflow-hidden aspect-[4/3] bg-slate-50 flex items-center justify-center">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <h4 className="text-xl font-bold text-slate-900 leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>

  )
}

export default CyberSecurity;
