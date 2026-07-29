import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, Users, Server, Radio, AlertTriangle, CheckCircle2, Send } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-7 h-7 text-rose-500" />
            <span>Executive Admin Control Panel</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Campus operations pulse, role governance, and emergency broadcast dispatch</p>
        </div>

        <Button
          variant="danger"
          leftIcon={<Radio className="w-4 h-4" />}
          onClick={() => setShowBroadcastModal(true)}
        >
          Dispatch Emergency Alert
        </Button>
      </div>

      {broadcastSent && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center gap-3 animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <div>
            <p className="font-bold text-sm">Emergency Alert Broadcast Dispatched!</p>
            <p className="text-xs opacity-90">Broadcast sent to 12,450 active student & faculty mobile/desktop screens instantly.</p>
          </div>
        </div>
      )}

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Users Today</p>
            <p className="text-2xl font-black text-white mt-1">12,450</p>
            <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> 98.4% System Reach
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Users className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">System Uptime</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">99.98%</p>
            <p className="text-[11px] text-slate-400 mt-1">Vite CDN Edge Operational</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Server className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Campus Attendance %</p>
            <p className="text-2xl font-black text-cyan-400 mt-1">94.2%</p>
            <p className="text-[11px] text-slate-400 mt-1">Above target threshold</p>
          </div>
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Modules</p>
            <p className="text-2xl font-black text-indigo-400 mt-1">14 / 14</p>
            <p className="text-[11px] text-slate-400 mt-1">All engines online</p>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Emergency Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel border border-rose-500/40 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <Badge variant="rose" size="md">Emergency Campus Alert</Badge>
              <button onClick={() => setShowBroadcastModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">Broadcast Emergency Notification</h2>
              <p className="text-xs text-slate-400 mt-1">This will display a high-priority red alert modal across all logged-in devices.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Alert Headline</label>
                <input type="text" defaultValue="Severe Weather Alert: Campus Closing early at 3:00 PM" className="w-full glass-input p-2.5 rounded-xl text-rose-300 font-bold" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Alert Instructions</label>
                <textarea rows={3} defaultValue="All afternoon lectures shift to online sync mode on CampusOS. Please check your academic timetable for video lounge links." className="w-full glass-input p-2.5 rounded-xl text-slate-200" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <Button variant="ghost" onClick={() => setShowBroadcastModal(false)}>Cancel</Button>
              <Button
                variant="danger"
                leftIcon={<Send className="w-4 h-4" />}
                onClick={() => {
                  setShowBroadcastModal(false);
                  setBroadcastSent(true);
                  setTimeout(() => setBroadcastSent(false), 5000);
                }}
              >
                Send Alert Broadcast Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
