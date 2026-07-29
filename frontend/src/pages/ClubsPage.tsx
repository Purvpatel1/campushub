import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Users, Calendar, MapPin, QrCode, Plus, CheckCircle2, Mail, Download, Send, Sparkles } from 'lucide-react';

export const ClubsPage: React.FC = () => {
  const { user } = useAuth();

  // Dynamic Event Feed
  const [events, setEvents] = useState([
    { id: '1', title: 'UI/UX Masterclass & Design Jam', club: 'Design & Innovation Lab', date: 'Sat, Aug 01', time: '02:00 PM', location: 'Auditorium A', rsvps: 142, category: 'Workshop' },
    { id: '2', title: 'Annual Hackathon 2026 Pitch Night', club: 'Developers Society', date: 'Fri, Aug 07', time: '06:00 PM', location: 'Student Union Center', rsvps: 289, category: 'Tech' },
    { id: '3', title: 'Acoustic Sunset Concert & Jam', club: 'Music & Performing Arts', date: 'Sun, Aug 09', time: '05:30 PM', location: 'Campus Quad Lawn', rsvps: 310, category: 'Cultural' },
  ]);

  // State for Registration & Email Pass Flow
  const [registeringEvent, setRegisteringEvent] = useState<typeof events[0] | null>(null);
  const [digitalPassModal, setDigitalPassModal] = useState<typeof events[0] | null>(null);
  const [userEmail, setUserEmail] = useState(user.email);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registeredEventIds, setRegisteredEventIds] = useState<Record<string, boolean>>({ '1': true });

  // State for Club Leader Event Creator Wizard
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    club: user.department || 'Student Organization',
    date: 'Sat, Aug 15',
    time: '04:00 PM',
    location: 'Auditorium B',
    category: 'Workshop',
  });

  // Handle Event Registration and Dispatch Ticket Pass to Email
  const confirmRegistration = () => {
    if (!registeringEvent) return;
    setIsRegistering(true);

    setTimeout(() => {
      setIsRegistering(false);
      setRegisteredEventIds((prev) => ({ ...prev, [registeringEvent.id]: true }));

      // Increment RSVP count
      setEvents((prev) =>
        prev.map((e) => (e.id === registeringEvent.id ? { ...e, rsvps: e.rsvps + 1 } : e))
      );

      // Launch Digital Pass Ticket Modal
      setDigitalPassModal(registeringEvent);
      setRegisteringEvent(null);
    }, 800);
  };

  // Handle New Event Creation (Club Leader / Admin)
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;

    const created = {
      id: Date.now().toString(),
      title: newEvent.title,
      club: newEvent.club,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      rsvps: 1,
      category: newEvent.category,
    };

    setEvents((prev) => [created, ...prev]);
    setShowCreateModal(false);
    setNewEvent({ title: '', club: user.department || 'Student Organization', date: 'Sat, Aug 15', time: '04:00 PM', location: 'Auditorium B', category: 'Workshop' });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>
              {user.role === 'club_leader' ? 'Club Event Management' : 'Campus Events & Organizations'}
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {user.role === 'club_leader'
              ? 'Create campus workshops and manage event registrations'
              : 'Register for events to receive instant digital QR passes directly to your email'}
          </p>
        </div>

        {(user.role === 'club_leader' || user.role === 'admin') && (
          <Button variant="primary" leftIcon={<Plus className="w-3.5 h-3.5" />} onClick={() => setShowCreateModal(true)}>
            Create New Event
          </Button>
        )}
      </div>

      {/* FEATURED EVENTS FEED */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
          Upcoming Campus Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {events.map((ev) => {
            const isRegistered = registeredEventIds[ev.id];
            return (
              <Card key={ev.id} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <Badge variant="indigo" size="sm">{ev.category}</Badge>
                    <span className="text-[11px] font-mono text-zinc-400">{ev.rsvps} Registered</span>
                  </div>

                  <h3 className="text-sm font-semibold text-white mt-2">{ev.title}</h3>
                  <p className="text-xs font-medium text-indigo-400 mt-0.5">{ev.club}</p>

                  <div className="space-y-1 text-xs text-zinc-400 mt-3">
                    <p className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-zinc-500" /> {ev.date} • {ev.time}</p>
                    <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-zinc-500" /> {ev.location}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                  {isRegistered ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      leftIcon={<QrCode className="w-3.5 h-3.5 text-emerald-400" />}
                      onClick={() => setDigitalPassModal(ev)}
                    >
                      View Digital Pass
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      leftIcon={<Send className="w-3.5 h-3.5" />}
                      onClick={() => setRegisteringEvent(ev)}
                    >
                      Register & Get Email Pass
                    </Button>
                  )}

                  {isRegistered && (
                    <Badge variant="emerald" size="sm">
                      Pass Sent to Email
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* EVENT REGISTRATION & EMAIL DISPATCH MODAL */}
      {registeringEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <Badge variant="indigo" size="sm">Event Registration</Badge>
              <button onClick={() => setRegisteringEvent(null)} className="text-zinc-400 hover:text-white text-sm">✕</button>
            </div>

            <div>
              <h2 className="text-sm font-bold text-white">{registeringEvent.title}</h2>
              <p className="text-xs text-indigo-400">{registeringEvent.club} • {registeringEvent.date}</p>
            </div>

            <div className="space-y-2 text-xs">
              <label className="block text-zinc-400 font-medium">Deliver Digital Pass To Email:</label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full input-base py-1.5"
                />
              </div>
              <p className="text-[11px] text-zinc-500">Your digital QR ticket pass will be generated and dispatched immediately to your email inbox.</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setRegisteringEvent(null)}>Cancel</Button>
              <Button
                variant="primary"
                isLoading={isRegistering}
                leftIcon={<Send className="w-3.5 h-3.5" />}
                onClick={confirmRegistration}
              >
                Confirm & Dispatch Ticket
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DIGITAL QR TICKET PASS MODAL */}
      {digitalPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-zinc-900 border border-emerald-500/40 rounded-xl p-5 text-center space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="emerald" size="sm">Digital Ticket Pass Sent</Badge>
              <button onClick={() => setDigitalPassModal(null)} className="text-zinc-400 hover:text-white text-sm">✕</button>
            </div>

            <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 flex items-center gap-2 text-xs text-left">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <div>
                <p className="font-semibold">Email Dispatch Confirmed</p>
                <p className="text-[10px] opacity-90 truncate">Ticket pass delivered to {userEmail}</p>
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-white">{digitalPassModal.title}</h2>
              <p className="text-xs text-zinc-400 mt-0.5">{digitalPassModal.location} • {digitalPassModal.date}</p>
            </div>

            {/* QR Code Pass Display */}
            <div className="p-4 bg-white rounded-lg inline-block border border-zinc-700">
              <div className="w-36 h-36 bg-zinc-950 rounded flex flex-col items-center justify-center text-emerald-400 gap-1">
                <QrCode className="w-20 h-20" />
                <span className="text-[9px] font-mono tracking-widest text-zinc-400">#TKT-2026-{digitalPassModal.id}</span>
              </div>
            </div>

            <div className="text-xs text-zinc-400">
              <p className="font-semibold text-white">{user.name}</p>
              <p className="text-[11px] text-zinc-500 font-mono">ID: {user.studentId || 'CS-2024-8842'}</p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              <Button size="sm" variant="outline" leftIcon={<Download className="w-3.5 h-3.5" />} onClick={() => alert('PDF Pass saved to downloads')}>
                Download PDF
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setDigitalPassModal(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CLUB LEADER EVENT CREATION WIZARD MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs">
          <form onSubmit={handleCreateEvent} className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <Badge variant="indigo" size="sm">Create Campus Event</Badge>
              <button type="button" onClick={() => setShowCreateModal(false)} className="text-zinc-400 hover:text-white text-sm">✕</button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="block text-zinc-400 font-medium mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI & Full-Stack Development Workshop"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full input-base"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Date</label>
                  <input
                    type="text"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full input-base"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Time</label>
                  <input
                    type="text"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full input-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Venue Location</label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full input-base"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Category</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full input-base"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Tech">Tech</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>Cancel</Button>
              <Button type="submit" variant="primary" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
                Publish Event
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
