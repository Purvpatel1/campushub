import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';
import {
  LayoutDashboard,
  Calendar,
  Percent,
  FileCheck2,
  BookOpen,
  User,
  Settings,
  X,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { user } = useAuth();
  const location = useLocation();

  const studentNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Timetable', path: '/timetable', icon: Calendar },
    { label: 'Attendance', path: '/attendance', icon: Percent },
    { label: 'Assignments', path: '/assignments', icon: FileCheck2 },
    { label: 'Notes', path: '/notes', icon: BookOpen },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen transition-transform duration-200 ease-in-out bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between w-64 md:w-60',
          !isOpen && '-translate-x-full lg:translate-x-0'
        )}
      >
        <div>
          {/* Brand Header */}
          <div className="h-14 md:h-13 px-4 flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 md:w-5 md:h-5 rounded bg-zinc-100 flex items-center justify-center text-zinc-950 font-bold text-xs">
                C
              </div>
              <span className="font-semibold text-sm md:text-xs tracking-tight text-zinc-100">
                CampusHub
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500 border border-zinc-800 px-1.5 py-0.5 rounded">
                Student
              </span>
              <button
                onClick={onToggle}
                className="lg:hidden p-1.5 rounded text-zinc-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Student Status */}
          <div className="p-3 border-b border-zinc-800/80 bg-zinc-950">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              {user.department}
            </p>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Div {user.division} • Roll {user.rollNumber} • {user.semester}
            </p>
          </div>

          {/* Navigation List */}
          <nav className="p-2 space-y-1 md:space-y-0.5">
            <div className="px-2.5 py-1 text-[10px] font-mono font-medium text-zinc-500 uppercase tracking-wider">
              Menu
            </div>
            {studentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={({ isActive: active }) =>
                    cn(
                      'flex items-center justify-between px-3 md:px-2.5 py-3 md:py-1.5 rounded text-sm md:text-xs font-medium transition-colors min-h-[44px] md:min-h-0',
                      active
                        ? 'bg-zinc-800 text-zinc-100 font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                    )
                  }
                >
                  <div className="flex items-center gap-3 md:gap-2.5">
                    <Icon className={cn('w-4 h-4 md:w-3.5 md:h-3.5', isActive ? 'text-zinc-100' : 'text-zinc-400')} />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Profile */}
        <NavLink
          to="/profile"
          onClick={() => {
            if (window.innerWidth < 1024) onToggle();
          }}
          className="p-3 border-t border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition-colors flex items-center gap-2.5 min-h-[44px]"
        >
          <Avatar name={user.name} roleBadge="student" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-200 truncate">{user.name}</p>
            <p className="text-[10px] font-mono text-zinc-500 truncate">{user.studentId}</p>
          </div>
        </NavLink>
      </aside>

      {/* One-Handed Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-zinc-950/95 border-t border-zinc-800 px-1 py-1 flex items-center justify-around">
        {studentNavItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive: active }) =>
                cn(
                  'flex-1 flex flex-col items-center justify-center py-2 px-1 rounded min-h-[48px] text-[10px] font-mono transition-colors select-none',
                  active ? 'text-zinc-100 font-bold bg-zinc-900' : 'text-zinc-400 hover:text-zinc-200'
                )
              }
            >
              <Icon className={cn('w-4 h-4 mb-0.5', isActive ? 'text-zinc-100' : 'text-zinc-400')} />
              <span className="truncate max-w-[64px] text-center">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};
