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
    { sender: 'ai', text: 'CampusOS AI Assistant ready. Ask about course policy, lecture summaries, or exam dates.' },
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
      let reply = 'Enrolled course index query results:';
      if (query.toLowerCase().includes('syllabus') || query.toLowerCase().includes('exam') || query.toLowerCase().includes('policy')) {
        reply = 'CS301 Syllabus Policy:\n• Midterm Exam 1: Aug 15 (25% weight)\n• Required attendance threshold: 75%\n• Makeup policy: 48-hour prior notice to instructor.';
      } else if (query.toLowerCase().includes('summary') || query.toLowerCase().includes('note')) {
        reply = 'CS301 Lecture Notes Summary:\n• AVL Tree Balance Factor: BF = Height(Left) - Height(Right)\n• Rebalancing requires single/double rotations when |BF| > 1.\n• Time complexity: O(log N).';
      } else {
        reply = 'Indexed active courses: CS301, PHY202, MATH305. You can ask for syllabus policies, lecture summaries, or assignment dates.';
      }
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-zinc-900 border-l border-zinc-800 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="p-3.5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-indigo-400" />
          <div>
            <h2 className="text-xs font-semibold text-white flex items-center gap-1.5">
              <span>AI Assistant</span>
              <Badge variant="indigo" size="sm">Indexed</Badge>
            </h2>
          </div>
        </div>
        <button onClick={onClose} className="text-zinc-400 hover:text-white p-1">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Prompts */}
      <div className="px-3 py-2 bg-zinc-950/60 border-b border-zinc-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <button
          onClick={() => handleSend('CS301 Syllabus Policy')}
          className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 whitespace-nowrap flex items-center gap-1 border border-zinc-700/60"
        >
          <BookOpen className="w-3 h-3 text-indigo-400" /> Syllabus Policy
        </button>
        <button
          onClick={() => handleSend('Summarize AVL Tree Notes')}
          className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 whitespace-nowrap flex items-center gap-1 border border-zinc-700/60"
        >
          <FileText className="w-3 h-3 text-cyan-400" /> Lecture Notes
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[88%] p-2.5 rounded-lg whitespace-pre-wrap leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-200'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-zinc-950 border border-zinc-800 px-2.5 py-1.5 rounded-lg text-zinc-400 flex items-center gap-1.5 text-xs">
              <Sparkles className="w-3 h-3 text-indigo-400 animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-2.5 border-t border-zinc-800 bg-zinc-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask AI... (⌘J)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 input-base text-xs py-1.5"
          />
          <Button size="sm" type="submit" leftIcon={<Send className="w-3 h-3" />}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
