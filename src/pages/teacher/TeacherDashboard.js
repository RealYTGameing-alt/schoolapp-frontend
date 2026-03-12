import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { teacherMenu } from '../../components/layout/menus';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const schedule = [
  { subject: 'Mathematics', class: '10A', room: 'Room 201', time: '8:00 AM' },
  { subject: 'Mathematics', class: '9B', room: 'Room 201', time: '10:00 AM' },
  { subject: 'Mathematics', class: '8C', room: 'Room 201', time: '12:00 PM' },
  { subject: 'Mathematics', class: '7A', room: 'Room 201', time: '2:00 PM' },
];

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard/teacher').then(res => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <Layout menuItems={teacherMenu}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>
        Good morning, {user?.first_name || 'Teacher'}! 👋
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        You have {schedule.length} classes today.
      </Typography>

      {stats && (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Card sx={{ borderRadius: 3, flex: 1, minWidth: 150, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #1a73e8' }}>
            <CardContent sx={{ py: 1.5 }}>
              <Typography variant="h5" fontWeight={700} color="#1a73e8">{stats.totalAssignments}</Typography>
              <Typography variant="caption" color="text.secondary">Assignments Created</Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} mb={2}>📅 Today's Schedule</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {schedule.map((s, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '3px solid #1a73e8' }}>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>{s.subject}</Typography>
                    <Typography variant="caption" color="text.secondary">{s.class} • {s.room}</Typography>
                  </Box>
                  <Chip label={s.time} size="small" sx={{ bgcolor: '#e8f0fe', color: '#1a73e8' }} />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>⚡ Quick Actions</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button fullWidth variant="contained" onClick={() => navigate('/teacher/attendance')} sx={{ borderRadius: 2 }}>
                  ✅ Mark Attendance
                </Button>
                <Button fullWidth variant="outlined" onClick={() => navigate('/teacher/assignments')} sx={{ borderRadius: 2 }}>
                  📝 Create Assignment
                </Button>
                <Button fullWidth variant="outlined" onClick={() => navigate('/teacher/lessons')} sx={{ borderRadius: 2 }}>
                  📖 Add Lesson Plan
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📌 Pending Tasks</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['Grade 10A assignments (12 pending)', 'Submit lesson plan for Week 11', 'Exam results entry due tomorrow'].map((task, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ea4335', flexShrink: 0 }} />
                    <Typography variant="body2">{task}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
};

export default TeacherDashboard;