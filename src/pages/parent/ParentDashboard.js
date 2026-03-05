import MessageIcon from '@mui/icons-material/Message';
import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar, Chip, LinearProgress } from '@mui/material';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { text: 'Dashboard', path: '/parent', icon: <DashboardIcon /> },
  { text: "Child's Progress", path: '/parent/progress', icon: <BarChartIcon /> },
  { text: 'Fee Payments', path: '/parent/fees', icon: <AttachMoneyIcon /> },
  { text: 'Messages', path: '/parent/messages', icon: <MessageIcon /> },
  { text: 'School Calendar', path: '/parent/calendar', icon: <EventNoteIcon /> },
];

const ParentDashboard = () => {
  const { user } = useAuth();
  return (
    <Layout menuItems={menuItems} title="Parent Dashboard">
      <Typography variant="h5" fontWeight={700} mb={1}>Welcome, {user?.first_name}! 👨‍👩‍👦</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Your child's school overview.</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Avatar sx={{ width: 70, height: 70, mx: 'auto', mb: 2, bgcolor: '#1a73e8', fontSize: 28 }}>A</Avatar>
              <Typography variant="h6" fontWeight={700}>Arjun Sharma</Typography>
              <Typography variant="body2" color="text.secondary">Class 10A • Roll No. 15</Typography>
              <Chip label="🏆 Top 10% in class" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>📈 Academic Performance</Typography>
              {[
                { name: 'Mathematics', score: 88, color: '#1a73e8' },
                { name: 'Science', score: 92, color: '#34a853' },
                { name: 'English', score: 76, color: '#fbbc04' },
              ].map((s) => (
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
              <Typography variant="h6" fontWeight={600} mb={2}>💰 Fee Status</Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {[
                  { label: 'Tuition Fee', amount: '₹12,000', status: 'Paid', color: 'success' },
                  { label: 'Transport Fee', amount: '₹3,000', status: 'Paid', color: 'success' },
                  { label: 'Activity Fee', amount: '₹1,500', status: 'Due', color: 'error' },
                ].map((fee, i) => (
                  <Box key={i} sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 2, minWidth: 160 }}>
                    <Typography variant="body2" color="text.secondary">{fee.label}</Typography>
                    <Typography variant="h6" fontWeight={700}>{fee.amount}</Typography>
                    <Chip label={fee.status} color={fee.color} size="small" />
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