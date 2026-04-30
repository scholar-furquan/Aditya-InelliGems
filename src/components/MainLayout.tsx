import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GEMS } from '../constants';
import { cn } from '../lib/utils';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-aditya-light flex flex-col font-sans">
      {/* Header */}
      <header className="bg-aditya-blue text-white h-[70px] border-b-4 border-aditya-gold px-10 flex items-center justify-between shadow-md z-50 sticky top-0">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-aditya-gold rounded-md flex items-center justify-center font-black text-aditya-blue text-lg">A</div>
            <span className="font-bold text-xl tracking-tight">Aditya IntelliGems</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium transition-all py-1 border-b-2",
                location.pathname === '/' ? "border-aditya-gold opacity-100" : "border-transparent opacity-80 hover:opacity-100"
              )}
            >
              Dashboard
            </Link>
            {GEMS.map(gem => (
              <Link
                key={gem.id}
                to={gem.path}
                className={cn(
                  "text-sm font-medium transition-all py-1 border-b-2",
                  location.pathname === gem.path ? "border-aditya-gold opacity-100" : "border-transparent opacity-80 hover:opacity-100"
                )}
              >
                {gem.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[11px] font-bold">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Gemini AI Connected
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 border border-white/20 overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya" alt="Avatar" />
          </div>
        </div>
      </header>

      {/* Hero-like Title Section for Gem Pages */}
      <AnimatePresence mode="wait">
        {location.pathname !== '/' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white border-b border-aditya-border py-8 px-10"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-aditya-slate text-xs font-bold uppercase tracking-widest mb-1">
                  <Link to="/" className="hover:text-aditya-blue transition-colors">Dashboard</Link>
                  <ChevronRight size={12} />
                  <span className="text-aditya-blue">Gem Module</span>
                </div>
                <h1 className="text-3xl font-bold text-aditya-blue">
                  {GEMS.find(g => g.path === location.pathname)?.title}
                </h1>
                <p className="text-aditya-slate mt-1">
                  {GEMS.find(g => g.path === location.pathname)?.tagline}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-4 sm:px-10 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-slate-100 border-t border-aditya-border px-10 py-4 flex flex-col sm:flex-row items-center justify-between text-[12px] text-aditya-slate gap-4">
        <div>© 2024 Aditya University IntelliGems Platform. All Rights Reserved.</div>
        <div className="flex items-center gap-4 font-medium">
          <span className="cursor-pointer hover:text-aditya-blue transition-colors">Academic Integrity</span>
          <span className="cursor-pointer hover:text-aditya-blue transition-colors">Faculty Support</span>
          <span className="cursor-pointer hover:text-aditya-blue transition-colors">Privacy Policy</span>
        </div>
      </footer>
    </div>
  );
}
