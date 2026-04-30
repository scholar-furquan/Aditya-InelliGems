import React from 'react';
import { Briefcase, UserCircle, MessageSquare, BrainCircuit, Sparkles, Loader2, PlayCircle, Trophy, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateGemContent } from '../services/gemini';

type Step = 'info' | 'generating' | 'result';

export default function PlacementGem() {
  const [activeMode, setActiveMode] = React.useState<'resume' | 'interview' | 'aptitude'>('resume');
  const [step, setStep] = React.useState<Step>('info');
  const [inputData, setInputData] = React.useState({
    skills: '',
    role: '',
    company: ''
  });
  const [result, setResult] = React.useState<string | null>(null);

  const startGeneration = async () => {
    setStep('generating');
    try {
      let prompt = "";
      if (activeMode === 'resume') {
        prompt = `Write a professional resume summary and a highlight-based skills section for a candidate applying for the role of ${inputData.role}. Key skills were: ${inputData.skills}. Format for a clean PDF/Word document.`;
      } else if (activeMode === 'interview') {
        prompt = `Generate 5 common technical interview questions and 3 behavioral questions for the role of ${inputData.role} at ${inputData.company || "a top tech company"}. Provide model answers for each. Candidate skills: ${inputData.skills}.`;
      } else if (activeMode === 'aptitude') {
        prompt = `Generate 5 challenging quantitative and logical aptitude questions tailored for ${inputData.role} placement preparation, including step-by-step solutions. Topics to cover: ${inputData.skills || "General Aptitude"}.`;
      }

      const response = await generateGemContent(prompt, "You are a senior HR manager and technical recruiter at a world-class technology firm. You are helping Aditya University students achieve 100% placement success.");
      setResult(response || "Failed to generate guidance.");
      setStep('result');
    } catch (error) {
      alert("Placement assistant offline. Try again later.");
      setStep('info');
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        {/* Header Toolbar */}
        <div className="bg-aditya-blue p-8 text-white relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl -mr-24 -mt-24" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold mb-2">Placement Accelerator</h2>
            <p className="text-white/60 text-sm max-w-lg">Get industry-ready with personalized AI coaching for resumes, interviews, and aptitude.</p>
          </div>

          <div className="mt-8 flex bg-white/10 p-1 rounded-2xl border border-white/10 backdrop-blur-md w-fit">
            {[
              { id: 'resume', label: 'Resume Help', icon: UserCircle },
              { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
              { id: 'aptitude', label: 'Aptitude', icon: BrainCircuit },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setActiveMode(mode.id as any);
                  setStep('info');
                  setResult(null);
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeMode === mode.id ? "bg-aditya-gold text-aditya-blue shadow-lg" : "hover:bg-white/5"
                }`}
              >
                <mode.icon size={18} />
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Body */}
        <div className="flex-1 p-8 flex flex-col items-center">
          {step === 'info' && (
            <div className="w-full max-w-xl mx-auto space-y-8 py-10 animate-in fade-in zoom-in-95 duration-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                   <Sparkles size={32} />
                </div>
                <h3 className="text-xl font-display font-bold text-aditya-blue">Tell us about your target profile</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Target Role</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Software Engineer"
                      value={inputData.role}
                      onChange={(e) => setInputData({...inputData, role: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Target Company (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. TCS, Wipro, Google"
                      value={inputData.company}
                      onChange={(e) => setInputData({...inputData, company: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Your Core Skills / Tech Stack</label>
                  <textarea 
                    rows={3}
                    placeholder="e.g. Java, Spring Boot, SQL, AWS, Problem Solving..."
                    value={inputData.skills}
                    onChange={(e) => setInputData({...inputData, skills: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <button 
                onClick={startGeneration}
                disabled={!inputData.role || !inputData.skills}
                className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-30 disabled:shadow-none"
              >
                <PlayCircle size={20} />
                Generate My Preparation Guide
              </button>
            </div>
          )}

          {step === 'generating' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 pt-20">
               <div className="relative">
                  <div className="w-24 h-24 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Trophy size={32} className="text-emerald-500 animate-pulse" />
                  </div>
               </div>
               <div>
                 <h3 className="text-xl font-display font-bold text-aditya-blue">Analyzing Placement Targets</h3>
                 <p className="text-slate-400 text-sm mt-1 italic">Our AI coach is crafting your personalized roadmap...</p>
               </div>
            </div>
          )}

          {step === 'result' && result && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                       <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-aditya-blue">Preparation Guide Ready</h3>
                      <p className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest">{activeMode} Module</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep('info')}
                    className="text-xs font-bold text-slate-400 hover:text-aditya-blue transition-colors px-4 py-2 border border-slate-100 rounded-lg"
                  >
                    Start New Request
                  </button>
               </div>

               <div className="max-w-none prose prose-slate">
                 <div className="markdown-body">
                   <ReactMarkdown>{result}</ReactMarkdown>
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

