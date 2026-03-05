import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MessageIcon from '@mui/icons-material/Message';

const teacherMenuItems = [
  { text: 'Dashboard', path: '/teacher', icon: <DashboardIcon /> },
  { text: 'Attendance', path: '/teacher/attendance', icon: <CheckCircleIcon /> },
  { text: 'Assignments', path: '/teacher/assignments', icon: <AssignmentIcon /> },
  { text: 'Exams', path: '/teacher/exams', icon: <QuizIcon /> },
  { text: 'Lesson Plans', path: '/teacher/lessons', icon: <MenuBookIcon /> },
  { text: 'Messages', path: '/teacher/messages', icon: <MessageIcon /> },
];

export default teacherMenuItems;