import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { testimonials, getInitials } from "../data/homeContent";

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
      <div className="w-[260px] sm:w-[320px] h-auto sm:h-[210px] shrink-0 bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between whitespace-normal">
        <div>
          <div className="text-3xl sm:text-4xl text-blue-300/80 font-serif leading-none mb-1 sm:mb-2 select-none">
            “
          </div>
          <p className="text-slate-800 font-serif text-[13px] sm:text-[15px] leading-relaxed sm:leading-snug sm:line-clamp-3">
            {cleanQuote}
          </p>
        </div>

        <div className="border-t border-slate-100 pt-3 sm:pt-4 mt-3 sm:mt-auto">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${avatarBg} flex items-center justify-center text-white font-medium text-[14px] shrink-0`}>
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
    <section className="relative w-full overflow-hidden bg-[#fcfcfd] py-12 sm:py-20 border-t border-slate-100 font-sans text-slate-900">
      
      {/* Header */}
      <div className="max-w-[1280px] mx-auto mb-8 sm:mb-12 px-4 sm:px-6 md:px-10 lg:px-12">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
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
        className="w-full flex flex-col gap-3 sm:gap-6 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)] sm:[-webkit-mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]"
      >

        {/* ROW 1 - Right to Left */}
        <div className="flex overflow-hidden">
          <div className="flex gap-5 max-sm:[animation-duration:90s] animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
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
          <div className="flex gap-5 max-sm:[animation-duration:90s] animate-marquee-reverse hover:[animation-play-state:paused] whitespace-nowrap">
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
