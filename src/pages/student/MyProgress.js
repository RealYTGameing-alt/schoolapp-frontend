import MessageIcon from '@mui/icons-material/Message';
import React from 'react';
import {
  Card, CardContent, Typography, Box, Grid, Chip, LinearProgress
} from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventNoteIcon from '@mui/icons-material/EventNote';

const menuItems = [
  { text: 'Dashboard', path: '/student', icon: <DashboardIcon /> },
  { text: 'Assignments', path: '/student/assignments', icon: <AssignmentIcon /> },
  { text: 'Study Materials', path: '/student/materials', icon: <MenuBookIcon /> },
  { text: 'My Progress', path: '/student/progress', icon: <BarChartIcon /> },
  { text: 'Timetable', path: '/student/timetable', icon: <EventNoteIcon /> },
  { text: 'Messages', path: '/student/messages', icon: <MessageIcon /> },
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

const reportCards = [
  { term: 'Term 1', math: 74, science: 78, english: 65, history: 70, total: 287, grade: 'B', rank: 12 },
  { term: 'Term 2', math: 82, science: 86, english: 72, history: 77, total: 317, grade: 'A', rank: 7 },
  { term: 'Mid-Term', math: 88, science: 92, english: 76, history: 83, total: 339, grade: 'A+', rank: 4 },
];

const MyProgress = () => {
  return (
    <Layout menuItems={menuItems}>
      <Typography variant="h5" fontWeight={700} mb={1}>📈 My Progress</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Track your academic performance over time</Typography>

      <Grid container spacing={3} mb={3}>
        {[
          { label: 'Overall Average', value: '84.2%', color: '#1a73e8', icon: '🏆' },
          { label: 'Class Rank', value: '#4', color: '#34a853', icon: '🥇' },
          { label: 'Attendance', value: '94%', color: '#fbbc04', icon: '✅' },
          { label: 'Assignments Done', value: '18/20', color: '#ea4335', icon: '📝' },
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
              <Typography variant="h6" fontWeight={600} mb={2}>📊 Score Trend Over Tests</Typography>
              <ResponsiveContainer width="100%" height={250}>
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
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <Radar dataKey="score" stroke="#1a73e8" fill="#1a73e8" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>📋 Report Cards</Typography>
          {reportCards.map((card) => (
            <Box key={card.term} sx={{ p: 2, mb: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                <Typography variant="body1" fontWeight={700}>{card.term}</Typography>
                <Box display="flex" gap={1}>
                  <Chip label={`Grade: ${card.grade}`} size="small" color={card.grade === 'A+' ? 'success' : card.grade === 'A' ? 'primary' : 'default'} />
                  <Chip label={`Rank: ${card.rank}`} size="small" color="secondary" />
                  <Chip label={`Total: ${card.total}/400`} size="small" />
                </Box>
              </Box>
              <Grid container spacing={1}>
                {[
                  { name: 'Math', score: card.math },
                  { name: 'Science', score: card.science },
                  { name: 'English', score: card.english },
                  { name: 'History', score: card.history },
                ].map((sub) => (
                  <Grid item xs={6} key={sub.name}>
                    <Box display="flex" justifyContent="space-between" mb={0.3}>
                      <Typography variant="caption">{sub.name}</Typography>
                      <Typography variant="caption" fontWeight={700}>{sub.score}/100</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={sub.score}
                      sx={{ height: 5, borderRadius: 3, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: '#1a73e8' } }} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default MyProgress;