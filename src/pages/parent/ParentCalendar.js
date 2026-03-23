import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Card, CardContent, Chip, Grid,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Layout from '../../components/layout/Layout';
import { parentMenu } from '../../components/layout/menus';
import api from '../../services/api';

const eventTypeColors = {
  holiday: '#ea4335',
  exam: '#9c27b0',
  event: '#1a73e8',
  meeting: '#fbbc04',
  sports: '#34a853',
};

const defaultEvents = [
  { id: 1, title: 'Republic Day', event_type: 'holiday', start_date: '2026-01-26', is_holiday: true },
  { id: 2, title: 'Mid-term Exams', event_type: 'exam', start_date: '2026-04-01', end_date: '2026-04-08' },
  { id: 3, title: 'Annual Sports Day', event_type: 'sports', start_date: '2026-03-15' },
  { id: 4, title: 'Parent-Teacher Meeting', event_type: 'meeting', start_date: '2026-03-20' },
  { id: 5, title: 'Holi', event_type: 'holiday', start_date: '2026-03-14', is_holiday: true },
];

const MONTHS = ['January','February','March','April','May','June',
'July','August','September','October','November','December'];

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const ParentCalendar = () => {
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
    const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return events.filter(e => {
      const start = e.start_date?.split('T')[0];
      const end = e.end_date?.split('T')[0] || start;
      return dateStr >= start && dateStr <= end;
    });
  };

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const upcomingEvents = [...events]
    .filter(e => new Date(e.start_date) >= new Date())
    .sort((a,b) => new Date(a.start_date) - new Date(b.start_date))
    .slice(0,6);

  return (
    <Layout menuItems={parentMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        📅 School Calendar
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>

              {/* Header */}
              <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:3 }}>
                <IconButton onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
                  <ChevronLeftIcon />
                </IconButton>

                <Typography variant="h6" fontWeight={700}>
                  {MONTHS[month]} {year}
                </Typography>

                <IconButton onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
                  <ChevronRightIcon />
                </IconButton>
              </Box>

              {/* DAYS ROW (FIXED) */}
              <Box sx={{ display:'flex', mb:1 }}>
                {DAYS.map(d => (
                  <Box key={d} sx={{ flex:1, textAlign:'center', py:0.5 }}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                      {d}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* CALENDAR GRID (FIXED) */}
              <Box sx={{ display:'flex', flexWrap:'wrap' }}>
                {/* Empty slots */}
                {Array.from({ length:firstDay }).map((_,i) => (
                  <Box key={`empty-${i}`} sx={{ width:'14.28%', aspectRatio:'1' }} />
                ))}

                {/* Days */}
                {Array.from({ length:daysInMonth }).map((_,i) => {
                  const day = i + 1;
                  const dayEvts = getEventsForDay(day);
                  const hasEvents = dayEvts.length > 0;
                  const isHoliday = dayEvts.some(e => e.is_holiday);
                  const todayFlag = isToday(day);

                  return (
                    <Box
                      key={day}
                      sx={{
                        width:'14.28%',
                        aspectRatio:'1',
                        p:0.3
                      }}
                    >
                      <Box
                        onClick={() => {
                          setSelectedDay(day);
                          setDayEvents(dayEvts);
                          setDayDialog(true);
                        }}
                        sx={{
                          height:'100%',
                          borderRadius:2,
                          cursor:'pointer',
                          p:0.5,
                          bgcolor: todayFlag ? '#1a73e8'
                            : isHoliday ? '#fce8e6'
                            : hasEvents ? '#f0f7ff'
                            : 'transparent',
                          display:'flex',
                          flexDirection:'column',
                          alignItems:'center',
                          '&:hover': { bgcolor:'#f0f0f0' }
                        }}
                      >
                        <Typography
                          variant="caption"
                          fontWeight={todayFlag ? 700 : 400}
                          color={todayFlag ? 'white' : isHoliday ? '#ea4335' : 'text.primary'}
                        >
                          {day}
                        </Typography>

                        {hasEvents && !todayFlag && (
                          <Box sx={{ display:'flex', gap:0.3, mt:0.3 }}>
                            {dayEvts.slice(0,2).map((e,idx) => (
                              <Box key={idx}
                                sx={{
                                  width:6,
                                  height:6,
                                  borderRadius:'50%',
                                  bgcolor:eventTypeColors[e.event_type]
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>

            </CardContent>
          </Card>
        </Grid>

        {/* UPCOMING EVENTS */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                📋 Upcoming Events
              </Typography>

              {upcomingEvents.map(e => (
                <Box key={e.id} sx={{ mb:2, p:1.5, borderLeft:`4px solid ${eventTypeColors[e.event_type]}` }}>
                  <Typography fontWeight={700}>{e.title}</Typography>
                  <Typography variant="caption">
                    {new Date(e.start_date).toDateString()}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* DIALOG */}
      <Dialog open={dayDialog} onClose={() => setDayDialog(false)}>
        <DialogTitle>
          {selectedDay} {MONTHS[month]} {year}
        </DialogTitle>

        <DialogContent>
          {dayEvents.length === 0
            ? <Typography>No events</Typography>
            : dayEvents.map(e => (
                <Box key={e.id} sx={{ mb:1 }}>
                  <Typography fontWeight={700}>{e.title}</Typography>
                </Box>
              ))
          }
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDayDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

    </Layout>
  );
};

export default ParentCalendar;