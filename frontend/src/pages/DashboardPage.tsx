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
  Award,
  Plus,
  Radio,
  BookOpen,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      {/* Hero Banner Tailored Per Persona */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="indigo" size="sm">
              {user.role === 'student' && 'Student Portal'}
              {user.role === 'faculty' && 'Faculty Teaching Portal'}
              {user.role === 'club_leader' && 'Club Leadership Portal'}
              {user.role === 'admin' && 'Executive Administration'}
            </Badge>
            <span className="text-xs text-zinc-500 font-mono">• {user.department}</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Welcome, {user.name}
          </h1>
          <p className="text-zinc-400 text-xs mt-1 max-w-xl">
            {user.role === 'student' && 'You have 2 lectures scheduled today. 1 assignment due at 5:00 PM.'}
            {user.role === 'faculty' && 'Next session: Physics 101 in 15 mins at Hall B-102. 24 student lab submissions pending evaluation.'}
            {user.role === 'club_leader' && 'UI/UX Masterclass has 142 confirmed student RSVPs. Door pass scanner ready.'}
            {user.role === 'admin' && 'Campus attendance: 94.2% today across 12,450 active students and faculty.'}
          </p>
        </div>

        {/* Persona Action Triggers */}
        <div className="flex items-center gap-2">
          {user.role === 'student' && (
            <Button
              leftIcon={<QrCode className="w-3.5 h-3.5" />}
              onClick={() => navigate('/attendance')}
            >
              My Attendance Status
            </Button>
          )}
          {user.role === 'faculty' && (
            <Button
              leftIcon={<QrCode className="w-3.5 h-3.5" />}
              onClick={() => navigate('/attendance')}
            >
              Launch Live QR Session
            </Button>
          )}
          {user.role === 'club_leader' && (
            <Button leftIcon={<Plus className="w-3.5 h-3.5" />} onClick={() => navigate('/clubs')}>
              Create New Event
            </Button>
          )}
          {user.role === 'admin' && (
            <Button variant="danger" leftIcon={<Radio className="w-3.5 h-3.5" />} onClick={() => navigate('/admin')}>
              Dispatch Alert
            </Button>
          )}
        </div>
      </div>

      {/* STUDENT PERSPECTIVE VIEW */}
      {user.role === 'student' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Card className="flex items-center justify-between p-4">
              <div>
                <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Overall GPA</p>
                <p className="text-xl font-bold text-white mt-0.5">3.88</p>
                <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                  <TrendingUp className="w-3 h-3" /> Top 5% of Class
                </p>
              </div>
              <Award className="w-5 h-5 text-indigo-400" />
            </Card>

            <Card className="flex items-center justify-between p-4">
              <div>
                <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Attendance Rate</p>
                <p className="text-xl font-bold text-emerald-400 mt-0.5">92.4%</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">4 classes safe to miss</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </Card>

            <Card className="flex items-center justify-between p-4">
              <div>
                <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Pending Assignments</p>
                <p className="text-xl font-bold text-amber-400 mt-0.5">2 Due</p>
                <p className="text-[11px] text-amber-400 mt-0.5">1 due in 4 hours</p>
              </div>
              <FileCheck2 className="w-5 h-5 text-amber-400" />
            </Card>

            <Card className="flex items-center justify-between p-4">
              <div>
                <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">My Event Passes</p>
                <p className="text-xl font-bold text-cyan-400 mt-0.5">3 Passes</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">Next: Sat 2:00 PM</p>
              </div>
              <Users className="w-5 h-5 text-cyan-400" />
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
                  <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span>My Timetable Today</span>
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/academics')}>
                    View Schedule <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="p-3.5 rounded-lg bg-zinc-950 border border-indigo-500/40 flex items-center justify-between">
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
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <h3 className="text-xs font-semibold text-white">Attendance Safety Gauge</h3>
                  <Badge variant="emerald" size="sm">92.4% Safe</Badge>
                </div>
                <div className="py-3 text-center font-mono">
                  <p className="text-2xl font-bold text-emerald-400">16 / 17</p>
                  <p className="text-[11px] text-zinc-400 mt-1">Lectures Attended</p>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* FACULTY PERSPECTIVE VIEW */}
      {user.role === 'faculty' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="p-4">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Assigned Classes</p>
              <p className="text-xl font-bold text-white mt-0.5">3 Sections</p>
              <p className="text-xs text-zinc-400 mt-1">320 Enrolled Students</p>
            </Card>

            <Card className="p-4">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Pending Evaluation</p>
              <p className="text-xl font-bold text-amber-400 mt-0.5">24 Submissions</p>
              <p className="text-xs text-amber-400 mt-1">CS301 Lab 3</p>
            </Card>

            <Card className="p-4">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Average Attendance</p>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">93.8%</p>
              <p className="text-xs text-zinc-400 mt-1">Across all 3 sections</p>
            </Card>
          </div>

          <Card>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Teaching Schedule & Quick Actions</span>
              </h2>
            </div>
            <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div>
                <Badge variant="emerald" size="sm" dot>Next Lecture</Badge>
                <h3 className="text-sm font-semibold text-white mt-1">Physics 101 (Section B)</h3>
                <p className="text-xs text-zinc-400">11:30 AM • Lab 4</p>
              </div>
              <Button leftIcon={<QrCode className="w-3.5 h-3.5" />} onClick={() => navigate('/attendance')}>
                Start Live QR Session
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* CLUB LEADER PERSPECTIVE VIEW */}
      {user.role === 'club_leader' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="p-4">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Active Organization</p>
              <p className="text-xl font-bold text-white mt-0.5">Design & Innovation Lab</p>
              <p className="text-xs text-zinc-400 mt-1">340 Active Members</p>
            </Card>

            <Card className="p-4">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Upcoming Events</p>
              <p className="text-xl font-bold text-cyan-400 mt-0.5">2 Events</p>
              <p className="text-xs text-cyan-400 mt-1">142 RSVPs Confirmed</p>
            </Card>

            <Card className="p-4">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Venue Status</p>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">Approved</p>
              <p className="text-xs text-zinc-400 mt-1">Auditorium A Granted</p>
            </Card>
          </div>

          <Card>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="text-sm font-semibold text-white">Organization Quick Tools</h2>
              <Button leftIcon={<Plus className="w-3.5 h-3.5" />} onClick={() => navigate('/clubs')}>
                Create New Event
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* ADMIN PERSPECTIVE VIEW */}
      {user.role === 'admin' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Card className="p-4">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Active Campus Users</p>
              <p className="text-xl font-bold text-white mt-0.5">12,450</p>
              <p className="text-xs text-emerald-400 mt-1">98.4% Operational</p>
            </Card>

            <Card className="p-4">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Today's Attendance Rate</p>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">94.2%</p>
              <p className="text-xs text-zinc-400 mt-1">Above Threshold</p>
            </Card>

            <Card className="p-4">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Pending Course Changes</p>
              <p className="text-xl font-bold text-amber-400 mt-0.5">12 Approvals</p>
              <p className="text-xs text-amber-400 mt-1">Syllabus Modifications</p>
            </Card>

            <Card className="p-4">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">System Health</p>
              <p className="text-xl font-bold text-indigo-400 mt-0.5">99.98%</p>
              <p className="text-xs text-zinc-400 mt-1">All CDN Nodes Online</p>
            </Card>
          </div>

          <Card>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="text-sm font-semibold text-white">Executive Control Quick Trigger</h2>
              <Button variant="danger" leftIcon={<Radio className="w-3.5 h-3.5" />} onClick={() => navigate('/admin')}>
                Dispatch Emergency Alert
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
