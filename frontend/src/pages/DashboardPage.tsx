import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, MapPin, User, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { campusApi } from '@/services/api';
import type { TimetableSlot, AttendanceSubject, Assignment } from '@/types';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);
  const [attendance, setAttendance] = useState<AttendanceSubject[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [t, a, asg] = await Promise.all([
        campusApi.getTimetable(),
        campusApi.getAttendance(),
        campusApi.getAssignments(),
      ]);
      setTimetable(t);
      setAttendance(a);
      setAssignments(asg);
      setLoading(false);
    }
    loadData();
  }, []);

  const getDynamicGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const todayClasses = timetable.filter((item) => item.day === 'Monday');
  const pendingAssignments = assignments.filter((item) => item.status === 'pending');
  const nextClass = todayClasses[0];

  const lowAttendanceItems = attendance.filter((item) => {
    const pct = (item.attendedClasses / item.totalClasses) * 100;
    return pct < user.targetAttendance;
  });

  if (loading) {
    return <div className="py-12 text-center text-zinc-500 text-xs font-mono">Loading...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl py-2">
      {/* Greeting Header */}
      <div>
        <h1 className="text-xl font-bold text-zinc-100 tracking-tight">
          {getDynamicGreeting()}, {user.name.split(' ')[0]}
        </h1>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          Div {user.division} • Roll {user.rollNumber} • {user.semester}
        </p>
      </div>

      {/* Question 1: What is my next class? (Primary Focus Card) */}
      {nextClass && (
        <Card className="p-6 bg-zinc-900/90 border-zinc-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                Next Class
              </span>
              <Badge variant="indigo" size="sm">
                Starts in 18 minutes
              </Badge>
            </div>
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              {nextClass.startTime} - {nextClass.endTime}
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg md:text-xl font-bold text-zinc-100">
              {nextClass.courseCode}: {nextClass.courseName}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-300 pt-1">
              <span className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {nextClass.room}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-zinc-500" />
                Instructor: <strong className="text-zinc-200 font-medium">{nextClass.instructor}</strong>
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <Button size="sm" variant="primary" onClick={() => navigate('/timetable')}>
              View Timetable
            </Button>
            <Button size="sm" variant="secondary" onClick={() => navigate('/notes')}>
              Course Notes
            </Button>
          </div>
        </Card>
      )}

      {/* Question 2: What should I do today? */}
      <Card className="p-5 space-y-3 bg-zinc-900/60 border-zinc-800">
        <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
          What Should I Do Today?
        </h2>

        <div className="space-y-2 text-xs">
          {pendingAssignments.length > 0 ? (
            <div className="p-3 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-zinc-200">Submit {pendingAssignments[0].courseCode} Assignment</p>
                <p className="text-[11px] font-mono text-zinc-500">Due {pendingAssignments[0].dueDate} at {pendingAssignments[0].dueTime}</p>
              </div>
              <Button size="sm" variant="primary" onClick={() => navigate('/assignments')}>
                Submit
              </Button>
            </div>
          ) : (
            <p className="text-zinc-500 font-mono text-xs">No pending assignments due today.</p>
          )}

          <div className="p-3 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-zinc-200">Attend {todayClasses.length} Scheduled Classes</p>
              <p className="text-[11px] font-mono text-zinc-500">DBMS, Operating Systems & DBMS Lab</p>
            </div>
            <Button size="sm" variant="secondary" onClick={() => navigate('/timetable')}>
              Schedule
            </Button>
          </div>
        </div>
      </Card>

      {/* Question 3: Do I have any urgent assignments? */}
      <Card className="p-5 space-y-3 bg-zinc-900/60 border-zinc-800">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
          <h2 className="text-xs font-mono font-semibold text-zinc-200 uppercase tracking-wider">
            Urgent Assignments
          </h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/assignments')}>
            View All <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>

        <div className="space-y-2">
          {pendingAssignments.slice(0, 2).map((asg) => (
            <div key={asg.id} className="p-3 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-indigo-400">{asg.courseCode}</span>
                  <span className="text-zinc-500">Due: {asg.dueDate} ({asg.dueTime})</span>
                </div>
                <p className="font-medium text-zinc-200 mt-0.5">{asg.title}</p>
              </div>
              <Button size="sm" variant="primary" onClick={() => navigate('/assignments')}>
                Submit
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Question 4: Is there anything important I should know? (Important Alerts) */}
      <Card className="p-5 space-y-3 bg-zinc-900/60 border-zinc-800">
        <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
          Important Alerts
        </h2>

        {lowAttendanceItems.length > 0 ? (
          <div className="p-3.5 rounded bg-zinc-950 border border-amber-900/60 text-amber-300 font-mono text-xs flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-200">Attendance Warning: {lowAttendanceItems[0].courseCode}</p>
              <p className="text-zinc-400 font-sans mt-0.5 leading-relaxed">
                {lowAttendanceItems[0].courseName} attendance is currently {((lowAttendanceItems[0].attendedClasses / lowAttendanceItems[0].totalClasses) * 100).toFixed(1)}%. Need 2 more lectures to reach {user.targetAttendance}% target.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-emerald-400 font-mono text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>All course attendance rates meet the 75% requirement.</span>
          </div>
        )}
      </Card>
    </div>
  );
};
