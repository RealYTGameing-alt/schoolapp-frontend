import adminMenuItems from '../../components/layout/adminMenu';
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Avatar, InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const initialStudents = [
  { id: 1, name: 'Arjun Sharma', roll: 'STU001', class: '10A', gender: 'Male', parent: 'Suresh Sharma', phone: '9876543210', attendance: 94, status: 'active' },
  { id: 2, name: 'Priya Patel', roll: 'STU002', class: '9B', gender: 'Female', parent: 'Ramesh Patel', phone: '9876543211', attendance: 88, status: 'active' },
  { id: 3, name: 'Rohan Singh', roll: 'STU003', class: '8C', gender: 'Male', parent: 'Mohan Singh', phone: '9876543212', attendance: 76, status: 'active' },
  { id: 4, name: 'Ananya Gupta', roll: 'STU004', class: '10A', gender: 'Female', parent: 'Vijay Gupta', phone: '9876543213', attendance: 97, status: 'active' },
];

const Students = () => {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.roll.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  );

  const onSubmit = (data) => {
    setStudents(prev => [...prev, { id: Date.now(), ...data, attendance: 100, status: 'active', roll: `STU${String(prev.length + 1).padStart(3, '0')}` }]);
    toast.success('✅ Student added successfully!');
    setOpen(false);
    reset();
  };

  return (
    <Layout menuItems={adminMenuItems}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>🎓 Students</Typography>
          <Typography variant="body2" color="text.secondary">{students.length} students enrolled</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>
          Add Student
        </Button>
      </Box>

      <TextField fullWidth placeholder="Search by name, roll number or class..."
        value={search} onChange={(e) => setSearch(e.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        sx={{ mb: 3, bgcolor: 'white', borderRadius: 2 }} />

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell><strong>Student</strong></TableCell>
              <TableCell><strong>Roll No.</strong></TableCell>
              <TableCell><strong>Class</strong></TableCell>
              <TableCell><strong>Gender</strong></TableCell>
              <TableCell><strong>Parent</strong></TableCell>
              <TableCell><strong>Attendance</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((s) => (
              <TableRow key={s.id} hover>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: '#1a73e8', fontSize: 14 }}>
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>{s.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{s.phone}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{s.roll}</TableCell>
                <TableCell><Chip label={s.class} size="small" color="primary" variant="outlined" /></TableCell>
                <TableCell>{s.gender}</TableCell>
                <TableCell>{s.parent}</TableCell>
                <TableCell>
                  <Chip label={`${s.attendance}%`} size="small"
                    color={s.attendance >= 90 ? 'success' : s.attendance >= 75 ? 'warning' : 'error'} />
                </TableCell>
                <TableCell>
                  <Chip label={s.status} size="small" color="success" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Add New Student</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Full Name" margin="normal" {...register('name', { required: true })} />
          <TextField fullWidth label="Class & Section" margin="normal" {...register('class', { required: true })} />
          <TextField fullWidth label="Gender" margin="normal" {...register('gender')} />
          <TextField fullWidth label="Date of Birth" type="date" margin="normal"
            InputLabelProps={{ shrink: true }} {...register('dob')} />
          <TextField fullWidth label="Parent/Guardian Name" margin="normal" {...register('parent')} />
          <TextField fullWidth label="Phone Number" margin="normal" {...register('phone')} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{ borderRadius: 2 }}>Add Student</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Students;