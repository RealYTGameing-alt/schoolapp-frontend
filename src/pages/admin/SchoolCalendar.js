import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Card, CardContent, Button, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert, IconButton, Tooltip, Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';
import api from '../../services/api';

const eventTypeColors = {
  holiday: '#ea4335',
  exam: '#9c27b0',
  event: '#1a73e8',
  meeting: '#fbbc04',
  sports: '#34a853',
};

const defaultEvents = [
  { id: 1, title: 'Republic Day', event_type: 'holiday', start_date: '2026-01-26', is_holiday: true, audience: 'all', description: 'National Holiday' },
  { id: 2, title: 'Mid-term Exams', event_type: 'exam', start_date: '2026-04-01', end_date: '2026-04-08', is_holiday: false, audience: 'all', description: 'Mid-term examinations for all classes' },
  { id: 3, title: 'Annual Sports Day', event_type: 'sports', start_date: '2026-03-15', is_holiday: false, audience: 'all', description: 'Annual sports competition' },
  { id: 4, title: 'Parent-Teacher Meeting', event_type: 'meeting', start_date: '2026-03-20', is_holiday: false, audience: 'all', description: 'PTM for Classes 9 and 10' },
  { id: 5, title: 'Holi', event_type: 'holiday', start_date: '2026-03-14', is_holiday: true, audience: 'all', description: 'National Holiday' },
  { id: 6, title: 'Science Exhibition', event_type: 'event', start_date: '2026-04-15', is_holiday: false, audience: 'all', description: 'Annual science exhibition by students' },
  { id: 7, title: 'Summer Vacation', event_type: 'holiday', start_date: '2026-05-01', end_date: '2026-06-15', is_holiday: true, audience: 'all', description: 'Summer holidays' },
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const SchoolCalendar = () => {
  const [events, setEvents] = useState(defaultEvents);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [addDialog, setAddDialog] = useState(false);
  const [success, setSuccess] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayEvents, setDayEvents] = useState([]);
  const [dayDialog, setDayDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '', description: '', eventType: 'event',
    startDate: '', endDate: '', isHoliday: false, audience: 'all'
  });

  useEffect(() => {
    api.get('/calendar').then(res => {
      if (res.data.events?.length > 0) setEvents(res.data.events);
    }).catch(() => {});
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getEventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => {
      const start = e.start_date?.split('T')[0];
      const end = e.end_date?.split('T')[0] || start;
      return dateStr >= start && dateStr <= end;
    });
  };

  const handleDayClick = (day) => {
    const dayEvts = getEventsForDay(day);
    setSelectedDay(day);
    setDayEvents(dayEvts);
    setDayDialog(true);
  };

  const handleAddEvent = async () => {
    try {
      const res = await api.post('/calendar', {
        title: newEvent.title,
        description: newEvent.description,
        eventType: newEvent.eventType,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate || newEvent.startDate,
        isHoliday: newEvent.eventType === 'holiday',
        audience: newEvent.audience,
      });
      setEvents(prev => [...prev, res.data.event]);
    } catch (err) {
      // Add locally
      setEvents(prev => [...prev, {
        id: Date.now(),
        title: newEvent.title,
        description: newEvent.description,
        event_type: newEvent.eventType,
        start_date: newEvent.startDate,
        end_date: newEvent.endDate || newEvent.startDate,
        is_holiday: newEvent.eventType === 'holiday',
        audience: newEvent.audience,
      }]);
    }
    setSuccess('✅ Event added successfully!');
    setAddDialog(false);
    setNewEvent({ title: '', description: '', eventType: 'event', startDate: '', endDate: '', isHoliday: false, audience: 'all' });
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDeleteEvent = async (id) => {
    try { await api.delete(`/calendar/${id}`); } catch (err) {}
    setEvents(prev => prev.filter(e => e.id !== id));
    setDayEvents(prev => prev.filter(e => e.id !== id));
    setSuccess('✅ Event deleted!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Upcoming events sorted
  const upcomingEvents = [...events]
    .filter(e => new Date(e.start_date) >= new Date())
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
    .slice(0, 8);

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <Layout menuItems={adminMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" fontWeight={700}>📅 School Calendar</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialog(true)} sx={{ borderRadius: 2 }}>
          Add Event
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}

      <Grid container spacing={3}>
        {/* Calendar */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              {/* Month navigation */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={prevMonth}><ChevronLeftIcon /></IconButton>
                <Typography variant="h6" fontWeight={700}>{MONTHS[month]} {year}</Typography>
                <IconButton onClick={nextMonth}><ChevronRightIcon /></IconButton>
              </Box>

              {/* Day headers */}
              <Grid container sx={{ mb: 1 }}>
                {DAYS.map(d => (
                  <Grid item xs key={d} sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary">{d}</Typography>
                  </Grid>
                ))}
              </Grid>

              {/* Calendar grid */}
              <Grid container>
                {/* Empty cells before first day */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <Grid item xs key={`empty-${i}`} sx={{ aspectRatio: '1', p: 0.3 }} />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvts = getEventsForDay(day);
                  const hasEvents = dayEvts.length > 0;
                  const isHoliday = dayEvts.some(e => e.is_holiday);
                  const today = isToday(day);

                  return (
                    <Grid item xs key={day} sx={{ aspectRatio: '1', p: 0.3 }}>
                      <Box
                        onClick={() => handleDayClick(day)}
                        sx={{
                          height: '100%', minHeight: { xs: 36, md: 52 },
                          borderRadius: 2, cursor: 'pointer', p: 0.5,
                          bgcolor: today ? '#1a73e8' : isHoliday ? '#fce8e6' : hasEvents ? '#f0f7ff' : 'transparent',
                          border: today ? 'none' : hasEvents ? '1px solid #e0e0e0' : '1px solid transparent',
                          '&:hover': { bgcolor: today ? '#1557b0' : '#f0f0f0' },
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                        }}
                      >
                        <Typography variant="caption" fontWeight={today ? 700 : 400}
                          color={today ? 'white' : isHoliday ? '#ea4335' : 'text.primary'}
                          sx={{ fontSize: { xs: 11, md: 13 } }}>
                          {day}
                        </Typography>
                        {hasEvents && !today && (
                          <Box sx={{ display: 'flex', gap: 0.3, flexWrap: 'wrap', justifyContent: 'center', mt: 0.3 }}>
                            {dayEvts.slice(0, 2).map((e, idx) => (
                              <Box key={idx} sx={{
                                width: 6, height: 6, borderRadius: '50%',
                                bgcolor: eventTypeColors[e.event_type] || '#1a73e8'
                              }} />
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>

              {/* Legend */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2, pt: 2, borderTop: '1px solid #f0f0f0' }}>
                {Object.entries(eventTypeColors).map(([type, color]) => (
                  <Box key={type} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color }} />
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>{type}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>📋 Upcoming Events</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {upcomingEvents.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" textAlign="center" py={2}>
                    No upcoming events
                  </Typography>
                ) : upcomingEvents.map((e) => (
                  <Box key={e.id} sx={{
                    p: 1.5, borderRadius: 2, bgcolor: '#f8f9fa',
                    borderLeft: `4px solid ${eventTypeColors[e.event_type] || '#1a73e8'}`
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={700} noWrap>{e.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(e.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          {e.end_date && e.end_date !== e.start_date &&
                            ` — ${new Date(e.end_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`}
                        </Typography>
                      </Box>
                      <Chip label={e.event_type} size="small"
                        sx={{ bgcolor: (eventTypeColors[e.event_type] || '#1a73e8') + '20',
                              color: eventTypeColors[e.event_type] || '#1a73e8',
                              fontWeight: 600, fontSize: 10, ml: 1, flexShrink: 0 }} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Day Events Dialog */}
      <Dialog open={dayDialog} onClose={() => setDayDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>
          📅 {selectedDay} {MONTHS[month]} {year}
        </DialogTitle>
        <DialogContent>
          {dayEvents.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography color="text.secondary">No events on this day</Typography>
              <Button variant="outlined" size="small" sx={{ mt: 2, borderRadius: 2 }}
                onClick={() => {
                  setDayDialog(false);
                  setNewEvent(prev => ({
                    ...prev,
                    startDate: `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
                  }));
                  setAddDialog(true);
                }}>
                + Add Event
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
              {dayEvents.map((e) => (
                <Box key={e.id} sx={{
                  p: 2, borderRadius: 2, bgcolor: '#f8f9fa',
                  borderLeft: `4px solid ${eventTypeColors[e.event_type] || '#1a73e8'}`
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" fontWeight={700}>{e.title}</Typography>
                      {e.description && (
                        <Typography variant="caption" color="text.secondary">{e.description}</Typography>
                      )}
                      <Box sx={{ mt: 0.5 }}>
                        <Chip label={e.event_type} size="small"
                          sx={{ bgcolor: (eventTypeColors[e.event_type] || '#1a73e8') + '20',
                                color: eventTypeColors[e.event_type] || '#1a73e8', fontWeight: 600 }} />
                        {e.is_holiday && <Chip label="Holiday" size="small" color="error" sx={{ ml: 0.5 }} />}
                      </Box>
                    </Box>
                    <Tooltip title="Delete Event">
                      <IconButton size="small" color="error" onClick={() => handleDeleteEvent(e.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDayDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Event Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>➕ Add New Event</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Event Title" fullWidth value={newEvent.title}
            onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
          <TextField label="Event Type" select fullWidth value={newEvent.eventType}
            onChange={e => setNewEvent({...newEvent, eventType: e.target.value})}
            SelectProps={{ native: true }}>
            <option value="event">📌 School Event</option>
            <option value="holiday">🎉 Holiday</option>
            <option value="exam">📝 Exam</option>
            <option value="meeting">👥 Meeting</option>
            <option value="sports">🏆 Sports</option>
          </TextField>
          <TextField label="Audience" select fullWidth value={newEvent.audience}
            onChange={e => setNewEvent({...newEvent, audience: e.target.value})}
            SelectProps={{ native: true }}>
            <option value="all">Everyone</option>
            <option value="teachers">Teachers Only</option>
            <option value="students">Students Only</option>
            <option value="parents">Parents Only</option>
          </TextField>
          <TextField label="Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }}
            value={newEvent.startDate} onChange={e => setNewEvent({...newEvent, startDate: e.target.value})} />
          <TextField label="End Date (optional)" type="date" fullWidth InputLabelProps={{ shrink: true }}
            value={newEvent.endDate} onChange={e => setNewEvent({...newEvent, endDate: e.target.value})} />
          <TextField label="Description (optional)" multiline rows={2} fullWidth value={newEvent.description}
            onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddEvent}
            disabled={!newEvent.title || !newEvent.startDate}>
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default SchoolCalendar;