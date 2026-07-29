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
      case '/dashboard': return 'Dashboard';
      case '/academics': return 'Academics & Timetable';
      case '/attendance': return 'Attendance Management';
      case '/assignments': return 'Assignments';
      case '/clubs': return 'Clubs & Events';
      case '/community': return 'Community Forums';
      case '/career': return 'Career Hub';
      case '/settings': return 'Settings';
      case '/admin': return 'Admin Panel';
      default: return 'CampusOS';
    }
  };

  const notifications = [
    { id: '1', title: 'Data Structures Quiz Due Today', time: '10 mins ago' },
    { id: '2', title: 'Attendance Marked: Physics 101', time: '1 hour ago' },
    { id: '3', title: 'Hackathon RSVP Confirmed', time: '3 hours ago' },
  ];

  return (
    <header className="sticky top-0 z-30 h-14 bg-zinc-950/90 backdrop-blur-xs border-b border-zinc-800/80 px-4 lg:px-6 flex items-center justify-between">
      {/* Left Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-sm font-semibold text-white tracking-tight">
            {getPageTitle(location.pathname)}
          </h1>
          <Badge variant="slate" size="sm" className="hidden sm:inline-flex capitalize">
            {user.role.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* AI Assistant Button */}
        <button
          onClick={onOpenAI}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>AI Assistant</span>
          <kbd className="hidden sm:inline-block font-mono text-[10px] bg-zinc-800 px-1 py-0.5 rounded text-zinc-400 border border-zinc-700">
            ⌘J
          </kbd>
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
          <kbd className="font-mono text-[10px] bg-zinc-800 px-1 py-0.5 rounded text-zinc-400 border border-zinc-700">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="font-semibold text-xs text-white">Notifications</span>
                <Badge variant="indigo" size="sm">3 New</Badge>
              </div>
              <div className="py-2 space-y-1.5">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/40 text-xs">
                    <p className="font-medium text-zinc-200">{n.title}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 p-1 rounded-md hover:bg-zinc-900 transition-colors"
          >
            <Avatar name={user.name} roleBadge={user.role} size="sm" />
            <span className="hidden sm:inline-block text-xs font-medium text-zinc-200">{user.name}</span>
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-52 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-2">
              <div className="px-2.5 py-1.5 border-b border-zinc-800">
                <p className="text-xs font-semibold text-white">{user.name}</p>
                <p className="text-[11px] text-zinc-400">{user.email}</p>
              </div>
              <div className="py-1">
                <p className="px-2.5 py-1 text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">Switch Persona</p>
                {(['student', 'faculty', 'club_leader', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setShowRoleDropdown(false);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white capitalize transition-colors"
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
