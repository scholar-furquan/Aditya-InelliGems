import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, Plus, Mic, Image as ImageIcon, ChevronDown, MoreVertical, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithRegulationsAgent } from '../services/gemini';
import { useNavigate } from 'react-router-dom';

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

export default function RegulationGem() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: "Hello! I am the **AUS Regulations agent**. You can ask me about academic policies, attendance rules, exam regulations, or any other university mandates. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    const newMessages: Message[] = [...messages, { id: Date.now().toString(), role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({
        role: m.role,
        content: m.content
      }));
      
      const response = await chatWithRegulationsAgent(apiMessages);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        content: response || "I'm sorry, I didn't quite catch that. Could you try again?" 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        content: '**Connection Error:** Unable to reach the Regulations agent. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden text-[#1f1f1f]">
      {/* Sidebar - Gemini Style */}
      <div 
        className={`hidden md:flex flex-col bg-[#f0f4f9] shrink-0 transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-[320px] p-4' : 'w-0 p-0 opacity-0'
        } overflow-hidden`}
      >
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 hover:bg-slate-200/50 p-2 text-sm rounded-full w-fit mb-8 transition-colors"
        >
          <Menu size={20} className="text-[#444746]" />
        </button>
        
        <button 
          onClick={() => setMessages([messages[0]])}
          className="bg-[#e8eaed] hover:bg-[#dfe1e5] text-[#1f1f1f] text-[14px] font-medium py-3 px-5 rounded-full flex items-center gap-3 w-fit transition-colors mb-6"
        >
          <Plus size={18} />
          New chat
        </button>

        <div className="flex-1 overflow-y-auto">
          <p className="text-[14px] font-medium text-[#444746] px-3 mb-2">Recent</p>
          <div className="text-[14px] text-[#444746] px-3 py-2 rounded-full hover:bg-slate-200/50 cursor-pointer truncate">
            Attendance requirements
          </div>
          <div className="text-[14px] text-[#444746] px-3 py-2 rounded-full hover:bg-slate-200/50 cursor-pointer truncate">
            CGPA calculation rules
          </div>
        </div>

        <div className="mt-auto space-y-1">
          <div className="flex items-center gap-3 text-[14px] text-[#444746] px-3 py-2 rounded-full hover:bg-slate-200/50 cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            Help
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[#444746] px-3 py-2 rounded-full hover:bg-slate-200/50 cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Activity
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[#444746] px-3 py-2 rounded-full hover:bg-slate-200/50 cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-slate-500"></span>
            Settings
          </div>
        </div>
      </div>

      {/* Main Chat Content */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        {/* Top Header */}
        <header className="flex items-center justify-between px-4 h-[64px] shrink-0">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-[#f0f4f9] rounded-full transition-colors hidden md:block"
              >
                <Menu size={20} className="text-[#444746]" />
              </button>
            )}
            <button className="md:hidden p-2 hover:bg-[#f0f4f9] rounded-full transition-colors" onClick={() => navigate('/')}>
              <Menu size={20} className="text-[#444746]" />
            </button>
            <div className="text-[20px] text-[#444746] font-medium flex items-center cursor-pointer select-none">
              <span className="truncate max-w-[200px] md:max-w-none">AUS Regulations agent</span>
              <ChevronDown size={20} className="ml-1 text-[#444746]" />
            </div>
            <span className="bg-[#f0f4f9] text-[#444746] text-[12px] font-medium px-2 py-0.5 rounded-md hidden md:block">
              Gem
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-[#444746] hover:bg-[#f0f4f9] rounded-full transition-colors hidden md:block">
              <MoreVertical size={20} />
            </button>
            <button className="w-8 h-8 rounded-full bg-blue-600 text-white font-medium text-sm flex items-center justify-center cursor-pointer select-none">
              A
            </button>
          </div>
        </header>

        {/* Scrollable Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-0 scroll-smooth">
          <div className="max-w-[800px] mx-auto w-full pb-32 pt-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex w-full mb-8 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'user' ? (
                  <div className="bg-[#f0f4f9] text-[#1f1f1f] px-5 py-3 rounded-3xl max-w-full md:max-w-[75%]">
                    <p className="whitespace-pre-wrap text-[16px] leading-[1.6] m-0">{message.content}</p>
                  </div>
                ) : (
                  <div className="flex gap-4 max-w-full w-full">
                    <div className="shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-blue-100/50">
                        <Sparkles size={20} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      {/* Name of the Gem on top of message */}
                      <p className="text-[14px] font-medium text-[#444746] mb-1">AUS Regulations agent</p>
                      <div className="markdown-body text-[16px] leading-[1.6] text-[#1f1f1f] prose prose-slate max-w-none prose-p:my-2 prose-headings:font-medium prose-a:text-blue-600">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex w-full mb-8 justify-start">
                <div className="flex gap-4 max-w-full w-full">
                  <div className="shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-blue-100/50">
                      <Sparkles size={20} className="text-blue-600 animate-pulse" />
                    </div>
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className="h-4 w-4 bg-[#f0f4f9] rounded-full animate-pulse mr-1"></div>
                    <div className="h-4 w-4 bg-[#f0f4f9] rounded-full animate-pulse mr-1" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-4 w-4 bg-[#f0f4f9] rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Container */}
        <div className="absolute bottom-0 left-0 right-0 pt-2 pb-6 px-4 bg-gradient-to-t from-white via-white to-transparent">
          <div className="max-w-[830px] mx-auto w-full relative">
            <div className="bg-[#f0f4f9] rounded-[32px] pl-4 pr-1 py-1 flex items-end shadow-[0_0_0_1px_rgba(0,0,0,0.05)] focus-within:shadow-[0_0_0_1px_rgba(0,0,0,0.15)] transition-shadow">
              <button className="p-3 text-[#444746] hover:bg-[#e1e5ea] rounded-full shrink-0 transition-colors mb-1">
                <Plus size={22} />
              </button>
              
              <div className="flex-1 py-4 px-2 min-h-[56px] flex flex-col justify-center">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="w-full bg-transparent border-none p-0 resize-none focus:outline-none focus:ring-0 text-[16px] text-[#1f1f1f] placeholder:text-[#444746] leading-tight max-h-[200px]"
                  style={{ minHeight: '24px' }}
                  rows={1}
                />
              </div>

              <div className="flex items-center shrink-0 mb-1">
                {!input.trim() && (
                  <>
                    <button className="p-3 text-[#444746] hover:bg-[#e1e5ea] rounded-full transition-colors hidden sm:block">
                      <ImageIcon size={22} />
                    </button>
                    <button className="p-3 text-[#444746] hover:bg-[#e1e5ea] rounded-full transition-colors">
                      <Mic size={22} />
                    </button>
                  </>
                )}
                {input.trim() && (
                  <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="p-3 bg-black text-white hover:bg-[#1f1f1f] disabled:opacity-50 disabled:bg-slate-300 rounded-full transition-colors mr-1"
                  >
                    <Send size={20} />
                  </button>
                )}
              </div>
            </div>
            <div className="text-center mt-3">
              <p className="text-[12px] text-[#444746]">
                Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
