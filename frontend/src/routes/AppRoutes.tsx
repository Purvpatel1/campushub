import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { AcademicsPage } from '@/pages/AcademicsPage';
import { AttendancePage } from '@/pages/AttendancePage';
import { AssignmentsPage } from '@/pages/AssignmentsPage';
import { ClubsPage } from '@/pages/ClubsPage';
import { CommunityPage } from '@/pages/CommunityPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { AdminPage } from '@/pages/AdminPage';
import { CareerPage } from '@/pages/CareerPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="academics" element={<AcademicsPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="assignments" element={<AssignmentsPage />} />
        <Route path="clubs" element={<ClubsPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="career" element={<CareerPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
