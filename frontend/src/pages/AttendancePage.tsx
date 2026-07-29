import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { QrCode, RefreshCw, CheckCircle2, AlertTriangle, UserCheck } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { user } = useAuth();
  const [showQRModal, setShowQRModal] = useState(false);
  const [timer, setTimer] = useState(5);
  const [attendanceScanned, setAttendanceScanned] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (showQRModal) {
      interval = setInterval(() => {
        setTimer((prev) => (prev === 1 ? 5 : prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showQRModal]);

  const studentsList = [
    { id: '1', name: 'Alex Chen', roll: 'CS-8842', status: 'Present', time: '09:02 AM' },
    { id: '2', name: 'Sophia Martinez', roll: 'CS-8843', status: 'Present', time: '09:03 AM' },
    { id: '3', name: 'David Kim', roll: 'CS-8844', status: 'Absent', time: '-' },
    { id: '4', name: 'Liam Johnson', roll: 'CS-8845', status: 'Present', time: '09:05 AM' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <QrCode className="w-5 h-5 text-indigo-400" />
            <span>Attendance Management</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">Real-time attendance logging & security monitoring</p>
        </div>

        {user.role === 'faculty' && (
          <Button
            variant="primary"
            leftIcon={<QrCode className="w-3.5 h-3.5" />}
            onClick={() => setShowQRModal(true)}
          >
            Launch Dynamic QR Session
          </Button>
        )}

        {user.role === 'student' && (
          <Button
            variant="primary"
            leftIcon={<QrCode className="w-3.5 h-3.5" />}
            onClick={() => {
              setAttendanceScanned(true);
              setTimeout(() => setAttendanceScanned(false), 4000);
            }}
          >
            {attendanceScanned ? 'Attendance Recorded' : 'Scan Classroom QR'}
          </Button>
        )}
      </div>

      {attendanceScanned && (
        <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <div>
            <p className="font-semibold">Attendance Logged</p>
            <p className="text-[11px] opacity-90">CS301: Advanced Data Structures • Timestamp: 09:02 AM</p>
          </div>
        </div>
      )}

      {/* Course Attendance Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-indigo-400">CS301</span>
            <Badge variant="emerald" size="sm">94.2% Safe</Badge>
          </div>
          <h3 className="text-sm font-semibold text-white mt-1.5">Advanced Data Structures</h3>
          <p className="text-xs text-zinc-400 mt-0.5">16 / 17 lectures attended</p>
          <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full w-[94.2%]" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-cyan-400">PHY202</span>
            <Badge variant="amber" size="sm">78.5% Warning</Badge>
          </div>
          <h3 className="text-sm font-semibold text-white mt-1.5">Quantum Mechanics</h3>
          <p className="text-xs text-zinc-400 mt-0.5">11 / 14 lectures attended</p>
          <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full w-[78.5%]" />
          </div>
          <p className="text-[11px] text-amber-400 mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Minimum 1 lecture required above threshold
          </p>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-emerald-400">MATH305</span>
            <Badge variant="emerald" size="sm">96.5% Safe</Badge>
          </div>
          <h3 className="text-sm font-semibold text-white mt-1.5">Linear Algebra</h3>
          <p className="text-xs text-zinc-400 mt-0.5">15 / 15 lectures attended</p>
          <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full w-[96.5%]" />
          </div>
        </Card>
      </div>

      {/* Roster Table */}
      <Card>
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-indigo-400" />
            <span>Class Roster (CS301)</span>
          </h2>
          <Badge variant="indigo" size="sm">34 / 36 Present</Badge>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="text-[11px] uppercase font-mono bg-zinc-950 text-zinc-500 border-b border-zinc-800">
              <tr>
                <th className="px-3 py-2.5">Student Name</th>
                <th className="px-3 py-2.5">Roll ID</th>
                <th className="px-3 py-2.5">Scan Time</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {studentsList.map((st) => (
                <tr key={st.id} className="hover:bg-zinc-800/40">
                  <td className="px-3 py-2 font-sans font-medium text-white">{st.name}</td>
                  <td className="px-3 py-2 text-zinc-400">{st.roll}</td>
                  <td className="px-3 py-2 text-zinc-400">{st.time}</td>
                  <td className="px-3 py-2">
                    <Badge variant={st.status === 'Present' ? 'emerald' : 'rose'} size="sm">
                      {st.status}
                    </Badge>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Button size="sm" variant="ghost">Override</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Dynamic QR Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="emerald" size="sm" dot>Live Session</Badge>
              <button onClick={() => setShowQRModal(false)} className="text-zinc-400 hover:text-white text-sm">✕</button>
            </div>

            <div>
              <h2 className="text-base font-bold text-white">Physics 101 Lecture</h2>
              <p className="text-xs text-zinc-400">Scan QR on projector screen to mark attendance</p>
            </div>

            <div className="p-4 bg-white rounded-lg inline-block border border-zinc-700">
              <div className="w-40 h-40 bg-zinc-950 rounded flex flex-col items-center justify-center text-emerald-400 gap-1.5">
                <QrCode className="w-24 h-24" />
                <span className="text-[9px] font-mono tracking-widest text-zinc-400">TOKEN: #PHY-9982-{timer}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400">
              <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
              <span>Token rotates in <strong className="text-white font-mono">{timer}s</strong></span>
            </div>

            <Button variant="secondary" className="w-full" onClick={() => setShowQRModal(false)}>
              End Session & Lock Roster
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
