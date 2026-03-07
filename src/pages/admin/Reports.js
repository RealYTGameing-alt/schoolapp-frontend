import React from 'react';
import { Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';

const attendanceData = [
  { month: 'Oct', attendance: 92 }, { month: 'Nov', attendance: 88 },
  { month: 'Dec', attendance: 79 }, { month: 'Jan', attendance: 91 },
  { month: 'Feb', attendance: 94 }, { month: 'Mar', attendance: 96 },
];

const enrollmentData = [
  { name: 'Class 6-8', value: 420, color: '#1a73e8' },
  { name: 'Class 9-10', value: 380, color: '#34a853' },
  { name: 'Class 11-12', value: 220, color: '#fbbc04' },
  { name: 'Others', value: 220, color: '#ea4335' },
];

const feeData = [
  { month: 'Oct', collected: 8.2, pending: 1.8 },
  { month: 'Nov', collected: 9.1, pending: 0.9 },
  { month: 'Dec', collected: 7.8, pending: 2.2 },
  { month: 'Jan', collected: 10.2, pending: 0.8 },
  { month: 'Feb', collected: 11.4, pending: 0.6 },
  { month: 'Mar', collected: 12.4, pending: 1.2 },
];

const subjectData = [
  { subject: 'Math', avg: 78 }, { subject: 'Science', avg: 82 },
  { subject: 'English', avg: 75 }, { subject: 'History', avg: 71 },
  { subject: 'Geography', avg: 80 },
];

const Reports = () => {
  return (
    <Layout menuItems={adminMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>📊 Reports & Analytics</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📈 Attendance Trend</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="attendance" stroke="#1a73e8" strokeWidth={2} dot={{ fill: '#1a73e8' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>🎓 Enrollment by Class</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={enrollmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {enrollmentData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>💰 Fee Collection (Lakhs)</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={feeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="collected" fill="#34a853" name="Collected" />
                  <Bar dataKey="pending" fill="#ea4335" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📚 Average Scores by Subject</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={subjectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Bar dataKey="avg" fill="#1a73e8" name="Avg Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Reports;