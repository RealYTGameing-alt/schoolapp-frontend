import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Alert,
  Card, CardContent, InputAdornment, IconButton, CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (emailVal, passwordVal) => {
    const useEmail = emailVal || email;
    const usePassword = passwordVal || password;

    if (!useEmail || !usePassword) {
      setError('Please enter email and password.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const result = await login(useEmail, usePassword);
      const role = result?.user?.role_name?.toLowerCase();
      if (role === 'admin') navigate('/admin');
      else if (role === 'principal') navigate('/principal');
      else if (role === 'teacher') navigate('/teacher');
      else if (role === 'student') navigate('/student');
      else if (role === 'parent') navigate('/parent');
      else navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  const handleDemoLogin = async (acc) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
    await handleLogin(acc.email, acc.password);
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@school.com', password: 'admin123', color: '#ea4335' },
    { role: 'Principal', email: 'principal@school.com', password: 'principal123', color: '#9c27b0' },
    { role: 'Teacher', email: 'teacher@school.com', password: 'teacher123', color: '#1a73e8' },
    { role: 'Student', email: 'student@school.com', password: 'student123', color: '#34a853' },
    { role: 'Parent', email: 'parent@school.com', password: 'parent123', color: '#fbbc04' },
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#f0f4f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
    }}>
      <Box sx={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight={800} color="#1a73e8">
            🎓 EduManage Pro
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            School Management System
          </Typography>
        </Box>

        {/* Login Card */}
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2.5}>
              Welcome back 👋
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

            <TextField
              fullWidth label="Email" type="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }} required size="small"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <TextField
              fullWidth label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password} onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2.5 }} required size="small"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              fullWidth variant="contained"
              disabled={loading}
              onClick={() => handleLogin()}
              sx={{ borderRadius: 2, py: 1.2, fontWeight: 700, fontSize: 15 }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
            </Button>
          </CardContent>
        </Card>

        {/* Demo accounts */}
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', mt: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={1.5}>
              🔑 DEMO ACCOUNTS — TAP TO LOGIN INSTANTLY
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {demoAccounts.map((acc) => (
                <Button
                  key={acc.role}
                  fullWidth
                  variant="outlined"
                  size="small"
                  disabled={loading}
                  onClick={() => handleDemoLogin(acc)}
                  sx={{
                    borderRadius: 2,
                    borderColor: acc.color,
                    color: acc.color,
                    justifyContent: 'flex-start',
                    px: 2,
                    '&:hover': { bgcolor: acc.color + '11', borderColor: acc.color }
                  }}
                >
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: acc.color, mr: 1.5, flexShrink: 0 }} />
                  <Typography variant="caption" fontWeight={700} mr={1}>{acc.role}</Typography>
                  <Typography variant="caption" color="text.secondary">{acc.email}</Typography>
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mt={2}>
          New accounts are created by your school admin.
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;