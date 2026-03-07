import React from 'react';
import { Typography, Box, Card, CardContent, Chip, LinearProgress } from '@mui/material';
import Layout from '../../components/layout/Layout';
import { studentMenu } from '../../components/layout/menus';
import { useAuth } from '../../context/AuthContext';

const upcomingAssignments = [
  { subject: 'Mathematics', title: 'Algebra Chapter 5', due: '2026-03-10', urgent: true },
  { subject: 'English', title: 'Essay: Climate Change', due: '2026-03-08', urgent: true },
  { subject: 'Physics', title: 'Newton\'s Laws Lab Report', due: '2026-03-15', urgent: false },
];

const subjects = [
  { name: 'Mathematics', score: 88, color: '#1a73e8' },
  { name: 'Science', score: 92, color: '#34a853' },
  { name: 'English', score: 75, color: '#fbbc04' },
  { name: 'History', score: 81, color: '#ea4335' },
];

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <Layout menuItems={studentMenu}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>
        Good morning, {user?.first_name || 'Student'}! 👋
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Here's your academic overview for today.</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} mb={2}>📝 Upcoming Assignments</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {upcomingAssignments.map((a, i) => (
                <Box key={i} sx={{ p: 1.5, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: `3px solid ${a.urgent ? '#ea4335' : '#34a853'}` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontWeight={600}>{a.title}</Typography>
                    {a.urgent && <Chip label="Due Soon" size="small" color="error" />}
                  </Box>
                  <Typography variant="caption" color="text.secondary">{a.subject} • Due: {new Date(a.due).toLocaleDateString('en-IN')}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} mb={2}>📊 My Performance</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {subjects.map((s, i) => (
                <Box key={i}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{s.name}</Typography>
                    <Typography variant="body2" fontWeight={600}>{s.score}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={s.score}
                    sx={{ height: 8, borderRadius: 4, bgcolor: '#f0f0f0', '& .MuiLinearProgress-bar': { bgcolor: s.color, borderRadius: 4 } }} />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default StudentDashboard;