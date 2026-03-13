import React, { useState, useEffect } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Typography, Avatar, IconButton, AppBar, Toolbar,
  Divider, useMediaQuery, useTheme, Menu, MenuItem, Badge, CircularProgress
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const DRAWER_WIDTH = 220;

// ─── Notification Bell Component ───────────────────────────────────────────
const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data.notifications || []);
      setUnread(res.data.unreadCount || 0);
    } catch (err) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await api.put('/notifications/read-all/all');
      setUnread(0);
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (err) {}
  };

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnread(prev => Math.max(0, prev - 1));
    } catch (err) {}
  };

  const typeIcons = {
    attendance: '📋',
    assignment: '📝',
    announcement: '📢',
    grade: '🎯',
    default: '🔔',
  };

  return (
    <>
      <IconButton onClick={(e) => { setAnchorEl(e.currentTarget); fetchNotifications(); }}>
        <Badge badgeContent={unread} color="error" max={99}>
          <NotificationsIcon sx={{ color: '#666' }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { borderRadius: 2, width: 360, maxHeight: 480, mt: 1 } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <Typography variant="subtitle1" fontWeight={700}>🔔 Notifications</Typography>
          {unread > 0 && (
            <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }} onClick={handleMarkAllRead}>
              Mark all read
            </Typography>
          )}
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {!loading && notifications.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4">🔔</Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>No notifications yet</Typography>
          </Box>
        )}

        {!loading && notifications.map((n) => (
          <MenuItem
            key={n.id}
            onClick={() => handleMarkRead(n.id)}
            sx={{
              py: 1.5, px: 2, alignItems: 'flex-start', gap: 1.5,
              bgcolor: n.is_read ? 'white' : '#f0f7ff',
              borderBottom: '1px solid #f5f5f5',
              whiteSpace: 'normal',
            }}
          >
            <Typography sx={{ fontSize: 20, mt: 0.3, flexShrink: 0 }}>
              {typeIcons[n.type] || typeIcons.default}
            </Typography>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={n.is_read ? 400 : 700}>
                {n.title}
              </Typography>
              <Typography variant="caption" color="text.secondary"
                sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {n.body}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" mt={0.3}>
                {new Date(n.created_at).toLocaleString('en-IN')}
              </Typography>
            </Box>
            {!n.is_read && (
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#1a73e8', mt: 0.8, flexShrink: 0 }} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// ─── Main Layout Component ──────────────────────────────────────────────────
const Layout = ({ children, menuItems }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate('/login');
  };

  const initials = user
    ? `${user.first_name?.charAt(0) || ''}${user.last_name?.charAt(0) || ''}`
    : 'U';

  const drawerContent = (
    <Box sx={{
      height: '100%',
      bgcolor: '#1a1f2e',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Logo */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography variant="h6" fontWeight={800} sx={{ color: 'white', fontSize: 16 }}>
          🎓 EduManage Pro
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* User info */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ bgcolor: '#1a73e8', width: 38, height: 38, fontSize: 14 }}>
          {initials}
        </Avatar>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography variant="body2" fontWeight={600} noWrap sx={{ color: 'white' }}>
            {user?.first_name} {user?.last_name}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6, textTransform: 'capitalize', color: 'white' }}>
            {user?.role_name}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 1 }} />

      {/* Menu items */}
      <List sx={{ flexGrow: 1, px: 1 }}>
        {(menuItems || []).map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? '#1a73e8' : 'transparent',
                  '&:hover': { bgcolor: isActive ? '#1a73e8' : 'rgba(255,255,255,0.08)' },
                  py: 1,
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 36, opacity: isActive ? 1 : 0.7 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontSize: 13, fontWeight: isActive ? 700 : 400, color: 'white' }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Logout */}
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <Box sx={{ p: 1 }}>
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}>
          <ListItemIcon sx={{ color: 'white', minWidth: 36, opacity: 0.7 }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: 13, color: 'white' }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f0f4f9' }}>

      {/* Mobile AppBar */}
      {isMobile && (
        <AppBar position="fixed" sx={{ bgcolor: '#1a1f2e', zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ minHeight: 56 }}>
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" fontWeight={800} fontSize={16}>
              🎓 EduManage Pro
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <NotificationBell />
            <Avatar
              sx={{ bgcolor: '#1a73e8', width: 32, height: 32, fontSize: 12, cursor: 'pointer', ml: 1 }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {initials}
            </Avatar>
          </Toolbar>
        </AppBar>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box sx={{ width: DRAWER_WIDTH, flexShrink: 0 }}>
          <Box sx={{ width: DRAWER_WIDTH, position: 'fixed', top: 0, left: 0, bottom: 0 }}>
            {drawerContent}
          </Box>
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' } }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main content */}
      <Box sx={{ flexGrow: 1, minWidth: 0, mt: isMobile ? '56px' : 0 }}>

        {/* Desktop topbar */}
        {!isMobile && (
          <Box sx={{
            bgcolor: 'white', px: 3, py: 1.5,
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 100,
          }}>
            <NotificationBell />
            <Typography variant="body2" color="text.secondary" mx={2}>
              {user?.first_name} {user?.last_name}
            </Typography>
            <Avatar
              sx={{ bgcolor: '#1a73e8', width: 34, height: 34, fontSize: 13, cursor: 'pointer' }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {initials}
            </Avatar>
          </Box>
        )}

        {/* Page content */}
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {children}
        </Box>
      </Box>

      {/* Profile Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 200, mt: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' } }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
          <Typography variant="body2" fontWeight={700}>
            {user?.first_name} {user?.last_name}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
            {user?.role_name}
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ gap: 1.5, py: 1.2 }}>
          <PersonIcon fontSize="small" color="action" />
          <Typography variant="body2">My Profile</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ gap: 1.5, py: 1.2, color: '#ea4335' }}>
          <LogoutIcon fontSize="small" />
          <Typography variant="body2" color="#ea4335">Logout</Typography>
        </MenuItem>
      </Menu>

    </Box>
  );
};

export default Layout;