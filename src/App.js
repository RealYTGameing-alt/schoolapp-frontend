import Landing from './pages/Landing';
import TimetableEditor from './pages/admin/TimetableEditor';
import UserManagement from './pages/admin/UserManagement';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import { createTheme, ThemeProvider } from '@mui/material';
import MyProfile from './pages/shared/MyProfile';
import StudentCalendar from './pages/student/StudentCalendar';

// Principal
import PrincipalDashboard from './pages/principal/PrincipalDashboard';
import PrincipalTeachers from './pages/principal/PrincipalTeachers';
import PrincipalStudents from './pages/principal/PrincipalStudents';
import PrincipalAttendance from './pages/principal/PrincipalAttendance';
import PrincipalAnnouncements from './pages/principal/PrincipalAnnouncements';

// Auth
import Login from './pages/auth/Login';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import FeeManagement from './pages/admin/FeeManagement';
import Admissions from './pages/admin/Admissions';
import StaffHR from './pages/admin/StaffHR';
import Reports from './pages/admin/Reports';
import SchoolCalendar from './pages/admin/SchoolCalendar';
import Students from './pages/admin/Students';

// Teacher
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import Attendance from './pages/teacher/Attendance';
import Assignments from './pages/teacher/Assignments';
import Exams from './pages/teacher/Exams';
import LessonPlans from './pages/teacher/LessonPlans';

// Student
import StudentDashboard from './pages/student/StudentDashboard';
import StudyMaterials from './pages/student/StudyMaterials';
import MyProgress from './pages/student/MyProgress';
import StudentAssignments from './pages/student/StudentAssignments';
import Timetable from './pages/student/Timetable';

// Parent
import ParentDashboard from './pages/parent/ParentDashboard';
import ChildProgress from './pages/parent/ChildProgress';
import ParentFees from './pages/parent/ParentFees';
import ParentCalendar from './pages/parent/ParentCalendar';

// Shared
import Messaging from './pages/shared/Messaging';

const theme = createTheme({
  palette: {
    primary: { main: '#1a73e8' },
    secondary: { main: '#fbbc04' },
    background: { default: '#f0f4f9' },
  },
  typography: { fontFamily: '"Google Sans", Roboto, sans-serif' },
  shape: { borderRadius: 12 },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          {/* Admin */}
          <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/students" element={<PrivateRoute role="admin"><Students /></PrivateRoute>} />
          <Route path="/admin/staff" element={<PrivateRoute role="admin"><StaffHR /></PrivateRoute>} />
          <Route path="/admin/fees" element={<PrivateRoute role="admin"><FeeManagement /></PrivateRoute>} />
          <Route path="/admin/admissions" element={<PrivateRoute role="admin"><Admissions /></PrivateRoute>} />
          <Route path="/admin/calendar" element={<PrivateRoute role="admin"><SchoolCalendar /></PrivateRoute>} />
          <Route path="/admin/messages" element={<PrivateRoute role="admin"><Messaging /></PrivateRoute>} />
          <Route path="/admin/reports" element={<PrivateRoute role="admin"><Reports /></PrivateRoute>} />
          <Route path="/admin/timetable" element={<PrivateRoute role="admin"><TimetableEditor /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute role="admin"><UserManagement /></PrivateRoute>} />
          <Route path="/admin/profile" element={<PrivateRoute role="admin"><MyProfile /></PrivateRoute>} />

          {/* Teacher */}
          <Route path="/teacher" element={<PrivateRoute role="teacher"><TeacherDashboard /></PrivateRoute>} />
          <Route path="/teacher/attendance" element={<PrivateRoute role="teacher"><Attendance /></PrivateRoute>} />
          <Route path="/teacher/assignments" element={<PrivateRoute role="teacher"><Assignments /></PrivateRoute>} />
          <Route path="/teacher/exams" element={<PrivateRoute role="teacher"><Exams /></PrivateRoute>} />
          <Route path="/teacher/lessons" element={<PrivateRoute role="teacher"><LessonPlans /></PrivateRoute>} />
          <Route path="/teacher/messages" element={<PrivateRoute role="teacher"><Messaging /></PrivateRoute>} />
          <Route path="/teacher/profile" element={<PrivateRoute role="teacher"><MyProfile /></PrivateRoute>} />

          {/* Student */}
          <Route path="/student" element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} />
          <Route path="/student/assignments" element={<PrivateRoute role="student"><StudentAssignments /></PrivateRoute>} />
          <Route path="/student/materials" element={<PrivateRoute role="student"><StudyMaterials /></PrivateRoute>} />
          <Route path="/student/progress" element={<PrivateRoute role="student"><MyProgress /></PrivateRoute>} />
          <Route path="/student/timetable" element={<PrivateRoute role="student"><Timetable /></PrivateRoute>} />
          <Route path="/student/messages" element={<PrivateRoute role="student"><Messaging /></PrivateRoute>} />
          <Route path="/student/profile" element={<PrivateRoute role="student"><MyProfile /></PrivateRoute>} />
          <Route path="/student/calendar" element={<PrivateRoute role="student"><StudentCalendar /></PrivateRoute>} />

          {/* Parent */}
          <Route path="/parent" element={<PrivateRoute role="parent"><ParentDashboard /></PrivateRoute>} />
          <Route path="/parent/progress" element={<PrivateRoute role="parent"><ChildProgress /></PrivateRoute>} />
          <Route path="/parent/fees" element={<PrivateRoute role="parent"><ParentFees /></PrivateRoute>} />
          <Route path="/parent/messages" element={<PrivateRoute role="parent"><Messaging /></PrivateRoute>} />
          <Route path="/parent/calendar" element={<PrivateRoute role="parent"><ParentCalendar /></PrivateRoute>} />
          <Route path="/parent/profile" element={<PrivateRoute role="parent"><MyProfile /></PrivateRoute>} />

          {/* Principal */}
          <Route path="/principal" element={<PrivateRoute role="principal"><PrincipalDashboard /></PrivateRoute>} />
          <Route path="/principal/teachers" element={<PrivateRoute role="principal"><PrincipalTeachers /></PrivateRoute>} />
          <Route path="/principal/students" element={<PrivateRoute role="principal"><PrincipalStudents /></PrivateRoute>} />
          <Route path="/principal/attendance" element={<PrivateRoute role="principal"><PrincipalAttendance /></PrivateRoute>} />
          <Route path="/principal/announcements" element={<PrivateRoute role="principal"><PrincipalAnnouncements /></PrivateRoute>} />
          <Route path="/principal/messages" element={<PrivateRoute role="principal"><Messaging /></PrivateRoute>} />
          <Route path="/principal/profile" element={<PrivateRoute role="principal"><MyProfile /></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
