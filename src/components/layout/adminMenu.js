import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MessageIcon from '@mui/icons-material/Message';
import BarChartIcon from '@mui/icons-material/BarChart';

const adminMenuItems = [
  { text: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
  { text: 'Students', path: '/admin/students', icon: <SchoolIcon /> },
  { text: 'Staff & HR', path: '/admin/staff', icon: <PeopleIcon /> },
  { text: 'Fee Management', path: '/admin/fees', icon: <AttachMoneyIcon /> },
  { text: 'Admissions', path: '/admin/admissions', icon: <AssignmentIcon /> },
  { text: 'Calendar', path: '/admin/calendar', icon: <CalendarMonthIcon /> },
  { text: 'Messages', path: '/admin/messages', icon: <MessageIcon /> },
  { text: 'Reports', path: '/admin/reports', icon: <BarChartIcon /> },
];

export default adminMenuItems;