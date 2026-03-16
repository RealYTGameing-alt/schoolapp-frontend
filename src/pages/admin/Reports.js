import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, Box, Chip, CircularProgress } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie,
  Cell, Legend, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';
import api from '../../services/api';

const COLORS = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#9c27b0'];

const demoAttendanceMonth = [
  { month: 'Oct', rate: 88 }, { month: 'Nov', rate: 91 },
  { month: 'Dec', rate: 85 }, { month: 'Jan', rate: 93 },
  { month: 'Feb', rate: 90 }, { month: 'Mar', rate: 94 },
];

const demoFees = [
  { month: 'Oct', collected: 85000, pending: 15000 },
  { month: 'Nov', collected: 92000, pending: 8000 },
  { month: 'Dec', collected: 78000, pending: 22000 },
  { month: 'Jan', collected: 95000, pending: 5000 },
  { month: 'Feb', collected: 88000, pending: 12000 },
  { month: 'Mar', collected: 91000, pending: 9000 },
];

const demoSubjectPerformance = [
  { subject: 'Math', score: 82 },
  { subject: 'Science', score: 88 },
  { subject: 'English', score: 75 },
  { subject: 'History', score: 79 },
  { subject: 'Geography', score: 83 },
];

const Reports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get('/reports/admin');
        setData(res.data);
      } catch (err) {
        setData(null);
      }
      setLoading(false);
    };
    fetchReports();
  }, []);

  const attendanceMonthData = data?.attendanceByMonth?.length > 0
    ? data.attendanceByMonth.map(d => ({ month: d.month, rate: parseInt(d.rate) || 0 }))
    : demoAttendanceMonth;

  const userRoleData = data?.usersByRole?.length > 0
    ? data.usersByRole.map(d => ({ name: d.role, value: parseInt(d.count) }))
    : [
        { name: 'students', value: 45 },
        { name: 'teachers', value: 12 },
        { name: 'parents', value: 38 },
        { name: 'admin', value: 2 },
      ];

  const subStats = data?.submissionStats;
  const lessonStats = data?.lessonStats;

  const statCards = [
    { label: 'Total Submissions', value: subStats?.total || '—', color: '#1a73e8' },
    { label: 'Graded', value: subStats?.graded || '—', color: '#34a853' },
    { label: 'Late Submissions', value: subStats?.late || '—', color: '#ea4335' },
    { label: 'Avg Grade', value: subStats?.avg_grade ? `${subStats.avg_grade}%` : '—', color: '#fbbc04' },
    { label: 'Lesson Plans', value: lessonStats?.total || '—', color: '#9c27b0' },
    { label: 'Plans Submitted', value: lessonStats?.submitted || '—', color: '#00bcd4' },
  ];

  return (
    <Layout menuItems={adminMenu}>
      <Typography variant="h5" fontWeight={700} mb={1}>📊 Reports & Analytics</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Real-time insights from your school data
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Stat Cards */}
          <Grid container spacing={2} mb={3}>
            {statCards.map((s) => (
              <Grid item xs={6} md={2} key={s.label}>
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

            {/* Attendance Trend */}
            <Grid item xs={12} md={8}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>📅 Attendance Trend (6 Months)</Typography>
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={attendanceMonthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip formatter={(v) => `${v}%`} />
                      <Line type="monotone" dataKey="rate" stroke="#1a73e8" strokeWidth={3}
                        dot={{ r: 5, fill: '#1a73e8' }} name="Attendance %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Users by Role Pie */}
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>👥 Users by Role</Typography>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={userRoleData} dataKey="value" nameKey="name"
                        cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                        {userRoleData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Fee Collection */}
            <Grid item xs={12} md={7}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>💰 Fee Collection (Monthly)</Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={demoFees}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(v) => `₹${v/1000}K`} />
                      <Tooltip formatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
                      <Legend />
                      <Bar dataKey="collected" fill="#34a853" radius={[4,4,0,0]} name="Collected" />
                      <Bar dataKey="pending" fill="#ea4335" radius={[4,4,0,0]} name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Subject Performance */}
            <Grid item xs={12} md={5}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>📚 Subject Performance</Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={demoSubjectPerformance}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar name="Avg Score" dataKey="score" stroke="#1a73e8" fill="#1a73e8" fillOpacity={0.3} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Assignment Stats */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>📝 Assignment & Lesson Plan Summary</Typography>
                  <Grid container spacing={2}>
                    {[
                      { label: 'Total Assignments Submitted', value: subStats?.total || 0, max: subStats?.total || 100, color: '#1a73e8' },
                      { label: 'Graded Assignments', value: subStats?.graded || 0, max: subStats?.total || 100, color: '#34a853' },
                      { label: 'Late Submissions', value: subStats?.late || 0, max: subStats?.total || 100, color: '#ea4335' },
                      { label: 'Lesson Plans Submitted', value: lessonStats?.submitted || 0, max: lessonStats?.total || 100, color: '#9c27b0' },
                    ].map((item, i) => (
                      <Grid item xs={12} sm={6} md={3} key={i}>
                        <Card sx={{ borderRadius: 2, bgcolor: '#f8f9fa' }}>
                          <CardContent sx={{ py: 1.5 }}>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                              {item.label}
                            </Typography>
                            <Typography variant="h4" fontWeight={800} color={item.color}>
                              {item.value}
                            </Typography>
                            <Box sx={{ mt: 1, height: 6, borderRadius: 3, bgcolor: '#e0e0e0' }}>
                              <Box sx={{
                                height: '100%', borderRadius: 3, bgcolor: item.color,
                                width: item.max > 0 ? `${Math.min((item.value / item.max) * 100, 100)}%` : '0%'
                              }} />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Quick Stats */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>⚡ Quick Stats</Typography>
                  <Grid container spacing={2}>
                    {[
                      { emoji: '🏫', label: 'School Status', value: 'Active & Running', color: '#34a853' },
                      { emoji: '📅', label: 'Academic Year', value: '2025-2026', color: '#1a73e8' },
                      { emoji: '💰', label: 'Fee Collection Rate', value: '87%', color: '#fbbc04' },
                      { emoji: '📊', label: 'Avg Attendance', value: '91%', color: '#9c27b0' },
                      { emoji: '👨‍🏫', label: 'Active Teachers', value: userRoleData.find(r => r.name === 'teacher')?.value || '—', color: '#ea4335' },
                      { emoji: '🎓', label: 'Total Students', value: userRoleData.find(r => r.name === 'student')?.value || '—', color: '#00bcd4' },
                    ].map((s, i) => (
                      <Grid item xs={6} md={2} key={i}>
                        <Box sx={{ p: 2, bgcolor: s.color + '12', borderRadius: 2, textAlign: 'center' }}>
                          <Typography fontSize={28}>{s.emoji}</Typography>
                          <Typography variant="h6" fontWeight={700} color={s.color}>{s.value}</Typography>
                          <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </>
      )}
    </Layout>
  );
};

export default Reports;
