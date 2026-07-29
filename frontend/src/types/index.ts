export type UserRole = 'student' | 'faculty' | 'club_leader' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department: string;
  studentId?: string;
  facultyId?: string;
  semester?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  room: string;
  credits: number;
  schedule: string;
  attendancePercentage: number;
  totalClasses: number;
  attendedClasses: number;
  color: string;
}

export interface ScheduleItem {
  id: string;
  courseCode: string;
  courseName: string;
  time: string;
  startTime: string;
  endTime: string;
  room: string;
  instructor: string;
  type: 'Lecture' | 'Lab' | 'Seminar' | 'Workshop';
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Assignment {
  id: string;
  courseCode: string;
  title: string;
  dueDate: string;
  points: number;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'academic' | 'attendance' | 'club' | 'system';
  read: boolean;
}

export interface CampusEvent {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  category: 'Workshop' | 'Cultural' | 'Tech' | 'Sports';
  rsvps: number;
  userRsvp: boolean;
  image: string;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  membersCount: number;
  description: string;
  isMember: boolean;
  logo: string;
}
