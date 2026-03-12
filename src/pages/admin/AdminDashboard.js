import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';
import api from '../../services/api';

const recentActivities = [
  { text: '12 new admission applications received', time: '2 hours ago', color: '#1a73e8' },
  { text: 'Fee payment received from Class 10A', time: '3 hours ago', color: '#34a853' },
  { text: 'Staff meeting scheduled for Friday 3PM', time: '5 hours ago', color: '#fbbc04' },
  { text: 'Exam timetable published for Grade 9-10', time: 'Yesterday', color: '#ea4335' },
  { text: 'Annual Sports Day confirmed for March 15', time: 'Yesterday', color: '#1a73e8' },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/admin');
        setStats(res.data);
      } catch (err) {
        setStats({
          totalStudents: '—',
          totalStaff: '—',
          attendanceRate: '—',
          feeCollected: '₹0',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Students', value: stats?.totalStudents ?? '...', icon: <SchoolIcon />, color: '#1a73e8', bg: '#e8f0fe' },
    { label: 'Total Staff', value: stats?.totalStaff ?? '...', icon: <PeopleIcon />, color: '#34a853', bg: '#e6f4ea' },
    { label: 'Fee Collected', value: stats?.feeCollected ?? '...', icon: <AttachMoneyIcon />, color: '#fbbc04', bg: '#fef9e7' },
    { label: "Today's Attendance", value: stats?.attendanceRate ?? '...', icon: <TrendingUpIcon />, color: '#ea4335', bg: '#fce8e6' },
  ];

  return (
    <Layout menuItems={adminMenu}>
      <Typography variant="h5" fontWeight={700} mb={1}>👋 Welcome, Admin!</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Here's what's happening at your school today.</Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} mb={3}>
          {statCards.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>{stat.value}</Typography>
                    <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>📋 Recent Activity</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recentActivities.map((activity, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: activity.color, flexShrink: 0 }} />
                <Typography variant="body2" flexGrow={1}>{activity.text}</Typography>
                <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default AdminDashboard;