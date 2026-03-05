import adminMenuItems from '../../components/layout/adminMenu';
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Button, Chip, Grid,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const eventColors = { holiday: '#ea4335', exam: '#1a73e8', event: '#34a853', meeting: '#fbbc04' };

const initialEvents = [
  { id: 1, title: 'Holi Holiday', date: '2026-03-14', type: 'holiday', desc: 'School closed for Holi' },
  { id: 2, title: 'Mid-term Exams Begin', date: '2026-04-01', type: 'exam', desc: 'All classes' },
  { id: 3, title: 'Annual Sports Day', date: '2026-03-15', type: 'event', desc: 'School ground, 9am onwards' },
  { id: 4, title: 'Parent-Teacher Meeting', date: '2026-03-20', type: 'meeting', desc: 'All parents invited' },
  { id: 5, title: 'Science Exhibition', date: '2026-03-25', type: 'event', desc: 'Classes 6-10' },
  { id: 6, title: 'Ram Navami Holiday', date: '2026-04-06', type: 'holiday', desc: 'School closed' },
];

const SchoolCalendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setEvents(prev => [...prev, { id: Date.now(), ...data }]);
    toast.success('✅ Event added to calendar!');
    setOpen(false);
    reset();
  };

  const grouped = events.reduce((acc, event) => {
    const month = event.date.slice(0, 7);
    if (!acc[month]) acc[month] = [];
    acc[month].push(event);
    return acc;
  }, {});

  return (
    <Layout menuItems={adminMenuItems}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>📅 School Calendar</Typography>
          <Typography variant="body2" color="text.secondary">Events, holidays and important dates</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>
          Add Event
        </Button>
      </Box>

      <Grid container spacing={2} mb={3}>
        {Object.entries(eventColors).map(([type, color]) => (
          <Grid item key={type}>
            <Chip label={type.charAt(0).toUpperCase() + type.slice(1)}
              sx={{ bgcolor: `${color}20`, color, fontWeight: 600, borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>

      {Object.entries(grouped).sort().map(([month, monthEvents]) => (
        <Card key={month} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', mb: 2 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              {new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Typography>
            {monthEvents.sort((a, b) => a.date.localeCompare(b.date)).map((event) => (
              <Box key={event.id} sx={{
                display: 'flex', alignItems: 'center', gap: 2, p: 2, mb: 1.5,
                bgcolor: `${eventColors[event.type]}10`, borderRadius: 2,
                borderLeft: `4px solid ${eventColors[event.type]}`
              }}>
                <Box sx={{
                  minWidth: 50, textAlign: 'center', p: 1, borderRadius: 2,
                  bgcolor: `${eventColors[event.type]}20`
                }}>
                  <Typography variant="h6" fontWeight={700} color={eventColors[event.type]}>
                    {new Date(event.date).getDate()}
                  </Typography>
                  <Typography variant="caption" color={eventColors[event.type]}>
                    {new Date(event.date).toLocaleString('default', { weekday: 'short' })}
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
      ))}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Add Calendar Event</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Event Title" margin="normal" {...register('title', { required: true })} />
          <TextField fullWidth label="Date" type="date" margin="normal"
            InputLabelProps={{ shrink: true }} {...register('date', { required: true })} />
          <TextField fullWidth label="Type" margin="normal" {...register('type')}
            placeholder="holiday / exam / event / meeting" />
          <TextField fullWidth label="Description" margin="normal" multiline rows={2} {...register('desc')} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{ borderRadius: 2 }}>Add Event</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default SchoolCalendar;