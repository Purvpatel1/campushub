import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, Send, X, BookOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { sender: 'ai', text: 'Hello Alex! I am your CampusOS AI Study Partner. Ask me about course policy, lecture note summaries, or exam dates.' },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInput('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = 'Here is what I found in your enrolled course documents:';
      if (query.toLowerCase().includes('syllabus') || query.toLowerCase().includes('exam') || query.toLowerCase().includes('policy')) {
        reply = 'According to the CS301 Syllabus, Midterm Exam 1 is scheduled for August 15th (25% weight). Makeup exams require 48-hour prior notice to Prof. Miller.';
      } else if (query.toLowerCase().includes('summary') || query.toLowerCase().includes('note')) {
        reply = 'Summary of Today\'s Data Structures Lecture:\n• AVL Tree Balance Factor: BF = Height(Left) - Height(Right)\n• If |BF| > 1, perform Left/Right single or double rotations.\n• Search time complexity guaranteed O(log N).';
      } else {
        reply = `I have indexed your enrolled courses (CS301, PHY202, MATH305). You can ask me to draft study guides, explain formulas, or check assignment due dates!`;
      }
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsThinking(false);
    }, 800);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 glass-panel border-l border-indigo-500/30 shadow-2xl flex flex-col justify-between animate-slide-left">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white flex items-center gap-1.5">
              <span>CampusOS AI Partner</span>
              <Badge variant="indigo" size="sm">GPT-4o</Badge>
            </h2>
            <p className="text-[10px] text-slate-400">Context: 4 Enrolled Courses Indexed</p>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800/40 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <button
          onClick={() => handleSend('Ask Syllabus Policy for CS301')}
          className="px-2.5 py-1 rounded-lg glass-panel text-indigo-300 hover:bg-indigo-600/20 whitespace-nowrap flex items-center gap-1"
        >
          <BookOpen className="w-3 h-3 text-indigo-400" /> CS301 Syllabus Policy
        </button>
        <button
          onClick={() => handleSend('Summarize Today\'s AVL Tree Notes')}
          className="px-2.5 py-1 rounded-lg glass-panel text-cyan-300 hover:bg-cyan-600/20 whitespace-nowrap flex items-center gap-1"
        >
          <FileText className="w-3 h-3 text-cyan-400" /> Summarize Notes
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-brand text-white shadow-md shadow-indigo-500/20'
                  : 'glass-card text-slate-200 border-slate-800'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start">
            <div className="glass-card px-3 py-2 rounded-2xl text-slate-400 flex items-center gap-2 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
              <span>Indexing course documents...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/60">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask AI partner... (⌘J)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 glass-input px-3 py-2 text-xs rounded-xl"
          />
          <Button size="sm" type="submit" leftIcon={<Send className="w-3.5 h-3.5" />}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
