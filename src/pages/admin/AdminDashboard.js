import MessageIcon from '@mui/icons-material/Message';
import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar, LinearProgress } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';

const menuItems = [
  { text: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
  { text: 'Students', path: '/admin/students', icon: <SchoolIcon /> },
  { text: 'Staff & HR', path: '/admin/staff', icon: <PeopleIcon /> },
  { text: 'Fee Management', path: '/admin/fees', icon: <AttachMoneyIcon /> },
  { text: 'Admissions', path: '/admin/admissions', icon: <AssignmentIcon /> },
  { text: 'Calendar', path: '/admin/calendar', icon: <CalendarMonthIcon /> },
  { text: 'Messages', path: '/admin/messages', icon: <MessageIcon /> },
  { text: 'Reports', path: '/admin/reports', icon: <BarChartIcon /> },
];

const StatCard = ({ title, value, icon, color, subtitle, progress }) => (
  <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', height: '100%' }}>
    <CardContent sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>{title}</Typography>
          <Typography variant="h4" fontWeight={700} mt={1} color="text.primary">{value}</Typography>
          {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
        </Box>
        <Avatar sx={{ bgcolor: `${color}20`, width: 52, height: 52 }}>
          {React.cloneElement(icon, { sx: { color, fontSize: 28 } })}
        </Avatar>
      </Box>
      {progress !== undefined && (
        <Box mt={2}>
          <LinearProgress variant="determinate" value={progress}
            sx={{ height: 6, borderRadius: 3, bgcolor: `${color}20`, '& .MuiLinearProgress-bar': { bgcolor: color } }} />
          <Typography variant="caption" color="text.secondary" mt={0.5} display="block">{progress}% of target</Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  return (
    <Layout menuItems={menuItems} title="Admin Dashboard">
      <Typography variant="h5" fontWeight={700} mb={1}>Admin Dashboard</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Welcome back! Here's what's happening at your school today.
      </Typography>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Students" value="1,247" icon={<SchoolIcon />}
            color="#1a73e8" subtitle="+23 this month" progress={78} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Staff" value="89" icon={<PeopleIcon />}
            color="#34a853" subtitle="12 departments" progress={92} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Fee Collection" value="₹8.4L" icon={<AttachMoneyIcon />}
            color="#fbbc04" subtitle="This month" progress={65} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Avg Attendance" value="94.2%" icon={<AssignmentIcon />}
            color="#ea4335" subtitle="This week" progress={94} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>📢 Recent Announcements</Typography>
              {['Annual Sports Day - March 15th', 'Parent-Teacher Meeting - March 20th', 'Mid-term Exams - April 1st', 'School Picnic - April 10th'].map((item, i) => (
                <Box key={i} sx={{ p: 1.5, mb: 1, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '4px solid #1a73e8' }}>
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>📊 Class Performance Overview</Typography>
              {[
                { class: 'Class 10A', score: 87, color: '#1a73e8' },
                { class: 'Class 9B', score: 79, color: '#34a853' },
                { class: 'Class 8C', score: 92, color: '#fbbc04' },
                { class: 'Class 7A', score: 74, color: '#ea4335' },
              ].map((item) => (
                <Box key={item.class} mb={2}>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2" fontWeight={500}>{item.class}</Typography>
                    <Typography variant="body2" fontWeight={700} color={item.color}>{item.score}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={item.score}
                    sx={{ height: 8, borderRadius: 4, bgcolor: `${item.color}20`, '& .MuiLinearProgress-bar': { bgcolor: item.color } }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AdminDashboard;