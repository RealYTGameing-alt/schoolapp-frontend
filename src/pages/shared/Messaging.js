import React, { useState } from 'react';
import {
  Typography, Box, TextField, Button,
  Avatar, List, ListItem, ListItemAvatar, ListItemText,
  Divider, Badge, InputAdornment, Chip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/AuthContext';

const allMenuItems = {
  admin: [
    { text: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
    { text: 'Students', path: '/admin/students', icon: <SchoolIcon /> },
    { text: 'Staff & HR', path: '/admin/staff', icon: <PeopleIcon /> },
    { text: 'Fee Management', path: '/admin/fees', icon: <AttachMoneyIcon /> },
    { text: 'Admissions', path: '/admin/admissions', icon: <AssignmentIcon /> },
    { text: 'Calendar', path: '/admin/calendar', icon: <EventNoteIcon /> },
    { text: 'Messages', path: '/admin/messages', icon: <MessageIcon /> },
    { text: 'Reports', path: '/admin/reports', icon: <BarChartIcon /> },
  ],
  teacher: [
    { text: 'Dashboard', path: '/teacher', icon: <DashboardIcon /> },
    { text: 'Attendance', path: '/teacher/attendance', icon: <CheckCircleIcon /> },
    { text: 'Assignments', path: '/teacher/assignments', icon: <AssignmentIcon /> },
    { text: 'Exams', path: '/teacher/exams', icon: <QuizIcon /> },
    { text: 'Lesson Plans', path: '/teacher/lessons', icon: <MenuBookIcon /> },
    { text: 'Messages', path: '/teacher/messages', icon: <MessageIcon /> },
  ],
  student: [
    { text: 'Dashboard', path: '/student', icon: <DashboardIcon /> },
    { text: 'Assignments', path: '/student/assignments', icon: <AssignmentIcon /> },
    { text: 'Study Materials', path: '/student/materials', icon: <MenuBookIcon /> },
    { text: 'My Progress', path: '/student/progress', icon: <BarChartIcon /> },
    { text: 'Timetable', path: '/student/timetable', icon: <EventNoteIcon /> },
    { text: 'Messages', path: '/student/messages', icon: <MessageIcon /> },
  ],
  parent: [
    { text: 'Dashboard', path: '/parent', icon: <DashboardIcon /> },
    { text: "Child's Progress", path: '/parent/progress', icon: <BarChartIcon /> },
    { text: 'Fee Payments', path: '/parent/fees', icon: <AttachMoneyIcon /> },
    { text: 'Messages', path: '/parent/messages', icon: <MessageIcon /> },
    { text: 'School Calendar', path: '/parent/calendar', icon: <EventNoteIcon /> },
  ],

  principal: [
  { text: 'Dashboard', path: '/principal', icon: <DashboardIcon /> },
  { text: 'Teachers', path: '/principal/teachers', icon: <PeopleIcon /> },
  { text: 'Students', path: '/principal/students', icon: <SchoolIcon /> },
  { text: 'Attendance Reports', path: '/principal/attendance', icon: <CheckCircleIcon /> },
  { text: 'Announcements', path: '/principal/announcements', icon: <MessageIcon /> },
  { text: 'Messages', path: '/principal/messages', icon: <MessageIcon /> },
],
};

// Each role sees ONLY their relevant contacts
const contactsByRole = {
  admin: [
    { id: 'a1', name: 'Rajesh Kumar', role: 'Teacher', avatar: 'RK', online: true },
    { id: 'a2', name: 'Sunita Sharma', role: 'Teacher', avatar: 'SS', online: false },
    { id: 'a3', name: 'Dr. Meena Verma', role: 'Principal', avatar: 'MV', online: true },
    { id: 'a4', name: 'Vikram Nair', role: 'Staff', avatar: 'VN', online: false },
  ],
  teacher: [
    { id: 't1', name: 'Admin User', role: 'Admin', avatar: 'AU', online: true },
    { id: 't2', name: 'Suresh Sharma', role: 'Parent', avatar: 'SS', online: true },
    { id: 't3', name: 'Dr. Meena Verma', role: 'Principal', avatar: 'MV', online: false },
    { id: 't4', name: 'Sunita Sharma', role: 'Teacher', avatar: 'ST', online: true },
  ],
  student: [
    { id: 's1', name: 'Rajesh Kumar', role: 'Teacher (Math)', avatar: 'RK', online: true },
    { id: 's2', name: 'Sunita Sharma', role: 'Teacher (Science)', avatar: 'SS', online: false },
    { id: 's3', name: 'Priya Menon', role: 'Teacher (English)', avatar: 'PM', online: true },
  ],
  parent: [
    { id: 'p1', name: 'Rajesh Kumar', role: 'Class Teacher', avatar: 'RK', online: true },
    { id: 'p2', name: 'Admin User', role: 'Admin', avatar: 'AU', online: false },
    { id: 'p3', name: 'Dr. Meena Verma', role: 'Principal', avatar: 'MV', online: false },
  ],
  principal: [
  { id: 'pr1', name: 'Admin User', role: 'Admin', avatar: 'AU', online: true },
  { id: 'pr2', name: 'Rajesh Kumar', role: 'Teacher', avatar: 'RK', online: true },
  { id: 'pr3', name: 'Sunita Sharma', role: 'Teacher', avatar: 'SS', online: false },
  { id: 'pr4', name: 'Priya Menon', role: 'Teacher', avatar: 'PM', online: true },
],

// In messagesByRole add:
principal: {
  pr1: [{ id: 1, from: 'them', text: 'Board inspection scheduled for April 15.', time: 'Monday' }],
  pr2: [{ id: 1, from: 'them', text: 'Week 11 lesson plans submitted.', time: '9:00 AM' }],
  pr3: [{ id: 1, from: 'them', text: 'Science lab equipment request submitted.', time: 'Yesterday' }],
  pr4: [{ id: 1, from: 'them', text: 'English exam papers are ready.', time: '11:00 AM' }],
},

};

// Each role has their own private message history
const messagesByRole = {
  admin: {
    a1: [
      { id: 1, from: 'them', text: 'Good morning! Attendance report for Class 10A is ready.', time: '9:00 AM' },
      { id: 2, from: 'me', text: 'Thank you Rajesh, please send it over.', time: '9:05 AM' },
    ],
    a2: [
      { id: 1, from: 'them', text: 'Science lab equipment list has been submitted.', time: 'Yesterday' },
      { id: 2, from: 'me', text: 'Approved. Purchase order will be raised.', time: 'Yesterday' },
    ],
    a3: [
      { id: 1, from: 'them', text: 'Board inspection is scheduled for April 15th.', time: 'Monday' },
      { id: 2, from: 'me', text: 'Understood. We will prepare all documents.', time: 'Monday' },
    ],
    a4: [
      { id: 1, from: 'them', text: 'Leave application submitted for March 20-21.', time: '10:00 AM' },
    ],
  },
  teacher: {
    t1: [
      { id: 1, from: 'them', text: 'Please submit your lesson plans for next week by Friday.', time: '8:00 AM' },
      { id: 2, from: 'me', text: 'Sure, I will submit them by Thursday.', time: '8:30 AM' },
    ],
    t2: [
      { id: 1, from: 'them', text: "How is Arjun performing in Mathematics?", time: '9:00 AM' },
      { id: 2, from: 'me', text: 'Arjun is doing well! His last test score was 88%.', time: '9:10 AM' },
      { id: 3, from: 'them', text: 'That is great to hear, thank you!', time: '9:12 AM' },
    ],
    t3: [
      { id: 1, from: 'them', text: 'Staff meeting this Friday at 3 PM in the conference room.', time: 'Yesterday' },
    ],
    t4: [
      { id: 1, from: 'them', text: 'Can we swap periods on Wednesday?', time: '11:00 AM' },
      { id: 2, from: 'me', text: 'Yes that works for me!', time: '11:15 AM' },
    ],
  },
  student: {
    s1: [
      { id: 1, from: 'them', text: 'Please complete Chapter 5 problems before Friday.', time: '10:00 AM' },
      { id: 2, from: 'me', text: 'Yes sir, I will complete them.', time: '10:05 AM' },
    ],
    s2: [
      { id: 1, from: 'them', text: 'Your lab report was very well written. Keep it up!', time: 'Yesterday' },
      { id: 2, from: 'me', text: 'Thank you ma\'am!', time: 'Yesterday' },
    ],
    s3: [
      { id: 1, from: 'them', text: 'Your essay topic has been approved. You may start writing.', time: 'Monday' },
    ],
  },
  parent: {
    p1: [
      { id: 1, from: 'me', text: "How is Arjun performing in Mathematics?", time: '9:00 AM' },
      { id: 2, from: 'them', text: 'Arjun is doing very well! Scored 88% in last test.', time: '9:10 AM' },
      { id: 3, from: 'me', text: 'That is wonderful, thank you for the update!', time: '9:12 AM' },
    ],
    p2: [
      { id: 1, from: 'them', text: 'Activity fee payment is pending. Please pay by March 10.', time: 'Yesterday' },
    ],
    p3: [
      { id: 1, from: 'them', text: 'Parent-Teacher meeting is on March 20. Please attend.', time: 'Monday' },
    ],
  },
};

const Messaging = () => {
  const { user } = useAuth();
  const role = user?.role_name || 'teacher';
  const menuItems = allMenuItems[role] || allMenuItems.teacher;
  const contacts = contactsByRole[role] || [];
  const [selected, setSelected] = useState(contacts[0]);
  const [messages, setMessages] = useState(messagesByRole[role] || {});
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), from: 'me', text: input, time: 'Just now' };
    setMessages(prev => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), newMsg]
    }));
    setInput('');
  };

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!selected) return null;

  return (
    <Layout menuItems={menuItems}>
      <Typography variant="h5" fontWeight={700} mb={3}>💬 Messages</Typography>
      <Box sx={{
        display: 'flex', height: '75vh', bgcolor: 'white', borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden'
      }}>

        {/* Left: Contact List */}
        <Box sx={{ width: 300, borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary" mb={1}>
              {role === 'admin' ? '👥 Staff & Teachers' :
               role === 'teacher' ? '📋 My Contacts' :
               role === 'student' ? '👨‍🏫 My Teachers' : '🏫 School Staff'}
            </Typography>
            <TextField fullWidth size="small" placeholder="Search..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
            />
          </Box>
          <List sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
            {filtered.map((contact) => (
              <React.Fragment key={contact.id}>
                <ListItem button onClick={() => setSelected(contact)}
                  sx={{ bgcolor: selected?.id === contact.id ? '#e8f0fe' : 'transparent', px: 2, py: 1.5 }}>
                  <ListItemAvatar>
                    <Badge color="success" variant="dot" invisible={!contact.online}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                      <Avatar sx={{ bgcolor: '#1a73e8', fontSize: 13, width: 40, height: 40 }}>{contact.avatar}</Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={600}>{contact.name}</Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">{contact.role}</Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Right: Chat Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'white' }}>
            <Badge color="success" variant="dot" invisible={!selected.online}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <Avatar sx={{ bgcolor: '#1a73e8' }}>{selected.avatar}</Avatar>
            </Badge>
            <Box>
              <Typography variant="body1" fontWeight={600}>{selected.name}</Typography>
              <Typography variant="caption" color={selected.online ? 'success.main' : 'text.secondary'}>
                {selected.online ? '● Online' : '○ Offline'} • {selected.role}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Chip label="🔒 Private Chat" size="small" sx={{ bgcolor: '#e8f0fe', color: '#1a73e8', fontSize: 11 }} />
            </Box>
          </Box>

          {/* Messages */}
          <Box sx={{
            flexGrow: 1, overflow: 'auto', p: 3,
            display: 'flex', flexDirection: 'column', gap: 1.5, bgcolor: '#f8f9fa'
          }}>
            {(messages[selected.id] || []).length === 0 && (
              <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h4">💬</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  No messages yet. Say hello to {selected.name}!
                </Typography>
              </Box>
            )}
            {(messages[selected.id] || []).map((msg) => (
              <Box key={msg.id} sx={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
                {msg.from === 'them' && (
                  <Avatar sx={{ width: 28, height: 28, bgcolor: '#1a73e8', fontSize: 11, mr: 1, mt: 0.5, flexShrink: 0 }}>
                    {selected.avatar}
                  </Avatar>
                )}
                <Box sx={{
                  maxWidth: '65%', p: 1.5,
                  borderRadius: msg.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  bgcolor: msg.from === 'me' ? '#1a73e8' : 'white',
                  color: msg.from === 'me' ? 'white' : 'text.primary',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                }}>
                  <Typography variant="body2">{msg.text}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', textAlign: 'right', mt: 0.3, fontSize: 10 }}>
                    {msg.time}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Input */}
          <Box sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex', gap: 1, bgcolor: 'white' }}>
            <TextField fullWidth size="small" placeholder={`Message ${selected.name}...`}
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              sx={{ bgcolor: '#f8f9fa', borderRadius: 3 }}
            />
            <Button variant="contained" onClick={sendMessage}
              disabled={!input.trim()}
              sx={{ borderRadius: 2, minWidth: 48, px: 2 }}>
              <SendIcon fontSize="small" />
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Messaging;