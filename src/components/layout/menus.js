import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MessageIcon from '@mui/icons-material/Message';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';

export const adminMenu = [
  { text: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
  { text: 'Students', path: '/admin/students', icon: <SchoolIcon /> },
  { text: 'Staff & HR', path: '/admin/staff', icon: <PeopleIcon /> },
  { text: 'Fee Management', path: '/admin/fees', icon: <AttachMoneyIcon /> },
  { text: 'Admissions', path: '/admin/admissions', icon: <AssignmentIcon /> },
  { text: 'Calendar', path: '/admin/calendar', icon: <EventNoteIcon /> },
  { text: 'Messages', path: '/admin/messages', icon: <MessageIcon /> },
  { text: 'Reports', path: '/admin/reports', icon: <BarChartIcon /> },
  { text: 'Timetable Editor', path: '/admin/timetable', icon: <EventNoteIcon /> },
];

export const teacherMenu = [
  { text: 'Dashboard', path: '/teacher', icon: <DashboardIcon /> },
  { text: 'Attendance', path: '/teacher/attendance', icon: <CheckCircleIcon /> },
  { text: 'Assignments', path: '/teacher/assignments', icon: <AssignmentIcon /> },
  { text: 'Exams', path: '/teacher/exams', icon: <QuizIcon /> },
  { text: 'Lesson Plans', path: '/teacher/lessons', icon: <MenuBookIcon /> },
  { text: 'Messages', path: '/teacher/messages', icon: <MessageIcon /> },
  { text: 'Study Materials', path: '/teacher/materials', icon: <MenuBookIcon /> },
];

export const studentMenu = [
  { text: 'Dashboard', path: '/student', icon: <DashboardIcon /> },
  { text: 'Assignments', path: '/student/assignments', icon: <AssignmentIcon /> },
  { text: 'Study Materials', path: '/student/materials', icon: <MenuBookIcon /> },
  { text: 'My Progress', path: '/student/progress', icon: <BarChartIcon /> },
  { text: 'Timetable', path: '/student/timetable', icon: <EventNoteIcon /> },
  { text: 'Messages', path: '/student/messages', icon: <MessageIcon /> },
  { text: 'Calendar', path: '/student/calendar', icon: <EventNoteIcon /> },
];

export const parentMenu = [
  { text: 'Dashboard', path: '/parent', icon: <DashboardIcon /> },
  { text: "Child's Progress", path: '/parent/progress', icon: <BarChartIcon /> },
  { text: 'Fee Payments', path: '/parent/fees', icon: <AttachMoneyIcon /> },
  { text: 'Messages', path: '/parent/messages', icon: <MessageIcon /> },
  { text: 'School Calendar', path: '/parent/calendar', icon: <EventNoteIcon /> },
];

export const principalMenu = [
  { text: 'Dashboard', path: '/principal', icon: <DashboardIcon /> },
  { text: 'Teachers', path: '/principal/teachers', icon: <PeopleIcon /> },
  { text: 'Students', path: '/principal/students', icon: <SchoolIcon /> },
  { text: 'Attendance Reports', path: '/principal/attendance', icon: <CheckCircleIcon /> },
  { text: 'Announcements', path: '/principal/announcements', icon: <CampaignIcon /> },
  { text: 'Messages', path: '/principal/messages', icon: <MessageIcon /> },
];