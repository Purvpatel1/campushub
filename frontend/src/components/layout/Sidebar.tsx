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

  const roleLabels: Record<UserRole, { title: string; color: string }> = {
    student: { title: 'Student View', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    faculty: { title: 'Faculty View', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    club_leader: { title: 'Club Leader View', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    admin: { title: 'Admin View', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-40 h-screen transition-all duration-300 glass-panel border-r border-slate-800/80 flex flex-col justify-between w-64',
        !isOpen && '-translate-x-full lg:translate-x-0'
      )}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white font-bold text-lg">
              🚀
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                Campus<span className="text-gradient">OS</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-widest -mt-1">
                Enterprise SaaS
              </span>
            </div>
          </div>
        </div>

        {/* Role Switcher Widget */}
        <div className="p-4 border-b border-slate-800/40">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 px-1">
            Active Persona Mode
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {(['student', 'faculty', 'club_leader', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={cn(
                  'text-xs py-1.5 px-2 rounded-lg font-medium border text-left transition-all capitalize flex items-center justify-between',
                  user.role === r
                    ? roleLabels[r].color
                    : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/50'
                )}
              >
                <span>{r.replace('_', ' ')}</span>
                {user.role === r && <CheckCircle2 className="w-3 h-3 text-current" />}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Main Navigation
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
                    'flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                    active
                      ? 'bg-gradient-to-r from-indigo-600/90 to-violet-600/90 text-white shadow-md shadow-indigo-500/20 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn('w-4 h-4 transition-transform group-hover:scale-110', isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400')} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-70" />}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Box */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-950/40">
        <div className="flex items-center gap-3">
          <Avatar name={user.name} roleBadge={user.role} size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.department}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
