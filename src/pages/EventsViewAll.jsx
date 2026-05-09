import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const allEvents = [
  { id: 1, title: 'Bihar Diwas 2026', date: 'March 22, 2026', location: 'Gandhi Maidan, Patna', type: 'State Event', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f' },
  { id: 2, title: 'Textbook Distribution Drive', date: 'April 05, 2026', location: 'North Bihar Districts', type: 'Social', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b' },
  { id: 3, title: 'Teacher Training Conclave', date: 'May 12, 2026', location: 'Virtual', type: 'Training', image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389' },
  { id: 4, title: 'Digital Literacy Workshop', date: 'June 20, 2026', location: 'Regional Centers', type: 'Workshop', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998' },
  { id: 5, title: 'Science Exhibition 2026', date: 'July 15, 2026', location: 'Patna', type: 'Academic', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d' },
];

export default function EventsViewAll() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm mb-12 transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO HOME
        </Link>
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
            All <span className="text-slate-400">Events & News</span>
          </h1>
          <p className="text-lg text-slate-500 mt-4 max-w-2xl font-medium leading-relaxed">
            Stay updated with the latest happenings, initiatives, and news from the Bihar State Text Book Publishing Corporation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold text-slate-700 uppercase tracking-widest border border-white/20">
                    {event.type}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">
                  <Calendar size={12} />
                  {event.date}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-400 font-medium pb-4 border-b border-slate-100">
                  <MapPin size={14} />
                  {event.location}
                </div>
                <button className="flex items-center gap-2 text-xs font-black text-slate-900 pt-2 group-hover:gap-3 transition-all uppercase tracking-widest">
                  View Details <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
