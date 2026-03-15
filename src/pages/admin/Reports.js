import React from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';

const monthlyFees = [
  { month: 'Oct', collected: 85000, pending: 15000 },
  { month: 'Nov', collected: 92000, pending: 8000 },
  { month: 'Dec', collected: 78000, pending: 22000 },
  { month: 'Jan', collected: 95000, pending: 5000 },
  { month: 'Feb', collected: 88000, pending: 12000 },
  { month: 'Mar', collected: 91000, pending: 9000 },
];

const attendanceTrend = [
  { month: 'Oct', rate: 88 }, { month: 'Nov', rate: 91 },
  { month: 'Dec', rate: 85 }, { month: 'Jan', rate: 93 },
  { month: 'Feb', rate: 90 }, { month: 'Mar', rate: 94 },
];

const admissionData = [
  { name: 'Approved', value: 42, color: '#34a853' },
  { name: 'Pending', value: 18, color: '#fbbc04' },
  { name: 'Rejected', value: 8, color: '#ea4335' },
];

const Reports = () => {
  return (
    <Layout menuItems={adminMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>📊 Reports & Analytics</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>💰 Fee Collection (Monthly)</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyFees}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${(value/1000).toFixed(0)}K`} />
                  <Legend />
                  <Bar dataKey="collected" fill="#34a853" radius={[4,4,0,0]} name="Collected" />
                  <Bar dataKey="pending" fill="#ea4335" radius={[4,4,0,0]} name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📅 Attendance Trend (%)</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[75, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#1a73e8" strokeWidth={2} dot={{ r: 4 }} name="Attendance %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📋 Admissions Status</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={admissionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {admissionData.map((entry, index) => (
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
              <Typography variant="h6" fontWeight={700} mb={2}>📈 Key Metrics</Typography>
              {[
                { label: 'Total Students', value: '1,240', color: '#1a73e8' },
                { label: 'Fee Collection Rate', value: '87%', color: '#34a853' },
                { label: 'Avg Attendance', value: '91%', color: '#fbbc04' },
                { label: 'Staff Count', value: '86', color: '#ea4335' },
                { label: 'New Admissions', value: '42', color: '#9c27b0' },
                { label: 'Pending Fees', value: '₹71K', color: '#ff5722' },
              ].map((m, i) => (
                <Card key={i} sx={{ mb: 1, borderRadius: 2, borderLeft: `4px solid ${m.color}` }}>
                  <CardContent sx={{ py: 1, '&:last-child': { pb: 1 }, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">{m.label}</Typography>
                    <Typography variant="body2" fontWeight={700} color={m.color}>{m.value}</Typography>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Reports;
