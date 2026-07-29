import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Calendar,
  Clock,
  QrCode,
  FileCheck2,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert,
  Award,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800/80 rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="indigo" size="sm">
              {user.department}
            </Badge>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Welcome back, {user.name}
          </h1>
          <p className="text-zinc-400 text-xs mt-1">
            {user.role === 'student' && '2 lectures scheduled today. 1 assignment due at 5:00 PM.'}
            {user.role === 'faculty' && 'Next session: Physics 101 in 15 mins at Hall B-102.'}
            {user.role === 'club_leader' && 'UI/UX Masterclass event has 142 confirmed RSVPs.'}
            {user.role === 'admin' && 'Campus attendance: 94.2% today across active users.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {user.role === 'faculty' && (
            <Button
              leftIcon={<QrCode className="w-3.5 h-3.5" />}
              onClick={() => navigate('/attendance')}
            >
              Generate Attendance QR
            </Button>
          )}
          {user.role === 'student' && (
            <Button
              leftIcon={<QrCode className="w-3.5 h-3.5" />}
              onClick={() => navigate('/attendance')}
            >
              Scan Attendance
            </Button>
          )}
          {user.role === 'club_leader' && (
            <Button leftIcon={<Users className="w-3.5 h-3.5" />} onClick={() => navigate('/clubs')}>
              Event Scanner
            </Button>
          )}
          {user.role === 'admin' && (
            <Button variant="danger" leftIcon={<ShieldAlert className="w-3.5 h-3.5" />} onClick={() => navigate('/admin')}>
              Emergency Broadcast
            </Button>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      {user.role === 'student' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="flex items-center justify-between p-4">
            <div>
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Overall GPA</p>
              <p className="text-xl font-bold text-white mt-0.5">3.88</p>
              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" /> Top 5%
              </p>
            </div>
            <Award className="w-5 h-5 text-indigo-400" />
          </Card>

          <Card className="flex items-center justify-between p-4">
            <div>
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Attendance</p>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">92.4%</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">4 classes safe</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </Card>

          <Card className="flex items-center justify-between p-4">
            <div>
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Pending Tasks</p>
              <p className="text-xl font-bold text-amber-400 mt-0.5">2 Due</p>
              <p className="text-[11px] text-amber-400 mt-0.5">1 due in 4h</p>
            </div>
            <FileCheck2 className="w-5 h-5 text-amber-400" />
          </Card>

          <Card className="flex items-center justify-between p-4">
            <div>
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Club RSVPs</p>
              <p className="text-xl font-bold text-cyan-400 mt-0.5">3 Events</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Next: Sat 2 PM</p>
            </div>
            <Users className="w-5 h-5 text-cyan-400" />
          </Card>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
              <div>
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>Today's Schedule</span>
                </h2>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/academics')}>
                Full Schedule <ArrowUpRight className="w-3 h-3 ml-1" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="p-3.5 rounded-lg bg-zinc-950 border border-indigo-500/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="indigo" size="sm">Ongoing</Badge>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 09:00 - 10:30 AM
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mt-1">CS301: Advanced Data Structures</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Hall B-102 • Prof. David Miller</p>
                </div>
                <Button size="sm" leftIcon={<QrCode className="w-3.5 h-3.5" />} onClick={() => navigate('/attendance')}>
                  Attendance
                </Button>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="slate" size="sm">Upcoming</Badge>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 11:30 - 01:00 PM
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mt-1">PHY202: Quantum Mechanics</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Lab 4 • Dr. Aris Thorne</p>
                </div>
                <Badge variant="slate" size="sm">In 1.5 Hours</Badge>
              </div>
            </div>
          </Card>

          {/* Pending Deadlines */}
          <Card>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                <span>Pending Submissions</span>
              </h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/assignments')}>
                View All
              </Button>
            </div>

            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold text-white">Binary Tree Implementation Lab</h3>
                <p className="text-[11px] text-zinc-400">CS301 • Due Today at 5:00 PM</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => navigate('/assignments')}>
                Submit PDF
              </Button>
            </div>
          </Card>
        </div>

        {/* Attendance & Notices */}
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Attendance Monitor</span>
              </h3>
              <Badge variant="emerald" size="sm">Safe Zone</Badge>
            </div>

            <div className="py-4 text-center">
              <span className="text-3xl font-black text-white font-mono">92.4%</span>
              <p className="text-xs text-zinc-400 mt-1">Required threshold: 75.0%</p>
              <p className="text-xs text-emerald-400 font-medium mt-1">4 classes permitted to miss.</p>
            </div>
          </Card>

          <Card>
            <h3 className="text-xs font-semibold text-white mb-2">Campus Announcements</h3>
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
              <Badge variant="indigo" size="sm" className="mb-1">Notice</Badge>
              <p className="font-medium text-zinc-200">Mid-Semester Exam Timetable</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Exams begin August 15th.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
