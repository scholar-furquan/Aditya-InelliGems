import React from 'react';
import { Calendar, Wand2, Download, Printer, Loader2, ListTodo, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateGemContent } from '../services/gemini';

export default function LessonPlanGem() {
  const [formData, setFormData] = React.useState({
    subject: '',
    semester: '1',
    weeks: '15',
    topics: ''
  });
  const [plan, setPlan] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || isLoading) return;

    setIsLoading(true);
    try {
      const prompt = `Create a structured weekly lesson plan for the subject "${formData.subject}" (Semester ${formData.semester}). 
      Duration: ${formData.weeks} weeks.
      Key Topics/Syllabus: ${formData.topics}.
      
      Format the output as a professional academic document with a table of weeks, topics, learning objectives, and suggested resources. Use Markdown table format.`;
      
      const response = await generateGemContent(prompt, "You are an expert curriculum designer. Provide a highly detailed, pedagogically sound lesson plan optimized for Aditya University standards.");
      setPlan(response || "Failed to generate plan.");
    } catch (error) {
      console.error(error);
      alert("Failed to generate lesson plan.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      {/* Form Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
              <ListTodo size={20} />
            </div>
            <h2 className="font-display font-bold text-xl text-aditya-blue">Plan Generator</h2>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject Name</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Data Structures & Algorithms"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Semester</label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Sem {s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Duration (Weeks)</label>
                <input
                  type="number"
                  min="1"
                  max="52"
                  value={formData.weeks}
                  onChange={(e) => setFormData({ ...formData, weeks: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Syllabus Highlights</label>
              <textarea
                rows={4}
                value={formData.topics}
                onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                placeholder="Enter key topics or paste syllabus snippets..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-aditya-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Drawing Plan...
                </>
              ) : (
                <>
                  <Wand2 size={18} />
                  Generate Lesson Plan
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-aditya-blue text-white p-6 rounded-3xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
          <h3 className="font-bold mb-2 flex items-center gap-2 text-sm">
            <ExternalLink size={16} className="text-aditya-gold" />
            Gemini Lesson Guide
          </h3>
          <p className="text-[11px] text-white/70 mb-4 leading-relaxed">
            Access the advanced Gemini assistant specifically tuned for Aditya University lesson structuring.
          </p>
          <a 
            href="https://gemini.google.com/gem/1lhZhE_aB4zbcLr9SJNcPvPpTenRuoGqb?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-aditya-gold text-aditya-blue px-4 py-2 rounded-xl text-xs font-bold hover:bg-yellow-400 transition-colors w-full justify-center"
          >
            Open External Guide
          </a>
        </div>

        <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
           <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2 text-sm">
             <Calendar size={16} />
             Faculty Tip
           </h3>
           <p className="text-xs text-orange-700/80 leading-relaxed">
             Providing specific textbooks or learning outcomes in the 'Syllabus Highlights' section will result in more accurate resource recommendations.
           </p>
        </div>
      </div>

      {/* Main Output */}
      <div className="lg:col-span-2 h-full">
        {plan ? (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col print:shadow-none print:border-none">
            <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex items-center justify-between no-print">
              <h3 className="font-bold text-aditya-blue">Generated Plan</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrint}
                  className="p-2 hover:bg-white rounded-lg transition-colors text-slate-600 flex items-center gap-2 text-xs font-bold"
                >
                  <Printer size={16} />
                  Print
                </button>
                <button 
                  onClick={handlePrint}
                  className="bg-aditya-blue text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <Download size={14} />
                  Export PDF
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto bg-white print:p-0">
               <div className="markdown-body">
                  <ReactMarkdown>{plan}</ReactMarkdown>
               </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-3xl h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-6 shadow-sm">
              <Calendar size={40} />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-400 mb-2">No Plan Generated Yet</h3>
            <p className="text-slate-400 max-w-xs text-sm">Fill in the details and click generate to create a professional lesson plan.</p>
          </div>
        )}
      </div>
    </div>
  );
}

