import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Grid, Chip, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, LinearProgress
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MessageIcon from '@mui/icons-material/Message';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const menuItems = [
  { text: 'Dashboard', path: '/student', icon: <DashboardIcon /> },
  { text: 'Assignments', path: '/student/assignments', icon: <AssignmentIcon /> },
  { text: 'Study Materials', path: '/student/materials', icon: <MenuBookIcon /> },
  { text: 'My Progress', path: '/student/progress', icon: <BarChartIcon /> },
  { text: 'Timetable', path: '/student/timetable', icon: <EventNoteIcon /> },
  { text: 'Messages', path: '/student/messages', icon: <MessageIcon /> },
];

const initialAssignments = [
  { id: 1, title: 'Chapter 5 Problems', subject: 'Mathematics', teacher: 'Rajesh Kumar', due: '2026-03-07', maxMarks: 20, status: 'pending', marks: null, feedback: null },
  { id: 2, title: 'Lab Report - Titration', subject: 'Science', teacher: 'Sunita Sharma', due: '2026-03-10', maxMarks: 15, status: 'submitted', marks: null, feedback: null },
  { id: 3, title: 'Essay: Climate Change', subject: 'English', teacher: 'Priya Menon', due: '2026-03-12', maxMarks: 25, status: 'graded', marks: 22, feedback: 'Excellent work! Very well structured.' },
  { id: 4, title: 'Map Work - Chapter 3', subject: 'History', teacher: 'Vikram Nair', due: '2026-03-15', maxMarks: 10, status: 'pending', marks: null, feedback: null },
];

const statusColor = { pending: 'warning', submitted: 'info', graded: 'success', overdue: 'error' };

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setAssignments(prev => prev.map(a => a.id === selected.id ? { ...a, status: 'submitted' } : a));
    toast.success('✅ Assignment submitted successfully!');
    setSubmitOpen(false);
    reset();
  };

  const pending = assignments.filter(a => a.status === 'pending').length;
  const submitted = assignments.filter(a => a.status === 'submitted').length;
  const graded = assignments.filter(a => a.status === 'graded').length;

  return (
    <Layout menuItems={menuItems}>
      <Typography variant="h5" fontWeight={700} mb={1}>📝 My Assignments</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Track and submit your assignments</Typography>

      <Grid container spacing={2} mb={3}>
        {[
          { label: 'Pending', value: pending, color: '#fbbc04' },
          { label: 'Submitted', value: submitted, color: '#1a73e8' },
          { label: 'Graded', value: graded, color: '#34a853' },
          { label: 'Total', value: assignments.length, color: '#ea4335' },
        ].map((stat) => (
          <Grid item xs={6} md={3} key={stat.label}>
            <Card sx={{ borderRadius: 3, textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Typography variant="h4" fontWeight={700} color={stat.color}>{stat.value}</Typography>
                <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        {assignments.map((a) => (
          <Grid item xs={12} md={6} key={a.id}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', borderLeft: `4px solid ${a.status === 'graded' ? '#34a853' : a.status === 'submitted' ? '#1a73e8' : '#fbbc04'}` }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Chip label={a.subject} size="small" color="primary" variant="outlined" />
                  <Chip label={a.status.toUpperCase()} size="small" color={statusColor[a.status]} />
                </Box>
                <Typography variant="h6" fontWeight={600} mt={1}>{a.title}</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  👨‍🏫 {a.teacher} • 📅 Due: {a.due} • 🎯 {a.maxMarks} marks
                </Typography>

                {a.status === 'graded' && (
                  <Box mt={2} sx={{ bgcolor: '#e8f5e9', borderRadius: 2, p: 1.5 }}>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography variant="body2" fontWeight={600}>Score: {a.marks}/{a.maxMarks}</Typography>
                      <Typography variant="body2" color="success.main" fontWeight={700}>
                        {Math.round(a.marks / a.maxMarks * 100)}%
                      </Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={a.marks / a.maxMarks * 100}
                      sx={{ height: 6, borderRadius: 3, bgcolor: '#c8e6c9', '& .MuiLinearProgress-bar': { bgcolor: '#34a853' } }} />
                    {a.feedback && (
                      <Typography variant="caption" color="text.secondary" mt={1} display="block">
                        💬 {a.feedback}
                      </Typography>
                    )}
                  </Box>
                )}

                {a.status === 'pending' && (
                  <Button fullWidth variant="contained" size="small" sx={{ mt: 2, borderRadius: 2 }}
                    onClick={() => { setSelected(a); setSubmitOpen(true); }}>
                    Submit Assignment
                  </Button>
                )}
                {a.status === 'submitted' && (
                  <Box mt={2} sx={{ bgcolor: '#e3f2fd', borderRadius: 2, p: 1.5 }}>
                    <Typography variant="caption" color="primary">⏳ Waiting for teacher to grade...</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={submitOpen} onClose={() => setSubmitOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Submit: {selected?.title}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Your Answer / Notes" margin="normal" multiline rows={4}
            {...register('text')} placeholder="Type your answer or notes here..." />
          <TextField fullWidth label="File URL (optional)" margin="normal"
            {...register('file')} placeholder="Paste a Google Drive link if needed" />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setSubmitOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{ borderRadius: 2 }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default StudentAssignments;