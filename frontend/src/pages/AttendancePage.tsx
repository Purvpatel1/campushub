import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { QrCode, RefreshCw, CheckCircle2, AlertTriangle, UserCheck, Edit3 } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { user } = useAuth();
  const [showQRModal, setShowQRModal] = useState(false);
  const [timer, setTimer] = useState(5);
  const [attendanceScanned] = useState(false);

  // Student roster state editable by Faculty & Admin
  const [studentsList, setStudentsList] = useState([
    { id: '1', name: 'Alex Chen', roll: 'CS-8842', status: 'Present', time: '09:02 AM', waived: false },
    { id: '2', name: 'Sophia Martinez', roll: 'CS-8843', status: 'Present', time: '09:03 AM', waived: false },
    { id: '3', name: 'David Kim', roll: 'CS-8844', status: 'Absent', time: '-', waived: false },
    { id: '4', name: 'Liam Johnson', roll: 'CS-8845', status: 'Present', time: '09:05 AM', waived: false },
  ]);

  // Dynamic QR Code rotation timer simulation (5s refresh)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (showQRModal) {
      interval = setInterval(() => {
        setTimer((prev) => (prev === 1 ? 5 : prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showQRModal]);

  const toggleStudentStatus = (id: string) => {
    setStudentsList((prev) =>
      prev.map((st) =>
        st.id === id
          ? { ...st, status: st.status === 'Present' ? 'Absent' : st.status === 'Absent' ? 'Late' : 'Present' }
          : st
      )
    );
  };

  const grantAdminExcuseWaiver = (id: string) => {
    setStudentsList((prev) =>
      prev.map((st) =>
        st.id === id
          ? { ...st, status: 'Excused', waived: true }
          : st
      )
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <QrCode className="w-5 h-5 text-indigo-400" />
            <span>
              {user.role === 'student' && 'My Attendance Status'}
              {user.role === 'faculty' && 'Classroom Attendance Logging'}
              {user.role === 'admin' && 'Institutional Attendance Audit & Overrides'}
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {user.role === 'student' && 'View course attendance thresholds and safety margin calculations'}
            {user.role === 'faculty' && 'Launch dynamic QR sessions or conduct manual roster roll call'}
            {user.role === 'admin' && 'Audit institutional compliance logs and grant official excuse waivers'}
          </p>
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

        {user.role === 'admin' && (
          <Badge variant="rose" size="md">
            Admin Override Mode Active
          </Badge>
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

      {/* STUDENT PERSPECTIVE: COURSE ATTENDANCE BREAKDOWN */}
      {user.role === 'student' && (
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
              <AlertTriangle className="w-3 h-3" /> Minimum 1 lecture required above 75%
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
      )}

      {/* FACULTY & ADMIN PERSPECTIVE: CLASS ROSTER ATTENDANCE TABLE */}
      {(user.role === 'faculty' || user.role === 'admin') && (
        <Card>
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-indigo-400" />
              <span>
                {user.role === 'admin' ? 'Institutional Audit Log (CS301)' : 'Class Roster Attendance (CS301)'}
              </span>
            </h2>
            <Badge variant="indigo" size="sm">
              {studentsList.filter(s => s.status === 'Present').length} / {studentsList.length} Present
            </Badge>
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="text-[11px] uppercase font-mono bg-zinc-950 text-zinc-500 border-b border-zinc-800">
                <tr>
                  <th className="px-3 py-2.5">Student Name</th>
                  <th className="px-3 py-2.5">Roll ID</th>
                  <th className="px-3 py-2.5">Scan Timestamp</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5 text-right">
                    {user.role === 'admin' ? 'Admin Override Action' : 'Faculty Toggle'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono">
                {studentsList.map((st) => (
                  <tr key={st.id} className="hover:bg-zinc-800/40">
                    <td className="px-3 py-2 font-sans font-medium text-white">{st.name}</td>
                    <td className="px-3 py-2 text-zinc-400">{st.roll}</td>
                    <td className="px-3 py-2 text-zinc-400">{st.time}</td>
                    <td className="px-3 py-2">
                      <Badge
                        variant={
                          st.status === 'Present'
                            ? 'emerald'
                            : st.status === 'Excused'
                            ? 'cyan'
                            : st.status === 'Late'
                            ? 'amber'
                            : 'rose'
                        }
                        size="sm"
                      >
                        {st.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 text-right">
                      {user.role === 'faculty' && (
                        <Button size="sm" variant="ghost" onClick={() => toggleStudentStatus(st.id)}>
                          Toggle Status
                        </Button>
                      )}
                      {user.role === 'admin' && (
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<Edit3 className="w-3 h-3" />}
                          onClick={() => grantAdminExcuseWaiver(st.id)}
                        >
                          Grant Dean Excuse
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* DYNAMIC QR MODAL FOR FACULTY */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="emerald" size="sm" dot>Live Session Active</Badge>
              <button onClick={() => setShowQRModal(false)} className="text-zinc-400 hover:text-white text-sm">✕</button>
            </div>

            <div>
              <h2 className="text-base font-bold text-white">Physics 101 Lecture</h2>
              <p className="text-xs text-zinc-400">Students scan QR code on projector screen to log attendance</p>
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
