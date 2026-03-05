import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!user) return <Navigate to="/login" />;
  if (role && user.role_name !== role && user.role_name !== 'admin') {
    return <Navigate to={`/${user.role_name}`} />;
  }

  return children;
};

export default PrivateRoute;