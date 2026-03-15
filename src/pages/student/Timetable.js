import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Card, CardContent, Chip,
  CircularProgress, Table, TableBody, TableCell,
  TableHead, TableRow
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import { studentMenu } from '../../components/layout/menus';
import api from '../../services/api';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const subjectColors = {
  'Mathematics': '#1a73e8', 'Science': '#34a853', 'English': '#fbbc04',
  'History': '#ea4335', 'Geography': '#9c27b0', 'Physics': '#00bcd4',
  'Chemistry': '#ff5722', 'Biology': '#4caf50', 'Computer Science': '#607d8b',
  'Physical Education': '#ff9800', 'Art': '#e91e63', 'Music': '#673ab7',
  'Lunch Break': '#f5f5f5', 'Free Period': '#f5f5f5',
};

const getColor = (subject) => subjectColors[subject] || '#1a73e8';

const defaultTimetable = [
  { day: 'Monday', dayOrder: 1, period: 1, startTime: '8:00 AM', endTime: '8:45 AM', subject: 'Mathematics', teacher: 'Rajesh Kumar', room: 'Room 201' },
  { day: 'Monday', dayOrder: 1, period: 2, startTime: '8:45 AM', endTime: '9:30 AM', subject: 'Science', teacher: 'Sunita Sharma', room: 'Room 301' },
  { day: 'Monday', dayOrder: 1, period: 3, startTime: '9:30 AM', endTime: '10:15 AM', subject: 'English', teacher: 'Priya Menon', room: 'Room 101' },
  { day: 'Monday', dayOrder: 1, period: 4, startTime: '10:15 AM', endTime: '10:30 AM', subject: 'Lunch Break', teacher: '—', room: '—' },
  { day: 'Monday', dayOrder: 1, period: 5, startTime: '10:30 AM', endTime: '11:15 AM', subject: 'History', teacher: 'Amit Singh', room: 'Room 401' },
  { day: 'Monday', dayOrder: 1, period: 6, startTime: '11:15 AM', endTime: '12:00 PM', subject: 'Computer Science', teacher: 'Kavita Rao', room: 'Lab 1' },
  { day: 'Monday', dayOrder: 1, period: 7, startTime: '12:00 PM', endTime: '12:45 PM', subject: 'Physical Education', teacher: 'Mohan Das', room: 'Ground' },
  { day: 'Tuesday', dayOrder: 2, period: 1, startTime: '8:00 AM', endTime: '8:45 AM', subject: 'English', teacher: 'Priya Menon', room: 'Room 101' },
  { day: 'Tuesday', dayOrder: 2, period: 2, startTime: '8:45 AM', endTime: '9:30 AM', subject: 'Mathematics', teacher: 'Rajesh Kumar', room: 'Room 201' },
  { day: 'Tuesday', dayOrder: 2, period: 3, startTime: '9:30 AM', endTime: '10:15 AM', subject: 'History', teacher: 'Amit Singh', room: 'Room 401' },
  { day: 'Tuesday', dayOrder: 2, period: 4, startTime: '10:15 AM', endTime: '10:30 AM', subject: 'Lunch Break', teacher: '—', room: '—' },
  { day: 'Tuesday', dayOrder: 2, period: 5, startTime: '10:30 AM', endTime: '11:15 AM', subject: 'Science', teacher: 'Sunita Sharma', room: 'Room 301' },
  { day: 'Tuesday', dayOrder: 2, period: 6, startTime: '11:15 AM', endTime: '12:00 PM', subject: 'Geography', teacher: 'Kavita Rao', room: 'Room 501' },
  { day: 'Tuesday', dayOrder: 2, period: 7, startTime: '12:00 PM', endTime: '12:45 PM', subject: 'Art', teacher: 'Priya Menon', room: 'Art Room' },
  { day: 'Wednesday', dayOrder: 3, period: 1, startTime: '8:00 AM', endTime: '8:45 AM', subject: 'Science', teacher: 'Sunita Sharma', room: 'Room 301' },
  { day: 'Wednesday', dayOrder: 3, period: 2, startTime: '8:45 AM', endTime: '9:30 AM', subject: 'Geography', teacher: 'Kavita Rao', room: 'Room 501' },
  { day: 'Wednesday', dayOrder: 3, period: 3, startTime: '9:30 AM', endTime: '10:15 AM', subject: 'Mathematics', teacher: 'Rajesh Kumar', room: 'Room 201' },
  { day: 'Wednesday', dayOrder: 3, period: 4, startTime: '10:15 AM', endTime: '10:30 AM', subject: 'Lunch Break', teacher: '—', room: '—' },
  { day: 'Wednesday', dayOrder: 3, period: 5, startTime: '10:30 AM', endTime: '11:15 AM', subject: 'English', teacher: 'Priya Menon', room: 'Room 101' },
  { day: 'Wednesday', dayOrder: 3, period: 6, startTime: '11:15 AM', endTime: '12:00 PM', subject: 'Computer Science', teacher: 'Kavita Rao', room: 'Lab 1' },
  { day: 'Wednesday', dayOrder: 3, period: 7, startTime: '12:00 PM', endTime: '12:45 PM', subject: 'Music', teacher: 'Mohan Das', room: 'Music Room' },
  { day: 'Thursday', dayOrder: 4, period: 1, startTime: '8:00 AM', endTime: '8:45 AM', subject: 'History', teacher: 'Amit Singh', room: 'Room 401' },
  { day: 'Thursday', dayOrder: 4, period: 2, startTime: '8:45 AM', endTime: '9:30 AM', subject: 'English', teacher: 'Priya Menon', room: 'Room 101' },
  { day: 'Thursday', dayOrder: 4, period: 3, startTime: '9:30 AM', endTime: '10:15 AM', subject: 'Science', teacher: 'Sunita Sharma', room: 'Room 301' },
  { day: 'Thursday', dayOrder: 4, period: 4, startTime: '10:15 AM', endTime: '10:30 AM', subject: 'Lunch Break', teacher: '—', room: '—' },
  { day: 'Thursday', dayOrder: 4, period: 5, startTime: '10:30 AM', endTime: '11:15 AM', subject: 'Mathematics', teacher: 'Rajesh Kumar', room: 'Room 201' },
  { day: 'Thursday', dayOrder: 4, period: 6, startTime: '11:15 AM', endTime: '12:00 PM', subject: 'Physical Education', teacher: 'Mohan Das', room: 'Ground' },
  { day: 'Thursday', dayOrder: 4, period: 7, startTime: '12:00 PM', endTime: '12:45 PM', subject: 'Geography', teacher: 'Kavita Rao', room: 'Room 501' },
  { day: 'Friday', dayOrder: 5, period: 1, startTime: '8:00 AM', endTime: '8:45 AM', subject: 'Computer Science', teacher: 'Kavita Rao', room: 'Lab 1' },
  { day: 'Friday', dayOrder: 5, period: 2, startTime: '8:45 AM', endTime: '9:30 AM', subject: 'Mathematics', teacher: 'Rajesh Kumar', room: 'Room 201' },
  { day: 'Friday', dayOrder: 5, period: 3, startTime: '9:30 AM', endTime: '10:15 AM', subject: 'English', teacher: 'Priya Menon', room: 'Room 101' },
  { day: 'Friday', dayOrder: 5, period: 4, startTime: '10:15 AM', endTime: '10:30 AM', subject: 'Lunch Break', teacher: '—', room: '—' },
  { day: 'Friday', dayOrder: 5, period: 5, startTime: '10:30 AM', endTime: '11:15 AM', subject: 'History', teacher: 'Amit Singh', room: 'Room 401' },
  { day: 'Friday', dayOrder: 5, period: 6, startTime: '11:15 AM', endTime: '12:00 PM', subject: 'Science', teacher: 'Sunita Sharma', room: 'Room 301' },
  { day: 'Friday', dayOrder: 5, period: 7, startTime: '12:00 PM', endTime: '12:45 PM', subject: 'Free Period', teacher: '—', room: '—' },
];

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState('');
  const [className, setClassName] = useState('');

  useEffect(() => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = dayNames[new Date().getDay()];
    setActiveDay(days.includes(today) ? today : 'Monday');
  }, []);

  useEffect(() => {
    const fetchTimetable = async () => {
      setLoading(true);
      try {
        const res = await api.get('/timetable');
        if (res.data.timetable && res.data.timetable.length > 0) {
          setTimetable(res.data.timetable);
          setClassName(res.data.className || '10A');
        } else {
          setTimetable(defaultTimetable);
          setClassName('10A');
        }
      } catch (err) {
        setTimetable(defaultTimetable);
        setClassName('10A');
      }
      setLoading(false);
    };
    fetchTimetable();
  }, []);

  const todayEntries = timetable.filter(e => e.day === activeDay);
  const currentHour = new Date().getHours();
  const currentMin = new Date().getMinutes();

  const isCurrentPeriod = (entry) => {
    if (entry.day !== activeDay) return false;
    const [startH, startM] = (entry.start_time || entry.startTime || '0:0').split(':');
    const [endH, endM] = (entry.end_time || entry.endTime || '0:0').split(':');
    const startMins = parseInt(startH) * 60 + parseInt(startM);
    const endMins = parseInt(endH) * 60 + parseInt(endM);
    const nowMins = currentHour * 60 + currentMin;
    return nowMins >= startMins && nowMins < endMins;
  };

  return (
    <Layout menuItems={studentMenu}>
      <Typography variant="h5" fontWeight={700} mb={0.5}>📅 My Timetable</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Class {className} • {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        {days.map(day => (
          <Chip key={day} label={day} onClick={() => setActiveDay(day)}
            color={activeDay === day ? 'primary' : 'default'}
            variant={activeDay === day ? 'filled' : 'outlined'}
            sx={{ fontWeight: activeDay === day ? 700 : 400, cursor: 'pointer' }} />
        ))}
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      ) : (
        <>
          {/* Mobile view */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1.5 }}>
            {todayEntries.map((entry, i) => {
              const subj = entry.subject;
              const isBreak = subj === 'Lunch Break' || subj === 'Free Period';
              const isCurrent = isCurrentPeriod(entry);
              return (
                <Card key={i} sx={{
                  borderRadius: 3,
                  boxShadow: isCurrent ? `0 0 0 2px ${getColor(subj)}` : '0 2px 8px rgba(0,0,0,0.06)',
                  borderLeft: `4px solid ${isBreak ? '#e0e0e0' : getColor(subj)}`,
                  bgcolor: isBreak ? '#fafafa' : 'white', opacity: isBreak ? 0.7 : 1,
                }}>
                  <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body2" fontWeight={700} color={isBreak ? 'text.secondary' : getColor(subj)}>{subj}</Typography>
                        {!isBreak && <Typography variant="caption" color="text.secondary">{entry.teacher} • {entry.room}</Typography>}
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" fontWeight={600}>{entry.start_time || entry.startTime}</Typography>
                        <Typography variant="caption" color="text.secondary" display="block">{entry.end_time || entry.endTime}</Typography>
                        {isCurrent && <Chip label="NOW" size="small" color="success" sx={{ height: 18, fontSize: 10 }} />}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>

          {/* Desktop view */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'auto' }}>
              <CardContent sx={{ p: 0, overflow: 'auto' }}>
                <Box sx={{ minWidth: 700 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#1a1f2e' }}>
                        <TableCell sx={{ color: 'white', fontWeight: 700, width: 100 }}>Time</TableCell>
                        {days.map(day => (
                          <TableCell key={day} align="center"
                            sx={{ color: 'white', fontWeight: 700, bgcolor: activeDay === day ? '#1a73e8' : 'transparent' }}>
                            {day}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[1,2,3,4,5,6,7].map(period => {
                        const mondayEntry = timetable.find(e => e.day === 'Monday' && e.period === period);
                        const timeLabel = mondayEntry ? (mondayEntry.start_time || mondayEntry.startTime) : '';
                        return (
                          <TableRow key={period} hover>
                            <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 600, fontSize: 12 }}>{timeLabel}</TableCell>
                            {days.map(day => {
                              const entry = timetable.find(e => e.day === day && e.period === period);
                              if (!entry) return <TableCell key={day} />;
                              const isBreak = entry.subject === 'Lunch Break' || entry.subject === 'Free Period';
                              const isCurrent = isCurrentPeriod(entry);
                              return (
                                <TableCell key={day} align="center"
                                  sx={{ bgcolor: isCurrent ? getColor(entry.subject) + '22' : isBreak ? '#f5f5f5' : 'white', p: 1 }}>
                                  <Box sx={{ p: 1, borderRadius: 2,
                                    bgcolor: isBreak ? 'transparent' : getColor(entry.subject) + '15',
                                    borderLeft: `3px solid ${isBreak ? '#e0e0e0' : getColor(entry.subject)}` }}>
                                    <Typography variant="caption" fontWeight={700}
                                      color={isBreak ? 'text.secondary' : getColor(entry.subject)} display="block">
                                      {entry.subject}
                                    </Typography>
                                    {!isBreak && <Typography variant="caption" color="text.secondary" display="block">{entry.room}</Typography>}
                                    {isCurrent && <Chip label="NOW" size="small" color="success" sx={{ height: 16, fontSize: 9, mt: 0.3 }} />}
                                  </Box>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', mt: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={700} mb={1.5}>📚 Subjects This Week</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {[...new Set(timetable.filter(e => e.subject !== 'Lunch Break' && e.subject !== 'Free Period').map(e => e.subject))].map(subj => (
                  <Chip key={subj} label={subj} size="small"
                    sx={{ bgcolor: getColor(subj) + '20', color: getColor(subj), fontWeight: 600, border: `1px solid ${getColor(subj)}40` }} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </>
      )}
    </Layout>
  );
};

export default Timetable;