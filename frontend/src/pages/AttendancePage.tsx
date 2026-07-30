import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { campusApi } from '@/services/api';
import type { AttendanceSubject } from '@/types';
import { Percent, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<AttendanceSubject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await campusApi.getAttendance();
      setSubjects(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const calculateRequirement = (attended: number, total: number, target: number) => {
    if (total === 0) return { currentPct: 0, isSafe: true, lecturesNeeded: 0, safeBunks: 0 };
    const currentPct = (attended / total) * 100;
    const targetFrac = target / 100;

    if (currentPct >= target) {
      const safeBunks = Math.floor((attended - targetFrac * total) / targetFrac);
      return { currentPct, isSafe: true, lecturesNeeded: 0, safeBunks: Math.max(0, safeBunks) };
    } else {
      const needed = Math.ceil((targetFrac * total - attended) / (1 - targetFrac));
      return { currentPct, isSafe: false, lecturesNeeded: Math.max(0, needed), safeBunks: 0 };
    }
  };

  const totalAttended = subjects.reduce((acc, s) => acc + s.attendedClasses, 0);
  const totalConducted = subjects.reduce((acc, s) => acc + s.totalClasses, 0);
  const overallPct = totalConducted > 0 ? (totalAttended / totalConducted) * 100 : 0;

  if (loading) {
    return <div className="py-12 text-center text-zinc-500 text-xs font-mono">Loading attendance records...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-5 bg-zinc-900/60 border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-zinc-100 tracking-tight flex items-center gap-2">
            <Percent className="w-5 h-5 text-zinc-400" />
            <span>Attendance Record</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Read-only attendance records marked by faculty.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded border border-zinc-800 text-xs font-mono text-zinc-400">
          <ShieldAlert className="w-3.5 h-3.5 text-zinc-500" />
          <span>Faculty Managed</span>
        </div>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <Card className="p-4">
          <p className="text-[11px] text-zinc-500 uppercase">Overall Attendance</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-zinc-100">{overallPct.toFixed(1)}%</span>
            <span className="text-xs text-zinc-500">({totalAttended} / {totalConducted} conducted)</span>
          </div>
          <div className="w-full bg-zinc-950 rounded-full h-1.5 mt-3 overflow-hidden border border-zinc-800">
            <div
              className={`h-full rounded-full transition-all ${
                overallPct >= user.targetAttendance ? 'bg-zinc-300' : 'bg-amber-400'
              }`}
              style={{ width: `${Math.min(100, overallPct)}%` }}
            />
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-[11px] text-zinc-500 uppercase">Required Minimum</p>
          <p className="text-2xl font-bold text-zinc-100 mt-1">{user.targetAttendance}%</p>
          <p className="text-[11px] text-zinc-500 mt-2 font-sans">Institutional requirement</p>
        </Card>

        <Card className="p-4">
          <p className="text-[11px] text-zinc-500 uppercase">Below Requirement</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">
            {subjects.filter((s) => (s.attendedClasses / s.totalClasses) * 100 < user.targetAttendance).length}
          </p>
          <p className="text-[11px] text-zinc-500 mt-2 font-sans">Requires attention</p>
        </Card>
      </div>

      {/* Read-Only Subject Attendance Roster */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
          Enrolled Subjects ({subjects.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((sub) => {
            const { currentPct, isSafe, lecturesNeeded, safeBunks } = calculateRequirement(
              sub.attendedClasses,
              sub.totalClasses,
              user.targetAttendance
            );

            return (
              <Card key={sub.id} className="p-5 space-y-4 bg-zinc-900/60 border-zinc-800">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="font-bold text-indigo-400">{sub.courseCode}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400">{sub.instructor}</span>
                    </div>
                    <h3 className="text-sm font-bold text-zinc-100 mt-0.5">{sub.courseName}</h3>
                  </div>
                  <Badge variant={isSafe ? 'emerald' : 'amber'} size="sm">
                    {currentPct.toFixed(1)}%
                  </Badge>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
                    <span>Attended: <strong>{sub.attendedClasses}</strong> / {sub.totalClasses} lectures conducted</span>
                    <span>Target: {user.targetAttendance}%</span>
                  </div>
                  <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isSafe ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${Math.min(100, currentPct)}%` }}
                    />
                  </div>
                </div>

                {/* Professional Guidance Verdict Box */}
                <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-start gap-2.5">
                  {isSafe ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-emerald-300">Attendance Requirement Met</p>
                        <p className="text-[11px] text-zinc-400 font-sans mt-0.5">
                          Can miss up to {safeBunks} lectures while maintaining the {user.targetAttendance}% threshold.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-200">Required Attendance Alert</p>
                        <p className="text-[11px] text-zinc-400 font-sans mt-0.5">
                          Must attend the next {lecturesNeeded} consecutive lectures to reach {user.targetAttendance}%.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
