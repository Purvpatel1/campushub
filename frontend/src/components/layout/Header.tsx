import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { usePlatform } from '@/hooks/usePlatform';
import { Search, Bell, Menu, User, Settings, HelpCircle } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onToggleSidebar: () => void;
  onOpenAI?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette, onToggleSidebar, onOpenAI }) => {
  const { user } = useAuth();
  const location = useLocation();
  const platform = usePlatform();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/dashboard': return 'Dashboard';
      case '/timetable': return 'Timetable';
      case '/attendance': return 'Attendance';
      case '/assignments': return 'Assignments';
      case '/notes': return 'Notes';
      case '/placements': return 'Placements';
      case '/profile': return 'Profile';
      case '/settings': return 'Settings';
      default: return 'CampusHub';
    }
  };

  const notifications = [
    { id: '1', title: 'CS301 Assignment due today at 5:00 PM', time: '20m ago' },
    { id: '2', title: 'PHY202 Attendance below target (68.7%)', time: '2h ago' },
    { id: '3', title: 'Google SWE Intern application update', time: '1d ago' },
  ];

  const helpShortcut = platform.getShortcutLabel('j');
  const searchShortcut = platform.getShortcutLabel('k');

  return (
    <header className="sticky top-0 z-30 h-14 md:h-13 bg-zinc-950 border-b border-zinc-800 px-4 lg:px-6 flex items-center justify-between">
      {/* Left Title & Mobile Menu Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded text-zinc-400 hover:text-white hover:bg-zinc-900 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 md:w-4 md:h-4" />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-sm md:text-xs font-semibold text-zinc-100">
            {getPageTitle(location.pathname)}
          </h1>
          <Badge variant="slate" size="sm" className="hidden sm:inline-flex">
            {user.semester}
          </Badge>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Assistant Button */}
        <button
          onClick={onOpenAI}
          className="flex items-center gap-1.5 px-3 md:px-2 py-2 md:py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs min-h-[44px] md:min-h-0"
        >
          <HelpCircle className="w-4 h-4 md:w-3.5 md:h-3.5 text-zinc-400" />
          <span>Assistant</span>
          {helpShortcut && (
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-zinc-950 px-1 py-0.5 rounded text-zinc-500 border border-zinc-800">
              {helpShortcut}
            </kbd>
          )}
        </button>

        {/* Search Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 md:px-2.5 py-2 md:py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs min-h-[44px] md:min-h-0"
          aria-label="Search"
        >
          <Search className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden sm:inline">Search...</span>
          {searchShortcut && (
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-zinc-950 px-1 py-0.5 rounded text-zinc-500 border border-zinc-800">
              {searchShortcut}
            </kbd>
          )}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 md:p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-900 relative min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 md:w-4 md:h-4" />
            <span className="absolute top-2 right-2 md:top-1.5 md:right-1.5 w-1.5 h-1.5 bg-zinc-400 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-zinc-900 border border-zinc-800 rounded-md shadow-xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="font-semibold text-xs text-zinc-200">Notifications</span>
                <Badge variant="slate" size="sm">3 New</Badge>
              </div>
              <div className="py-2 space-y-1.5">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded bg-zinc-950 border border-zinc-800 text-xs">
                    <p className="font-medium text-zinc-300">{n.title}</p>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 p-1.5 md:p-1 rounded hover:bg-zinc-900 min-h-[44px] md:min-h-0"
          >
            <Avatar name={user.name} roleBadge="student" size="sm" />
            <span className="hidden sm:inline-block text-xs font-medium text-zinc-300">{user.name}</span>
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-md shadow-xl p-1.5 z-50">
              <div className="px-2 py-1.5 border-b border-zinc-800">
                <p className="text-xs font-semibold text-zinc-100">{user.name}</p>
                <p className="text-[11px] text-zinc-500 truncate font-mono">{user.studentId}</p>
              </div>
              <div className="py-1 space-y-0.5">
                <Link
                  to="/profile"
                  onClick={() => setShowUserDropdown(false)}
                  className="flex items-center gap-2 px-2.5 py-2 md:py-1.5 text-xs rounded text-zinc-300 hover:bg-zinc-800 hover:text-white min-h-[44px] md:min-h-0"
                >
                  <User className="w-4 h-4 md:w-3.5 md:h-3.5 text-zinc-400" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setShowUserDropdown(false)}
                  className="flex items-center gap-2 px-2.5 py-2 md:py-1.5 text-xs rounded text-zinc-300 hover:bg-zinc-800 hover:text-white min-h-[44px] md:min-h-0"
                >
                  <Settings className="w-4 h-4 md:w-3.5 md:h-3.5 text-zinc-400" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
