import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlatform } from '@/hooks/usePlatform';
import { Search, LayoutDashboard, Calendar, Percent, FileCheck2, BookOpen, User, Settings, ArrowRight, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const platform = usePlatform();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Timetable', path: '/timetable', icon: Calendar },
    { label: 'Attendance', path: '/attendance', icon: Percent },
    { label: 'Assignments', path: '/assignments', icon: FileCheck2 },
    { label: 'Notes', path: '/notes', icon: BookOpen },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-start justify-center pt-4 sm:pt-20 px-3 bg-zinc-950/80 backdrop-blur-xs" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-3.5 py-3 md:py-2.5 border-b border-zinc-800 gap-2.5 min-h-[44px]">
          <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-zinc-200 placeholder-zinc-500 text-sm md:text-xs focus:outline-none"
          />
          {!platform.isTouchDevice ? (
            <kbd className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-500">
              ESC
            </kbd>
          ) : (
            <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="max-h-72 overflow-y-auto p-1 space-y-1 md:space-y-0.5">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center justify-between px-3 py-3 md:py-2 rounded text-left text-sm md:text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors group min-h-[44px] md:min-h-0"
                >
                  <div className="flex items-center gap-3 md:gap-2.5">
                    <Icon className="w-4 h-4 md:w-3.5 md:h-3.5 text-zinc-400 group-hover:text-zinc-200" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 md:w-3 md:h-3 text-zinc-600 group-hover:text-zinc-400" />
                </button>
              );
            })
          ) : (
            <div className="py-6 text-center text-zinc-500 text-xs">
              No results found.
            </div>
          )}
        </div>

        <div className="px-3 py-2 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
          <span>Search</span>
          {!platform.isTouchDevice && <span>Press Enter to select</span>}
        </div>
      </div>
    </div>
  );
};
