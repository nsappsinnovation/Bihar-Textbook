import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Calendar, MapPin, MoreVertical, Edit, Trash2, ExternalLink, Image as ImageIcon } from 'lucide-react';

export default function EventsManagementPage({ addToast }) {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('website_events');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Annual Book Fair 2026', date: '2026-06-15', location: 'Patna Ground', type: 'Exhibition', status: 'Upcoming' },
      { id: 2, title: 'Digital Education Summit', date: '2026-05-25', location: 'Virtual / Online', type: 'Conference', status: 'Live' },
      { id: 3, title: 'Regional Writers Meet', date: '2026-04-10', location: 'Biahar Hall', type: 'Workshop', status: 'Completed' },
    ];
  });

  const handleAddEvent = () => {
    const newEvent = {
      id: Date.now(),
      title: 'New Event Title',
      date: new Date().toISOString().split('T')[0],
      location: 'TBD',
      type: 'Meeting',
      status: 'Upcoming'
    };
    const updated = [...events, newEvent];
    setEvents(updated);
    localStorage.setItem('website_events', JSON.stringify(updated));
    addToast?.('Event Added', 'success');
  };

  const handleDelete = (id) => {
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    localStorage.setItem('website_events', JSON.stringify(updated));
    addToast?.('Updated', 'info');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Events & News Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage public events, news updates, and activities</p>
        </div>
        <button 
          onClick={handleAddEvent}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group"
          >
            <div className="h-40 bg-gray-100 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 left-3 px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                {event.type}
              </div>
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-xs font-medium opacity-80 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {event.date}
                </p>
                <h3 className="text-sm font-bold mt-0.5">{event.title}</h3>
              </div>
            </div>
            
            <div className="p-4 flex-1">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                <MapPin className="w-3 h-3" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                  event.status === 'Upcoming' ? 'bg-blue-50 text-blue-600' : 
                  event.status === 'Live' ? 'bg-rose-50 text-rose-600 animate-pulse' : 
                  'bg-gray-100 text-gray-500'
                }`}>
                  {event.status}
                </span>
                
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(event.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Placeholder for "View All" page creation */}
        <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-300 mb-3">
            <ExternalLink className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-gray-400">Public View All Page</p>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Already integrated with frontend</p>
        </div>
      </div>
    </motion.div>
  );
}
