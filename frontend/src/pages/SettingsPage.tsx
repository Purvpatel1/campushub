import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, Bell, Lock, Shield, Moon, Sun, Monitor, LogOut, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [classReminders, setClassReminders] = useState(true);
  const [assignmentAlerts, setAssignmentAlerts] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const handleSavePreferences = () => {
    setSavedNotice('Preferences saved.');
    setTimeout(() => setSavedNotice(null), 2000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    setSavedNotice('Password updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => setSavedNotice(null), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header Card */}
      <Card className="p-5 bg-zinc-900/60 border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-zinc-100 tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-zinc-400" />
            <span>Settings</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Personal preferences and security options.
          </p>
        </div>

        <Button variant="danger" leftIcon={<LogOut className="w-3.5 h-3.5" />} onClick={handleLogout}>
          Log Out
        </Button>
      </Card>

      {/* Notice */}
      {savedNotice && (
        <div className="p-3 rounded bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* 1. Theme Preference */}
      <Card className="p-5 space-y-3 bg-zinc-900/60 border-zinc-800">
        <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <Moon className="w-3.5 h-3.5 text-zinc-500" />
          <span>Appearance & Theme</span>
        </h2>

        <div className="flex items-center gap-2 font-mono text-xs">
          {[
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'system', label: 'System', icon: Monitor },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id as any);
                  handleSavePreferences();
                }}
                className={`px-3 py-2 rounded transition-colors flex items-center gap-2 border ${
                  isActive
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-100 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-zinc-400" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* 2. Notification Preferences */}
      <Card className="p-5 space-y-3 bg-zinc-900/60 border-zinc-800">
        <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-zinc-500" />
          <span>Notification Preferences</span>
        </h2>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-3 rounded bg-zinc-950 border border-zinc-800">
            <div>
              <p className="font-semibold text-zinc-200">Class Reminders</p>
              <p className="text-[11px] text-zinc-500">Notify 15 minutes before class start time</p>
            </div>
            <input
              type="checkbox"
              checked={classReminders}
              onChange={(e) => {
                setClassReminders(e.target.checked);
                handleSavePreferences();
              }}
              className="w-4 h-4 accent-zinc-700 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded bg-zinc-950 border border-zinc-800">
            <div>
              <p className="font-semibold text-zinc-200">Assignment Alerts</p>
              <p className="text-[11px] text-zinc-500">Notify 6 hours prior to coursework deadline</p>
            </div>
            <input
              type="checkbox"
              checked={assignmentAlerts}
              onChange={(e) => {
                setAssignmentAlerts(e.target.checked);
                handleSavePreferences();
              }}
              className="w-4 h-4 accent-zinc-700 rounded cursor-pointer"
            />
          </div>
        </div>
      </Card>

      {/* 3. Change Password */}
      <Card className="p-5 space-y-3 bg-zinc-900/60 border-zinc-800">
        <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-zinc-500" />
          <span>Change Password</span>
        </h2>

        <form onSubmit={handlePasswordChange} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-mono">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full input-base font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 font-mono">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full input-base font-mono"
                required
              />
            </div>
          </div>
          <Button type="submit" size="sm" variant="primary">
            Update Password
          </Button>
        </form>
      </Card>

      {/* 4. Privacy & About CampusHub */}
      <Card className="p-5 space-y-3 bg-zinc-900/60 border-zinc-800 text-xs">
        <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-zinc-500" />
          <span>Privacy & About</span>
        </h2>

        <div className="space-y-2 text-zinc-400">
          <p className="leading-relaxed">
            CampusHub is a student-first workspace. Student records and personal data are kept private and accessible only to authorized academic systems.
          </p>
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between font-mono text-[11px] text-zinc-500">
            <span>CampusHub Version 1.0</span>
            <span>Academic Platform</span>
          </div>
        </div>
      </Card>

      {/* 5. Prominent Mobile/Desktop Logout Button Card */}
      <Card className="p-4 flex items-center justify-between bg-zinc-900/60 border-zinc-800">
        <div>
          <p className="text-xs font-semibold text-zinc-200">End Student Session</p>
          <p className="text-[11px] text-zinc-500 font-mono">Log out of your CampusHub account on this device</p>
        </div>
        <Button variant="danger" leftIcon={<LogOut className="w-3.5 h-3.5" />} onClick={handleLogout}>
          Log Out
        </Button>
      </Card>
    </div>
  );
};
