import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GraduationCap, Clock, MapPin, User, Download } from 'lucide-react';

export const AcademicsPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Wed');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const scheduleData = [
    { id: '1', day: 'Wed', code: 'CS301', title: 'Advanced Data Structures', time: '09:00 - 10:30 AM', room: 'Hall B-102', instructor: 'Prof. David Miller', type: 'Lecture', active: true },
    { id: '2', day: 'Wed', code: 'PHY202', title: 'Quantum Mechanics & Applications', time: '11:30 - 01:00 PM', room: 'Physics Lab 4', instructor: 'Dr. Aris Thorne', type: 'Lab', active: false },
    { id: '3', day: 'Wed', code: 'ENG104', title: 'Technical Writing & Communication', time: '02:30 - 04:00 PM', room: 'Auditorium C', instructor: 'Dr. Elena Rostova', type: 'Lecture', active: false },
  ];

  const courses = [
    { code: 'CS301', name: 'Advanced Data Structures', credits: 4, room: 'Hall B-102', instructor: 'Prof. David Miller', attendance: 94.2 },
    { code: 'PHY202', name: 'Quantum Mechanics', credits: 4, room: 'Lab 4', instructor: 'Dr. Aris Thorne', attendance: 88.0 },
    { code: 'MATH305', name: 'Linear Algebra & Optimization', credits: 3, room: 'Hall A-201', instructor: 'Dr. Samuel Vance', attendance: 96.5 },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span>Academic Timetable</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">Semester 6 • Computer Science & Engineering</p>
        </div>
        <Button variant="outline" leftIcon={<Download className="w-3.5 h-3.5" />}>
          Export Timetable (.ICS)
        </Button>
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3.5 py-1.5 rounded-md font-medium text-xs transition-colors ${
              selectedDay === day
                ? 'bg-zinc-800 text-white font-semibold border border-zinc-700/60'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
            {selectedDay}nesday Schedule
          </h2>

          <div className="space-y-2">
            {scheduleData.map((item) => (
              <Card
                key={item.id}
                className={item.active ? 'border-indigo-500/40 bg-zinc-900' : 'border-zinc-800'}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={item.active ? 'indigo' : 'slate'} size="sm">
                        {item.type}
                      </Badge>
                      <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-500" /> {item.time}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white">{item.code}: {item.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1.5">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-zinc-500" /> {item.room}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3 text-zinc-500" /> {item.instructor}</span>
                    </div>
                  </div>

                  {item.active && (
                    <Badge variant="emerald" size="sm" dot>
                      Session Active
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
            Enrolled Courses
          </h2>

          <div className="space-y-2">
            {courses.map((course) => (
              <Card key={course.code}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-indigo-400">{course.code}</span>
                  <Badge variant="emerald" size="sm">{course.attendance}% Attendance</Badge>
                </div>
                <h3 className="text-xs font-semibold text-white mt-1">{course.name}</h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">{course.instructor} • {course.credits} Credits</p>
                <div className="mt-2.5 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">{course.room}</span>
                  <span className="text-indigo-400 hover:underline cursor-pointer text-[11px]">Syllabus →</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
