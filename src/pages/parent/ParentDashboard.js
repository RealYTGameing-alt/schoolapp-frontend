import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, Chip, LinearProgress, Grid } from '@mui/material';
import Layout from '../../components/layout/Layout';
import { parentMenu } from '../../components/layout/menus';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const recentGrades = [
  { subject: 'Mathematics', grade: '44/50', percent: 88 },
  { subject: 'Science', grade: '23/25', percent: 92 },
  { subject: 'English', grade: '22/30', percent: 73 },
];

const upcomingEvents = [
  { title: 'Parent-Teacher Meeting', date: 'March 20', type: 'meeting' },
  { title: 'Mid-term Exams', date: 'April 1-8', type: 'exam' },
  { title: 'Annual Sports Day', date: 'March 15', type: 'event' },
];

const ParentDashboard = () => {
  const { user } = useAuth();
  const [childStats, setChildStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard/student').then(res => setChildStats(res.data)).catch(() => {});
  }, []);

  return (
    <Layout menuItems={parentMenu}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>
        Welcome, {user?.first_name || 'Parent'}! 👋
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Here's an overview of your child's progress.
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mb: 3, bgcolor: '#1a73e8', color: 'white' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={700}>Arjun Sharma</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>Class 10A • Roll No. 007</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h4" fontWeight={700}>
              {childStats ? childStats.attendanceRate + '%' : '92%'}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>Attendance</Typography>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📊 Recent Grades</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentGrades.map((g, i) => (
                  <Box key={i}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">{g.subject}</Typography>
                      <Chip label={g.grade} size="small" color={g.percent >= 80 ? 'success' : 'warning'} />
                    </Box>
                    <LinearProgress variant="determinate" value={g.percent}
                      sx={{ height: 6, borderRadius: 3, bgcolor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': { bgcolor: g.percent >= 80 ? '#34a853' : '#fbbc04', borderRadius: 3 } }} />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📅 Upcoming Events</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {upcomingEvents.map((e, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight={600}>{e.title}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">{e.date}</Typography>
                      <Chip label={e.type} size="small"
                        color={e.type === 'exam' ? 'error' : e.type === 'meeting' ? 'warning' : 'success'} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ParentDashboard;
