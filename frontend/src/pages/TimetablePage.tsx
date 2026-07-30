import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { campusApi } from '@/services/api';
import type { TimetableSlot } from '@/types';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export const TimetablePage: React.FC = () => {
  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);
  const [selectedDay, setSelectedDay] = useState<(typeof DAYS)[number]>('Monday');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await campusApi.getTimetable();
      setTimetable(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const daySlots = timetable.filter((item) => item.day === selectedDay);

  if (loading) {
    return <div className="py-12 text-center text-zinc-500 text-xs font-mono">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-5 bg-zinc-900/60 border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-zinc-100 tracking-tight">Timetable</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Weekly class schedule and room numbers.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded border border-zinc-800 text-xs font-mono text-zinc-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{timetable.length} classes this week</span>
        </div>
      </Card>

      {/* Day Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-zinc-800">
        {DAYS.map((day) => {
          const count = timetable.filter((item) => item.day === day).length;
          const isActive = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-2 border ${
                isActive
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-100 font-semibold'
                  : 'bg-zinc-950/60 border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>{day}</span>
              {count > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-zinc-900 border border-zinc-800 text-zinc-500">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Day Schedule List */}
      <div className="space-y-2.5">
        {daySlots.length > 0 ? (
          daySlots.map((slot) => (
            <Card
              key={slot.id}
              className="p-4 bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={slot.type === 'Lab' ? 'cyan' : 'indigo'} size="sm">
                      {slot.type}
                    </Badge>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      {slot.startTime} - {slot.endTime}
                    </span>
                    <span className="text-xs font-mono text-zinc-300 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      {slot.room}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-zinc-100">
                    {slot.courseCode}: {slot.courseName}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Instructor: <strong className="text-zinc-300 font-medium">{slot.instructor}</strong></span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center text-zinc-500 text-xs font-mono">
            No classes on {selectedDay}.
          </Card>
        )}
      </div>
    </div>
  );
};
