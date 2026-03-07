import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Button, Chip, TextField
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import { teacherMenu } from '../../components/layout/menus';

const students = [
  { id: 1, rollNo: '001', name: 'Aarav Sharma' },
  { id: 2, rollNo: '002', name: 'Priya Patel' },
  { id: 3, rollNo: '003', name: 'Rohan Singh' },
  { id: 4, rollNo: '004', name: 'Ananya Gupta' },
  { id: 5, rollNo: '005', name: 'Vikram Mehta' },
  { id: 6, rollNo: '006', name: 'Sneha Reddy' },
];

const Attendance = () => {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [attendance, setAttendance] = useState(
    Object.fromEntries(students.map(s => [s.id, 'present']))
  );
  const [saved, setSaved] = useState(false);

  const setStatus = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
    setSaved(false);
  };

  const presentCount = Object.values(attendance).filter(v => v === 'present').length;
  const absentCount = Object.values(attendance).filter(v => v === 'absent').length;

  return (
    <Layout menuItems={teacherMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>✅ Mark Attendance</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Class 10A • Mathematics</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField type="date" size="small" value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} label="Date" />
        <Chip label={`Present: ${presentCount}/${students.length}`} color="success" />
        <Chip label={`Absent: ${absentCount}/${students.length}`} color="error" />
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mb: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell>Roll No.</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>{s.rollNo}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {['present', 'absent', 'late'].map(status => (
                        <Button key={status} size="small" variant={attendance[s.id] === status ? 'contained' : 'outlined'}
                          color={status === 'present' ? 'success' : status === 'absent' ? 'error' : 'warning'}
                          onClick={() => setStatus(s.id, status)}
                          sx={{ borderRadius: 2, minWidth: 80, textTransform: 'uppercase', fontSize: 11 }}>
                          {status === 'present' ? '✅ Present' : status === 'absent' ? '❌ Absent' : '⏰ Late'}
                        </Button>
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" sx={{ borderRadius: 2 }} onClick={() => setSaved(true)}>
          {saved ? '✅ Saved!' : 'Save Attendance'}
        </Button>
        <Button variant="outlined" sx={{ borderRadius: 2 }}>Download Report</Button>
      </Box>
    </Layout>
  );
};

export default Attendance;