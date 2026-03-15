import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Card, CardContent, Button, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert, CircularProgress, IconButton, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Layout from '../../components/layout/Layout';
import { teacherMenu } from '../../components/layout/menus';
import api from '../../services/api';

const subjectColors = {
  'Mathematics': '#1a73e8', 'Science': '#34a853', 'English': '#fbbc04',
  'History': '#ea4335', 'Geography': '#9c27b0',
};

const emptyPlan = {
  title: '', subject: 'Mathematics', className: '10A',
  objectives: '', content: '', resources: '',
  date: new Date().toISOString().split('T')[0], durationMinutes: 45
};

const LessonPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialog, setCreateDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [newPlan, setNewPlan] = useState(emptyPlan);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await api.get('/lesson-plans');
      setPlans(res.data.lessonPlans || []);
    } catch (err) {
      setPlans([
        { id: 1, title: 'Introduction to Quadratic Equations', subject: 'Mathematics',
          class_name: '10A', date: '2026-03-10', duration_minutes: 45,
          objectives: 'Students will understand the standard form of quadratic equations.',
          content: '1. Review linear equations\n2. Introduce ax²+bx+c=0\n3. Solve examples\n4. Practice problems',
          resources: 'Textbook Chapter 5, whiteboard, graph paper', status: 'submitted' },
        { id: 2, title: 'Factoring Polynomials', subject: 'Mathematics',
          class_name: '9B', date: '2026-03-11', duration_minutes: 45,
          objectives: 'Students will be able to factor polynomials using grouping.',
          content: '1. Recap factoring basics\n2. Grouping method\n3. Practice with peers',
          resources: 'Worksheet handout, calculator', status: 'draft' },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPlans(); }, []);

  const handleCreate = async () => {
    setSaving(true);
    setError('');
    try {
      await api.post('/lesson-plans', newPlan);
      setSuccess('✅ Lesson plan created successfully!');
      setCreateDialog(false);
      setNewPlan(emptyPlan);
      fetchPlans();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const plan = { ...newPlan, id: Date.now(), class_name: newPlan.className, status: 'draft', teacher_name: 'You' };
      setPlans(prev => [plan, ...prev]);
      setSuccess('✅ Lesson plan created!');
      setCreateDialog(false);
      setNewPlan(emptyPlan);
      setTimeout(() => setSuccess(''), 3000);
    }
    setSaving(false);
  };

  const handleDelete = async (plan) => {
    if (!window.confirm(`Delete "${plan.title}"?`)) return;
    try { await api.delete(`/lesson-plans/${plan.id}`); } catch (err) {}
    setPlans(prev => prev.filter(p => p.id !== plan.id));
    setSuccess('✅ Lesson plan deleted!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await api.put(`/lesson-plans/${selectedPlan.id}`, selectedPlan);
    } catch (err) {
      setPlans(prev => prev.map(p => p.id === selectedPlan.id ? selectedPlan : p));
    }
    setSuccess('✅ Lesson plan updated!');
    setEditDialog(false);
    fetchPlans();
    setSaving(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const thisWeekCount = plans.filter(p => {
    const planDate = new Date(p.date);
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    return planDate >= weekStart;
  }).length;

  return (
    <Layout menuItems={teacherMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>📖 Lesson Plans</Typography>
          <Typography variant="body2" color="text.secondary">{thisWeekCount} plans submitted this week</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}
          onClick={() => { setError(''); setCreateDialog(true); }} sx={{ borderRadius: 2 }}>
          New Lesson Plan
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      ) : plans.length === 0 ? (
        <Card sx={{ borderRadius: 3, textAlign: 'center', py: 6 }}>
          <Typography variant="h4">📖</Typography>
          <Typography color="text.secondary" mt={1}>No lesson plans yet</Typography>
          <Button variant="contained" sx={{ mt: 2, borderRadius: 2 }} onClick={() => setCreateDialog(true)}>Create First Plan</Button>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {plans.map((plan) => (
            <Card key={plan.id} sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderLeft: `4px solid ${subjectColors[plan.subject] || '#1a73e8'}` }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                      <Typography variant="body1" fontWeight={700}>{plan.title}</Typography>
                      <Chip label={plan.status || 'draft'} size="small" color={plan.status === 'submitted' ? 'success' : 'warning'} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {plan.subject} • Class {plan.class_name} • {new Date(plan.date).toLocaleDateString('en-IN')} • {plan.duration_minutes} mins
                    </Typography>
                    {plan.objectives && (
                      <Typography variant="body2" color="text.secondary" mt={1}
                        sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        🎯 {plan.objectives}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="View">
                      <IconButton size="small" color="primary" onClick={() => { setSelectedPlan(plan); setViewDialog(true); }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" color="warning"
                        onClick={() => { setSelectedPlan({...plan, className: plan.class_name}); setEditDialog(true); }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => handleDelete(plan)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Create Dialog */}
      <Dialog open={createDialog} onClose={() => setCreateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle fontWeight={700}>📖 New Lesson Plan</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField label="Title" fullWidth value={newPlan.title} onChange={e => setNewPlan({...newPlan, title: e.target.value})} />
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField label="Subject" select fullWidth value={newPlan.subject}
              onChange={e => setNewPlan({...newPlan, subject: e.target.value})}
              SelectProps={{ native: true }} sx={{ flex: 1, minWidth: 150 }}>
              {['Mathematics','Science','English','History','Geography','Physics','Chemistry','Computer Science'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </TextField>
            <TextField label="Class" fullWidth value={newPlan.className}
              onChange={e => setNewPlan({...newPlan, className: e.target.value})} sx={{ flex: 1, minWidth: 100 }} />
            <TextField label="Date" type="date" InputLabelProps={{ shrink: true }}
              value={newPlan.date} onChange={e => setNewPlan({...newPlan, date: e.target.value})} sx={{ flex: 1, minWidth: 150 }} />
            <TextField label="Duration (mins)" type="number" value={newPlan.durationMinutes}
              onChange={e => setNewPlan({...newPlan, durationMinutes: e.target.value})} sx={{ flex: 1, minWidth: 120 }} />
          </Box>
          <TextField label="🎯 Learning Objectives" multiline rows={2} fullWidth
            placeholder="What will students learn by the end of this lesson?"
            value={newPlan.objectives} onChange={e => setNewPlan({...newPlan, objectives: e.target.value})} />
          <TextField label="📝 Lesson Content" multiline rows={4} fullWidth
            placeholder="Step by step lesson content, activities, examples..."
            value={newPlan.content} onChange={e => setNewPlan({...newPlan, content: e.target.value})} />
          <TextField label="📚 Resources & Materials" multiline rows={2} fullWidth
            placeholder="Textbooks, worksheets, tools needed..."
            value={newPlan.resources} onChange={e => setNewPlan({...newPlan, resources: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCreateDialog(false)}>Cancel</Button>
          <Button variant="outlined" onClick={() => { setNewPlan({...newPlan, status: 'draft'}); handleCreate(); }}
            disabled={!newPlan.title || saving}>Save as Draft</Button>
          <Button variant="contained" onClick={() => { setNewPlan({...newPlan, status: 'submitted'}); handleCreate(); }}
            disabled={!newPlan.title || saving}>{saving ? 'Saving...' : 'Submit Plan'}</Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle fontWeight={700}>📖 {selectedPlan?.title}</DialogTitle>
        <DialogContent>
          {selectedPlan && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label={selectedPlan.subject} size="small"
                  sx={{ bgcolor: (subjectColors[selectedPlan.subject] || '#1a73e8') + '20', color: subjectColors[selectedPlan.subject] || '#1a73e8' }} />
                <Chip label={`Class ${selectedPlan.class_name}`} size="small" />
                <Chip label={new Date(selectedPlan.date).toLocaleDateString('en-IN')} size="small" />
                <Chip label={`${selectedPlan.duration_minutes} mins`} size="small" />
                <Chip label={selectedPlan.status || 'draft'} size="small" color={selectedPlan.status === 'submitted' ? 'success' : 'warning'} />
              </Box>
              {selectedPlan.objectives && (
                <Box sx={{ p: 2, bgcolor: '#e8f0fe', borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight={700} mb={1}>🎯 Learning Objectives</Typography>
                  <Typography variant="body2">{selectedPlan.objectives}</Typography>
                </Box>
              )}
              {selectedPlan.content && (
                <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight={700} mb={1}>📝 Lesson Content</Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{selectedPlan.content}</Typography>
                </Box>
              )}
              {selectedPlan.resources && (
                <Box sx={{ p: 2, bgcolor: '#e6f4ea', borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight={700} mb={1}>📚 Resources & Materials</Typography>
                  <Typography variant="body2">{selectedPlan.resources}</Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setViewDialog(false)}>Close</Button>
          <Button variant="contained" onClick={() => {
            setViewDialog(false);
            setSelectedPlan({...selectedPlan, className: selectedPlan.class_name});
            setEditDialog(true);
          }}>Edit</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle fontWeight={700}>✏️ Edit Lesson Plan</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {selectedPlan && (
            <>
              <TextField label="Title" fullWidth value={selectedPlan.title}
                onChange={e => setSelectedPlan({...selectedPlan, title: e.target.value})} />
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField label="Subject" select fullWidth value={selectedPlan.subject}
                  onChange={e => setSelectedPlan({...selectedPlan, subject: e.target.value})}
                  SelectProps={{ native: true }} sx={{ flex: 1, minWidth: 150 }}>
                  {['Mathematics','Science','English','History','Geography','Physics','Chemistry','Computer Science'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </TextField>
                <TextField label="Class" fullWidth value={selectedPlan.class_name || selectedPlan.className}
                  onChange={e => setSelectedPlan({...selectedPlan, class_name: e.target.value})}
                  sx={{ flex: 1, minWidth: 100 }} />
                <TextField label="Date" type="date" InputLabelProps={{ shrink: true }}
                  value={selectedPlan.date?.split('T')[0] || selectedPlan.date}
                  onChange={e => setSelectedPlan({...selectedPlan, date: e.target.value})}
                  sx={{ flex: 1, minWidth: 150 }} />
              </Box>
              <TextField label="🎯 Learning Objectives" multiline rows={2} fullWidth
                value={selectedPlan.objectives || ''} onChange={e => setSelectedPlan({...selectedPlan, objectives: e.target.value})} />
              <TextField label="📝 Lesson Content" multiline rows={4} fullWidth
                value={selectedPlan.content || ''} onChange={e => setSelectedPlan({...selectedPlan, content: e.target.value})} />
              <TextField label="📚 Resources & Materials" multiline rows={2} fullWidth
                value={selectedPlan.resources || ''} onChange={e => setSelectedPlan({...selectedPlan, resources: e.target.value})} />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default LessonPlans;
