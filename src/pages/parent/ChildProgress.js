import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Card, CardContent, Chip,
  CircularProgress, Grid, LinearProgress, Avatar
} from '@mui/material';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import Layout from '../../components/layout/Layout';
import { parentMenu } from '../../components/layout/menus';
import api from '../../services/api';

const demoSubjectScores = [
  { subject: 'Mathematics', score: 88, fullMark: 100 },
  { subject: 'Science', score: 92, fullMark: 100 },
  { subject: 'English', score: 75, fullMark: 100 },
  { subject: 'History', score: 81, fullMark: 100 },
  { subject: 'Geography', score: 78, fullMark: 100 },
  { subject: 'Computer', score: 95, fullMark: 100 },
];

const demoMonthlyPerformance = [
  { month: 'Oct', score: 72, attendance: 88 },
  { month: 'Nov', score: 78, attendance: 91 },
  { month: 'Dec', score: 75, attendance: 85 },
  { month: 'Jan', score: 82, attendance: 93 },
  { month: 'Feb', score: 85, attendance: 90 },
  { month: 'Mar', score: 88, attendance: 95 },
];

const gradeLabel = (score) => {
  if (score >= 90) return { label: 'A+', color: '#34a853' };
  if (score >= 80) return { label: 'A', color: '#1a73e8' };
  if (score >= 70) return { label: 'B', color: '#fbbc04' };
  if (score >= 60) return { label: 'C', color: '#ff9800' };
  return { label: 'D', color: '#ea4335' };
};

const ChildProgress = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      try {
        const res = await api.get('/progress/student');
        setProgress(res.data);
      } catch (err) {
        setProgress({
          attendanceRate: 92, present: 46, absent: 4,
          late: 2, totalDays: 52,
          totalSubmissions: 12, gradedSubmissions: 10, avgGrade: 85,
          recentSubmissions: [], attendanceByMonth: [],
        });
      }
      setLoading(false);
    };
    fetchProgress();
  }, []);

  if (loading) {
    return (
      <Layout menuItems={parentMenu}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  const overallGrade = gradeLabel(progress?.avgGrade || 85);

  return (
    <Layout menuItems={parentMenu}>
      {/* Child header card */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mb: 3, bgcolor: '#1a73e8', color: 'white' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'white', color: '#1a73e8', width: 52, height: 52, fontWeight: 700 }}>A</Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700}>Arjun Sharma</Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>Class 10A • Roll No. 007</Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h3" fontWeight={800}>{overallGrade.label}</Typography>
            <Typography variant="caption" sx={{ opacity: 0.85 }}>Overall Grade</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Stats */}
      <Grid container spacing={2} mb={3}>
        {[
          { label: 'Attendance', value: `${progress?.attendanceRate}%`, color: '#34a853' },
          { label: 'Avg Score', value: `${progress?.avgGrade || 85}%`, color: '#1a73e8' },
          { label: 'Assignments', value: `${progress?.gradedSubmissions}/${progress?.totalSubmissions}`, color: '#fbbc04' },
          { label: 'Days Present', value: progress?.present, color: '#9c27b0' },
        ].map((s) => (
          <Grid item xs={6} md={3} key={s.label}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: `4px solid ${s.color}` }}>
              <CardContent sx={{ py: 1.5 }}>
                <Typography variant="h5" fontWeight={700} color={s.color}>{s.value}</Typography>
                <Typography variant="caption" color="text.secondary">{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Radar chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>🎯 Subject Performance</Typography>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={demoSubjectScores}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="Score" dataKey="score" stroke="#1a73e8" fill="#1a73e8" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly trend */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📈 6 Month Progress</Typography>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={demoMonthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#1a73e8" strokeWidth={2} dot={{ r: 4 }} name="Score %" />
                  <Line type="monotone" dataKey="attendance" stroke="#34a853" strokeWidth={2} dot={{ r: 4 }} name="Attendance %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Subject scores */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📚 Subject Scores</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {demoSubjectScores.map((s) => {
                  const g = gradeLabel(s.score);
                  return (
                    <Box key={s.subject}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" fontWeight={600}>{s.subject}</Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Typography variant="body2" fontWeight={700}>{s.score}%</Typography>
                          <Chip label={g.label} size="small"
                            sx={{ bgcolor: g.color + '20', color: g.color, fontWeight: 700, height: 20 }} />
                        </Box>
                      </Box>
                      <LinearProgress variant="determinate" value={s.score}
                        sx={{
                          height: 8, borderRadius: 4, bgcolor: '#f0f0f0',
                          '& .MuiLinearProgress-bar': { bgcolor: g.color, borderRadius: 4 }
                        }} />
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ChildProgress;
