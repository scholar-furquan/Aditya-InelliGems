import React from 'react';
import { SearchCode, Upload, FileCheck, ShieldAlert, Sparkles, Loader2, Gauge, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { generateGemContent } from '../services/gemini';

export default function PlagiarismGem() {
  const [text, setText] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState<{
    score: number;
    summary: string;
    details: string[];
  } | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    try {
      const prompt = `Perform a plagiarism and originality analysis on the following project abstract/content: "${text.substring(0, 5000)}". 
      Provide:
      1. A mock similarity score (0-100).
      2. A brief 2rd person professional summary of originality.
      3. A list of 3 potential improvement areas to make the content more unique.
      
      Response MUST be valid JSON with keys: "score" (number), "summary" (string), "details" (string array).`;
      
      const response = await generateGemContent(prompt, "You are an academic integrity bot. Return ONLY JSON.");
      const data = JSON.parse(response || '{"score":0, "summary": "N/A", "details": []}');
      setResult(data);
    } catch (error) {
       console.error(error);
       alert("Integrity engine offline.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-2">
          <h2 className="text-3xl font-display font-bold text-aditya-blue">Academic Integrity Gem</h2>
          <p className="text-slate-500">Ensure originality in project submissions and research papers.</p>
        </div>
        <a 
          href="https://gemini.google.com/gem/10Rgv0LKZITFdJFzIGVc7QFG6bAXgjQ4G?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-aditya-gold text-aditya-blue px-6 py-3 rounded-2xl font-bold text-sm hover:bg-yellow-400 transition-all shadow-lg shadow-aditya-gold/20 shrink-0"
        >
          <ExternalLink size={18} />
          Gemini Plagiarism Guide
        </a>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
           <div className="p-8 border-r border-slate-100">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center">
                   <SearchCode size={20} />
                </div>
                <h3 className="font-display font-bold text-aditya-blue">Content Analysis</h3>
             </div>

             <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-slate-50 rounded-2xl group-focus-within:bg-white border-2 border-dashed border-slate-200 group-focus-within:border-aditya-gold transition-all" />
                  <textarea 
                    rows={12}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your project abstract, introduction, or key chapters here for similarity checking..."
                    className="relative w-full bg-transparent p-6 rounded-2xl outline-none text-slate-700 text-sm leading-relaxed z-10"
                  />
                </div>

                <button 
                  onClick={handleAnalyze}
                  disabled={!text.trim() || isAnalyzing}
                  className="w-full bg-aditya-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50 shadow-lg shadow-aditya-blue/10"
                >
                  {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <ShieldAlert size={18} />}
                  Run Integrity Check
                </button>
             </div>
           </div>

           <div className="p-8 bg-slate-50/50 flex flex-col justify-center">
             {result ? (
               <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                 <div className="flex items-center justify-center">
                    <div className="relative">
                       <svg className="w-32 h-32 transform -rotate-90">
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                            strokeDasharray={364}
                            strokeDashoffset={364 - (364 * result.score) / 100}
                            className={result.score > 30 ? "text-rose-500" : "text-emerald-500"} 
                          />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-display font-bold text-aditya-blue">{result.score}%</span>
                          <span className="text-[8px] uppercase font-bold text-slate-400 tracking-widest">Similarity</span>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                      {result.score < 20 ? <CheckCircle size={12} className="text-emerald-500" /> : <AlertTriangle size={12} className="text-rose-500" />}
                      Executive Verdict
                    </p>
                    <p className="text-sm font-medium text-slate-700 leading-relaxed italic">"{result.summary}"</p>
                 </div>

                 <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Originality Improvements</p>
                    {result.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2 bg-white/60 p-2 rounded-lg border border-slate-100 text-xs font-medium text-slate-600">
                         <Sparkles size={12} className="mt-0.5 text-aditya-gold flex-shrink-0" />
                         {detail}
                      </div>
                    ))}
                 </div>

                 <button 
                  onClick={() => {setResult(null); setText('');}}
                  className="w-full py-2 text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-widest"
                 >
                   Reset Analysis
                 </button>
               </div>
             ) : (
               <div className="text-center space-y-4 opacity-40">
                  <Upload size={48} className="mx-auto text-slate-300" />
                  <div>
                    <p className="font-display font-bold text-slate-400">Analysis Pending</p>
                    <p className="text-xs text-slate-400 max-w-[200px] mx-auto">Upload your document content to see similarity results and originality score.</p>
                  </div>
               </div>
             )}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { title: 'Standard Check', desc: 'Cross-references university repository' },
           { title: 'AI Refinement', desc: 'Deep semantic similarity analysis' },
           { title: 'Citation Guard', desc: 'Identifies missing references' },
         ].map((card, i) => (
           <div key={i} className="bg-white/50 p-4 rounded-2xl border border-slate-100 text-center">
              <h4 className="text-sm font-bold text-aditya-blue mb-1">{card.title}</h4>
              <p className="text-[10px] text-slate-400">{card.desc}</p>
           </div>
         ))}
      </div>
    </div>
  );
}

