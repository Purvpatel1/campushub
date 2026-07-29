import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GraduationCap, Clock, MapPin, User, Download, BookOpen } from 'lucide-react';

export const AcademicsPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Wed');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const scheduleData = [
    { id: '1', day: 'Wed', code: 'CS301', title: 'Advanced Data Structures', time: '09:00 - 10:30 AM', room: 'Hall B-102', instructor: 'Prof. David Miller', type: 'Lecture', active: true },
    { id: '2', day: 'Wed', code: 'PHY202', title: 'Quantum Mechanics & Applications', time: '11:30 - 01:00 PM', room: 'Physics Lab 4', instructor: 'Dr. Aris Thorne', type: 'Lab', active: false },
    { id: '3', day: 'Wed', code: 'ENG104', title: 'Technical Writing & Communication', time: '02:30 - 04:00 PM', room: 'Auditorium C', instructor: 'Dr. Elena Rostova', type: 'Lecture', active: false },
  ];

  const courses = [
    { code: 'CS301', name: 'Advanced Data Structures', credits: 4, room: 'Hall B-102', instructor: 'Prof. David Miller', attendance: 94.2, color: 'border-indigo-500/40 bg-indigo-500/10' },
    { code: 'PHY202', name: 'Quantum Mechanics', credits: 4, room: 'Lab 4', instructor: 'Dr. Aris Thorne', attendance: 88.0, color: 'border-cyan-500/40 bg-cyan-500/10' },
    { code: 'MATH305', name: 'Linear Algebra & Optimization', credits: 3, room: 'Hall A-201', instructor: 'Dr. Samuel Vance', attendance: 96.5, color: 'border-emerald-500/40 bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-indigo-400" />
            <span>Academic Timetable & Courses</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Semester 6 • Computer Science & Engineering</p>
        </div>
        <Button leftIcon={<Download className="w-4 h-4" />}>
          Export Timetable (.ICS)
        </Button>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${
              selectedDay === day
                ? 'bg-gradient-brand text-white border-indigo-400/30 shadow-lg shadow-indigo-500/20'
                : 'glass-panel text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Schedule for {selectedDay}nesday</span>
          </h2>

          <div className="space-y-3">
            {scheduleData.map((item) => (
              <Card
                key={item.id}
                className={`transition-all ${
                  item.active ? 'border-indigo-500/50 glow-effect bg-indigo-950/20' : 'border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={item.active ? 'indigo' : 'slate'} size="sm">
                        {item.type}
                      </Badge>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" /> {item.time}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.code}: {item.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {item.room}</span>
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-slate-500" /> {item.instructor}</span>
                    </div>
                  </div>

                  {item.active && (
                    <Badge variant="emerald" size="md" dot>
                      Session Ongoing
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Enrolled Courses</span>
          </h2>

          <div className="space-y-3">
            {courses.map((course) => (
              <Card key={course.code} className="border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-indigo-400">{course.code}</span>
                  <Badge variant="emerald" size="sm">{course.attendance}% Attendance</Badge>
                </div>
                <h3 className="text-sm font-bold text-white mt-1">{course.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{course.instructor} • {course.credits} Credits</p>
                <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{course.room}</span>
                  <span className="text-indigo-400 hover:underline cursor-pointer font-medium">Download Syllabus →</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
