import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Settings, User, QrCode } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-400" />
          <span>Account Settings</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">Manage profile information, digital ID pass, and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Digital Pass */}
        <Card className="flex flex-col items-center text-center p-5">
          <div className="w-full flex items-center justify-between pb-2 mb-3 border-b border-zinc-800">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">Digital Pass</span>
            <Badge variant="indigo" size="sm">Active</Badge>
          </div>

          <Avatar name={user.name} roleBadge={user.role} size="lg" className="w-16 h-16 text-sm" />
          <h2 className="text-sm font-bold text-white mt-2">{user.name}</h2>
          <p className="text-xs text-zinc-400 capitalize">{user.role.replace('_', ' ')} • {user.department}</p>
          <p className="text-[11px] font-mono text-zinc-500 mt-0.5">ID: {user.studentId || user.facultyId || 'ADM-001'}</p>

          <div className="p-3 bg-white rounded-lg inline-block mt-3 border border-zinc-700">
            <QrCode className="w-20 h-20 text-zinc-950" />
          </div>
        </Card>

        {/* Profile Information Form */}
        <div className="lg:col-span-2 space-y-3">
          <Card className="space-y-3">
            <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-400" /> Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-zinc-400 font-medium mb-1">Display Name</label>
                <input type="text" defaultValue={user.name} className="w-full input-base" />
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1">Institutional Email</label>
                <input type="email" defaultValue={user.email} disabled className="w-full input-base opacity-60 cursor-not-allowed" />
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1">Department</label>
                <input type="text" defaultValue={user.department} className="w-full input-base" />
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1">ID Number</label>
                <input type="text" defaultValue={user.studentId || user.facultyId || 'ADM-001'} disabled className="w-full input-base opacity-60" />
              </div>
            </div>

            <div className="pt-2">
              <Button variant="primary">Save Changes</Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-2">Design Aesthetic</h2>
            <div className="flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-white">Minimalist Dark (Linear / Vercel)</p>
                <p className="text-[11px] text-zinc-400">High contrast, clean typography, single accent color.</p>
              </div>
              <Badge variant="indigo" size="sm">Active Theme</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
