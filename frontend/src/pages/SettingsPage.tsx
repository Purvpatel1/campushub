import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Settings, Moon, User, QrCode } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Settings className="w-7 h-7 text-indigo-400" />
          <span>Account & Platform Settings</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">Manage profile, digital ID card, theme preferences, and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Digital Campus ID Card Widget */}
        <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">CampusOS Digital ID</span>
            <Badge variant="indigo" size="sm">OFFICIAL PASS</Badge>
          </div>

          <div className="py-6 flex flex-col items-center text-center space-y-3">
            <Avatar name={user.name} roleBadge={user.role} size="lg" className="w-20 h-20 text-xl" />
            <div>
              <h2 className="text-lg font-black text-white">{user.name}</h2>
              <p className="text-xs text-indigo-400 font-medium capitalize">{user.role.replace('_', ' ')} • {user.department}</p>
              <p className="text-[11px] font-mono text-slate-400 mt-1">ID: {user.studentId || user.facultyId || 'ADM-2026-001'}</p>
            </div>

            <div className="p-3 bg-white rounded-xl inline-block mt-2">
              <QrCode className="w-24 h-24 text-slate-950" />
            </div>
          </div>
        </Card>

        {/* Profile Settings Form */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <User className="w-4 h-4 text-indigo-400" />
              <span>Personal Profile Information</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Full Display Name</label>
                <input type="text" defaultValue={user.name} className="w-full glass-input p-2.5 rounded-xl" />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Institutional Email</label>
                <input type="email" defaultValue={user.email} disabled className="w-full glass-input p-2.5 rounded-xl opacity-60 cursor-not-allowed" />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Department</label>
                <input type="text" defaultValue={user.department} className="w-full glass-input p-2.5 rounded-xl" />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">ID Number</label>
                <input type="text" defaultValue={user.studentId || user.facultyId || 'ADM-001'} disabled className="w-full glass-input p-2.5 rounded-xl opacity-60" />
              </div>
            </div>

            <div className="pt-2">
              <Button variant="primary">Save Changes</Button>
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>Appearance & Theme</span>
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Visual Aesthetic</p>
                <p className="text-xs text-slate-400">Deep Slate & Indigo Glassmorphism (Default)</p>
              </div>
              <Badge variant="indigo" size="sm">Linear / Raycast Style</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
