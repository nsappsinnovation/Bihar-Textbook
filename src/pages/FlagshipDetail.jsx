import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { flagshipEvents } from "../data/flagshipEventsData";
import { ArrowLeft, Calendar, Tag, Share2, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FlagshipDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = flagshipEvents.find((e) => e.id === id);
    setEvent(foundEvent);
    window.scrollTo(0, 0);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Program Not Found</h2>
          <Link to="/" className="text-indigo-600 hover:underline">
            Go back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Related events filter
  const relatedEvents = flagshipEvents
    .filter((e) => e.id !== id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/40 z-10" />
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-24 z-20">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6 text-sm font-medium backdrop-blur-md bg-white/10 px-4 py-2 rounded-full w-fit">
                        <ArrowLeft size={16} /> Back to Programs
                    </Link>

                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-4 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-indigo-900/20 border border-indigo-400/30">
                            {event.tag}
                        </span>
                        <span className="px-4 py-1 bg-emerald-500/90 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg backdrop-blur-sm">
                            Active Initiative
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-sm">
                        {event.title}
                    </h1>
                </motion.div>
            </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 py-16 -mt-10 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Article Content */}
            <div className="lg:col-span-8">
                <motion.div 
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div 
                        className="
                            prose prose-lg max-w-none
                            prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
                            prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                            prose-h3:text-xl prose-h3:text-indigo-900 prose-h3:mt-6
                            prose-p:text-slate-600 prose-p:leading-relaxed
                            prose-li:text-slate-600 prose-li:marker:text-indigo-500
                            prose-strong:text-slate-800 prose-strong:font-semibold
                            prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                        "
                        dangerouslySetInnerHTML={{ __html: event.fullContent }}
                    />
                </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
                {/* About Card */}
                <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 shadow-sm">
                    <h3 className="font-bold text-lg mb-4 text-indigo-950 flex items-center gap-2">
                        <div className="bg-indigo-600 w-1.5 h-6 rounded-full" />
                        Outcome Focused
                    </h3>
                    <p className="text-indigo-900/80 mb-6 leading-relaxed">
                        {event.description}
                    </p>
                    <button className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-95">
                        <Share2 size={18} /> Share Focus
                    </button>
                    <div className="mt-6 pt-6 border-t border-indigo-200/50 flex flex-col gap-3">
                         <div className="flex items-center gap-3 text-sm text-indigo-900/70">
                            <CheckCircle size={16} className="text-indigo-600" />
                            <span>State-wide implementation</span>
                         </div>
                         <div className="flex items-center gap-3 text-sm text-indigo-900/70">
                            <CheckCircle size={16} className="text-indigo-600" />
                            <span>Student-centric approach</span>
                         </div>
                    </div>
                </div>

                {/* Related Programs */}
                <div>
                     <h3 className="font-bold text-slate-900 mb-6 px-2">Related Initiatives</h3>
                     <div className="space-y-4">
                        {relatedEvents.map(related => (
                            <Link key={related.id} to={`/flagship-events/${related.id}`} className="block group">
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-colors flex gap-4 items-center shadow-sm">
                                    <img src={related.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors line-clamp-2">
                                            {related.title}
                                        </h4>
                                        <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 block">
                                            {related.tag}
                                        </span>
                                    </div>
                                    <div className="ml-auto text-slate-300 group-hover:text-indigo-500 transition-colors">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                     </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default FlagshipDetail;
