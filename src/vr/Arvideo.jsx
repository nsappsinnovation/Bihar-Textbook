import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const lessons = [

  { id: 1, title: "VR Lab - Introduction", youtubeId: "pgc3LclGh3A" },
  { id: 2, title: "VR Lab - Module 1", youtubeId: "hat4luNKWf8" },
  { id: 3, title: "VR Lab - Module 2", youtubeId: "DXxSWh_rXfI" },
  { id: 4, title: "VR Lab - Module 3", youtubeId: "TjyGrit2mIQ" },
  { id: 5, title: "VR Lab - Module 4", youtubeId: "CZRf-sicJo8" },
  { id: 6, title: "VR Lab - Module 5", youtubeId: "A6zCr_skTh0" },
  { id: 7, title: "VR Lab - Module 6", youtubeId: "IOVMgEWY7og" },
  { id: 8, title: "VR Lab - Module 7", youtubeId: "Iusr8Xv8zbI" },
  { id: 9, title: "VR Lab - Module 8", youtubeId: "_AXCZUf1bB4" },
  { id: 10, title: "VR Lab - Module 9", youtubeId: "e8_MTsy7_Gg" },
  { id: 11, title: "VR Lab - Module 10", youtubeId: "YHPUtKaTd08" },
  { id: 12, title: "VR Lab - Module 11", youtubeId: "G0TfT21YmLY" },
];


export default function  Arvideo() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 font-sans text-slate-900">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-blue-600"></div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">
              Full Course
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
           Virtual Reality Lab <br />
            <span className="text-slate-400">Complete 12-Lesson Course</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed">
            Follow all 12  in sequence to build a strong foundation in
            AR - VR.
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
                  Lesson {lesson.id}
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
