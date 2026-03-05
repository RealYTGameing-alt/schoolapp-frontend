import React, { useState } from 'react';
import {
  Box, Drawer, AppBar, Toolbar, Typography, IconButton,
  List, ListItem, ListItemIcon, ListItemText, Avatar,
  Divider, useTheme, Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DRAWER_WIDTH = 260;

const Layout = ({ children, menuItems, title }) => {
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" elevation={0} sx={{
        zIndex: theme.zIndex.drawer + 1,
        bgcolor: 'white',
        borderBottom: '1px solid #e0e0e0',
        color: 'text.primary'
      }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => setOpen(!open)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <SchoolIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" fontWeight={700} color="primary.main" sx={{ flexGrow: 1 }}>
            EduManage Pro
          </Typography>
          <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
            {user?.first_name} {user?.last_name}
          </Typography>
          <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, mr: 1, fontSize: 14 }}>
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </Avatar>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout} color="error">
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer variant="persistent" open={open} sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: '#1a1a2e',
          color: 'white',
          borderRight: 'none',
        },
      }}>
        <Toolbar />
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mx: 'auto', mb: 1, fontSize: 20 }}>
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </Avatar>
          <Typography variant="body1" fontWeight={600}>{user?.first_name} {user?.last_name}</Typography>
          <Typography variant="caption" sx={{ color: '#aaa', textTransform: 'capitalize' }}>
            {user?.role_name}
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: '#333' }} />
        <List sx={{ px: 1, mt: 1 }}>
          {menuItems?.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2, mb: 0.5,
                '&:hover': { bgcolor: '#ffffff15' },
                color: 'white'
              }}
            >
              <ListItemIcon sx={{ color: '#90caf9', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{
        flexGrow: 1,
        p: 3,
        mt: 8,
        transition: 'margin 0.3s',
        ml: open ? `${DRAWER_WIDTH}px` : 0,
      }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;