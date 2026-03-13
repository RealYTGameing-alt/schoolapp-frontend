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

const initialStaff = [
  { id: 1, name: 'Rajesh Kumar', role: 'Teacher', subject: 'Mathematics', phone: '9876541001', salary: '₹45,000', status: 'Active', joined: '2021-06-01' },
  { id: 2, name: 'Sunita Sharma', role: 'Teacher', subject: 'Science', phone: '9876541002', salary: '₹42,000', status: 'Active', joined: '2020-03-15' },
  { id: 3, name: 'Priya Menon', role: 'Teacher', subject: 'English', phone: '9876541003', salary: '₹40,000', status: 'Active', joined: '2022-07-01' },
  { id: 4, name: 'Amit Singh', role: 'Teacher', subject: 'History', phone: '9876541004', salary: '₹38,000', status: 'Active', joined: '2019-08-20' },
  { id: 5, name: 'Kavita Rao', role: 'Teacher', subject: 'Geography', phone: '9876541005', salary: '₹38,000', status: 'On Leave', joined: '2020-11-10' },
  { id: 6, name: 'Mohan Das', role: 'Admin Staff', subject: '—', phone: '9876541006', salary: '₹25,000', status: 'Active', joined: '2018-01-05' },
];

const StaffHR = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [search, setSearch] = useState('');
  const [addDialog, setAddDialog] = useState(false);
  const [success, setSuccess] = useState('');
  const [newStaff, setNewStaff] = useState({ name: '', role: 'Teacher', subject: '', phone: '', salary: '' });

  const filtered = staff.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase()) ||
    s.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    const member = { ...newStaff, id: Date.now(), status: 'Active', joined: new Date().toISOString().split('T')[0] };
    setStaff(prev => [member, ...prev]);
    setAddDialog(false);
    setSuccess('✅ Staff member added!');
    setNewStaff({ name: '', role: 'Teacher', subject: '', phone: '', salary: '' });
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Layout menuItems={adminMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" fontWeight={700}>👥 Staff & HR</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialog(true)} sx={{ borderRadius: 2 }}>
          Add Staff
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TextField fullWidth placeholder="Search by name, role or subject..."
        value={search} onChange={e => setSearch(e.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        sx={{ mb: 3, bgcolor: 'white', borderRadius: 2 }} size="small"
      />

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0, overflow: 'auto' }}>
          <Box sx={{ minWidth: 650 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: '#34a853', width: 34, height: 34, fontSize: 13 }}>{s.name.charAt(0)}</Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>{s.name}</Typography>
                          <Typography variant="caption" color="text.secondary">Joined {s.joined}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell><Chip label={s.role} size="small" /></TableCell>
                    <TableCell>{s.subject}</TableCell>
                    <TableCell>{s.phone}</TableCell>
                    <TableCell><Typography variant="body2" fontWeight={600}>{s.salary}</Typography></TableCell>
                    <TableCell>
                      <Chip label={s.status} size="small" color={s.status === 'Active' ? 'success' : 'warning'} />
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
        <DialogTitle fontWeight={700}>➕ Add Staff Member</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Full Name" fullWidth value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} />
          <TextField label="Role" select fullWidth value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})}
            SelectProps={{ native: true }}>
            <option value="Teacher">Teacher</option>
            <option value="Admin Staff">Admin Staff</option>
            <option value="Support Staff">Support Staff</option>
          </TextField>
          <TextField label="Subject (if teacher)" fullWidth value={newStaff.subject} onChange={e => setNewStaff({...newStaff, subject: e.target.value})} />
          <TextField label="Phone Number" fullWidth value={newStaff.phone} onChange={e => setNewStaff({...newStaff, phone: e.target.value})} />
          <TextField label="Monthly Salary (e.g. ₹40,000)" fullWidth value={newStaff.salary} onChange={e => setNewStaff({...newStaff, salary: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!newStaff.name}>Add Staff</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default StaffHR;