import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Chip, Button,
  TextField, InputAdornment, Dialog, DialogTitle,
  DialogContent, DialogActions, Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';

const initialApplications = [
  { id: 1, name: 'Arjun Nair', applyingFor: 'Class 6', parent: 'Sunil Nair', phone: '9876540001', date: '2026-03-01', status: 'Under Review' },
  { id: 2, name: 'Meera Joshi', applyingFor: 'Class 9', parent: 'Vinod Joshi', phone: '9876540002', date: '2026-03-03', status: 'Approved' },
  { id: 3, name: 'Karan Malhotra', applyingFor: 'Class 11', parent: 'Anil Malhotra', phone: '9876540003', date: '2026-03-05', status: 'Under Review' },
  { id: 4, name: 'Divya Pillai', applyingFor: 'Class 6', parent: 'Rajan Pillai', phone: '9876540004', date: '2026-03-07', status: 'Rejected' },
  { id: 5, name: 'Sahil Khan', applyingFor: 'Class 8', parent: 'Imran Khan', phone: '9876540005', date: '2026-03-10', status: 'Under Review' },
];

const Admissions = () => {
  const [applications, setApplications] = useState(initialApplications);
  const [search, setSearch] = useState('');
  const [addDialog, setAddDialog] = useState(false);
  const [success, setSuccess] = useState('');
  const [newApp, setNewApp] = useState({ name: '', applyingFor: '', parent: '', phone: '' });

  const filtered = applications.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.applyingFor.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id, status) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    setSuccess(`✅ Application ${status.toLowerCase()}!`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleAdd = () => {
    const app = { ...newApp, id: Date.now(), date: new Date().toISOString().split('T')[0], status: 'Under Review' };
    setApplications(prev => [app, ...prev]);
    setAddDialog(false);
    setSuccess('✅ Application added!');
    setNewApp({ name: '', applyingFor: '', parent: '', phone: '' });
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Layout menuItems={adminMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" fontWeight={700}>📋 Admissions</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialog(true)} sx={{ borderRadius: 2 }}>
          New Application
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
          <Box sx={{ minWidth: 650 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell>Applicant</TableCell>
                  <TableCell>Applying For</TableCell>
                  <TableCell>Parent</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((a) => (
                  <TableRow key={a.id} hover>
                    <TableCell><Typography variant="body2" fontWeight={600}>{a.name}</Typography></TableCell>
                    <TableCell><Chip label={a.applyingFor} size="small" /></TableCell>
                    <TableCell>{a.parent}</TableCell>
                    <TableCell>{a.phone}</TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>
                      <Chip label={a.status} size="small"
                        color={a.status === 'Approved' ? 'success' : a.status === 'Rejected' ? 'error' : 'warning'} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {a.status === 'Under Review' && (
                          <>
                            <Button size="small" variant="contained" color="success"
                              onClick={() => updateStatus(a.id, 'Approved')} sx={{ borderRadius: 2, fontSize: 11 }}>
                              Approve
                            </Button>
                            <Button size="small" variant="outlined" color="error"
                              onClick={() => updateStatus(a.id, 'Rejected')} sx={{ borderRadius: 2, fontSize: 11 }}>
                              Reject
                            </Button>
                          </>
                        )}
                        {a.status !== 'Under Review' && (
                          <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>View</Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>➕ New Admission Application</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Applicant Name" fullWidth value={newApp.name} onChange={e => setNewApp({...newApp, name: e.target.value})} />
          <TextField label="Applying For (e.g. Class 6)" fullWidth value={newApp.applyingFor} onChange={e => setNewApp({...newApp, applyingFor: e.target.value})} />
          <TextField label="Parent Name" fullWidth value={newApp.parent} onChange={e => setNewApp({...newApp, parent: e.target.value})} />
          <TextField label="Phone Number" fullWidth value={newApp.phone} onChange={e => setNewApp({...newApp, phone: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!newApp.name}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Admissions;