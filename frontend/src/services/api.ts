import type { TimetableSlot, AttendanceSubject, Assignment, SubjectMaterial } from '@/types';

const mockTimetable: TimetableSlot[] = [
  { id: 't1', day: 'Monday', courseCode: 'DBMS', courseName: 'Database Management Systems', startTime: '09:00 AM', endTime: '10:30 AM', room: 'Hall B-102', instructor: 'Dr. Rajesh Sharma', type: 'Lecture', color: 'indigo' },
  { id: 't2', day: 'Monday', courseCode: 'OS', courseName: 'Operating Systems', startTime: '11:00 AM', endTime: '12:30 PM', room: 'Hall A-201', instructor: 'Prof. Ananya Iyer', type: 'Lecture', color: 'amber' },
  { id: 't3', day: 'Monday', courseCode: 'DBMS', courseName: 'DBMS Lab', startTime: '02:00 PM', endTime: '04:00 PM', room: 'Computer Lab 3', instructor: 'Dr. Rajesh Sharma', type: 'Lab', color: 'indigo' },

  { id: 't4', day: 'Tuesday', courseCode: 'CN', courseName: 'Computer Networks', startTime: '09:00 AM', endTime: '10:30 AM', room: 'Hall B-102', instructor: 'Dr. Vikram Verma', type: 'Lecture', color: 'cyan' },
  { id: 't5', day: 'Tuesday', courseCode: 'OOP', courseName: 'Object Oriented Programming', startTime: '11:00 AM', endTime: '12:30 PM', room: 'Hall B-104', instructor: 'Prof. Suresh Kulkarni', type: 'Lecture', color: 'emerald' },

  { id: 't6', day: 'Wednesday', courseCode: 'AOA', courseName: 'Analysis of Algorithms', startTime: '09:00 AM', endTime: '10:30 AM', room: 'Hall A-201', instructor: 'Prof. Meera Patel', type: 'Lecture', color: 'slate' },
  { id: 't7', day: 'Wednesday', courseCode: 'OS', courseName: 'Operating Systems Lab', startTime: '02:00 PM', endTime: '04:00 PM', room: 'Systems Lab 2', instructor: 'Prof. Ananya Iyer', type: 'Lab', color: 'amber' },

  { id: 't8', day: 'Thursday', courseCode: 'DBMS', courseName: 'Database Management Systems', startTime: '09:00 AM', endTime: '10:30 AM', room: 'Hall B-102', instructor: 'Dr. Rajesh Sharma', type: 'Lecture', color: 'indigo' },
  { id: 't9', day: 'Thursday', courseCode: 'CN', courseName: 'Computer Networks Lab', startTime: '02:00 PM', endTime: '04:00 PM', room: 'Networks Lab 1', instructor: 'Dr. Vikram Verma', type: 'Lab', color: 'cyan' },

  { id: 't10', day: 'Friday', courseCode: 'OOP', courseName: 'Object Oriented Programming', startTime: '09:00 AM', endTime: '10:30 AM', room: 'Hall B-104', instructor: 'Prof. Suresh Kulkarni', type: 'Lecture', color: 'emerald' },
  { id: 't11', day: 'Friday', courseCode: 'AOA', courseName: 'Analysis of Algorithms', startTime: '11:00 AM', endTime: '12:30 PM', room: 'Hall A-201', instructor: 'Prof. Meera Patel', type: 'Lecture', color: 'slate' },
];

const mockAttendance: AttendanceSubject[] = [
  { id: 'a1', courseCode: 'DBMS', courseName: 'Database Management Systems', attendedClasses: 15, totalClasses: 17, instructor: 'Dr. Rajesh Sharma', color: 'indigo' },
  { id: 'a2', courseCode: 'OS', courseName: 'Operating Systems', attendedClasses: 11, totalClasses: 16, instructor: 'Prof. Ananya Iyer', color: 'amber' },
  { id: 'a3', courseCode: 'CN', courseName: 'Computer Networks', attendedClasses: 22, totalClasses: 27, instructor: 'Dr. Vikram Verma', color: 'cyan' },
  { id: 'a4', courseCode: 'OOP', courseName: 'Object Oriented Programming', attendedClasses: 18, totalClasses: 20, instructor: 'Prof. Suresh Kulkarni', color: 'emerald' },
  { id: 'a5', courseCode: 'AOA', courseName: 'Analysis of Algorithms', attendedClasses: 13, totalClasses: 17, instructor: 'Prof. Meera Patel', color: 'slate' },
];

const mockAssignments: Assignment[] = [
  {
    id: 'asg1',
    courseCode: 'DBMS',
    courseName: 'Database Management Systems',
    title: 'Normalization & BCNF Exercise',
    description: 'Decompose relation R(A,B,C,D,E) into 3NF and BCNF. Submit functional dependency proofs.',
    dueDate: 'Today',
    dueTime: '05:00 PM',
    status: 'pending',
    priority: 'high',
    points: 50,
  },
  {
    id: 'asg2',
    courseCode: 'OS',
    courseName: 'Operating Systems',
    title: 'Process Scheduling Simulation',
    description: 'Implement Round Robin and Shortest Remaining Time First (SRTF) CPU scheduling in C++/Python.',
    dueDate: 'Tomorrow',
    dueTime: '11:59 PM',
    status: 'pending',
    priority: 'high',
    points: 100,
  },
  {
    id: 'asg3',
    courseCode: 'CN',
    courseName: 'Computer Networks',
    title: 'Wireshark Packet Analysis Report',
    description: 'Capture TCP 3-way handshake and HTTP GET request packets. Document sequence & ack numbers.',
    dueDate: 'Aug 03, 2026',
    dueTime: '06:00 PM',
    status: 'submitted',
    priority: 'medium',
    points: 75,
    submittedFileName: 'AaravPatel_CN_WiresharkReport.pdf',
    submittedFileSize: '2.4 MB',
    submittedAt: 'Jul 29, 2026 at 04:15 PM',
  },
  {
    id: 'asg4',
    courseCode: 'AOA',
    courseName: 'Analysis of Algorithms',
    title: 'Dynamic Programming Problem Set',
    description: '0/1 Knapsack and Longest Common Subsequence complexity proofs.',
    dueDate: 'Jul 25, 2026',
    dueTime: '05:00 PM',
    status: 'graded',
    priority: 'low',
    points: 50,
    grade: 48,
    feedback: 'Excellent complexity proof for 0/1 Knapsack dynamic programming table.',
    submittedFileName: 'AaravPatel_AOA_DP_Solutions.pdf',
    submittedFileSize: '1.8 MB',
    submittedAt: 'Jul 24, 2026 at 02:30 PM',
  },
];

const mockSubjectMaterials: SubjectMaterial[] = [
  // DBMS
  { id: 'm1', subjectCode: 'DBMS', subjectName: 'Database Management Systems', title: 'Module 1: Relational Model & ER Diagrams', type: 'pdf', fileSize: '4.2 MB', uploadedAt: 'Jul 15, 2026' },
  { id: 'm2', subjectCode: 'DBMS', subjectName: 'Database Management Systems', title: 'Module 2: Normalization (1NF to BCNF) Lecture Slides', type: 'ppt', fileSize: '8.1 MB', uploadedAt: 'Jul 20, 2026' },
  { id: 'm3', subjectCode: 'DBMS', subjectName: 'Database Management Systems', title: 'DBMS Midterm Previous Year Questions (2021-2025)', type: 'pyq', fileSize: '3.5 MB', uploadedAt: 'Jul 22, 2026' },
  { id: 'm4', subjectCode: 'DBMS', subjectName: 'Database Management Systems', title: 'SQL & PL/SQL Laboratory Manual', type: 'lab', fileSize: '2.9 MB', uploadedAt: 'Jul 10, 2026' },

  // OS
  { id: 'm5', subjectCode: 'OS', subjectName: 'Operating Systems', title: 'Module 1: CPU Scheduling & Process Synchronization', type: 'pdf', fileSize: '5.6 MB', uploadedAt: 'Jul 12, 2026' },
  { id: 'm6', subjectCode: 'OS', subjectName: 'Operating Systems', title: 'Module 2: Deadlocks & Banker Algorithm Slides', type: 'ppt', fileSize: '6.4 MB', uploadedAt: 'Jul 18, 2026' },
  { id: 'm7', subjectCode: 'OS', subjectName: 'Operating Systems', title: 'Linux Kernel & Shell Programming Lab Sheet', type: 'lab', fileSize: '1.9 MB', uploadedAt: 'Jul 14, 2026' },

  // CN
  { id: 'm8', subjectCode: 'CN', subjectName: 'Computer Networks', title: 'OSI Reference Model & TCP/IP Protocol Suite', type: 'pdf', fileSize: '3.8 MB', uploadedAt: 'Jul 08, 2026' },
  { id: 'm9', subjectCode: 'CN', subjectName: 'Computer Networks', title: 'Computer Networks PYQ Collection (2020-2025)', type: 'pyq', fileSize: '4.1 MB', uploadedAt: 'Jul 21, 2026' },

  // OOP
  { id: 'm10', subjectCode: 'OOP', subjectName: 'Object Oriented Programming', title: 'C++ Virtual Functions & Polymorphism Notes', type: 'pdf', fileSize: '2.7 MB', uploadedAt: 'Jul 16, 2026' },
  { id: 'm11', subjectCode: 'OOP', subjectName: 'Object Oriented Programming', title: 'OOP Lab Manual & Practice Exercises', type: 'lab', fileSize: '3.1 MB', uploadedAt: 'Jul 05, 2026' },

  // AOA
  { id: 'm12', subjectCode: 'AOA', subjectName: 'Analysis of Algorithms', title: 'Asymptotic Notations & Recurrence Relations', type: 'pdf', fileSize: '3.3 MB', uploadedAt: 'Jul 11, 2026' },
];

export const campusApi = {
  getTimetable: async (): Promise<TimetableSlot[]> => {
    return Promise.resolve(mockTimetable);
  },
  getAttendance: async (): Promise<AttendanceSubject[]> => {
    return Promise.resolve(mockAttendance);
  },
  getAssignments: async (): Promise<Assignment[]> => {
    return Promise.resolve(mockAssignments);
  },
  getSubjectMaterials: async (): Promise<SubjectMaterial[]> => {
    return Promise.resolve(mockSubjectMaterials);
  },
};
