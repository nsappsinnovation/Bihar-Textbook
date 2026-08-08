import React from 'react';
import { motion } from 'framer-motion';
import { Code, Lightbulb, Rocket, Target, Users, MapPin, Mail, ExternalLink } from 'lucide-react';

const Developer = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfd] font-sans pt-12 pb-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
              About The Creators
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              A Startup Product <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">
                Born in Bihar
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-2xl mx-auto font-medium">
              We are a passionate team of developers and innovators dedicated to transforming the educational landscape through cutting-edge technology.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Developer;
