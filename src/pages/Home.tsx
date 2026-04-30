import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GEMS } from '../constants';
import { cn } from '../lib/utils';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0 }
};

export default function Home() {
  return (
    <div className="space-y-10 pb-16">
      {/* Design Hero Section */}
      <section className="text-center py-10">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-aditya-blue tracking-tight leading-tight"
        >
          AI-Powered Academic Intelligence
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-aditya-slate mt-3 max-w-2xl mx-auto font-medium"
        >
          Access specialized Gemini Gems designed for the Aditya University ecosystem
        </motion.p>
      </section>

      {/* Gem Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {GEMS.map((gem, index) => (
          <motion.div 
            key={gem.id} 
            variants={item}
          >
            <Link 
              to={gem.path}
              className="gem-card group flex flex-col h-full"
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110",
                index % 2 === 0 ? "icon-box-blue" : "icon-box-gold"
              )}>
                <gem.icon size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-aditya-blue mb-2">{gem.title}</h3>
              <p className="text-aditya-slate text-sm leading-relaxed mb-8 flex-1">
                {gem.description}
              </p>

              <button className="w-full bg-aditya-blue text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-sm">
                Open Gem
                <ArrowRight size={14} />
              </button>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
