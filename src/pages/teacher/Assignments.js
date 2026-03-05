import teacherMenuItems from '../../components/layout/teacherMenu';
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Button, TextField,
  Grid, Chip, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const Assignments = () => {
  const [open, setOpen] = useState(false);
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Chapter 5 Problems', subject: 'Mathematics', class: '10A', due: '2026-03-10', submissions: 18, total: 32 },
    { id: 2, title: 'Lab Report - Titration', subject: 'Chemistry', class: '10A', due: '2026-03-12', submissions: 25, total: 32 },
    { id: 3, title: 'Essay: Climate Change', subject: 'English', class: '9B', due: '2026-03-15', submissions: 10, total: 28 },
  ]);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setAssignments(prev => [...prev, { id: Date.now(), ...data, submissions: 0, total: 32 }]);
    toast.success('✅ Assignment created!');
    setOpen(false);
    reset();
  };

  return (
    <Layout menuItems={teacherMenuItems}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>📝 Assignments</Typography>
          <Typography variant="body2" color="text.secondary">Manage and track all assignments</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>
          New Assignment
        </Button>
      </Box>

      <Grid container spacing={2}>
        {assignments.map((a) => (
          <Grid item xs={12} md={6} key={a.id}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Chip label={a.subject} size="small" color="primary" variant="outlined" />
                  <Chip label={`Class ${a.class}`} size="small" />
                </Box>
                <Typography variant="h6" fontWeight={600} mt={1}>{a.title}</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>Due: {a.due}</Typography>
                <Box mt={2} sx={{ bgcolor: '#f8f9fa', borderRadius: 2, p: 1.5 }}>
                  <Typography variant="body2">
                    Submissions: <strong>{a.submissions}/{a.total}</strong>
                    <Chip label={`${Math.round(a.submissions/a.total*100)}%`} size="small"
                      color={a.submissions/a.total > 0.7 ? 'success' : 'warning'} sx={{ ml: 1 }} />
                  </Typography>
                </Box>
                <Box mt={2} display="flex" gap={1}>
                  <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>View Submissions</Button>
                  <Button size="small" variant="outlined" color="error" sx={{ borderRadius: 2 }}>Delete</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Create New Assignment</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ pt: 1 }}>
            <TextField fullWidth label="Title" margin="normal" {...register('title', { required: true })} />
            <TextField fullWidth label="Subject" margin="normal" {...register('subject', { required: true })} />
            <TextField fullWidth label="Class" margin="normal" {...register('class', { required: true })} />
            <TextField fullWidth label="Description" margin="normal" multiline rows={3} {...register('description')} />
            <TextField fullWidth label="Due Date" type="date" margin="normal"
              InputLabelProps={{ shrink: true }} {...register('due', { required: true })} />
            <TextField fullWidth label="Max Marks" type="number" margin="normal" defaultValue={100} {...register('maxMarks')} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{ borderRadius: 2 }}>Create Assignment</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Assignments;
