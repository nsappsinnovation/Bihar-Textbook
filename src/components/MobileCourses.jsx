import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const lessons = [
  { id: 1, title: "Mobile Library Service Launch", youtubeId: "5rG6S_C1G5E" },
  { id: 2, title: "Expanding Services to Rural Communities", youtubeId: "jW2mPjZ-9J0" },
  { id: 3, title: "Mobile Library Introduction", youtubeId: "4d02bF0I7_0" },
  { id: 4, title: "Library on Wheels: Reach & Impact", youtubeId: "kR-z2XjK9x0" },
  { id: 5, title: "The Joy of Reading Anywhere", youtubeId: "V_P4M9Xp6yY" },
  { id: 6, title: "How Mobile Libraries Change Lives", youtubeId: "c_vM6H_hF3M" },
];

export default function MobileCourses() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 font-sans text-slate-900 mt-20">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate("/mobile-library-dashboard")}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-green-600 transition-colors font-bold group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-green-600"></div>
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-[0.2em]">
              Community Engagement
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Mobile Library Network <br />
            <span className="text-slate-400">Knowledge on Wheels</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed font-medium">
            Discover the impact of our mobile libraries and how they are fostering a reading culture in remote areas.
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {lessons.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="flex flex-col bg-white border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Video */}
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                  title={lesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-bold text-green-600 mb-2 uppercase tracking-widest">
                  Part {lesson.id}
                </span>

                <h3 className="font-black text-slate-900 mb-4 flex-1 text-lg leading-tight group-hover:text-green-600 transition-colors">
                  {lesson.title}
                </h3>

                <a
                  href={`https://www.youtube.com/watch?v=${lesson.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-slate-900 text-xs font-black hover:text-green-600 transition-colors uppercase tracking-widest"
                >
                  WATCH ON YOUTUBE <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
