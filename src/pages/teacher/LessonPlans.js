import teacherMenuItems from '../../components/layout/teacherMenu';
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Button, Grid,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';


const initialPlans = [
  { id: 1, title: 'Introduction to Quadratic Equations', subject: 'Mathematics', class: '10A', date: '2026-03-06', duration: 45, objectives: 'Students will understand the standard form of quadratic equations and learn to solve them by factorisation.', content: 'Definition, standard form, examples, practice problems.', resources: 'Textbook Ch.4, whiteboard, practice sheets' },
  { id: 2, title: 'Photosynthesis Process', subject: 'Science', class: '9B', date: '2026-03-07', duration: 60, objectives: 'Explain the process of photosynthesis and its importance.', content: 'Chlorophyll, sunlight, CO2, water, glucose production.', resources: 'Diagrams, video, lab observation' },
];

const LessonPlans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [open, setOpen] = useState(false);
  const [viewing, setViewing] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  const onSubmit = (data) => {
    setPlans(prev => [...prev, { id: Date.now(), ...data, duration: Number(data.duration) }]);
    toast.success('✅ Lesson plan saved!');
    setOpen(false);
    reset();
  };

  return (
    <Layout menuItems={teacherMenuItems}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>📖 Lesson Plans</Typography>
          <Typography variant="body2" color="text.secondary">Prepare and organize your teaching plans</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>
          New Lesson Plan
        </Button>
      </Box>

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={6} key={plan.id}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Chip label={plan.subject} size="small" color="primary" variant="outlined" />
                  <Chip label={`Class ${plan.class}`} size="small" />
                </Box>
                <Typography variant="h6" fontWeight={600} mt={1.5} mb={1}>{plan.title}</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  📅 {plan.date} • ⏱ {plan.duration} minutes
                </Typography>
                <Box sx={{ bgcolor: '#f8f9fa', borderRadius: 2, p: 1.5, mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>OBJECTIVES</Typography>
                  <Typography variant="body2" mt={0.5}>{plan.objectives}</Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Button size="small" variant="contained" sx={{ borderRadius: 2 }} onClick={() => setViewing(plan)}>
                    View Full Plan
                  </Button>
                  <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}
                    onClick={() => toast.info('📤 Plan shared with students!')}>
                    Share
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Plan Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle fontWeight={700}>Create Lesson Plan</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField fullWidth label="Lesson Title" margin="normal" {...register('title', { required: true })} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Subject" margin="normal" {...register('subject', { required: true })} /></Grid>
            <Grid item xs={3}><TextField fullWidth label="Class" margin="normal" {...register('class', { required: true })} /></Grid>
            <Grid item xs={3}><TextField fullWidth label="Duration (mins)" type="number" margin="normal" {...register('duration')} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Date" type="date" margin="normal" InputLabelProps={{ shrink: true }} {...register('date')} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Learning Objectives" margin="normal" multiline rows={2} {...register('objectives')} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Lesson Content" margin="normal" multiline rows={3} {...register('content')} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Resources & Materials" margin="normal" multiline rows={2} {...register('resources')} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{ borderRadius: 2 }}>Save Plan</Button>
        </DialogActions>
      </Dialog>

      {/* View Plan Dialog */}
      {viewing && (
        <Dialog open={!!viewing} onClose={() => setViewing(null)} maxWidth="md" fullWidth>
          <DialogTitle fontWeight={700}>{viewing.title}</DialogTitle>
          <DialogContent>
            <Box display="flex" gap={1} mb={2}>
              <Chip label={viewing.subject} color="primary" />
              <Chip label={`Class ${viewing.class}`} />
              <Chip label={`${viewing.duration} mins`} />
              <Chip label={viewing.date} />
            </Box>
            {[
              { label: '🎯 Learning Objectives', value: viewing.objectives },
              { label: '📚 Lesson Content', value: viewing.content },
              { label: '🛠 Resources & Materials', value: viewing.resources },
            ].map((section) => (
              <Box key={section.label} sx={{ mb: 2, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Typography variant="subtitle2" fontWeight={700} mb={1}>{section.label}</Typography>
                <Typography variant="body2">{section.value}</Typography>
              </Box>
            ))}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setViewing(null)} sx={{ borderRadius: 2 }}>Close</Button>
            <Button variant="contained" sx={{ borderRadius: 2 }} onClick={() => toast.success('📤 Shared!')}>Share with Class</Button>
          </DialogActions>
        </Dialog>
      )}
    </Layout>
  );
};

export default LessonPlans;