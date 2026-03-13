import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Avatar, Chip, Button,
  TextField, InputAdornment, Dialog, DialogTitle,
  DialogContent, DialogActions, Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';

const initialStudents = [
  { id: 1, name: 'Aarav Sharma', class: '10A', rollNo: '001', parent: 'Ramesh Sharma', phone: '9876543210', fees: 'Paid', attendance: '95%' },
  { id: 2, name: 'Priya Patel', class: '10A', rollNo: '002', parent: 'Suresh Patel', phone: '9876543211', fees: 'Paid', attendance: '88%' },
  { id: 3, name: 'Rohan Singh', class: '9B', rollNo: '003', parent: 'Mahesh Singh', phone: '9876543212', fees: 'Pending', attendance: '92%' },
  { id: 4, name: 'Ananya Gupta', class: '9B', rollNo: '004', parent: 'Dinesh Gupta', phone: '9876543213', fees: 'Paid', attendance: '97%' },
  { id: 5, name: 'Vikram Mehta', class: '8C', rollNo: '005', parent: 'Rakesh Mehta', phone: '9876543214', fees: 'Overdue', attendance: '78%' },
  { id: 6, name: 'Sneha Reddy', class: '8C', rollNo: '006', parent: 'Naresh Reddy', phone: '9876543215', fees: 'Paid', attendance: '91%' },
];

const AdminStudents = () => {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [addDialog, setAddDialog] = useState(false);
  const [success, setSuccess] = useState('');
  const [newStudent, setNewStudent] = useState({ name: '', class: '', rollNo: '', parent: '', phone: '' });

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    const student = { ...newStudent, id: Date.now(), fees: 'Pending', attendance: '0%' };
    setStudents(prev => [student, ...prev]);
    setAddDialog(false);
    setSuccess('✅ Student added successfully!');
    setNewStudent({ name: '', class: '', rollNo: '', parent: '', phone: '' });
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Layout menuItems={adminMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" fontWeight={700}>🎓 Students</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialog(true)} sx={{ borderRadius: 2 }}>
          Add Student
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TextField fullWidth placeholder="Search by name or class..."
        value={search} onChange={e => setSearch(e.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        sx={{ mb: 3, bgcolor: 'white', borderRadius: 2 }} size="small"
      />

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0, overflow: 'auto' }}>
          <Box sx={{ minWidth: 600 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell>Student</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Roll No.</TableCell>
                  <TableCell>Parent</TableCell>
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
                        <Avatar sx={{ bgcolor: '#1a73e8', width: 34, height: 34, fontSize: 13 }}>{s.name.charAt(0)}</Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>{s.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{s.phone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell><Chip label={s.class} size="small" /></TableCell>
                    <TableCell>{s.rollNo}</TableCell>
                    <TableCell><Typography variant="body2">{s.parent}</Typography></TableCell>
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
          </Box>
        </CardContent>
      </Card>

      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>➕ Add New Student</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Full Name" fullWidth value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} />
          <TextField label="Class (e.g. 10A)" fullWidth value={newStudent.class} onChange={e => setNewStudent({...newStudent, class: e.target.value})} />
          <TextField label="Roll Number" fullWidth value={newStudent.rollNo} onChange={e => setNewStudent({...newStudent, rollNo: e.target.value})} />
          <TextField label="Parent Name" fullWidth value={newStudent.parent} onChange={e => setNewStudent({...newStudent, parent: e.target.value})} />
          <TextField label="Phone Number" fullWidth value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!newStudent.name || !newStudent.class}>Add Student</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default AdminStudents;