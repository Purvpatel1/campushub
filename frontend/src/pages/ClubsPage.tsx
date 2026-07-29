import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Users, Calendar, MapPin, QrCode, Sparkles, Plus, CheckCircle2 } from 'lucide-react';

export const ClubsPage: React.FC = () => {
  const [rsvpState, setRsvpState] = useState<Record<string, boolean>>({ '1': true });

  const events = [
    { id: '1', title: 'UI/UX Masterclass & Design Jam', club: 'Design & Innovation Lab', date: 'Saturday, Aug 01', time: '02:00 PM', location: 'Auditorium A', rsvps: 142, category: 'Workshop' },
    { id: '2', title: 'Annual Hackathon 2026 Pitch Night', club: 'Developers Society', date: 'Friday, Aug 07', time: '06:00 PM', location: 'Student Union Center', rsvps: 289, category: 'Tech' },
    { id: '3', title: 'Acoustic Sunset Concert & Jam', club: 'Music & Performing Arts', date: 'Sunday, Aug 09', time: '05:30 PM', location: 'Campus Quad Lawn', rsvps: 310, category: 'Cultural' },
  ];

  const clubs = [
    { id: 'c1', name: 'Design & Innovation Lab', members: 340, category: 'Design & Tech', description: 'Empowering students with UI/UX design, prototyping, and product strategy.' },
    { id: 'c2', name: 'Developers Society', members: 890, category: 'Coding & AI', description: 'Building open-source software, competitive programming, and web apps.' },
    { id: 'c3', name: 'Robotics & Hardware Club', members: 210, category: 'Engineering', description: 'Autonomous drones, IoT hardware, and robotics competitions.' },
  ];

  const toggleRsvp = (id: string) => {
    setRsvpState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-cyan-400" />
            <span>Campus Clubs & Events Hub</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Discover campus organizations, RSVP to events, and get digital QR passes</p>
        </div>

        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Host New Campus Event
        </Button>
      </div>

      {/* Featured Upcoming Events */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <span>Upcoming Featured Events</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((ev) => (
            <Card key={ev.id} className="border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="indigo" size="sm">{ev.category}</Badge>
                  <span className="text-xs text-slate-400 font-semibold">{ev.rsvps} Attending</span>
                </div>

                <h3 className="text-base font-bold text-white mt-3">{ev.title}</h3>
                <p className="text-xs font-semibold text-indigo-400 mt-0.5">{ev.club}</p>

                <div className="space-y-1.5 text-xs text-slate-400 mt-4">
                  <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-500" /> {ev.date} • {ev.time}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {ev.location}</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <Button
                  size="sm"
                  variant={rsvpState[ev.id] ? 'secondary' : 'primary'}
                  leftIcon={rsvpState[ev.id] ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : undefined}
                  onClick={() => toggleRsvp(ev.id)}
                >
                  {rsvpState[ev.id] ? 'RSVP Confirmed' : 'RSVP 1-Click'}
                </Button>

                {rsvpState[ev.id] && (
                  <Badge variant="emerald" size="sm" className="cursor-pointer" title="View Digital QR Ticket Pass">
                    <QrCode className="w-3 h-3 mr-1" /> QR Ticket Pass
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Clubs Directory */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Active Student Organizations</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clubs.map((c) => (
            <Card key={c.id} className="border-slate-800">
              <div className="flex items-center justify-between">
                <Badge variant="cyan" size="sm">{c.category}</Badge>
                <span className="text-xs text-slate-400 font-medium">{c.members} Members</span>
              </div>
              <h3 className="text-base font-bold text-white mt-2">{c.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{c.description}</p>
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <Button size="sm" variant="outline">Join Organization</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
