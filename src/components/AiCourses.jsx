import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const lessons = [
  { id: 1, title: "AI in Education: Part 1", youtubeId: "W3eN2yvE_dE" },
  { id: 2, title: "AI in the Classroom: Tool or Teacher?", youtubeId: "0hYt54jW-mQ" },
  { id: 3, title: "How AI is Changing the Classroom", youtubeId: "WqS_T3xYJ9w" },
  { id: 4, title: "Module 1: Understanding AI", youtubeId: "_Qe8M2n_w1Y" },
  { id: 5, title: "Generative AI in Education", youtubeId: "2T1m6Z8Yx5g" },
  { id: 6, title: "Practical Insights from Innovators", youtubeId: "3-M9X3N42QY" },
];

export default function AiCourses() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 font-sans text-slate-900 mt-20">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-indigo-600"></div>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]">
              AI Learning Series
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Future of Intelligence <br />
            <span className="text-slate-400">Master AI Concepts</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed">
            Explore our curated series of lessons on Artificial Intelligence and its impact on modern education.
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
              className="flex flex-col bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Video */}
              <div className="aspect-video bg-slate-100">
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                  title={lesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs font-bold text-indigo-600 mb-2">
                  Module {lesson.id}
                </span>

                <h3 className="font-semibold text-slate-900 mb-4 flex-1">
                  {lesson.title}
                </h3>

                <a
                  href={`https://www.youtube.com/watch?v=${lesson.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-indigo-600 text-xs font-bold hover:underline"
                >
                  WATCH <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
