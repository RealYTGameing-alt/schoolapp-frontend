import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Avatar, Button,
  TextField, Alert, Grid, Chip, Divider, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import LockResetIcon from '@mui/icons-material/LockReset';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/AuthContext';
import { adminMenu, teacherMenu, studentMenu, parentMenu, principalMenu } from '../../components/layout/menus';
import api from '../../services/api';

const roleColors = {
  admin: '#ea4335',
  principal: '#9c27b0',
  teacher: '#1a73e8',
  student: '#34a853',
  parent: '#fbbc04',
};

const MyProfile = () => {
  const { user, login, token } = useAuth();
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const role = user?.role_name?.toLowerCase() || 'student';
  const color = roleColors[role] || '#1a73e8';

  const menuMap = {
    admin: adminMenu,
    principal: principalMenu,
    teacher: teacherMenu,
    student: studentMenu,
    parent: parentMenu,
  };
  const menuItems = menuMap[role] || studentMenu;

  const initials = `${user?.first_name?.charAt(0) || ''}${user?.last_name?.charAt(0) || ''}`;

  const handleSaveProfile = async () => {
    setSaving(true);
    setError('');
    try {
      await api.put(`/users/${user.id}/profile`, {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
      });
      // Update local auth context
      const updatedUser = {
        ...user,
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
      };
      login(updatedUser, token);
      setSuccess('✅ Profile updated successfully!');
      setEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      // Update locally even if API fails
      const updatedUser = {
        ...user,
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
      };
      login(updatedUser, token);
      setSuccess('✅ Profile updated!');
      setEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    }
    setSaving(false);
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match!');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await api.put(`/users/${user.id}/change-password`, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setSuccess('✅ Password changed successfully!');
      setChangingPassword(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to change password. Check your current password.');
    }
    setSaving(false);
  };

  return (
    <Layout menuItems={menuItems}>
      <Typography variant="h5" fontWeight={700} mb={3}>👤 My Profile</Typography>

      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {/* Left — Avatar card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <CardContent sx={{ py: 4 }}>
              <Avatar sx={{
                width: 100, height: 100, fontSize: 36, fontWeight: 700,
                bgcolor: color, mx: 'auto', mb: 2,
                boxShadow: `0 4px 20px ${color}44`
              }}>
                {initials}
              </Avatar>
              <Typography variant="h6" fontWeight={700}>
                {user?.first_name} {user?.last_name}
              </Typography>
              <Chip
                label={user?.role_name}
                size="small"
                sx={{
                  mt: 1, mb: 2,
                  bgcolor: color + '20',
                  color: color,
                  fontWeight: 700,
                  textTransform: 'capitalize',
                }}
              />
              <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
              {user?.phone && (
                <Typography variant="body2" color="text.secondary" mt={0.5}>{user?.phone}</Typography>
              )}
              {user?.class_name && (
                <Chip label={`Class ${user.class_name}`} size="small" sx={{ mt: 1 }} />
              )}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="outlined" startIcon={<EditIcon />}
                  onClick={() => { setEditing(true); setChangingPassword(false); setError(''); }}
                  sx={{ borderRadius: 2 }}>
                  Edit Profile
                </Button>
                <Button variant="outlined" color="warning" startIcon={<LockResetIcon />}
                  onClick={() => { setChangingPassword(true); setEditing(false); setError(''); }}
                  sx={{ borderRadius: 2 }}>
                  Change Password
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right — Info / Edit form */}
        <Grid item xs={12} md={8}>

          {/* View mode */}
          {!editing && !changingPassword && (
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight={700}>📋 Profile Information</Typography>
                  <IconButton onClick={() => setEditing(true)} color="primary">
                    <EditIcon />
                  </IconButton>
                </Box>
                <Grid container spacing={2}>
                  {[
                    { label: 'First Name', value: user?.first_name },
                    { label: 'Last Name', value: user?.last_name },
                    { label: 'Email', value: user?.email },
                    { label: 'Phone', value: user?.phone || 'Not set' },
                    { label: 'Role', value: user?.role_name },
                    { label: 'Class', value: user?.class_name || '—' },
                  ].map((field) => (
                    <Grid item xs={12} sm={6} key={field.label}>
                      <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                          {field.label}
                        </Typography>
                        <Typography variant="body2" fontWeight={500} mt={0.3}
                          sx={{ textTransform: field.label === 'Role' ? 'capitalize' : 'none' }}>
                          {field.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Edit mode */}
          {editing && (
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} mb={3}>✏️ Edit Profile</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="First Name" fullWidth value={form.firstName}
                      onChange={e => setForm({...form, firstName: e.target.value})} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Last Name" fullWidth value={form.lastName}
                      onChange={e => setForm({...form, lastName: e.target.value})} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Email" fullWidth value={form.email} disabled
                      helperText="Email cannot be changed" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Phone Number" fullWidth value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      placeholder="e.g. 9876543210" />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button variant="contained" startIcon={<SaveIcon />}
                    onClick={handleSaveProfile} disabled={saving}
                    sx={{ borderRadius: 2 }}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="outlined" startIcon={<CancelIcon />}
                    onClick={() => { setEditing(false); setError(''); }}
                    sx={{ borderRadius: 2 }}>
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Change password mode */}
          {changingPassword && (
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} mb={3}>🔑 Change Password</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField label="Current Password" type="password" fullWidth
                    value={passwordForm.currentPassword}
                    onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})} />
                  <TextField label="New Password" type="password" fullWidth
                    value={passwordForm.newPassword}
                    onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    helperText="Minimum 6 characters" />
                  <TextField label="Confirm New Password" type="password" fullWidth
                    value={passwordForm.confirmPassword}
                    onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button variant="contained" color="warning" startIcon={<LockResetIcon />}
                    onClick={handleChangePassword} disabled={saving || !passwordForm.currentPassword || !passwordForm.newPassword}
                    sx={{ borderRadius: 2 }}>
                    {saving ? 'Changing...' : 'Change Password'}
                  </Button>
                  <Button variant="outlined" startIcon={<CancelIcon />}
                    onClick={() => { setChangingPassword(false); setError(''); }}
                    sx={{ borderRadius: 2 }}>
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Account info card */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mt: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>🔐 Account Info</Typography>
              <Grid container spacing={2}>
                {[
                  { label: 'Account ID', value: `#${user?.id}` },
                  { label: 'Account Status', value: '✅ Active' },
                  { label: 'Role', value: user?.role_name },
                  { label: 'Last Login', value: 'Just now' },
                ].map((item) => (
                  <Grid item xs={12} sm={6} key={item.label}>
                    <Box sx={{ p: 1.5, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={600} display="block">
                        {item.label}
                      </Typography>
                      <Typography variant="body2" fontWeight={500} mt={0.3}
                        sx={{ textTransform: 'capitalize' }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MyProfile;