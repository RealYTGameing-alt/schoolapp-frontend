import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Grid } from '@mui/material';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MessageIcon from '@mui/icons-material/Message';
import EventNoteIcon from '@mui/icons-material/EventNote';

const menuItems = [
  { text: 'Dashboard', path: '/parent', icon: <DashboardIcon /> },
  { text: "Child's Progress", path: '/parent/progress', icon: <BarChartIcon /> },
  { text: 'Fee Payments', path: '/parent/fees', icon: <AttachMoneyIcon /> },
  { text: 'Messages', path: '/parent/messages', icon: <MessageIcon /> },
  { text: 'School Calendar', path: '/parent/calendar', icon: <EventNoteIcon /> },
];

const eventColors = { holiday: '#ea4335', exam: '#1a73e8', event: '#34a853', meeting: '#fbbc04' };

const events = [
  { id: 1, title: 'Holi Holiday', date: '2026-03-14', type: 'holiday', desc: 'School closed' },
  { id: 2, title: 'Annual Sports Day', date: '2026-03-15', type: 'event', desc: 'School ground, 9am onwards' },
  { id: 3, title: 'Parent-Teacher Meeting', date: '2026-03-20', type: 'meeting', desc: 'All parents invited, 10am-1pm' },
  { id: 4, title: 'Mid-term Exams Begin', date: '2026-04-01', type: 'exam', desc: 'All classes' },
  { id: 5, title: 'Science Exhibition', date: '2026-03-25', type: 'event', desc: 'Classes 6-10' },
  { id: 6, title: 'Ram Navami Holiday', date: '2026-04-06', type: 'holiday', desc: 'School closed' },
];

const ParentCalendar = () => {
  return (
    <Layout menuItems={menuItems}>
      <Typography variant="h5" fontWeight={700} mb={1}>📅 School Calendar</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Upcoming events and important dates</Typography>

      <Grid container spacing={1} mb={3}>
        {Object.entries(eventColors).map(([type, color]) => (
          <Grid item key={type}>
            <Chip label={type.charAt(0).toUpperCase() + type.slice(1)}
              sx={{ bgcolor: `${color}20`, color, fontWeight: 600 }} />
          </Grid>
        ))}
      </Grid>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 3 }}>
          {events.sort((a, b) => a.date.localeCompare(b.date)).map((event) => (
            <Box key={event.id} sx={{
              display: 'flex', alignItems: 'center', gap: 2, p: 2, mb: 2,
              bgcolor: `${eventColors[event.type]}10`, borderRadius: 2,
              borderLeft: `4px solid ${eventColors[event.type]}`
            }}>
              <Box sx={{ minWidth: 52, textAlign: 'center', p: 1, borderRadius: 2, bgcolor: `${eventColors[event.type]}20` }}>
                <Typography variant="h6" fontWeight={700} color={eventColors[event.type]}>
                  {new Date(event.date).getDate()}
                </Typography>
                <Typography variant="caption" color={eventColors[event.type]}>
                  {new Date(event.date).toLocaleString('default', { month: 'short' })}
                </Typography>
              </Box>
              <Box flexGrow={1}>
                <Typography variant="body1" fontWeight={600}>{event.title}</Typography>
                <Typography variant="caption" color="text.secondary">{event.desc}</Typography>
              </Box>
              <Chip label={event.type} size="small"
                sx={{ bgcolor: `${eventColors[event.type]}20`, color: eventColors[event.type], fontWeight: 600 }} />
            </Box>
          ))}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ParentCalendar;