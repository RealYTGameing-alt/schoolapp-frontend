import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Button, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/layout/Layout';
import { teacherMenu } from '../../components/layout/menus';

const initialPlans = [
  { id: 1, title: 'Introduction to Quadratic Equations', class: '10A', week: 'Week 10', subject: 'Mathematics', objectives: 'Students will understand the standard form of quadratic equations.', status: 'Approved' },
  { id: 2, title: 'Trigonometry Basics', class: '9B', week: 'Week 10', subject: 'Mathematics', objectives: 'Introduction to sin, cos, tan ratios.', status: 'Pending' },
  { id: 3, title: 'Statistics and Probability', class: '8C', week: 'Week 11', subject: 'Mathematics', objectives: 'Mean, median, mode and basic probability.', status: 'Draft' },
];

const LessonPlans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [open, setOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({ title: '', class: '', week: '', subject: '', objectives: '' });

  const addPlan = () => {
    setPlans(prev => [...prev, { ...newPlan, id: Date.now(), status: 'Draft' }]);
    setOpen(false);
    setNewPlan({ title: '', class: '', week: '', subject: '', objectives: '' });
  };

  return (
    <Layout menuItems={teacherMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>📖 Lesson Plans</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>
          Add Plan
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {plans.map((p) => (
          <Card key={p.id} sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="body1" fontWeight={600}>{p.title}</Typography>
                <Typography variant="caption" color="text.secondary">{p.subject} • Class {p.class} • {p.week}</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>{p.objectives}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label={p.status} size="small"
                  color={p.status === 'Approved' ? 'success' : p.status === 'Pending' ? 'warning' : 'default'} />
                <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>Edit</Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>📖 Add Lesson Plan</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Title" fullWidth value={newPlan.title} onChange={e => setNewPlan({...newPlan, title: e.target.value})} />
          <TextField label="Subject" fullWidth value={newPlan.subject} onChange={e => setNewPlan({...newPlan, subject: e.target.value})} />
          <TextField label="Class" fullWidth value={newPlan.class} onChange={e => setNewPlan({...newPlan, class: e.target.value})} />
          <TextField label="Week" fullWidth placeholder="e.g. Week 11" value={newPlan.week} onChange={e => setNewPlan({...newPlan, week: e.target.value})} />
          <TextField label="Learning Objectives" multiline rows={3} fullWidth value={newPlan.objectives} onChange={e => setNewPlan({...newPlan, objectives: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={addPlan}>Save Plan</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default LessonPlans;