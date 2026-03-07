import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Chip, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';

const initialEvents = [
  { id: 1, title: 'Holi Holiday', date: '2026-03-14', type: 'holiday', description: 'School closed for Holi' },
  { id: 2, title: 'Annual Sports Day', date: '2026-03-15', type: 'event', description: 'School ground, 9am onwards' },
  { id: 3, title: 'Parent-Teacher Meeting', date: '2026-03-20', type: 'meeting', description: 'All parents invited' },
  { id: 4, title: 'Science Exhibition', date: '2026-03-25', type: 'event', description: 'Classes 6-10' },
  { id: 5, title: 'Mid-term Exams Begin', date: '2026-04-01', type: 'exam', description: 'All classes' },
  { id: 6, title: 'Mid-term Exams End', date: '2026-04-08', type: 'exam', description: 'All classes' },
];

const typeColors = {
  holiday: '#ea4335', exam: '#1a73e8', event: '#34a853', meeting: '#fbbc04'
};

const groupByMonth = (events) => {
  return events.reduce((acc, event) => {
    const month = new Date(event.date).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[month]) acc[month] = [];
    acc[month].push(event);
    return acc;
  }, {});
};

const SchoolCalendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', type: 'event', description: '' });

  const grouped = groupByMonth(events);

  const addEvent = () => {
    setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
    setOpen(false);
    setNewEvent({ title: '', date: '', type: 'event', description: '' });
  };

  return (
    <Layout menuItems={adminMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>📅 School Calendar</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>
          Add Event
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        {Object.entries(typeColors).map(([type, color]) => (
          <Chip key={type} label={type.charAt(0).toUpperCase() + type.slice(1)}
            sx={{ bgcolor: color + '22', color: color, fontWeight: 600, textTransform: 'capitalize' }} />
        ))}
      </Box>

      {Object.entries(grouped).map(([month, monthEvents]) => (
        <Box key={month} mb={3}>
          <Typography variant="h6" fontWeight={700} mb={2}>{month}</Typography>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {monthEvents.sort((a,b) => new Date(a.date) - new Date(b.date)).map((event, i) => {
                const d = new Date(event.date);
                const color = typeColors[event.type] || '#1a73e8';
                return (
                  <Box key={event.id} sx={{
                    display: 'flex', alignItems: 'center', gap: 2, p: 2,
                    borderLeft: `4px solid ${color}`, bgcolor: color + '11',
                    borderRadius: 1, mb: i < monthEvents.length - 1 ? 1 : 0
                  }}>
                    <Box sx={{ textAlign: 'center', minWidth: 48, bgcolor: color, borderRadius: 2, p: 1, color: 'white' }}>
                      <Typography variant="h6" fontWeight={700} lineHeight={1}>{d.getDate()}</Typography>
                      <Typography variant="caption">{d.toLocaleString('default', { weekday: 'short' })}</Typography>
                    </Box>
                    <Box flexGrow={1}>
                      <Typography variant="body1" fontWeight={600}>{event.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{event.description}</Typography>
                    </Box>
                    <Chip label={event.type} size="small" sx={{ bgcolor: color + '22', color: color }} />
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Box>
      ))}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>➕ Add New Event</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Event Title" fullWidth value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
          <TextField label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
          <TextField label="Type" select fullWidth value={newEvent.type} onChange={e => setNewEvent({...newEvent, type: e.target.value})}
            SelectProps={{ native: true }}>
            <option value="event">Event</option>
            <option value="holiday">Holiday</option>
            <option value="exam">Exam</option>
            <option value="meeting">Meeting</option>
          </TextField>
          <TextField label="Description" fullWidth value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={addEvent} disabled={!newEvent.title || !newEvent.date}>Add Event</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default SchoolCalendar;