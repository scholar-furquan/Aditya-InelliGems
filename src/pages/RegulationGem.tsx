import React from 'react';
import { Send, FileText, Bot, User, Loader2, Info, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateGemContent } from '../services/gemini';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function RegulationGem() {
  const [messages, setMessages] = React.useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your University Regulation Assistant. You can ask me about academic policies, attendance rules, exam regulations, or any other university mandates. How can I help you today?' }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await generateGemContent(
        `Academic Question: ${userMessage}`,
        "You are the Aditya University Regulations Gem. Your job is to answer questions about academic policies, exam rules (like OMR rules, CGPA calculation, etc.), attendance requirements (75% mandatory), and other administrative regulations. Be very professional and cite 'University Handbook' where applicable. If you don't know an exact specific local rule, provide a general university policy answer but advise checking with the HOD."
      );
      setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm sorry, I couldn't process that request." }]);
    } catch (error) {
       setMessages(prev => [...prev, { role: 'assistant', content: "Error: I'm currently having trouble connecting to the university database. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-aditya-blue p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <FileText size={20} className="text-aditya-gold" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg">Regulation Assistant</h2>
            <p className="text-xs text-white/60">Policy & Rules Expert</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href="https://gemini.google.com/gem/1yBEpx544Bvz1dAK2kXu3uW1Sgpf2bgjp?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-aditya-gold text-aditya-blue px-4 py-2 rounded-xl text-xs font-bold hover:bg-yellow-400 transition-all border border-aditya-gold"
          >
            <ExternalLink size={14} />
            Gemini Regulation Guide
          </a>
          <a 
            href="https://aditya.ac.in/academic-regulations/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/20 transition-all border border-white/10"
          >
            <ExternalLink size={14} />
            Official Portal
          </a>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
      >
        {messages.map((message, i) => (
          <div 
            key={i} 
            className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' ? 'bg-aditya-gold text-aditya-blue' : 'bg-aditya-blue text-white'
            }`}>
              {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
              message.role === 'user' 
                ? 'bg-aditya-blue text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              <div className="markdown-body">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-aditya-blue text-white flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-aditya-gold" />
              <span className="text-sm text-slate-400 font-medium italic">Consulting handbook...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about grace marks, attendance, or exam rules..."
            className="w-full pl-4 pr-12 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-aditya-gold transition-all outline-none text-slate-800"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 px-4 bg-aditya-blue text-white rounded-xl hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="mt-3 text-[10px] text-center text-slate-400 font-medium">
          Always refer to the official University Handbook for the final decision.
        </p>
      </div>
    </div>
  );
}

