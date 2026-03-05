import MessageIcon from '@mui/icons-material/Message';
import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip, LinearProgress } from '@mui/material';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { text: 'Dashboard', path: '/student', icon: <DashboardIcon /> },
  { text: 'Assignments', path: '/student/assignments', icon: <AssignmentIcon /> },
  { text: 'Study Materials', path: '/student/materials', icon: <MenuBookIcon /> },
  { text: 'My Progress', path: '/student/progress', icon: <BarChartIcon /> },
  { text: 'Timetable', path: '/student/timetable', icon: <EventNoteIcon /> },
  { text: 'Messages', path: '/student/messages', icon: <MessageIcon /> },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const subjects = [
    { name: 'Mathematics', score: 88, color: '#1a73e8' },
    { name: 'Science', score: 92, color: '#34a853' },
    { name: 'English', score: 76, color: '#fbbc04' },
    { name: 'History', score: 83, color: '#ea4335' },
  ];

  return (
    <Layout menuItems={menuItems} title="Student Dashboard">
      <Typography variant="h5" fontWeight={700} mb={1}>Hello, {user?.first_name}! 📚</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Here's your academic overview.</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', bgcolor: '#1a73e8', color: 'white' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h2" fontWeight={700}>94%</Typography>
              <Typography variant="body1" mt={1}>Attendance Rate</Typography>
              <Chip label="✅ Good Standing" sx={{ mt: 1, bgcolor: 'white', color: '#1a73e8', fontWeight: 600 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>📊 Subject Performance</Typography>
              {subjects.map((s) => (
                <Box key={s.name} mb={2}>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2" fontWeight={500}>{s.name}</Typography>
                    <Typography variant="body2" fontWeight={700} color={s.color}>{s.score}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={s.score}
                    sx={{ height: 8, borderRadius: 4, bgcolor: `${s.color}20`, '& .MuiLinearProgress-bar': { bgcolor: s.color } }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>📝 Pending Assignments</Typography>
              {[
                { subject: 'Mathematics', title: 'Chapter 5 Problems', due: 'Tomorrow', urgent: true },
                { subject: 'Science', title: 'Lab Report', due: 'March 10', urgent: false },
                { subject: 'English', title: 'Essay Draft', due: 'March 12', urgent: false },
              ].map((a, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, mb: 1, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>{a.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{a.subject}</Typography>
                  </Box>
                  <Chip label={`Due: ${a.due}`} size="small" color={a.urgent ? 'error' : 'default'} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default StudentDashboard;