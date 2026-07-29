import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';
import type { UserRole } from '@/types';
import {
  LayoutDashboard,
  GraduationCap,
  QrCode,
  FileCheck2,
  Users,
  MessageSquare,
  Briefcase,
  Settings,
  ShieldAlert,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user, setRole } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['student', 'faculty', 'club_leader', 'admin'] },
    { label: 'Academics', path: '/academics', icon: GraduationCap, roles: ['student', 'faculty', 'admin'] },
    { label: 'Attendance', path: '/attendance', icon: QrCode, roles: ['student', 'faculty', 'admin'] },
    { label: 'Assignments', path: '/assignments', icon: FileCheck2, roles: ['student', 'faculty'] },
    { label: 'Clubs & Events', path: '/clubs', icon: Users, roles: ['student', 'club_leader', 'admin'] },
    { label: 'Community', path: '/community', icon: MessageSquare, roles: ['student', 'faculty', 'club_leader'] },
    { label: 'Career Hub', path: '/career', icon: Briefcase, roles: ['student', 'admin'] },
    { label: 'Settings', path: '/settings', icon: Settings, roles: ['student', 'faculty', 'club_leader', 'admin'] },
    { label: 'Admin Control', path: '/admin', icon: ShieldAlert, roles: ['admin'] },
  ];

  const filteredNav = navigationItems.filter((item) => item.roles.includes(user.role));

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-40 h-screen transition-all duration-200 bg-zinc-950 border-r border-zinc-800/80 flex flex-col justify-between w-64',
        !isOpen && '-translate-x-full lg:translate-x-0'
      )}
    >
      <div>
        {/* Brand Header */}
        <div className="h-14 px-5 flex items-center justify-between border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
              C
            </div>
            <span className="font-bold text-sm tracking-tight text-white">
              CampusOS
            </span>
          </div>
        </div>

        {/* Persona Switcher */}
        <div className="p-3 border-b border-zinc-800/60 bg-zinc-900/40">
          <label className="text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5 px-1">
            Persona Mode
          </label>
          <div className="grid grid-cols-2 gap-1">
            {(['student', 'faculty', 'club_leader', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={cn(
                  'text-[11px] py-1 px-2 rounded-md font-medium text-left transition-colors capitalize flex items-center justify-between',
                  user.role === r
                    ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                )}
              >
                <span>{r.replace('_', ' ')}</span>
                {user.role === r && <CheckCircle2 className="w-3 h-3 text-indigo-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-2 space-y-0.5">
          <div className="px-3 py-1.5 text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">
            Navigation
          </div>
          {filteredNav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: active }) =>
                  cn(
                    'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                    active
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/80'
                  )
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={cn('w-4 h-4', isActive ? 'text-indigo-400' : 'text-zinc-400')} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-950">
        <div className="flex items-center gap-2.5">
          <Avatar name={user.name} roleBadge={user.role} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">{user.name}</p>
            <p className="text-[11px] text-zinc-400 truncate">{user.department}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
