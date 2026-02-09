import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const lessons = [
  { id: 1, title: "The Power of Audio Learning", youtubeId: "c_vM6H_hF3M" },
  { id: 2, title: "Accessible Literature for All", youtubeId: "0vS_idvNInI" },
  { id: 3, title: "How Audiobooks Support Literacy", youtubeId: "UCFg9Yp9v0M" },
  { id: 4, title: "Narrating the Curriculum", youtubeId: "d6i0wIBy5pU" },
  { id: 5, title: "Inclusive Classroom Strategies", youtubeId: "2nBv-Y9VvWk" },
  { id: 6, title: "Audio Library: Digital Access", youtubeId: "8L-nE6D6W0E" },
];

export default function AudioCourses() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 font-sans text-slate-900 mt-20">
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-blue-600"></div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">
              Inclusive Education
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Audio Library <br />
            <span className="text-slate-400">Knowledge Through Listening</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Curated audio resources and lessons designed for accessible and inclusive learning for all students.
          </p>
        </div>
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
              <div className="aspect-video bg-slate-100">
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                  title={lesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs font-bold text-blue-600 mb-2">Part {lesson.id}</span>
                <h3 className="font-semibold text-slate-900 mb-4 flex-1">{lesson.title}</h3>
                <a
                  href={`https://www.youtube.com/watch?v=${lesson.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:underline"
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
