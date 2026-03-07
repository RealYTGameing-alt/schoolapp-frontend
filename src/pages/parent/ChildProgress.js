import React from 'react';
import { Typography, Box, Card, CardContent, Grid, Chip, LinearProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Layout from '../../components/layout/Layout';
import { parentMenu } from '../../components/layout/menus';

const progressData = [
  { month: 'Oct', score: 72 }, { month: 'Nov', score: 75 },
  { month: 'Dec', score: 70 }, { month: 'Jan', score: 80 },
  { month: 'Feb', score: 85 }, { month: 'Mar', score: 88 },
];

const subjects = [
  { name: 'Mathematics', score: 88, teacher: 'Rajesh Kumar' },
  { name: 'Science', score: 92, teacher: 'Sunita Sharma' },
  { name: 'English', score: 75, teacher: 'Priya Menon' },
  { name: 'History', score: 81, teacher: 'Amit Singh' },
  { name: 'Geography', score: 79, teacher: 'Kavita Rao' },
];

const ChildProgress = () => {
  return (
    <Layout menuItems={parentMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>📊 Arjun's Progress</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📈 Score Trend</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#1a73e8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📚 Subject-wise Performance</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {subjects.map((s, i) => (
                  <Box key={i}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{s.name}</Typography>
                        <Typography variant="caption" color="text.secondary">Teacher: {s.teacher}</Typography>
                      </Box>
                      <Chip label={`${s.score}%`} size="small" color={s.score >= 80 ? 'success' : 'warning'} />
                    </Box>
                    <LinearProgress variant="determinate" value={s.score}
                      sx={{ height: 6, borderRadius: 3, bgcolor: '#f0f0f0', '& .MuiLinearProgress-bar': { bgcolor: s.score >= 80 ? '#34a853' : '#fbbc04', borderRadius: 3 } }} />
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

export default ChildProgress;