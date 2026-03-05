import adminMenuItems from '../../components/layout/adminMenu';
import React from 'react';
import {
  Card, CardContent, Typography, Box, Button, Grid, LinearProgress
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Legend
} from 'recharts';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import DownloadIcon from '@mui/icons-material/Download';
import { toast } from 'react-toastify';

const attendanceData = [
  { month: 'Oct', attendance: 92 }, { month: 'Nov', attendance: 88 },
  { month: 'Dec', attendance: 79 }, { month: 'Jan', attendance: 94 },
  { month: 'Feb', attendance: 91 }, { month: 'Mar', attendance: 96 },
];

const feeData = [
  { month: 'Oct', collected: 820000, pending: 180000 },
  { month: 'Nov', collected: 910000, pending: 90000 },
  { month: 'Dec', collected: 750000, pending: 250000 },
  { month: 'Jan', collected: 880000, pending: 120000 },
  { month: 'Feb', collected: 920000, pending: 80000 },
  { month: 'Mar', collected: 840000, pending: 160000 },
];

const performanceData = [
  { subject: 'Math', avg: 78 }, { subject: 'Science', avg: 82 },
  { subject: 'English', avg: 74 }, { subject: 'History', avg: 69 },
  { subject: 'Geography', avg: 71 },
];

const enrollmentData = [
  { name: 'Primary (1-5)', value: 420, color: '#1a73e8' },
  { name: 'Middle (6-8)', value: 380, color: '#34a853' },
  { name: 'Secondary (9-10)', value: 280, color: '#fbbc04' },
  { name: 'Senior (11-12)', value: 167, color: '#ea4335' },
];

const Reports = () => {
  return (
    <Layout menuItems={adminMenuItems}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>📊 Analytics & Reports</Typography>
          <Typography variant="body2" color="text.secondary">School-wide performance insights</Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderRadius: 2 }}
            onClick={() => toast.info('📄 Generating PDF report...')}>
            Export PDF
          </Button>
          <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderRadius: 2 }}
            onClick={() => toast.info('📊 Generating Excel report...')}>
            Export Excel
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>📈 Monthly Attendance Trend</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Line type="monotone" dataKey="attendance" stroke="#1a73e8" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>🎓 Enrollment by Section</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={enrollmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                    {enrollmentData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {enrollmentData.map((item) => (
                <Box key={item.name} display="flex" justifyContent="space-between" mb={0.5}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color }} />
                    <Typography variant="caption">{item.name}</Typography>
                  </Box>
                  <Typography variant="caption" fontWeight={600}>{item.value}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>💰 Fee Collection vs Pending</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={feeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip formatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
                  <Legend />
                  <Bar dataKey="collected" fill="#34a853" radius={[4,4,0,0]} name="Collected" />
                  <Bar dataKey="pending" fill="#ea4335" radius={[4,4,0,0]} name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>📚 Subject-wise Average Score</Typography>
              {performanceData.map((s) => (
                <Box key={s.subject} mb={2}>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2" fontWeight={500}>{s.subject}</Typography>
                    <Typography variant="body2" fontWeight={700} color="#1a73e8">{s.avg}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={s.avg}
                    sx={{ height: 8, borderRadius: 4, bgcolor: '#e8f0fe', '& .MuiLinearProgress-bar': { bgcolor: '#1a73e8' } }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Reports;