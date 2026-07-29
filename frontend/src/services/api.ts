import type { Course, Assignment, CampusEvent, Club } from '@/types';

// Simulated API latency helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockCourses: Course[] = [
  { id: 'c1', code: 'CS301', name: 'Advanced Data Structures & Algorithms', instructor: 'Prof. David Miller', room: 'Hall B-102', credits: 4, schedule: 'MWF 09:00 - 10:30 AM', attendancePercentage: 94.2, totalClasses: 17, attendedClasses: 16, color: 'indigo' },
  { id: 'c2', code: 'PHY202', name: 'Quantum Mechanics & Applications', instructor: 'Dr. Aris Thorne', room: 'Physics Lab 4', credits: 4, schedule: 'TTh 11:30 - 01:00 PM', attendancePercentage: 78.5, totalClasses: 14, attendedClasses: 11, color: 'cyan' },
  { id: 'c3', code: 'MATH305', name: 'Linear Algebra & Optimization', instructor: 'Dr. Samuel Vance', room: 'Hall A-201', credits: 3, schedule: 'MWF 02:00 - 03:15 PM', attendancePercentage: 96.5, totalClasses: 15, attendedClasses: 15, color: 'emerald' },
  { id: 'c4', code: 'ENG104', name: 'Technical Writing & Communication', instructor: 'Dr. Elena Rostova', room: 'Auditorium C', credits: 2, schedule: 'Tue 03:30 - 05:00 PM', attendancePercentage: 100.0, totalClasses: 10, attendedClasses: 10, color: 'slate' },
];

export const mockAssignments: Assignment[] = [
  { id: 'a1', courseCode: 'CS301', title: 'Binary Search Tree & AVL Balancing', dueDate: 'Today, 5:00 PM', points: 100, status: 'pending', description: 'Implement C++ AVL tree with balance factor rotations and export performance metrics.' },
  { id: 'a2', courseCode: 'PHY202', title: 'Quantum Tunneling Problem Set 3', dueDate: 'Tomorrow, 11:59 PM', points: 50, status: 'submitted', grade: 48, description: 'Solve Schrödinger equation step potentials for energy states E < V0.' },
  { id: 'a3', courseCode: 'MATH305', title: 'Matrix Eigenvalues & Eigenvectors', dueDate: 'Aug 02, 2026', points: 75, status: 'graded', grade: 72, feedback: 'Great work on part 2. Minor calculation error in characteristic polynomial.', description: 'Compute characteristic polynomial roots and orthogonal eigenvectors.' },
];

export const mockEvents: CampusEvent[] = [
  { id: 'e1', title: 'UI/UX Masterclass & Design Jam', organizer: 'Design & Innovation Lab', date: 'Saturday, Aug 01', time: '02:00 PM', location: 'Auditorium A', category: 'Workshop', rsvps: 142, userRsvp: true, image: '' },
  { id: 'e2', title: 'Annual Hackathon 2026 Pitch Night', organizer: 'Developers Society', date: 'Friday, Aug 07', time: '06:00 PM', location: 'Student Union Center', category: 'Tech', rsvps: 289, userRsvp: false, image: '' },
  { id: 'e3', title: 'Acoustic Sunset Concert & Jam', organizer: 'Music & Performing Arts', date: 'Sunday, Aug 09', time: '05:30 PM', location: 'Campus Quad Lawn', category: 'Cultural', rsvps: 310, userRsvp: false, image: '' },
];

export const mockClubs: Club[] = [
  { id: 'cb1', name: 'Design & Innovation Lab', category: 'Design & Tech', membersCount: 340, description: 'Empowering students with UI/UX design, prototyping, and product strategy.', isMember: true, logo: '' },
  { id: 'cb2', name: 'Developers Society', category: 'Coding & AI', membersCount: 890, description: 'Building open-source software, competitive programming, and web apps.', isMember: true, logo: '' },
  { id: 'cb3', name: 'Robotics & Hardware Club', category: 'Engineering', membersCount: 210, description: 'Autonomous drones, IoT hardware, and robotics competitions.', isMember: false, logo: '' },
];

export const campusApi = {
  async getCourses(): Promise<Course[]> {
    await delay(150);
    return mockCourses;
  },

  async getAssignments(): Promise<Assignment[]> {
    await delay(150);
    return mockAssignments;
  },

  async getEvents(): Promise<CampusEvent[]> {
    await delay(150);
    return mockEvents;
  },

  async getClubs(): Promise<Club[]> {
    await delay(150);
    return mockClubs;
  },
};
