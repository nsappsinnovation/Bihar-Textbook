import React from "react";
import { motion } from "framer-motion";


const testimonials = [
  {
    id: 1,
    quote: "\"Education must build character, discipline, and a spirit of service to the nation.\"",
    name: "Dr. Rajendra Prasad",
    role: "FIRST PRESIDENT OF INDIA | FROM BIHAR",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Dr._Rajendra_Prasad.jpg/800px-Dr._Rajendra_Prasad.jpg"
  },
  {
    id: 2,
    quote: "\"The purpose of education is not only employment, but the awakening of social responsibility.\"",
    name: "Jayaprakash Narayan",
    role: "LOKNAYAK | SOCIAL REFORMER",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Jayaprakash_Narayan_1975_stamp_of_India.jpg/800px-Jayaprakash_Narayan_1975_stamp_of_India.jpg"
  },
  {
    id: 3,
    quote: "\"Education is the strongest foundation on which a modern and progressive Bihar can be built.\"",
    name: "Satyendra Narayan Sinha",
    role: "FORMER CHIEF MINISTER | EDUCATION REFORMER",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Satyendra_Narayan_Sinha.jpg/800px-Satyendra_Narayan_Sinha.jpg"
  },
  {
    id: 4,
    quote: "\"The progress of Bihar depends on schools, colleges, good governance, and equal opportunity for all.\"",
    name: "Shri Krishna Sinha",
    role: "FIRST CHIEF MINISTER OF BIHAR",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sri_Krishna_Sinha.jpg/800px-Sri_Krishna_Sinha.jpg"
  },
  {
    id: 5,
    quote: "\"Knowledge becomes meaningful when it is used for public service and social development.\"",
    name: "Anugrah Narayan Sinha",
    role: "BIHAR VIBHUTI | EDUCATIONIST",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Anugrah_Narayan_Sinha.jpg/800px-Anugrah_Narayan_Sinha.jpg"
  },
  {
    id: 6,
    quote: "\"Education should not remain a privilege of a few; it must become the strength of every common student.\"",
    name: "Karpoori Thakur",
    role: "JAN NAYAK | FORMER CHIEF MINISTER",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Karpoori_Thakur.jpg/800px-Karpoori_Thakur.jpg"
  },
  {
    id: 7,
    quote: "\"The doors of education must remain open for the poor, the backward, and the marginalized.\"",
    name: "Karpoori Thakur",
    role: "JAN NAYAK | FORMER CHIEF MINISTER",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Karpoori_Thakur.jpg/800px-Karpoori_Thakur.jpg"
  },
  {
    id: 8,
    quote: "\"Educating children, especially girls, is the most powerful way to change the future of Bihar.\"",
    name: "Shri Nitish Kumar",
    role: "Ex-CHIEF MINISTER, BIHAR",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Nitish_Kumar_in_2022.jpg/800px-Nitish_Kumar_in_2022.jpg"
  },
  {
    id: 9,
    quote: "\"A society moves forward when every child receives education, dignity, and opportunity.\"",
    name: "Jagjivan Ram",
    role: "NATIONAL LEADER | SOCIAL JUSTICE LEADER",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Jagjivan_Ram_1976_stamp_of_India.jpg/800px-Jagjivan_Ram_1976_stamp_of_India.jpg"
  },
  {
    id: 10,
    quote: "\"Education gives confidence to the weak, dignity to the poor, and strength to democracy.\"",
    name: "Jagjivan Ram",
    role: "NATIONAL LEADER | SOCIAL JUSTICE LEADER",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Jagjivan_Ram_1976_stamp_of_India.jpg/800px-Jagjivan_Ram_1976_stamp_of_India.jpg"
  },
  {
    id: 11,
    quote: "\"Education creates the intellectual strength required for public life, self-governance, and national progress.\"",
    name: "Dr. Sachchidananda Sinha",
    role: "EDUCATIONIST | CONSTITUENT ASSEMBLY PRESIDENT",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Sachchidananda_Sinha.jpg/800px-Sachchidananda_Sinha.jpg"
  },
  {
    id: 12,
    quote: "\"The real power of learning lies in creating responsible citizens and a just society.\"",
    name: "Dr. Sachchidananda Sinha",
    role: "EDUCATIONIST | CONSTITUENT ASSEMBLY PRESIDENT",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Sachchidananda_Sinha.jpg/800px-Sachchidananda_Sinha.jpg"
  },
  {
    id: 13,
    quote: "\"Good education must reach the village, the poor household, and the first-generation learner.\"",
    name: "Ramdhari Singh Dinkar",
    role: "RASHTRAKAVI | EDUCATIONAL THINKER",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Ramdhari_Singh_Dinkar_1999_stamp_of_India.jpg/800px-Ramdhari_Singh_Dinkar_1999_stamp_of_India.jpg"
  },
  {
    id: 14,
    quote: "\"Learning is the light that removes fear, inequality, and darkness from society.\"",
    name: "Ramdhari Singh Dinkar",
    role: "RASHTRAKAVI | EDUCATIONAL THINKER",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Ramdhari_Singh_Dinkar_1999_stamp_of_India.jpg/800px-Ramdhari_Singh_Dinkar_1999_stamp_of_India.jpg"
  },
  {
    id: 15,
    quote: "\"A strong education system is the path to a strong Bihar, a strong society, and a strong India.\"",
    name: "Shri Nitish Kumar",
    role: "Ex-CHIEF MINISTER, BIHAR",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Nitish_Kumar_in_2022.jpg/800px-Nitish_Kumar_in_2022.jpg"
  }
];

const colors = [
  {
    quote: "text-blue-400/20",
    role: "text-slate-500",
    border: "hover:border-blue-100",
  }
];

export default function StakeHolder() {
  // Partition testimonials into two rows
  const row1 = testimonials.slice(0, 8);
  const row2 = testimonials.slice(8);

  const TestimonialCard = ({ item, index }) => {
    const theme = colors[index % colors.length];
    
    // Clean escape quotes from strings for display
    const cleanQuote = item.quote.startsWith('"') && item.quote.endsWith('"')
      ? item.quote.slice(1, -1)
      : item.quote;

    return (
      <div className={`w-[260px] sm:w-[300px] h-[160px] sm:h-[175px] shrink-0 bg-white border border-slate-100 rounded-xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] ${theme.border} hover:shadow-[0_8px_24px_rgba(0,0,0,0.035)] transition-all duration-500 ease-out flex flex-col justify-between relative overflow-hidden group`}>
        
        {/* Quote symbol */}
        <span className={`absolute -top-2 left-3 text-5xl font-serif ${theme.quote} select-none pointer-events-none`}>
          “
        </span>

        {/* Quote Content */}
        <p className="text-slate-800 font-semibold text-[13px] sm:text-sm leading-snug relative z-10 pt-2 mb-4 whitespace-normal">
          “{cleanQuote}”
        </p>

        {/* Profile / Author Section */}
        <div className="flex items-center gap-2.5 border-t border-slate-50 pt-3 mt-auto">
          <img
            src={item.image}
            alt={item.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-sm shrink-0"
            onError={(e) => {
              e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${item.name}`;
            }}
          />
          <div>
            <h4 className="font-extrabold text-[#1E293B] text-[11px] sm:text-[12px] leading-tight group-hover:text-blue-600 transition-colors">
              {item.name}
            </h4>
            <span className={`text-[8px] font-extrabold tracking-wider ${theme.role} block mt-0.5`}>
              {item.role}
            </span>
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
             <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Our Inspiration</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
            Voices For An <br />
            <span className="text-slate-400 font-medium">Educated & Empowered Bihar</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed pr-4">
            Insights and inspiring words from Bihar's visionary leaders, educators, and reformers who continue to shape the state's educational journey.
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
          <div className="flex gap-5 animate-marquee whitespace-nowrap">
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
          <div className="flex gap-5 animate-marquee-reverse whitespace-nowrap">
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
