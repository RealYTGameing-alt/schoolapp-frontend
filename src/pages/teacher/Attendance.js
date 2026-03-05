import teacherMenuItems from '../../components/layout/teacherMenu';
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, ToggleButton,
  ToggleButtonGroup, TextField, Paper
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { toast } from 'react-toastify';


const mockStudents = [
  { id: 1, name: 'Aarav Sharma', roll: '001' },
  { id: 2, name: 'Priya Patel', roll: '002' },
  { id: 3, name: 'Rohan Singh', roll: '003' },
  { id: 4, name: 'Ananya Gupta', roll: '004' },
  { id: 5, name: 'Vikram Mehta', roll: '005' },
  { id: 6, name: 'Sneha Reddy', roll: '006' },
];

const Attendance = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState(
    Object.fromEntries(mockStudents.map(s => [s.id, 'present']))
  );

  const handleChange = (studentId, value) => {
    if (value) setAttendance(prev => ({ ...prev, [studentId]: value }));
  };

  const handleSubmit = () => {
    toast.success('✅ Attendance saved successfully!');
  };

  const presentCount = Object.values(attendance).filter(v => v === 'present').length;

  return (
    <Layout menuItems={teacherMenuItems}>
      <Typography variant="h5" fontWeight={700} mb={1}>📋 Mark Attendance</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Class 10A • Mathematics</Typography>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
            <TextField label="Date" type="date" value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }} size="small" />
            <Chip label={`Present: ${presentCount}/${mockStudents.length}`} color="success" />
            <Chip label={`Absent: ${mockStudents.length - presentCount}/${mockStudents.length}`} color="error" />
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell fontWeight={600}>Roll No.</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockStudents.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>{student.roll}</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>{student.name}</Typography>
                </TableCell>
                <TableCell>
                  <ToggleButtonGroup
                    value={attendance[student.id]}
                    exclusive
                    onChange={(e, val) => handleChange(student.id, val)}
                    size="small"
                  >
                    <ToggleButton value="present" sx={{ '&.Mui-selected': { bgcolor: '#e8f5e9', color: '#2e7d32' } }}>
                      ✅ Present
                    </ToggleButton>
                    <ToggleButton value="absent" sx={{ '&.Mui-selected': { bgcolor: '#ffebee', color: '#c62828' } }}>
                      ❌ Absent
                    </ToggleButton>
                    <ToggleButton value="late" sx={{ '&.Mui-selected': { bgcolor: '#fff8e1', color: '#f57f17' } }}>
                      ⏰ Late
                    </ToggleButton>
                  </ToggleButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={3} display="flex" gap={2}>
        <Button variant="contained" size="large" onClick={handleSubmit} sx={{ borderRadius: 2, px: 4 }}>
          Save Attendance
        </Button>
        <Button variant="outlined" size="large" sx={{ borderRadius: 2 }}>
          Download Report
        </Button>
      </Box>
    </Layout>
  );
};

export default Attendance;