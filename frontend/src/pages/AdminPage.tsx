import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, Users, Server, Radio, AlertTriangle, CheckCircle2, Send } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>Admin Control Panel</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">System metrics, governance, and emergency broadcast dispatch</p>
        </div>

        <Button
          variant="danger"
          leftIcon={<Radio className="w-3.5 h-3.5" />}
          onClick={() => setShowBroadcastModal(true)}
        >
          Dispatch Emergency Alert
        </Button>
      </div>

      {broadcastSent && (
        <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-300 flex items-center gap-2.5 text-xs">
          <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <div>
            <p className="font-semibold">Emergency Broadcast Dispatched</p>
            <p className="text-[11px] opacity-90">Broadcast sent to 12,450 active users across campus.</p>
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="flex items-center justify-between p-4">
          <div>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Active Users</p>
            <p className="text-xl font-bold text-white mt-0.5">12,450</p>
            <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3" /> 98.4% Reach
            </p>
          </div>
          <Users className="w-5 h-5 text-indigo-400" />
        </Card>

        <Card className="flex items-center justify-between p-4">
          <div>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">System Uptime</p>
            <p className="text-xl font-bold text-emerald-400 mt-0.5">99.98%</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">Vite Edge Operational</p>
          </div>
          <Server className="w-5 h-5 text-emerald-400" />
        </Card>

        <Card className="flex items-center justify-between p-4">
          <div>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Attendance %</p>
            <p className="text-xl font-bold text-cyan-400 mt-0.5">94.2%</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">Above Target</p>
          </div>
          <CheckCircle2 className="w-5 h-5 text-cyan-400" />
        </Card>

        <Card className="flex items-center justify-between p-4">
          <div>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Active Modules</p>
            <p className="text-xl font-bold text-indigo-400 mt-0.5">14 / 14</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">All engines online</p>
          </div>
          <ShieldAlert className="w-5 h-5 text-indigo-400" />
        </Card>
      </div>

      {/* Emergency Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <Badge variant="rose" size="sm">Emergency Alert</Badge>
              <button onClick={() => setShowBroadcastModal(false)} className="text-zinc-400 hover:text-white text-sm">✕</button>
            </div>

            <div>
              <h2 className="text-sm font-bold text-white">Broadcast Emergency Alert</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Dispatches high-priority notification to active user screens.</p>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Headline</label>
                <input type="text" defaultValue="Campus closing early at 3:00 PM today due to severe weather" className="w-full input-base font-semibold text-rose-300" />
              </div>
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Instructions</label>
                <textarea rows={3} defaultValue="Afternoon lectures shifted to online sync mode on CampusOS." className="w-full input-base" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setShowBroadcastModal(false)}>Cancel</Button>
              <Button
                variant="danger"
                leftIcon={<Send className="w-3.5 h-3.5" />}
                onClick={() => {
                  setShowBroadcastModal(false);
                  setBroadcastSent(true);
                  setTimeout(() => setBroadcastSent(false), 5000);
                }}
              >
                Send Alert Broadcast
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
