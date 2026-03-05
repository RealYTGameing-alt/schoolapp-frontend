import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { text: 'Dashboard', path: '/teacher', icon: <DashboardIcon /> },
  { text: 'Attendance', path: '/teacher/attendance', icon: <CheckCircleIcon /> },
  { text: 'Assignments', path: '/teacher/assignments', icon: <AssignmentIcon /> },
  { text: 'Exams', path: '/teacher/exams', icon: <MenuBookIcon /> },
  { text: 'Lesson Plans', path: '/teacher/lessons', icon: <MenuBookIcon /> },
  { text: 'Messages', path: '/teacher/messages', icon: <EventNoteIcon /> },
];

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const todayClasses = [
    { time: '8:00 AM', subject: 'Mathematics', class: '10A', room: 'Room 201' },
    { time: '10:00 AM', subject: 'Mathematics', class: '9B', room: 'Room 201' },
    { time: '12:00 PM', subject: 'Mathematics', class: '8C', room: 'Room 201' },
    { time: '2:00 PM', subject: 'Mathematics', class: '7A', room: 'Room 201' },
  ];

  return (
    <Layout menuItems={menuItems} title="Teacher Dashboard">
      <Typography variant="h5" fontWeight={700} mb={1}>
        Good morning, {user?.first_name}! 👋
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        You have {todayClasses.length} classes today.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>📅 Today's Schedule</Typography>
              {todayClasses.map((cls, i) => (
                <Box key={i} sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  p: 2, mb: 1.5, bgcolor: '#f8f9fa', borderRadius: 2,
                  borderLeft: '4px solid #1a73e8'
                }}>
                  <Box>
                    <Typography variant="body1" fontWeight={600}>{cls.subject}</Typography>
                    <Typography variant="caption" color="text.secondary">{cls.class} • {cls.room}</Typography>
                  </Box>
                  <Chip label={cls.time} size="small" color="primary" variant="outlined" />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', mb: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>⚡ Quick Actions</Typography>
              <Button fullWidth variant="contained" sx={{ mb: 1.5, borderRadius: 2 }}
                onClick={() => navigate('/teacher/attendance')}>
                📋 Mark Attendance
              </Button>
              <Button fullWidth variant="outlined" sx={{ mb: 1.5, borderRadius: 2 }}
                onClick={() => navigate('/teacher/assignments')}>
                📝 Create Assignment
              </Button>
              <Button fullWidth variant="outlined" sx={{ borderRadius: 2 }}>
                📖 Add Lesson Plan
              </Button>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>📬 Pending Tasks</Typography>
              {['Grade 10A assignments (12 pending)', 'Submit lesson plan for Week 11', 'Exam results entry due tomorrow'].map((task, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ea4335', mr: 1.5, flexShrink: 0 }} />
                  <Typography variant="body2">{task}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default TeacherDashboard;