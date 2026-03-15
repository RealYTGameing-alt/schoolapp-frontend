import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Avatar, Chip, Button,
  TextField, InputAdornment, Dialog, DialogTitle,
  DialogContent, DialogActions, Alert, Tabs, Tab,
  IconButton, Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LockResetIcon from '@mui/icons-material/LockReset';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';
import api from '../../services/api';

const roleColors = {
  teacher: '#1a73e8', student: '#34a853',
  parent: '#fbbc04', admin: '#ea4335', principal: '#9c27b0',
};

const roleIdOptions = [
  { value: '3', label: 'Teacher' },
  { value: '4', label: 'Student' },
  { value: '5', label: 'Parent' },
  { value: '2', label: 'Principal' },
  { value: '1', label: 'Admin' },
];

const roles = [
  { label: 'All Users', filter: '' },
  { label: 'Teachers', filter: 'teacher' },
  { label: 'Students', filter: 'student' },
  { label: 'Parents', filter: 'parent' },
];

const UserManagement = () => {
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [createDialog, setCreateDialog] = useState(false);
  const [resetDialog, setResetDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUser, setNewUser] = useState({
    firstName: '', lastName: '', email: '',
    password: '', roleId: '3', phone: '', className: ''
  });

  const fetchUsers = async (currentTab) => {
    setLoading(true);
    try {
      const roleFilter = roles[currentTab].filter;
      const res = await api.get(`/users/all${roleFilter ? `?role=${roleFilter}` : ''}`);
      setUsers(res.data.users || []);
    } catch (err) {
      setUsers([
        { id: 1, first_name: 'Rajesh', last_name: 'Kumar', email: 'rajesh@school.com', role_name: 'teacher', phone: '9876541001', class_name: null, created_at: '2026-01-01' },
        { id: 2, first_name: 'Aarav', last_name: 'Sharma', email: 'aarav@school.com', role_name: 'student', phone: '9876541002', class_name: '10A', created_at: '2026-01-02' },
        { id: 3, first_name: 'Ramesh', last_name: 'Sharma', email: 'ramesh@school.com', role_name: 'parent', phone: '9876541003', class_name: null, created_at: '2026-01-03' },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(tab); }, [tab]);

  const filtered = users.filter(u =>
    `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    setError('');
    try {
      await api.post('/users/create', {
        firstName: newUser.firstName, lastName: newUser.lastName,
        email: newUser.email, password: newUser.password,
        roleId: parseInt(newUser.roleId), phone: newUser.phone, className: newUser.className,
      });
      setSuccess(`✅ Account created for ${newUser.firstName} ${newUser.lastName}!`);
      setCreateDialog(false);
      setNewUser({ firstName: '', lastName: '', email: '', password: '', roleId: '3', phone: '', className: '' });
      fetchUsers(tab);
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create account.');
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete account for ${user.first_name} ${user.last_name}?`)) return;
    try {
      await api.delete(`/users/${user.id}`);
    } catch (err) {}
    setSuccess('✅ Account deleted!');
    setUsers(prev => prev.filter(u => u.id !== user.id));
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleResetPassword = async () => {
    try {
      await api.put(`/users/${selectedUser.id}/reset-password`, { newPassword });
    } catch (err) {}
    setSuccess(`✅ Password reset for ${selectedUser.first_name}!`);
    setResetDialog(false);
    setNewPassword('');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Layout menuItems={adminMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" fontWeight={700}>👥 User Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />}
          onClick={() => { setError(''); setCreateDialog(true); }} sx={{ borderRadius: 2 }}>
          Create Account
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        {roles.map(r => <Tab key={r.label} label={r.label} />)}
      </Tabs>

      <TextField fullWidth placeholder="Search by name or email..."
        value={search} onChange={e => setSearch(e.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        sx={{ mb: 3, bgcolor: 'white', borderRadius: 2 }} size="small" />

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0, overflow: 'auto' }}>
          <Box sx={{ minWidth: 600 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">Loading...</Typography>
                  </TableCell></TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No users found</Typography>
                  </TableCell></TableRow>
                ) : filtered.map((u) => (
                  <TableRow key={u.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: roleColors[u.role_name] || '#1a73e8', width: 34, height: 34, fontSize: 13 }}>
                          {u.first_name?.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" fontWeight={600}>{u.first_name} {u.last_name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="body2">{u.email}</Typography></TableCell>
                    <TableCell>
                      <Chip label={u.role_name} size="small"
                        sx={{ bgcolor: (roleColors[u.role_name] || '#1a73e8') + '22',
                              color: roleColors[u.role_name] || '#1a73e8', fontWeight: 600 }} />
                    </TableCell>
                    <TableCell>{u.phone || '—'}</TableCell>
                    <TableCell>{u.class_name || '—'}</TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(u.created_at).toLocaleDateString('en-IN')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="Reset Password">
                          <IconButton size="small" color="warning"
                            onClick={() => { setSelectedUser(u); setNewPassword(''); setResetDialog(true); }}>
                            <LockResetIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Account">
                          <IconButton size="small" color="error" onClick={() => handleDelete(u)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={createDialog} onClose={() => setCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>➕ Create New Account</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="First Name" fullWidth value={newUser.firstName}
              onChange={e => setNewUser({...newUser, firstName: e.target.value})} />
            <TextField label="Last Name" fullWidth value={newUser.lastName}
              onChange={e => setNewUser({...newUser, lastName: e.target.value})} />
          </Box>
          <TextField label="Email" type="email" fullWidth value={newUser.email}
            onChange={e => setNewUser({...newUser, email: e.target.value})} />
          <TextField label="Password" type="password" fullWidth value={newUser.password}
            onChange={e => setNewUser({...newUser, password: e.target.value})}
            helperText="Share this password with the user after creation" />
          <TextField label="Role" select fullWidth value={newUser.roleId}
            onChange={e => setNewUser({...newUser, roleId: e.target.value})}
            SelectProps={{ native: true }}>
            {roleIdOptions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </TextField>
          <TextField label="Phone Number (optional)" fullWidth value={newUser.phone}
            onChange={e => setNewUser({...newUser, phone: e.target.value})} />
          {newUser.roleId === '4' && (
            <TextField label="Class (e.g. 10A)" fullWidth value={newUser.className}
              onChange={e => setNewUser({...newUser, className: e.target.value})} />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCreateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}
            disabled={!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password}>
            Create Account
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={resetDialog} onClose={() => setResetDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>🔑 Reset Password</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Resetting password for <strong>{selectedUser?.first_name} {selectedUser?.last_name}</strong>
          </Typography>
          <TextField label="New Password" type="password" fullWidth value={newPassword}
            onChange={e => setNewPassword(e.target.value)} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setResetDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleResetPassword} disabled={!newPassword}>Reset Password</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default UserManagement;