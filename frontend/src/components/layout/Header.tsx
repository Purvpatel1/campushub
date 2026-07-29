import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Search, Bell, Menu, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onToggleSidebar: () => void;
  onOpenAI?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette, onToggleSidebar, onOpenAI }) => {
  const { user, setRole } = useAuth();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/dashboard': return 'Universal Dashboard';
      case '/academics': return 'Academic Timetable & Schedule';
      case '/attendance': return 'Smart Attendance Management';
      case '/assignments': return 'Assignments & Grading Workbench';
      case '/clubs': return 'Campus Clubs & Events Hub';
      case '/community': return 'Campus Community Forums';
      case '/career': return 'Career Hub & Placement Portal';
      case '/settings': return 'Account & Platform Settings';
      case '/admin': return 'Executive Admin Control Panel';
      default: return 'CampusOS';
    }
  };

  const notifications = [
    { id: '1', title: 'Data Structures Quiz Due Today', time: '10 mins ago', type: 'academic' },
    { id: '2', title: 'Attendance Marked: Physics 101', time: '1 hour ago', type: 'attendance' },
    { id: '3', title: 'Hackathon RSVP Confirmed', time: '3 hours ago', type: 'club' },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 glass-panel border-b border-slate-800/80 px-4 lg:px-8 flex items-center justify-between">
      {/* Left Title & Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>{getPageTitle(location.pathname)}</span>
            <Badge variant="indigo" size="sm" className="hidden sm:inline-flex capitalize">
              {user.role.replace('_', ' ')}
            </Badge>
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* AI Assistant Button Trigger */}
        <button
          onClick={onOpenAI}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs transition-all shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>AI Partner</span>
          <kbd className="hidden sm:inline-block font-mono text-[10px] bg-slate-800 px-1 py-0.5 rounded text-indigo-300 border border-indigo-500/30">
            ⌘J
          </kbd>
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-indigo-500/40 text-xs transition-all"
        >
          <Search className="w-3.5 h-3.5 text-indigo-400" />
          <span>Quick search...</span>
          <kbd className="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-panel border border-slate-800 rounded-2xl shadow-2xl p-4 animate-scale-up">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <span className="font-bold text-sm text-white">Notifications</span>
                <Badge variant="indigo" size="sm">3 New</Badge>
              </div>
              <div className="py-2 space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-800/60 transition-colors cursor-pointer border border-slate-800/40">
                    <p className="text-xs font-semibold text-slate-200">{n.title}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/60 transition-all border border-transparent hover:border-slate-700/60"
          >
            <Avatar name={user.name} roleBadge={user.role} size="sm" />
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-200">{user.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-56 glass-panel border border-slate-800 rounded-2xl shadow-2xl p-2 animate-scale-up">
              <div className="px-3 py-2 border-b border-slate-800/80">
                <p className="text-xs font-semibold text-white">{user.name}</p>
                <p className="text-[11px] text-slate-400">{user.email}</p>
              </div>
              <div className="py-1">
                <p className="px-3 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Switch Active Role</p>
                {(['student', 'faculty', 'club_leader', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setShowRoleDropdown(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-indigo-600/20 hover:text-white capitalize transition-colors"
                  >
                    <span>{r.replace('_', ' ')}</span>
                    {user.role === r && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
