import React from 'react';
import { GraduationCap, FileText, HelpCircle, Target, Sparkles, Loader2, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateGemContent } from '../services/gemini';
import { cn } from '../lib/utils';

type TabType = 'notes' | 'questions' | 'exam-prep';

export default function AcademicsGem() {
  const [activeTab, setActiveTab] = React.useState<TabType>('notes');
  const [subject, setSubject] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [output, setOutput] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleGenerate = async () => {
    if (!subject || !topic || isLoading) return;

    setIsLoading(true);
    try {
      let prompt = "";
      let systemMsg = "You are a highly qualified academic professor at Aditya University.";

      if (activeTab === 'notes') {
        prompt = `Generate comprehensive academic notes for the subject "${subject}" on the topic "${topic}". Include key definitions, formulas, bulleted points, and a summary.`;
      } else if (activeTab === 'questions') {
        prompt = `Generate a question bank for the subject "${subject}" on the topic "${topic}". Include 5 short questions (2 marks) and 3 long questions (10 marks) with brief hints for answers.`;
      } else if (activeTab === 'exam-prep') {
        prompt = `Create an exam preparation assistant guide for the subject "${subject}" on the topic "${topic}". Include common mistakes students make, high-yield focus areas, and a 3-day study breakdown.`;
      }

      const response = await generateGemContent(prompt, systemMsg);
      setOutput(response || "Failed to generate content.");
    } catch (error) {
      console.error(error);
      alert("Error generating content.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-aditya-blue">Academics Gem</h2>
          <p className="text-slate-500">Your AI-powered study companion.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {[
            { id: 'notes', label: 'Notes', icon: FileText },
            { id: 'questions', label: 'Questions', icon: HelpCircle },
            { id: 'exam-prep', label: 'Exam Prep', icon: Target },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as TabType);
                setOutput(null);
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                activeTab === tab.id 
                  ? "bg-white text-aditya-blue shadow-sm" 
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Input Control */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Embedded Systems"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Topic/Chapter</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. 8051 Architecture"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !subject || !topic}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Sparkles size={18} />
              )}
              {activeTab === 'notes' ? 'Generate Notes' : activeTab === 'questions' ? 'Create Q-Bank' : 'Start Prep'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {output ? (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="px-8 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest">
                  <Sparkles size={14} />
                  AI Generated {activeTab === 'notes' ? 'Notes' : activeTab === 'questions' ? 'Questions' : 'Guide'}
                </span>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600 text-xs font-bold transition-colors"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
              </div>
              <div className="p-8">
                 <div className="markdown-body">
                   <ReactMarkdown>{output}</ReactMarkdown>
                 </div>
              </div>
            </div>
          ) : (
            <div className="bg-indigo-50/30 border-2 border-dashed border-indigo-100 rounded-3xl h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-200 mb-4 shadow-sm">
                  {activeTab === 'notes' ? <FileText size={32} /> : activeTab === 'questions' ? <HelpCircle size={32} /> : <Target size={32} />}
               </div>
               <h3 className="font-display font-bold text-slate-500">Ready to assist</h3>
               <p className="text-slate-400 text-sm max-w-xs mt-2">Enter your subject and topic details to get started with AI academics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

