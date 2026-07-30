import React, { useState, useEffect } from 'react';
import { usePlatform } from '@/hooks/usePlatform';
import { HelpCircle, Send, X, BookOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({ isOpen, onClose }) => {
  const platform = usePlatform();
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { sender: 'ai', text: 'Ask about schedule, attendance, notes, or placements.' },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
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
      let reply = 'Search results:';
      if (query.toLowerCase().includes('syllabus') || query.toLowerCase().includes('exam') || query.toLowerCase().includes('policy')) {
        reply = 'CS301 Details:\n- Midterm: Aug 15\n- Required attendance: 75%';
      } else if (query.toLowerCase().includes('summary') || query.toLowerCase().includes('note')) {
        reply = 'CS301 Notes:\n- AVL Tree balance factor: left height - right height\n- Rotations trigger when balance factor exceeds 1.';
      } else {
        reply = 'Active courses: CS301, PHY202, MATH305. Ask for details, notes, or dates.';
      }
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsThinking(false);
    }, 300);
  };

  const shortcutHint = platform.getShortcutLabel('j');

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-zinc-900 border-l border-zinc-800 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="p-3 md:p-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-950 min-h-[44px]">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-zinc-400" />
          <h2 className="text-sm md:text-xs font-semibold text-zinc-200">
            Assistant
          </h2>
        </div>
        <button onClick={onClose} className="text-zinc-400 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center">
          <X className="w-5 h-5 md:w-4 md:h-4" />
        </button>
      </div>

      {/* Suggested */}
      <div className="px-3 py-2 bg-zinc-950 border-b border-zinc-800 flex items-center gap-2 overflow-x-auto text-xs md:text-[11px]">
        <button
          onClick={() => handleSend('CS301 Syllabus Policy')}
          className="px-3 py-2 md:px-2 md:py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 whitespace-nowrap flex items-center gap-1 border border-zinc-800 min-h-[44px] md:min-h-0"
        >
          <BookOpen className="w-3.5 h-3.5 md:w-3 md:h-3 text-zinc-400" /> Syllabus
        </button>
        <button
          onClick={() => handleSend('Summarize AVL Tree Notes')}
          className="px-3 py-2 md:px-2 md:py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 whitespace-nowrap flex items-center gap-1 border border-zinc-800 min-h-[44px] md:min-h-0"
        >
          <FileText className="w-3.5 h-3.5 md:w-3 md:h-3 text-zinc-400" /> Notes
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[88%] p-2.5 rounded whitespace-pre-wrap leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-zinc-100 text-zinc-950 font-medium'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-300'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-zinc-950 border border-zinc-800 px-2.5 py-1.5 rounded text-zinc-500 text-xs font-mono">
              Searching...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={shortcutHint ? `Ask a question (${shortcutHint})` : 'Ask a question...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 input-base text-xs py-2 md:py-1.5"
          />
          <Button size="sm" type="submit" leftIcon={<Send className="w-3.5 h-3.5 md:w-3 md:h-3" />}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
