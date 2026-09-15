import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const testimonials = [
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

const getInitials = (name) => {
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

const avatarColors = [
  "bg-[#1e293b]",
  "bg-[#64748b]",
  "bg-[#475569]",
  "bg-[#334155]",
];

export default function StakeHolder() {
  const { t } = useTranslation();
  const row1 = testimonials.slice(0, 8);
  const row2 = testimonials.slice(8);

  const TestimonialCard = ({ item, index }) => {
    const rawQuote = t(`stakeholder.testimonials.quote${item.id}`, item.quote);
    const cleanQuote = rawQuote.startsWith('"') && rawQuote.endsWith('"')
      ? rawQuote.slice(1, -1)
      : rawQuote;
      
    const name = t(`stakeholder.testimonials.name${item.id}`, item.name);
    const role = t(`stakeholder.testimonials.role${item.id}`, item.role);
    const avatarBg = avatarColors[index % avatarColors.length];

    return (
      <div className="w-[280px] sm:w-[320px] h-[210px] shrink-0 bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between whitespace-normal">
        <div>
          <div className="text-4xl text-blue-300/80 font-serif leading-none mb-2 select-none">
            “
          </div>
          <p className="text-slate-800 font-serif text-[14px] sm:text-[15px] leading-snug line-clamp-3">
            {cleanQuote}
          </p>
        </div>

        <div className="border-t border-slate-100 pt-4 mt-auto">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${avatarBg} flex items-center justify-center text-white font-medium text-[14px] shrink-0`}>
              {getInitials(item.name)}
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-[13px] leading-tight mb-0.5 truncate">
                {name}
              </h4>
              <span className="text-[9px] sm:text-[10px] font-medium text-slate-500 uppercase tracking-wider block line-clamp-1">
                {role}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#fcfcfd] py-20 border-t border-slate-100 font-sans text-slate-900">
      
      {/* Header */}
      <div className="max-w-[1280px] mx-auto mb-12 px-6 md:px-10 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-4">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: 24 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="h-px bg-blue-600"
             ></motion.div>
             <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">{t("stakeholder.badge", "Our Inspiration")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
            {t("stakeholder.heading", "Voices For An")} <br />
            <span className="text-slate-400 font-medium">{t("stakeholder.headingHighlight", "Educated & Empowered Bihar")}</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed pr-4">
            {t("stakeholder.description", "Insights and inspiring words from Bihar's visionary leaders, educators, and reformers who continue to shape the state's educational journey.")}
          </p>
        </motion.div>
      </div>
 

      {/* Marquee Rows Container */}
      <div 
        className="w-full flex flex-col gap-6"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)'
        }}
      >

        {/* ROW 1 - Right to Left */}
        <div className="flex overflow-hidden">
          <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
            {[...row1, ...row1].map((item, i) => (
              <TestimonialCard 
                key={`row1-${item.id}-${i}`} 
                item={item} 
                index={i} 
              />
            ))}
          </div>
        </div>

        {/* ROW 2 - Left to Right */}
        <div className="flex overflow-hidden">
          <div className="flex gap-5 animate-marquee-reverse hover:[animation-play-state:paused] whitespace-nowrap">
            {[...row2, ...row2].map((item, i) => (
              <TestimonialCard 
                key={`row2-${item.id}-${i}`} 
                item={item} 
                index={i + row1.length} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
