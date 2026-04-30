import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, FileText, Download, Printer, Wand2, TrendingUp, Sparkles, Filter, Loader2 } from 'lucide-react';
import { generateGemContent } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

const PERFORMANCE_DATA = [
  { name: 'CSE', avg: 82, attendance: 90 },
  { name: 'ECE', avg: 75, attendance: 85 },
  { name: 'EEE', avg: 68, attendance: 78 },
  { name: 'MECH', avg: 62, attendance: 70 },
  { name: 'CIVIL', avg: 58, attendance: 65 },
];

const GRADE_DISTRIBUTION = [
  { name: 'O (Outstanding)', value: 15, color: '#10B981' },
  { name: 'A+ (Excellent)', value: 25, color: '#3B82F6' },
  { name: 'A (Very Good)', value: 35, color: '#6366F1' },
  { name: 'B (Good)', value: 20, color: '#F59E0B' },
  { name: 'F (Fail)', value: 5, color: '#EF4444' },
];

export default function ReportsGem() {
  const [summary, setSummary] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generateAISummary = async () => {
    setIsGenerating(true);
    try {
      const dataStr = JSON.stringify(PERFORMANCE_DATA);
      const prompt = `Analyze this academic performance data for Aditya University across branches: ${dataStr}. Provide a concise executive summary highlighting high-performing branches, those needing attention, and overall trends. Suggest 3 actionable steps for academic improvement.`;
      const response = await generateGemContent(prompt, "You are a university data analyst. Provide authoritative, data-driven executive summaries.");
      setSummary(response || "Analysis failed.");
    } catch (error) {
       alert("AI Analyst is busy.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-aditya-blue">Academic Reports</h2>
          <p className="text-slate-500 italic text-sm font-medium">Real-time performance & attendance insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} />
             Filter Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-aditya-blue text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Overall Attendance', value: '82.4%', inc: '+2.1%', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-50' },
          { label: 'Avg CGPA', value: '7.82', inc: '+0.15', icon: TrendingUp, color: 'text-blue-500 bg-blue-50' },
          { label: 'Total Students', value: '1,240', inc: 'Active', icon: BarChart3, color: 'text-purple-500 bg-purple-50' },
          { label: 'Exam Eligibility', value: '94%', inc: '-1.2%', icon: TrendingUp, color: 'text-orange-500 bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                   <stat.icon size={20} />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.inc}</span>
             </div>
             <p className="text-2xl font-display font-bold text-aditya-blue">{stat.value}</p>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Branch Performance Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
           <h3 className="font-display font-bold text-lg text-aditya-blue mb-8">Branch Performance vs Attendance</h3>
           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PERFORMANCE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="avg" fill="#003366" radius={[4, 4, 0, 0]} name="Avg Score" />
                  <Bar dataKey="attendance" fill="#FF9900" radius={[4, 4, 0, 0]} name="Attendance %" />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
           <h3 className="font-display font-bold text-lg text-aditya-blue mb-8">Overall Grade Distribution</h3>
           <div className="flex flex-col md:flex-row items-center gap-8 h-80">
              <div className="flex-1 h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={GRADE_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {GRADE_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                 {GRADE_DISTRIBUTION.map((item, i) => (
                   <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                         <span className="font-medium text-slate-600">{item.name}</span>
                      </div>
                      <span className="font-bold text-aditya-blue">{item.value}%</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* AI Summary Section */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
         <div className="md:w-1/3 bg-aditya-blue p-8 text-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                 <Sparkles className="text-aditya-gold" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">AI Executive Insight</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Generate an automated analysis of university-wide academic trends using Gemini intelligence.
              </p>
            </div>
            
            <button 
              onClick={generateAISummary}
              disabled={isGenerating}
              className="w-full bg-aditya-gold text-aditya-blue py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all disabled:opacity-50"
            >
              {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Wand2 size={20} />}
              Generate Analysis
            </button>
         </div>

         <div className="flex-1 p-8 md:p-12 min-h-[300px]">
            {summary ? (
              <div className="markdown-body animate-in fade-in duration-700">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-300">
                 <FileText size={48} className="mb-4 opacity-50" />
                 <p className="font-display font-bold text-lg">Report Summary Sandbox</p>
                 <p className="text-sm">Click generate to receive an AI-powered summary of current statistics.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

