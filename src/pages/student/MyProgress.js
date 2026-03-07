import React from 'react';
import { Typography, Box, Card, CardContent, Grid, Chip, LinearProgress } from '@mui/material';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Layout from '../../components/layout/Layout';
import { studentMenu } from '../../components/layout/menus';

const subjectScores = [
  { subject: 'Math', score: 88 }, { subject: 'Science', score: 92 },
  { subject: 'English', score: 75 }, { subject: 'History', score: 81 },
  { subject: 'Geography', score: 79 },
];

const progressOverTime = [
  { month: 'Oct', score: 72 }, { month: 'Nov', score: 75 },
  { month: 'Dec', score: 70 }, { month: 'Jan', score: 80 },
  { month: 'Feb', score: 85 }, { month: 'Mar', score: 88 },
];

const recentGrades = [
  { assignment: 'Algebra Test', subject: 'Mathematics', grade: '44/50', percent: 88 },
  { assignment: 'Science Lab Report', subject: 'Science', grade: '23/25', percent: 92 },
  { assignment: 'Essay: Environment', subject: 'English', grade: '22/30', percent: 73 },
  { assignment: 'History Quiz', subject: 'History', grade: '16/20', percent: 80 },
];

const MyProgress = () => {
  return (
    <Layout menuItems={studentMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>📊 My Progress</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>🎯 Subject Performance</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={subjectScores}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar dataKey="score" stroke="#1a73e8" fill="#1a73e8" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📈 Score Trend</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={progressOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#34a853" strokeWidth={2} dot={{ fill: '#34a853' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📝 Recent Grades</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentGrades.map((g, i) => (
                  <Box key={i}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{g.assignment}</Typography>
                        <Typography variant="caption" color="text.secondary">{g.subject}</Typography>
                      </Box>
                      <Chip label={g.grade} size="small" color={g.percent >= 80 ? 'success' : g.percent >= 60 ? 'warning' : 'error'} />
                    </Box>
                    <LinearProgress variant="determinate" value={g.percent}
                      sx={{ height: 6, borderRadius: 3, bgcolor: '#f0f0f0', '& .MuiLinearProgress-bar': { bgcolor: g.percent >= 80 ? '#34a853' : g.percent >= 60 ? '#fbbc04' : '#ea4335', borderRadius: 3 } }} />
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

export default MyProgress;