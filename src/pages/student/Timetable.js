import React from 'react';
import { Typography, Box, Card, CardContent, Chip } from '@mui/material';
import Layout from '../../components/layout/Layout';
import { studentMenu } from '../../components/layout/menus';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periods = [
  { time: '8:00 - 8:45', subjects: { Monday: 'Mathematics', Tuesday: 'English', Wednesday: 'Science', Thursday: 'Mathematics', Friday: 'History' } },
  { time: '8:45 - 9:30', subjects: { Monday: 'Science', Tuesday: 'Mathematics', Wednesday: 'English', Thursday: 'Geography', Friday: 'Mathematics' } },
  { time: '9:30 - 10:15', subjects: { Monday: 'English', Tuesday: 'History', Wednesday: 'Mathematics', Thursday: 'Science', Friday: 'English' } },
  { time: '10:30 - 11:15', subjects: { Monday: 'History', Tuesday: 'Science', Wednesday: 'Geography', Thursday: 'English', Friday: 'Science' } },
  { time: '11:15 - 12:00', subjects: { Monday: 'Geography', Tuesday: 'Geography', Wednesday: 'History', Thursday: 'History', Friday: 'Geography' } },
  { time: '1:00 - 1:45', subjects: { Monday: 'P.E.', Tuesday: 'Art', Wednesday: 'P.E.', Thursday: 'Computer', Friday: 'Library' } },
  { time: '1:45 - 2:30', subjects: { Monday: 'Computer', Tuesday: 'P.E.', Wednesday: 'Art', Thursday: 'P.E.', Friday: 'Computer' } },
];

const subjectColors = {
  Mathematics: '#e8f0fe', Science: '#e6f4ea', English: '#fef9e7',
  History: '#fce8e6', Geography: '#f3e8fd', 'P.E.': '#e8f5e9',
  Art: '#fff3e0', Computer: '#e0f7fa', Library: '#f5f5f5',
};

const today = days[Math.min(new Date().getDay() - 1, 4)];

const Timetable = () => {
  return (
    <Layout menuItems={studentMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>🗓️ My Timetable</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Class 10A • Academic Year 2025-26</Typography>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'auto' }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ minWidth: 700 }}>
            {/* Header */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '120px repeat(5, 1fr)', bgcolor: '#1a73e8' }}>
              <Box sx={{ p: 1.5 }}>
                <Typography variant="caption" color="white" fontWeight={700}>TIME</Typography>
              </Box>
              {days.map(day => (
                <Box key={day} sx={{ p: 1.5, textAlign: 'center', bgcolor: day === today ? '#1557b0' : 'transparent' }}>
                  <Typography variant="caption" color="white" fontWeight={700}>{day}</Typography>
                  {day === today && <Chip label="Today" size="small" sx={{ ml: 0.5, height: 16, fontSize: 9, bgcolor: '#fbbc04', color: 'white' }} />}
                </Box>
              ))}
            </Box>

            {/* Periods */}
            {periods.map((period, i) => (
              <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '120px repeat(5, 1fr)', borderBottom: '1px solid #f0f0f0' }}>
                <Box sx={{ p: 1.5, bgcolor: '#f8f9fa', display: 'flex', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>{period.time}</Typography>
                </Box>
                {days.map(day => {
                  const subject = period.subjects[day];
                  return (
                    <Box key={day} sx={{ p: 1, bgcolor: day === today ? '#f0f4ff' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #f0f0f0' }}>
                      <Box sx={{ bgcolor: subjectColors[subject] || '#f5f5f5', px: 1.5, py: 0.5, borderRadius: 2, textAlign: 'center', width: '100%' }}>
                        <Typography variant="caption" fontWeight={600} fontSize={11}>{subject}</Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Timetable;