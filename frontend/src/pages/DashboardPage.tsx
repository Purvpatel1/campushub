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
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Award,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden border-indigo-500/20 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="indigo" size="sm" dot>
                System Active • {user.department}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-gradient">{user.name}</span> 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              {user.role === 'student' && 'You have 2 lectures today and 1 assignment due before 5:00 PM.'}
              {user.role === 'faculty' && 'Next session: Physics 101 in 15 mins at Hall B-102. 12 ungraded labs pending.'}
              {user.role === 'club_leader' && 'UI/UX Masterclass event has 142 RSVPs. Venue approval granted.'}
              {user.role === 'admin' && 'Campus system pulse: 94.2% attendance today across 12,450 active users.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'faculty' && (
              <Button
                leftIcon={<QrCode className="w-4 h-4" />}
                onClick={() => navigate('/attendance')}
              >
                Generate Live QR
              </Button>
            )}
            {user.role === 'student' && (
              <Button
                leftIcon={<QrCode className="w-4 h-4" />}
                onClick={() => navigate('/attendance')}
              >
                Scan Attendance
              </Button>
            )}
            {user.role === 'club_leader' && (
              <Button leftIcon={<Users className="w-4 h-4" />} onClick={() => navigate('/clubs')}>
                Event Scanner
              </Button>
            )}
            {user.role === 'admin' && (
              <Button variant="danger" leftIcon={<ShieldAlert className="w-4 h-4" />} onClick={() => navigate('/admin')}>
                Emergency Alert
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Role Specific Overview Cards */}
      {user.role === 'student' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall GPA</p>
              <p className="text-2xl font-black text-white mt-1">3.88</p>
              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> Top 5% of class
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Award className="w-6 h-6" />
            </div>
          </Card>

          <Card className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Attendance Rate</p>
              <p className="text-2xl font-black text-emerald-400 mt-1">92.4%</p>
              <p className="text-[11px] text-slate-400 mt-1">4 classes safe to miss</p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </Card>

          <Card className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Tasks</p>
              <p className="text-2xl font-black text-amber-400 mt-1">2 Due</p>
              <p className="text-[11px] text-amber-400 mt-1">1 due in 4 hours</p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileCheck2 className="w-6 h-6" />
            </div>
          </Card>

          <Card className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Club RSVPs</p>
              <p className="text-2xl font-black text-cyan-400 mt-1">3 Events</p>
              <p className="text-[11px] text-slate-400 mt-1">Next: Saturday 2 PM</p>
            </div>
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Users className="w-6 h-6" />
            </div>
          </Card>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>Today's Academic Timeline</span>
                </h2>
                <p className="text-xs text-slate-400">Wednesday, July 29, 2026</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/academics')}>
                Full Schedule <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl glass-panel border-indigo-500/30 flex items-start justify-between relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="indigo" size="sm">Ongoing Now</Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> 09:00 - 10:30 AM
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">CS301: Advanced Data Structures</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Hall B-102 • Prof. David Miller</p>
                </div>
                <Button size="sm" leftIcon={<QrCode className="w-3.5 h-3.5" />} onClick={() => navigate('/attendance')}>
                  Mark Attendance
                </Button>
              </div>

              <div className="p-4 rounded-xl glass-panel border-slate-800 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="slate" size="sm">Upcoming</Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> 11:30 - 01:00 PM
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">PHY202: Quantum Mechanics</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Lab 4 • Dr. Aris Thorne</p>
                </div>
                <Badge variant="slate" size="sm">In 1.5 Hours</Badge>
              </div>
            </div>
          </Card>

          {/* Pending Deadlines Widget */}
          <Card>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                <span>Pending Submissions</span>
              </h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/assignments')}>
                View All
              </Button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Binary Tree Implementation Lab</h3>
                  <p className="text-xs text-slate-400">CS301 • Due Today at 05:00 PM</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate('/assignments')}>
                  Submit PDF
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Attendance Health & Announcements */}
        <div className="space-y-6">
          <Card className="border-emerald-500/20 bg-gradient-to-b from-slate-900/90 to-emerald-950/20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Attendance Monitor</span>
              </h3>
              <Badge variant="emerald" size="sm">Safe Zone</Badge>
            </div>

            <div className="py-4 text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="52" stroke="currentColor" strokeWidth="8" className="text-slate-800" fill="transparent" />
                  <circle cx="64" cy="64" r="52" stroke="currentColor" strokeWidth="8" className="text-emerald-400" strokeDasharray="326.7" strokeDashoffset="24.8" fill="transparent" strokeLinecap="round" />
                </svg>
                <span className="absolute text-2xl font-black text-white">92.4%</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Required threshold: 75.0%</p>
              <p className="text-xs text-emerald-400 font-medium mt-1">You can safely miss 4 classes without warning.</p>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Campus Announcements</span>
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
                <Badge variant="indigo" size="sm" className="mb-1">Registrar Notice</Badge>
                <p className="font-semibold text-slate-200">Mid-Semester Exam Timetable Published</p>
                <p className="text-slate-400 mt-1">Exams begin August 15th. Download schedule PDF in Academics.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
