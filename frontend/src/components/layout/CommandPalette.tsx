import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, LayoutDashboard, QrCode, FileCheck2, Users, GraduationCap, Settings, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
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
    { label: 'Go to Dashboard Overview', path: '/dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { label: 'View Academic Schedule & Timetable', path: '/academics', icon: GraduationCap, category: 'Academics' },
    { label: 'Open Live QR Attendance Generator', path: '/attendance', icon: QrCode, category: 'Attendance' },
    { label: 'View Assignments & Submissions', path: '/assignments', icon: FileCheck2, category: 'Academics' },
    { label: 'Browse Campus Clubs & Events', path: '/clubs', icon: Users, category: 'Campus Life' },
    { label: 'Account Settings & Preferences', path: '/settings', icon: Settings, category: 'System' },
    { label: 'Open Executive Admin Panel', path: '/admin', icon: ShieldAlert, category: 'System' },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-xl glass-panel border border-indigo-500/30 rounded-2xl shadow-2xl shadow-indigo-500/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800/80 gap-3">
          <Search className="w-5 h-5 text-indigo-400" />
          <input
            type="text"
            placeholder="Type a command or search page... (e.g. Attendance, Timetable)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm hover:bg-indigo-600/20 text-slate-200 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-slate-800/80 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-[11px] text-slate-500">{item.category}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-500 text-sm">
              No commands found for "{query}"
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>CampusOS Sub-100ms Command Navigation</span>
          </span>
          <span>Press <kbd className="font-mono text-slate-400">Enter</kbd> to select</span>
        </div>
      </div>
    </div>
  );
};
