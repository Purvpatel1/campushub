import React, { createContext, useContext, useState } from 'react';
import type { UserProfile } from '@/types';

interface AuthContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  logout: () => void;
}

const defaultUser: UserProfile = {
  id: 'u-1',
  name: 'Aarav Patel',
  email: 'aarav.patel@campushub.edu',
  role: 'student',
  department: 'Computer Science & Engineering',
  semester: 'Semester 6',
  studentId: '2023CSB042',
  rollNumber: '42',
  division: 'A',
  avatarUrl: '',
  cgpa: 8.68,
  targetAttendance: 75,
  phone: '+91 98765 43210',
  bio: 'Computer Science undergraduate specializing in Database Systems and Algorithms.',
};

const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  updateUser: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const logout = () => {
    setUser(defaultUser);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
