import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const lessons = [
  { id: 1, title: "Innovative Teaching Methods", youtubeId: "s5R-tX6X6_Y" },
  { id: 2, title: "Modern Pedagogy Strategies", youtubeId: "0_uCq4S0K6g" },
  { id: 3, title: "Embedded Formative Assessment", youtubeId: "S0M37_5M9_4" },
  { id: 4, title: "Classroom Management Techniques", youtubeId: "0vS_idvNInI" },
  { id: 5, title: "Active Learning in Practice", youtubeId: "2nBv-Y9VvWk" },
  { id: 6, title: "Professional Teacher Development", youtubeId: "8L-nE6D6W0E" },
];

export default function TeacherCourses() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 font-sans text-slate-900 mt-20">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-blue-600"></div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">
              Professional Development
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Teacher Excellence <br />
            <span className="text-slate-400">Advance Your Career</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed">
            Curated resources for educators to enhance their teaching skills and adapt to modern classroom environments.
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
                <span className="text-xs font-bold text-blue-600 mb-2">
                  Session {lesson.id}
                </span>

                <h3 className="font-semibold text-slate-900 mb-4 flex-1">
                  {lesson.title}
                </h3>

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
