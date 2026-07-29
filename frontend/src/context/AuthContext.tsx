import React, { createContext, useContext, useState } from 'react';
import type { UserProfile, UserRole } from '@/types';

interface AuthContextType {
  user: UserProfile;
  setRole: (role: UserRole) => void;
}

const mockProfiles: Record<UserRole, UserProfile> = {
  student: {
    id: 'usr-101',
    name: 'Alex Chen',
    email: 'alex.chen@campushub.edu',
    role: 'student',
    department: 'Computer Science & Engineering',
    studentId: 'CS-2024-8842',
    semester: 'Semester 6',
  },
  faculty: {
    id: 'usr-202',
    name: 'Dr. Aris Thorne',
    email: 'aris.thorne@campushub.edu',
    role: 'faculty',
    department: 'Department of Physics & CS',
    facultyId: 'FAC-7731',
  },
  club_leader: {
    id: 'usr-303',
    name: 'Maya Patel',
    email: 'maya.patel@campushub.edu',
    role: 'club_leader',
    department: 'Design & Innovation Lab',
    studentId: 'DES-2023-1109',
    semester: 'Semester 8',
  },
  admin: {
    id: 'usr-404',
    name: 'Robert Vance',
    email: 'robert.vance@campushub.edu',
    role: 'admin',
    department: 'Office of the Registrar',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(mockProfiles.student);

  const setRole = (role: UserRole) => {
    setUser(mockProfiles[role]);
  };

  return (
    <AuthContext.Provider value={{ user, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
