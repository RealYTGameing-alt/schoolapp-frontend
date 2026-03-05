import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Grid, Chip, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MessageIcon from '@mui/icons-material/Message';

const menuItems = [
  { text: 'Dashboard', path: '/student', icon: <DashboardIcon /> },
  { text: 'Assignments', path: '/student/assignments', icon: <AssignmentIcon /> },
  { text: 'Study Materials', path: '/student/materials', icon: <MenuBookIcon /> },
  { text: 'My Progress', path: '/student/progress', icon: <BarChartIcon /> },
  { text: 'Timetable', path: '/student/timetable', icon: <EventNoteIcon /> },
  { text: 'Messages', path: '/student/messages', icon: <MessageIcon /> },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periods = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'];

const subjectColors = {
  Mathematics: '#1a73e8', Science: '#34a853', English: '#fbbc04',
  History: '#ea4335', Geography: '#9c27b0', 'Physical Ed': '#ff5722', Break: '#9e9e9e'
};

const timetable = {
  Monday:    ['Mathematics', 'Science',    'English',   'Break',       'History',    'Mathematics', 'Physical Ed'],
  Tuesday:   ['English',     'Mathematics','Science',   'Break',       'Geography',  'History',     'Science'],
  Wednesday: ['Science',     'History',    'Mathematics','Break',      'English',    'Geography',   'Mathematics'],
  Thursday:  ['History',     'English',    'Geography', 'Break',       'Mathematics','Science',     'English'],
  Friday:    ['Geography',   'Mathematics','History',   'Break',       'Science',    'English',     'Physical Ed'],
};

const today = days[new Date().getDay() - 1] || 'Monday';

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState(today);

  return (
    <Layout menuItems={menuItems}>
      <Typography variant="h5" fontWeight={700} mb={1}>📅 My Timetable</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Class 10A — Weekly Schedule</Typography>

      {/* Day selector */}
      <Box display="flex" gap={1} mb={3} flexWrap="wrap">
        {days.map((day) => (
          <Chip key={day} label={day} onClick={() => setSelectedDay(day)}
            color={selectedDay === day ? 'primary' : 'default'}
            sx={{ cursor: 'pointer', fontWeight: 600 }}
          />
        ))}
      </Box>

      {/* Today's schedule - card view */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        {selectedDay}'s Classes
        {selectedDay === today && <Chip label="Today" color="success" size="small" sx={{ ml: 1 }} />}
      </Typography>

      <Grid container spacing={2} mb={4}>
        {periods.map((time, i) => {
          const subject = timetable[selectedDay][i];
          const color = subjectColors[subject] || '#666';
          const isBreak = subject === 'Break';
          return (
            <Grid item xs={12} sm={6} md={4} key={time}>
              <Card sx={{
                borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderLeft: `4px solid ${color}`,
                opacity: isBreak ? 0.6 : 1
              }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>{time}</Typography>
                  <Typography variant="body1" fontWeight={700} color={color} mt={0.5}>{subject}</Typography>
                  {!isBreak && (
                    <Typography variant="caption" color="text.secondary">Room 201 • 45 mins</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Full week table */}
      <Typography variant="h6" fontWeight={600} mb={2}>📊 Full Week View</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#1a1a2e' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Period</TableCell>
              {days.map(d => (
                <TableCell key={d} sx={{ color: 'white', fontWeight: 700 }}>
                  {d.slice(0, 3)}
                  {d === today && <Chip label="Today" size="small" sx={{ ml: 0.5, height: 16, fontSize: 9, bgcolor: '#34a853', color: 'white' }} />}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {periods.map((time, i) => (
              <TableRow key={time} hover sx={{ bgcolor: i % 2 === 0 ? '#fafafa' : 'white' }}>
                <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>{time}</TableCell>
                {days.map(day => {
                  const sub = timetable[day][i];
                  const color = subjectColors[sub] || '#666';
                  return (
                    <TableCell key={day}>
                      <Chip label={sub} size="small"
                        sx={{ bgcolor: sub === 'Break' ? '#f5f5f5' : `${color}20`, color: sub === 'Break' ? '#999' : color, fontWeight: 600, fontSize: 11 }} />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Timetable;