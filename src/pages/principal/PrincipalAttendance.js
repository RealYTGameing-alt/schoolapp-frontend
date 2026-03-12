import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Chip, TextField
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Layout from '../../components/layout/Layout';
import { principalMenu } from '../../components/layout/menus';

const classAttendance = [
  { class: '10A', present: 28, absent: 2, late: 1, total: 31, rate: '90%' },
  { class: '9B', present: 30, absent: 1, late: 0, total: 31, rate: '97%' },
  { class: '8C', present: 25, absent: 4, late: 2, total: 31, rate: '81%' },
  { class: '7A', present: 29, absent: 2, late: 1, total: 32, rate: '91%' },
];

const weeklyData = [
  { day: 'Monday', '10A': 94, '9B': 97, '8C': 81, '7A': 91 },
  { day: 'Tuesday', '10A': 90, '9B': 100, '8C': 84, '7A': 88 },
  { day: 'Wednesday', '10A': 97, '9B': 94, '8C': 87, '7A': 94 },
  { day: 'Thursday', '10A': 87, '9B': 97, '8C': 78, '7A': 91 },
  { day: 'Friday', '10A': 94, '9B': 91, '8C': 84, '7A': 94 },
];

const PrincipalAttendance = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <Layout menuItems={principalMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>📊 Attendance Reports</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField type="date" size="small" value={date}
          onChange={e => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }} label="Date" />
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>📈 Weekly Attendance by Class (%)</Typography>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[70, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="10A" fill="#1a73e8" radius={[3,3,0,0]} />
              <Bar dataKey="9B" fill="#34a853" radius={[3,3,0,0]} />
              <Bar dataKey="8C" fill="#fbbc04" radius={[3,3,0,0]} />
              <Bar dataKey="7A" fill="#ea4335" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell>Class</TableCell>
                <TableCell>Present</TableCell>
                <TableCell>Absent</TableCell>
                <TableCell>Late</TableCell>
                <TableCell>Total Students</TableCell>
                <TableCell>Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classAttendance.map((c) => (
                <TableRow key={c.class} hover>
                  <TableCell><Chip label={c.class} /></TableCell>
                  <TableCell><Chip label={c.present} size="small" color="success" /></TableCell>
                  <TableCell><Chip label={c.absent} size="small" color="error" /></TableCell>
                  <TableCell><Chip label={c.late} size="small" color="warning" /></TableCell>
                  <TableCell>{c.total}</TableCell>
                  <TableCell>
                    <Chip label={c.rate} size="small"
                      color={parseInt(c.rate) >= 90 ? 'success' : parseInt(c.rate) >= 80 ? 'warning' : 'error'} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default PrincipalAttendance;