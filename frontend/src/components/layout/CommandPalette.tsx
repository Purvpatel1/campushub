import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, LayoutDashboard, QrCode, FileCheck2, Users, GraduationCap, Settings, ShieldAlert, ArrowRight } from 'lucide-react';

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
    { label: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { label: 'Academic Schedule & Timetable', path: '/academics', icon: GraduationCap, category: 'Academics' },
    { label: 'Attendance Management', path: '/attendance', icon: QrCode, category: 'Attendance' },
    { label: 'Assignments & Submissions', path: '/assignments', icon: FileCheck2, category: 'Academics' },
    { label: 'Clubs & Events', path: '/clubs', icon: Users, category: 'Campus Life' },
    { label: 'Account Settings', path: '/settings', icon: Settings, category: 'System' },
    { label: 'Admin Control Panel', path: '/admin', icon: ShieldAlert, category: 'System' },
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-zinc-950/80 backdrop-blur-xs">
      <div
        className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3 border-b border-zinc-800 gap-3">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none"
          />
          <kbd className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* Action List */}
        <div className="max-h-72 overflow-y-auto p-1.5 space-y-0.5">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 font-mono">{item.category}</span>
                    <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-6 text-center text-zinc-500 text-xs">
              No results found for "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
          <span>CampusOS Navigation</span>
          <span>Press <kbd className="font-mono text-zinc-400">Enter</kbd> to select</span>
        </div>
      </div>
    </div>
  );
};
