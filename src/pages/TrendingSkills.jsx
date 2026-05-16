
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Star, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const TrendingSkills = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] p-12 shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
              <TrendingUp size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 capitalize">
                {slug?.replace(/-/g, ' ') || 'Trending Skill'}
              </h1>
              <p className="text-slate-500">Master this high-demand skill today.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-slate-50 rounded-3xl">
              <Star className="text-yellow-500 mb-3" />
              <h4 className="font-bold text-slate-800">Popularity</h4>
              <p className="text-sm text-slate-500">Top 5% in 2026</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl">
              <Clock className="text-purple-500 mb-3" />
              <h4 className="font-bold text-slate-800">Duration</h4>
              <p className="text-sm text-slate-500">2.5 Hours</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl">
              <BookOpen className="text-green-500 mb-3" />
              <h4 className="font-bold text-slate-800">Level</h4>
              <p className="text-sm text-slate-500">Beginner Friendly</p>
            </div>
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              Explore the latest trends and practical applications of this skill in the modern world. This module provides a comprehensive overview designed for students to quickly grasp core concepts.
            </p>
            <div className="h-48 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 italic">
              Module Content Placeholder
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrendingSkills;
