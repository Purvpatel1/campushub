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

  // Dynamic QR Code rotating token simulation (5s refresh)
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <QrCode className="w-7 h-7 text-emerald-400" />
            <span>Smart Attendance Management</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Real-time attendance logging & security monitoring</p>
        </div>

        {user.role === 'faculty' && (
          <Button
            variant="primary"
            leftIcon={<QrCode className="w-4 h-4" />}
            onClick={() => setShowQRModal(true)}
          >
            Launch Dynamic QR Session
          </Button>
        )}

        {user.role === 'student' && (
          <Button
            variant="primary"
            leftIcon={<QrCode className="w-4 h-4" />}
            onClick={() => {
              setAttendanceScanned(true);
              setTimeout(() => setAttendanceScanned(false), 4000);
            }}
          >
            {attendanceScanned ? 'Attendance Marked!' : 'Scan Classroom QR'}
          </Button>
        )}
      </div>

      {attendanceScanned && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <p className="font-bold text-sm">Attendance Verified & Logged!</p>
            <p className="text-xs opacity-90">CS301: Advanced Data Structures • Timestamp: 09:02 AM • Cryptographic Token Verified</p>
          </div>
        </div>
      )}

      {/* Student View: Course Attendance Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-emerald-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-indigo-400">CS301</span>
            <Badge variant="emerald" size="sm">94.2% Safe</Badge>
          </div>
          <h3 className="text-lg font-bold text-white mt-2">Advanced Data Structures</h3>
          <p className="text-xs text-slate-400 mt-1">Attended 16 / 17 lectures</p>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full w-[94.2%]" />
          </div>
        </Card>

        <Card className="border-amber-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400">PHY202</span>
            <Badge variant="amber" size="sm">78.5% Warning Zone</Badge>
          </div>
          <h3 className="text-lg font-bold text-white mt-2">Quantum Mechanics</h3>
          <p className="text-xs text-slate-400 mt-1">Attended 11 / 14 lectures</p>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full w-[78.5%]" />
          </div>
          <p className="text-[11px] text-amber-400 mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Minimum 1 lecture required to stay above 75%
          </p>
        </Card>

        <Card className="border-emerald-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400">MATH305</span>
            <Badge variant="emerald" size="sm">96.5% Safe</Badge>
          </div>
          <h3 className="text-lg font-bold text-white mt-2">Linear Algebra</h3>
          <p className="text-xs text-slate-400 mt-1">Attended 15 / 15 lectures</p>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full w-[96.5%]" />
          </div>
        </Card>
      </div>

      {/* Roster Batch Attendance Table */}
      <Card>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-indigo-400" />
            <span>Classroom Session Roster (CS301)</span>
          </h2>
          <Badge variant="indigo" size="sm">34 / 36 Present</Badge>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase bg-slate-900/60 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Roll ID</th>
                <th className="px-4 py-3">Scan Time</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {studentsList.map((st) => (
                <tr key={st.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-semibold text-white">{st.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">{st.roll}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{st.time}</td>
                  <td className="px-4 py-3">
                    <Badge variant={st.status === 'Present' ? 'emerald' : 'rose'} size="sm">
                      {st.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="ghost">Toggle Override</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Dynamic QR Modal for Faculty */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel border border-emerald-500/40 rounded-3xl p-6 text-center space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="emerald" size="sm" dot>Live Classroom Session</Badge>
              <button onClick={() => setShowQRModal(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-white">Physics 101 Lecture</h2>
              <p className="text-xs text-slate-400">Scan QR on screen to mark attendance</p>
            </div>

            {/* Dynamic QR Display */}
            <div className="p-6 bg-white rounded-2xl inline-block shadow-2xl border-4 border-emerald-500/40">
              <div className="w-48 h-48 bg-slate-900 rounded-lg flex flex-col items-center justify-center text-emerald-400 gap-2">
                <QrCode className="w-28 h-28 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-slate-400">TOKEN: #PHY-9982-{timer}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>Token rotates in <strong className="text-white font-mono">{timer}s</strong> (Anti-Screenshot Security Enabled)</span>
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
