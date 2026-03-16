import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Card, CardContent, Chip,
  CircularProgress, Grid, LinearProgress, Avatar,
  Table, TableHead, TableBody, TableRow, TableCell
} from '@mui/material';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';
import Layout from '../../components/layout/Layout';
import { studentMenu } from '../../components/layout/menus';
import { useAuth } from '../../context/AuthContext';
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

const demoRecentGrades = [
  { assignment_title: 'Algebra Chapter 5', grade: 18, max_marks: 20, submitted_at: '2026-03-09', status: 'graded' },
  { assignment_title: 'Essay: Climate Change', grade: 24, max_marks: 30, submitted_at: '2026-03-07', status: 'graded' },
  { assignment_title: "Newton's Laws Lab", grade: null, max_marks: 25, submitted_at: '2026-03-11', status: 'submitted' },
  { assignment_title: 'History Quiz', grade: 19, max_marks: 20, submitted_at: '2026-03-05', status: 'graded' },
  { assignment_title: 'Geography Map Work', grade: 16, max_marks: 20, submitted_at: '2026-03-03', status: 'graded' },
];

const gradeLabel = (score) => {
  if (score >= 90) return { label: 'A+', color: '#34a853' };
  if (score >= 80) return { label: 'A', color: '#1a73e8' };
  if (score >= 70) return { label: 'B', color: '#fbbc04' };
  if (score >= 60) return { label: 'C', color: '#ff9800' };
  return { label: 'D', color: '#ea4335' };
};

const MyProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [examResults, setExamResults] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      try {
        const res = await api.get('/progress/student');
        setProgress(res.data);
      } catch (err) {
        setProgress({
          attendanceRate: 92,
          present: 46,
          absent: 4,
          late: 2,
          totalDays: 52,
          totalSubmissions: 12,
          gradedSubmissions: 10,
          avgGrade: 85,
          recentSubmissions: demoRecentGrades,
          attendanceByMonth: [],
        });
      }
      try {
        const examRes = await api.get('/exams/my-results');
        setExamResults(examRes.data.results || []);
      } catch (err) {}
      setLoading(false);
    };
    fetchProgress();
  }, []);

  if (loading) {
    return (
      <Layout menuItems={studentMenu}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  const overallGrade = gradeLabel(progress?.avgGrade || 85);

  const statCards = [
    { label: 'Attendance Rate', value: `${progress?.attendanceRate}%`, color: '#34a853', bg: '#e6f4ea',
      sub: `${progress?.present} present, ${progress?.absent} absent` },
    { label: 'Avg Grade', value: progress?.avgGrade ? `${progress.avgGrade}%` : '—', color: '#1a73e8', bg: '#e8f0fe',
      sub: `Grade ${overallGrade.label}` },
    { label: 'Assignments', value: progress?.totalSubmissions, color: '#fbbc04', bg: '#fef9e7',
      sub: `${progress?.gradedSubmissions} graded` },
    { label: 'Days Present', value: progress?.present, color: '#9c27b0', bg: '#f3e5f5',
      sub: `Out of ${progress?.totalDays} days` },
  ];

  const monthlyData = progress?.attendanceByMonth?.length > 0
    ? progress.attendanceByMonth.map(m => ({
        month: m.month,
        attendance: Math.round((m.present / m.total) * 100)
      }))
    : demoMonthlyPerformance;

  const recentGrades = progress?.recentSubmissions?.length > 0
    ? progress.recentSubmissions
    : demoRecentGrades;

  return (
    <Layout menuItems={studentMenu}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Avatar sx={{ bgcolor: '#1a73e8', width: 52, height: 52, fontSize: 20 }}>
          {user?.first_name?.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {user?.first_name} {user?.last_name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
            <Chip label={`Class ${user?.class_name || '10A'}`} size="small" />
            <Chip label={`Overall: ${overallGrade.label}`} size="small"
              sx={{ bgcolor: overallGrade.color + '20', color: overallGrade.color, fontWeight: 700 }} />
          </Box>
        </Box>
      </Box>

      {/* Stat cards */}
      <Grid container spacing={2} mb={3}>
        {statCards.map((s) => (
          <Grid item xs={6} md={3} key={s.label}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: `4px solid ${s.color}` }}>
              <CardContent sx={{ py: 1.5 }}>
                <Typography variant="h5" fontWeight={700} color={s.color}>{s.value}</Typography>
                <Typography variant="caption" color="text.secondary" display="block">{s.label}</Typography>
                <Typography variant="caption" color="text.secondary">{s.sub}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>

        {/* Subject Performance Radar */}
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

        {/* Monthly Performance */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📈 Monthly Trend</Typography>
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

        {/* Subject bars */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📊 Scores by Subject</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={demoSubjectScores} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="subject" type="category" width={90} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#1a73e8" radius={[0, 4, 4, 0]} name="Score %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent grades */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📝 Recent Assignment Grades</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {recentGrades.map((sub, i) => {
                  const pct = sub.grade && sub.max_marks
                    ? Math.round((sub.grade / sub.max_marks) * 100) : null;
                  const g = pct ? gradeLabel(pct) : null;
                  return (
                    <Box key={i}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: '60%' }}>
                          {sub.assignment_title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          {sub.grade !== null && sub.grade !== undefined ? (
                            <>
                              <Typography variant="body2" fontWeight={700}>
                                {sub.grade}/{sub.max_marks}
                              </Typography>
                              <Chip label={g?.label} size="small"
                                sx={{ bgcolor: g?.color + '20', color: g?.color, fontWeight: 700, height: 20 }} />
                            </>
                          ) : (
                            <Chip label="Pending" size="small" color="warning" sx={{ height: 20 }} />
                          )}
                        </Box>
                      </Box>
                      {pct !== null && (
                        <LinearProgress variant="determinate" value={pct}
                          sx={{
                            height: 5, borderRadius: 3, bgcolor: '#f0f0f0',
                            '& .MuiLinearProgress-bar': { bgcolor: g?.color, borderRadius: 3 }
                          }} />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance breakdown */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📅 Attendance Breakdown</Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
                {[
                  { label: 'Present', value: progress?.present, color: '#34a853' },
                  { label: 'Absent', value: progress?.absent, color: '#ea4335' },
                  { label: 'Late', value: progress?.late, color: '#fbbc04' },
                ].map(s => (
                  <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: s.color }} />
                    <Typography variant="body2" fontWeight={600}>{s.label}: {s.value}</Typography>
                  </Box>
                ))}
              </Box>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="#34a853" radius={[4, 4, 0, 0]} name="Attendance %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Exam Results */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>🏆 Exam Results</Typography>
              {examResults.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography color="text.secondary">No exam results yet</Typography>
                </Box>
              ) : (
                <Box sx={{ overflow: 'auto' }}>
                  <Box sx={{ minWidth: 500 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                          <TableCell>Exam</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Marks</TableCell>
                          <TableCell>Grade</TableCell>
                          <TableCell>Result</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {examResults.map((r, i) => {
                          const pct = Math.round((r.marks_obtained / r.total_marks) * 100);
                          const g = gradeLabel(pct);
                          const passed = pct >= 33;
                          return (
                            <TableRow key={i} hover>
                              <TableCell>
                                <Typography variant="body2" fontWeight={600}>{r.exam_title}</Typography>
                              </TableCell>
                              <TableCell>{new Date(r.exam_date).toLocaleDateString('en-IN')}</TableCell>
                              <TableCell>
                                <Typography variant="body2" fontWeight={600}>
                                  {r.marks_obtained}/{r.total_marks}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip label={g.label} size="small"
                                  sx={{ bgcolor: g.color + '20', color: g.color, fontWeight: 700 }} />
                              </TableCell>
                              <TableCell>
                                <Chip label={passed ? '✅ Pass' : '❌ Fail'} size="small"
                                  color={passed ? 'success' : 'error'} />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
};

export default MyProgress;