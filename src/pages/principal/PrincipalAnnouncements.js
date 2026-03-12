import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Button, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CampaignIcon from '@mui/icons-material/Campaign';
import Layout from '../../components/layout/Layout';
import { principalMenu } from '../../components/layout/menus';

const initialAnnouncements = [
  { id: 1, title: 'Mid-term Exam Schedule Released', content: 'Mid-term exams will be held from April 1-8. All teachers must submit question papers by March 25.', target: 'All', date: '2026-03-10', priority: 'high' },
  { id: 2, title: 'Parent-Teacher Meeting', content: 'PTM scheduled for March 20. All teachers must be present. Parents of Classes 9 and 10 are invited.', target: 'Teachers & Parents', date: '2026-03-08', priority: 'medium' },
  { id: 3, title: 'Annual Sports Day', content: 'Annual Sports Day will be held on March 15 at the school ground. Practice sessions start from March 11.', target: 'All', date: '2026-03-05', priority: 'low' },
  { id: 4, title: 'Lesson Plan Submission Reminder', content: 'All teachers must submit their Week 11 lesson plans by this Friday. No exceptions.', target: 'Teachers', date: '2026-03-04', priority: 'high' },
];

const priorityColors = { high: 'error', medium: 'warning', low: 'success' };

const PrincipalAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState('');
  const [newAnn, setNewAnn] = useState({ title: '', content: '', target: 'All', priority: 'medium' });

  const addAnnouncement = () => {
    const ann = {
      ...newAnn,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setAnnouncements(prev => [ann, ...prev]);
    setOpen(false);
    setSuccess('✅ Announcement sent to ' + newAnn.target + '!');
    setNewAnn({ title: '', content: '', target: 'All', priority: 'medium' });
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Layout menuItems={principalMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>📢 Announcements</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>
          New Announcement
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {announcements.map((a) => (
          <Card key={a.id} sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: `4px solid ${a.priority === 'high' ? '#ea4335' : a.priority === 'medium' ? '#fbbc04' : '#34a853'}` }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CampaignIcon sx={{ color: '#1a73e8' }} />
                  <Typography variant="body1" fontWeight={700}>{a.title}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label={a.target} size="small" sx={{ bgcolor: '#e8f0fe', color: '#1a73e8' }} />
                  <Chip label={a.priority} size="small" color={priorityColors[a.priority]} />
                  <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>{a.date}</Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">{a.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>📢 New Announcement</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Title" fullWidth value={newAnn.title} onChange={e => setNewAnn({...newAnn, title: e.target.value})} />
          <TextField label="Message" multiline rows={4} fullWidth value={newAnn.content} onChange={e => setNewAnn({...newAnn, content: e.target.value})} />
          <TextField label="Send To" select fullWidth value={newAnn.target} onChange={e => setNewAnn({...newAnn, target: e.target.value})}
            SelectProps={{ native: true }}>
            <option value="All">Everyone (All Staff + Students + Parents)</option>
            <option value="Teachers">Teachers Only</option>
            <option value="Students">Students Only</option>
            <option value="Parents">Parents Only</option>
            <option value="Teachers & Parents">Teachers & Parents</option>
          </TextField>
          <TextField label="Priority" select fullWidth value={newAnn.priority} onChange={e => setNewAnn({...newAnn, priority: e.target.value})}
            SelectProps={{ native: true }}>
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={addAnnouncement} disabled={!newAnn.title || !newAnn.content}>
            Send Announcement
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default PrincipalAnnouncements;