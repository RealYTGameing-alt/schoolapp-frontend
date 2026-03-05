import React from 'react';
import {
  Card, CardContent, Typography, Box, Grid, Chip, LinearProgress, Avatar
} from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MessageIcon from '@mui/icons-material/Message';
import EventNoteIcon from '@mui/icons-material/EventNote';

const menuItems = [
  { text: 'Dashboard', path: '/parent', icon: <DashboardIcon /> },
  { text: "Child's Progress", path: '/parent/progress', icon: <BarChartIcon /> },
  { text: 'Fee Payments', path: '/parent/fees', icon: <AttachMoneyIcon /> },
  { text: 'Messages', path: '/parent/messages', icon: <MessageIcon /> },
  { text: 'School Calendar', path: '/parent/calendar', icon: <EventNoteIcon /> },
];

const trendData = [
  { test: 'Test 1', Math: 72, Science: 78, English: 65 },
  { test: 'Test 2', Math: 78, Science: 82, English: 70 },
  { test: 'Test 3', Math: 74, Science: 79, English: 73 },
  { test: 'Test 4', Math: 85, Science: 88, English: 76 },
  { test: 'Test 5', Math: 88, Science: 92, English: 76 },
];

const radarData = [
  { subject: 'Math', score: 88 },
  { subject: 'Science', score: 92 },
  { subject: 'English', score: 76 },
  { subject: 'History', score: 83 },
  { subject: 'Geography', score: 79 },
];

const ChildProgress = () => {
  return (
    <Layout menuItems={menuItems}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: '#1a73e8', fontSize: 22 }}>AS</Avatar>
        <Box>
          <Typography variant="h5" fontWeight={700}>Arjun Sharma's Progress</Typography>
          <Typography variant="body2" color="text.secondary">Class 10A • Roll No. 15</Typography>
        </Box>
        <Chip label="🏆 Rank #4 in class" color="success" sx={{ ml: 'auto' }} />
      </Box>

      <Grid container spacing={3} mb={3}>
        {[
          { label: 'Overall Average', value: '84.2%', color: '#1a73e8', icon: '📊' },
          { label: 'Attendance', value: '94%', color: '#34a853', icon: '✅' },
          { label: 'Assignments Done', value: '18/20', color: '#fbbc04', icon: '📝' },
          { label: 'Current Grade', value: 'A', color: '#ea4335', icon: '🎯' },
        ].map((stat) => (
          <Grid item xs={6} md={3} key={stat.label}>
            <Card sx={{ borderRadius: 3, textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Typography variant="h3">{stat.icon}</Typography>
                <Typography variant="h5" fontWeight={700} color={stat.color}>{stat.value}</Typography>
                <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>📈 Score Trend</Typography>
              <ResponsiveContainer width="100%" height={230}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="test" />
                  <YAxis domain={[50, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Math" stroke="#1a73e8" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Science" stroke="#34a853" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="English" stroke="#fbbc04" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>🕸️ Subject Strengths</Typography>
              <ResponsiveContainer width="100%" height={210}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <Radar dataKey="score" stroke="#1a73e8" fill="#1a73e8" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>📚 Subject-wise Performance</Typography>
          {[
            { name: 'Mathematics', score: 88, color: '#1a73e8', teacher: 'Rajesh Kumar' },
            { name: 'Science', score: 92, color: '#34a853', teacher: 'Sunita Sharma' },
            { name: 'English', score: 76, color: '#fbbc04', teacher: 'Priya Menon' },
            { name: 'History', score: 83, color: '#ea4335', teacher: 'Vikram Nair' },
          ].map((sub) => (
            <Box key={sub.name} mb={2.5}>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Box>
                  <Typography variant="body2" fontWeight={600}>{sub.name}</Typography>
                  <Typography variant="caption" color="text.secondary">Teacher: {sub.teacher}</Typography>
                </Box>
                <Chip label={`${sub.score}%`} size="small"
                  color={sub.score >= 90 ? 'success' : sub.score >= 75 ? 'primary' : 'warning'} />
              </Box>
              <LinearProgress variant="determinate" value={sub.score}
                sx={{ height: 8, borderRadius: 4, bgcolor: `${sub.color}20`, '& .MuiLinearProgress-bar': { bgcolor: sub.color } }} />
            </Box>
          ))}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ChildProgress;