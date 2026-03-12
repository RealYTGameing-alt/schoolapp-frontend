import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, Grid, CircularProgress, Chip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Layout from '../../components/layout/Layout';
import { principalMenu } from '../../components/layout/menus';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const attendanceData = [
  { day: 'Mon', rate: 94 }, { day: 'Tue', rate: 91 },
  { day: 'Wed', rate: 96 }, { day: 'Thu', rate: 89 },
  { day: 'Fri', rate: 93 },
];

const recentActivities = [
  { text: 'Rajesh Kumar submitted Week 11 lesson plans', time: '1 hour ago', color: '#1a73e8' },
  { text: 'Class 10A attendance marked — 94% present', time: '2 hours ago', color: '#34a853' },
  { text: '3 new admission applications received', time: '3 hours ago', color: '#fbbc04' },
  { text: 'Mid-term exam schedule published', time: 'Yesterday', color: '#ea4335' },
];

const PrincipalDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/admin').then(res => {
      setStats(res.data);
      setLoading(false);
    }).catch(() => {
      setStats({ totalStudents: 1240, totalStaff: 86, attendanceRate: '94%', feeCollected: '₹12.4L' });
      setLoading(false);
    });
  }, []);

  const statCards = [
    { label: 'Total Students', value: stats?.totalStudents ?? '...', icon: <SchoolIcon />, color: '#1a73e8', bg: '#e8f0fe' },
    { label: 'Total Teachers', value: stats?.totalStaff ?? '...', icon: <PeopleIcon />, color: '#34a853', bg: '#e6f4ea' },
    { label: "Today's Attendance", value: stats?.attendanceRate ?? '...', icon: <TrendingUpIcon />, color: '#fbbc04', bg: '#fef9e7' },
    { label: 'Fee Collected', value: stats?.feeCollected ?? '...', icon: <AssignmentIcon />, color: '#ea4335', bg: '#fce8e6' },
  ];

  return (
    <Layout menuItems={principalMenu}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>
        Good morning, {user?.first_name || 'Principal'}! 👋
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Here's your school overview for today.
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
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

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📊 This Week's Attendance</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Bar dataKey="rate" fill="#1a73e8" radius={[4,4,0,0]} name="Attendance %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📋 Recent Activity</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentActivities.map((a, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1.5 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: a.color, flexShrink: 0, mt: 0.7 }} />
                    <Box>
                      <Typography variant="body2">{a.text}</Typography>
                      <Typography variant="caption" color="text.secondary">{a.time}</Typography>
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

export default PrincipalDashboard;