import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Avatar, Chip, Button,
  TextField, InputAdornment, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';

const students = [
  { id: 1, name: 'Aarav Sharma', class: '10A', rollNo: '001', email: 'aarav@school.com', attendance: '95%', fees: 'Paid' },
  { id: 2, name: 'Priya Patel', class: '10A', rollNo: '002', email: 'priya@school.com', attendance: '88%', fees: 'Paid' },
  { id: 3, name: 'Rohan Singh', class: '9B', rollNo: '003', email: 'rohan@school.com', attendance: '92%', fees: 'Pending' },
  { id: 4, name: 'Ananya Gupta', class: '9B', rollNo: '004', email: 'ananya@school.com', attendance: '97%', fees: 'Paid' },
  { id: 5, name: 'Vikram Mehta', class: '8C', rollNo: '005', email: 'vikram@school.com', attendance: '78%', fees: 'Overdue' },
  { id: 6, name: 'Sneha Reddy', class: '8C', rollNo: '006', email: 'sneha@school.com', attendance: '91%', fees: 'Paid' },
];

const Students = () => {
  const [search, setSearch] = useState('');
  const [addDialog, setAddDialog] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', class: '', email: '', rollNo: '' });

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout menuItems={adminMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>🎓 Students</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialog(true)} sx={{ borderRadius: 2 }}>
          Add Student
        </Button>
      </Box>

      <TextField fullWidth placeholder="Search by name or class..."
        value={search} onChange={(e) => setSearch(e.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        sx={{ mb: 3, bgcolor: 'white', borderRadius: 2 }}
      />

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell fontWeight={700}>Student</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Roll No.</TableCell>
                <TableCell>Attendance</TableCell>
                <TableCell>Fees</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: '#1a73e8', width: 36, height: 36, fontSize: 14 }}>
                        {s.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{s.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{s.email}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell><Chip label={s.class} size="small" /></TableCell>
                  <TableCell>{s.rollNo}</TableCell>
                  <TableCell>
                    <Chip label={s.attendance} size="small"
                      color={parseInt(s.attendance) >= 90 ? 'success' : parseInt(s.attendance) >= 80 ? 'warning' : 'error'} />
                  </TableCell>
                  <TableCell>
                    <Chip label={s.fees} size="small"
                      color={s.fees === 'Paid' ? 'success' : s.fees === 'Pending' ? 'warning' : 'error'} />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>➕ Add New Student</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Full Name" fullWidth value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} />
          <TextField label="Class" fullWidth value={newStudent.class} onChange={e => setNewStudent({...newStudent, class: e.target.value})} />
          <TextField label="Roll Number" fullWidth value={newStudent.rollNo} onChange={e => setNewStudent({...newStudent, rollNo: e.target.value})} />
          <TextField label="Email" fullWidth value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setAddDialog(false)}>Add Student</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Students;