export type UserRole = 'student';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department: string;
  studentId: string;
  rollNumber: string;
  division: string;
  semester: string;
  cgpa: number;
  phone: string;
  bio: string;
  targetAttendance: number;
}

export interface TimetableSlot {
  id: string;
  courseCode: string;
  courseName: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  room: string;
  instructor: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
  color: string;
}

export interface AttendanceSubject {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  attendedClasses: number;
  totalClasses: number;
  color: string;
  lastUpdated?: string;
}

export interface Assignment {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  dueDate: string;
  dueTime: string;
  points: number;
  status: 'pending' | 'submitted' | 'graded';
  priority: 'high' | 'medium' | 'low';
  grade?: number;
  feedback?: string;
  description: string;
  submittedFileName?: string;
  submittedFileSize?: string;
  submittedAt?: string;
}

export interface SubjectMaterial {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  type: 'pdf' | 'ppt' | 'pyq' | 'lab' | 'link';
  fileSize?: string;
  url?: string;
  uploadedAt: string;
}

export interface StudentSettings {
  targetAttendance: number;
  theme: 'dark' | 'light' | 'system';
  emailAlerts: boolean;
  classReminders: boolean;
  assignmentAlerts: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'academic' | 'attendance' | 'system';
  read: boolean;
}
