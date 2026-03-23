import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Card, CardContent, Chip, Grid,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Layout from '../../components/layout/Layout';
import { studentMenu } from '../../components/layout/menus';
import api from '../../services/api';

const eventTypeColors = {
  holiday: '#ea4335', exam: '#9c27b0',
  event: '#1a73e8', meeting: '#fbbc04', sports: '#34a853',
};

const defaultEvents = [
  { id: 1, title: 'Republic Day', event_type: 'holiday', start_date: '2026-01-26', is_holiday: true, description: 'National Holiday' },
  { id: 2, title: 'Mid-term Exams', event_type: 'exam', start_date: '2026-04-01', end_date: '2026-04-08', description: 'Mid-term examinations' },
  { id: 3, title: 'Annual Sports Day', event_type: 'sports', start_date: '2026-03-15', description: 'Annual sports competition' },
  { id: 4, title: 'Holi', event_type: 'holiday', start_date: '2026-03-14', is_holiday: true, description: 'National Holiday' },
  { id: 5, title: 'Science Exhibition', event_type: 'event', start_date: '2026-04-15', description: 'Annual science exhibition' },
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const StudentCalendar = () => {
  const [events, setEvents] = useState(defaultEvents);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayEvents, setDayEvents] = useState([]);
  const [dayDialog, setDayDialog] = useState(false);

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

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const upcomingEvents = [...events]
    .filter(e => new Date(e.start_date) >= new Date())
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
    .slice(0, 6);

  return (
    <Layout menuItems={studentMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>📅 School Calendar</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              {/* Month navigation */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={() => setCurrentDate(new Date(year, month - 1, 1))}><ChevronLeftIcon /></IconButton>
                <Typography variant="h6" fontWeight={700}>{MONTHS[month]} {year}</Typography>
                <IconButton onClick={() => setCurrentDate(new Date(year, month + 1, 1))}><ChevronRightIcon /></IconButton>
              </Box>

              {/* ── Fixed day headers ── */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                mb: 1,
                borderBottom: '1px solid #f0f0f0',
                pb: 1,
              }}>
                {DAYS.map(d => (
                  <Box key={d} sx={{ textAlign: 'center', py: 0.5 }}>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      color="text.secondary"
                      sx={{ fontSize: { xs: 11, md: 13 } }}
                    >
                      {d}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* ── Fixed calendar grid ── */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 0.5,
              }}>
                {/* Empty cells before first day */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <Box key={`empty-${i}`} />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvts = getEventsForDay(day);
                  const hasEvents = dayEvts.length > 0;
                  const isHoliday = dayEvts.some(e => e.is_holiday);
                  const todayFlag = isToday(day);

                  return (
                    <Box
                      key={day}
                      onClick={() => { setSelectedDay(day); setDayEvents(dayEvts); setDayDialog(true); }}
                      sx={{
                        minHeight: { xs: 40, md: 52 },
                        borderRadius: 2,
                        cursor: 'pointer',
                        p: 0.5,
                        bgcolor: todayFlag ? '#1a73e8' : isHoliday ? '#fce8e6' : hasEvents ? '#f0f7ff' : 'transparent',
                        border: todayFlag ? 'none' : hasEvents ? '1px solid #e0e0e0' : '1px solid transparent',
                        '&:hover': { bgcolor: todayFlag ? '#1557b0' : '#f0f0f0' },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="caption"
                        fontWeight={todayFlag ? 700 : 400}
                        color={todayFlag ? 'white' : isHoliday ? '#ea4335' : 'text.primary'}
                        sx={{ fontSize: { xs: 11, md: 13 }, lineHeight: 1 }}
                      >
                        {day}
                      </Typography>
                      {hasEvents && !todayFlag && (
                        <Box sx={{ display: 'flex', gap: 0.3, flexWrap: 'wrap', justifyContent: 'center', mt: 0.4 }}>
                          {dayEvts.slice(0, 2).map((e, idx) => (
                            <Box key={idx} sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: eventTypeColors[e.event_type] || '#1a73e8' }} />
                          ))}
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>

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
                {upcomingEvents.map((e) => (
                  <Box key={e.id} sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f8f9fa',
                    borderLeft: `4px solid ${eventTypeColors[e.event_type] || '#1a73e8'}` }}>
                    <Typography variant="body2" fontWeight={700}>{e.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(e.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </Typography>
                    <Box mt={0.5}>
                      <Chip label={e.event_type} size="small"
                        sx={{ bgcolor: (eventTypeColors[e.event_type] || '#1a73e8') + '20',
                              color: eventTypeColors[e.event_type] || '#1a73e8', fontWeight: 600, fontSize: 10 }} />
                      {e.is_holiday && <Chip label="Holiday" size="small" color="error" sx={{ ml: 0.5 }} />}
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Day Dialog */}
      <Dialog open={dayDialog} onClose={() => setDayDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>📅 {selectedDay} {MONTHS[month]} {year}</DialogTitle>
        <DialogContent>
          {dayEvents.length === 0 ? (
            <Typography color="text.secondary" textAlign="center" py={2}>No events on this day</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
              {dayEvents.map((e) => (
                <Box key={e.id} sx={{ p: 2, borderRadius: 2, bgcolor: '#f8f9fa',
                  borderLeft: `4px solid ${eventTypeColors[e.event_type] || '#1a73e8'}` }}>
                  <Typography variant="body2" fontWeight={700}>{e.title}</Typography>
                  {e.description && <Typography variant="caption" color="text.secondary">{e.description}</Typography>}
                  <Box mt={0.5}>
                    <Chip label={e.event_type} size="small"
                      sx={{ bgcolor: (eventTypeColors[e.event_type] || '#1a73e8') + '20',
                            color: eventTypeColors[e.event_type] || '#1a73e8' }} />
                    {e.is_holiday && <Chip label="Holiday" size="small" color="error" sx={{ ml: 0.5 }} />}
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
    </Layout>
  );
};

export default StudentCalendar;