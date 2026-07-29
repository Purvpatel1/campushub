import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Users, Calendar, MapPin, QrCode, Plus, CheckCircle2 } from 'lucide-react';

export const ClubsPage: React.FC = () => {
  const [rsvpState, setRsvpState] = useState<Record<string, boolean>>({ '1': true });

  const events = [
    { id: '1', title: 'UI/UX Masterclass & Design Jam', club: 'Design & Innovation Lab', date: 'Sat, Aug 01', time: '02:00 PM', location: 'Auditorium A', rsvps: 142, category: 'Workshop' },
    { id: '2', title: 'Annual Hackathon 2026 Pitch Night', club: 'Developers Society', date: 'Fri, Aug 07', time: '06:00 PM', location: 'Student Union Center', rsvps: 289, category: 'Tech' },
    { id: '3', title: 'Acoustic Sunset Concert & Jam', club: 'Music & Performing Arts', date: 'Sun, Aug 09', time: '05:30 PM', location: 'Campus Quad Lawn', rsvps: 310, category: 'Cultural' },
  ];

  const clubs = [
    { id: 'c1', name: 'Design & Innovation Lab', members: 340, category: 'Design & Tech', description: 'UI/UX design, prototyping, and product strategy.' },
    { id: 'c2', name: 'Developers Society', members: 890, category: 'Coding & AI', description: 'Open-source software, competitive programming, and web apps.' },
    { id: 'c3', name: 'Robotics & Hardware Club', members: 210, category: 'Engineering', description: 'Autonomous drones, IoT hardware, and robotics competitions.' },
  ];

  const toggleRsvp = (id: string) => {
    setRsvpState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>Clubs & Events</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">Discover campus organizations and RSVP to upcoming events</p>
        </div>

        <Button variant="primary" leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Host Event
        </Button>
      </div>

      {/* Featured Events */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {events.map((ev) => (
            <Card key={ev.id} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="indigo" size="sm">{ev.category}</Badge>
                  <span className="text-[11px] font-mono text-zinc-400">{ev.rsvps} Attending</span>
                </div>

                <h3 className="text-sm font-semibold text-white mt-2">{ev.title}</h3>
                <p className="text-xs font-medium text-indigo-400 mt-0.5">{ev.club}</p>

                <div className="space-y-1 text-xs text-zinc-400 mt-3">
                  <p className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-zinc-500" /> {ev.date} • {ev.time}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-zinc-500" /> {ev.location}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                <Button
                  size="sm"
                  variant={rsvpState[ev.id] ? 'secondary' : 'primary'}
                  leftIcon={rsvpState[ev.id] ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : undefined}
                  onClick={() => toggleRsvp(ev.id)}
                >
                  {rsvpState[ev.id] ? 'RSVP Confirmed' : 'RSVP'}
                </Button>

                {rsvpState[ev.id] && (
                  <Badge variant="emerald" size="sm">
                    <QrCode className="w-3 h-3 mr-1" /> Pass Ready
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Organizations Directory */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
          Organizations Directory
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {clubs.map((c) => (
            <Card key={c.id}>
              <div className="flex items-center justify-between">
                <Badge variant="cyan" size="sm">{c.category}</Badge>
                <span className="text-[11px] font-mono text-zinc-400">{c.members} Members</span>
              </div>
              <h3 className="text-sm font-semibold text-white mt-2">{c.name}</h3>
              <p className="text-xs text-zinc-400 mt-0.5">{c.description}</p>
              <div className="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between">
                <Button size="sm" variant="outline">Join Organization</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
