import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Chip, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert, LinearProgress
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Layout from '../../components/layout/Layout';
import { studentMenu } from '../../components/layout/menus';
import api from '../../services/api';

const assignments = [
  { id: 1, title: 'Algebra Chapter 5 Problems', subject: 'Mathematics', dueDate: '2026-03-10', maxMarks: 20, description: 'Solve all problems from Chapter 5 exercises 1-20.' },
  { id: 2, title: 'Essay: Climate Change', subject: 'English', dueDate: '2026-03-08', maxMarks: 30, description: 'Write a 500 word essay on the effects of climate change.' },
  { id: 3, title: "Newton's Laws Lab Report", subject: 'Physics', dueDate: '2026-03-05', maxMarks: 25, description: 'Document your lab experiment findings.' },
];

const StudentAssignments = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [file, setFile] = useState(null);
  const [textContent, setTextContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState([3]);

  const handleOpen = (assignment) => {
    setSelected(assignment);
    setFile(null);
    setTextContent('');
    setError('');
    setSuccess('');
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (!file && !textContent.trim()) {
      setError('Please upload a file or write your answer!');
      return;
    }
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('assignmentId', selected.id);
      if (file) formData.append('file', file);
      if (textContent) formData.append('textContent', textContent);
      await api.post('/submissions/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } catch (err) {}
    setSuccess('Assignment submitted successfully! 🎉');
    setSubmitted(prev => [...prev, selected.id]);
    setTimeout(() => { setOpen(false); setSuccess(''); }, 2000);
    setUploading(false);
  };

  const isOverdue = (dueDate) => new Date(dueDate) < new Date();

  return (
    <Layout menuItems={studentMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>📝 My Assignments</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {assignments.map((a) => {
          const isSubmitted = submitted.includes(a.id);
          const overdue = isOverdue(a.dueDate);
          return (
            <Card key={a.id} sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AssignmentIcon sx={{ color: '#1a73e8' }} />
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight={600}>{a.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{a.subject} • Max marks: {a.maxMarks}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 14, color: overdue ? 'error.main' : 'text.secondary' }} />
                      <Typography variant="caption" color={overdue ? 'error.main' : 'text.secondary'}>
                        Due: {new Date(a.dueDate).toLocaleDateString('en-IN')}{overdue && ' (Overdue)'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {isSubmitted ? (
                    <Chip icon={<CheckCircleIcon />} label="Submitted" color="success" />
                  ) : (
                    <Button variant="contained" startIcon={<UploadFileIcon />}
                      onClick={() => handleOpen(a)} color={overdue ? 'error' : 'primary'}
                      sx={{ borderRadius: 2 }}>
                      {overdue ? 'Submit Late' : 'Submit'}
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Submit: {selected?.title}</DialogTitle>
        <DialogContent>
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {uploading && <LinearProgress sx={{ mb: 2 }} />}
          <Typography variant="body2" color="text.secondary" mb={2}>{selected?.description}</Typography>

          <Box sx={{ border: '2px dashed #1a73e8', borderRadius: 2, p: 3, textAlign: 'center', mb: 2, bgcolor: '#f8f9ff' }}>
            <UploadFileIcon sx={{ fontSize: 40, color: '#1a73e8', mb: 1 }} />
            <Typography variant="body2" mb={1}>Upload PDF, Word, or Image file</Typography>
            <Button variant="outlined" component="label" size="small">
              Choose File
              <input type="file" hidden accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                onChange={(e) => setFile(e.target.files[0])} />
            </Button>
            {file && (
              <Typography variant="caption" display="block" mt={1} color="success.main">✅ {file.name} selected</Typography>
            )}
          </Box>

          <Typography variant="body2" color="text.secondary" textAlign="center" mb={1}>— OR —</Typography>

          <TextField fullWidth multiline rows={4} label="Type your answer here"
            value={textContent} onChange={(e) => setTextContent(e.target.value)}
            onPaste={(e) => { e.preventDefault(); alert('⚠️ Copy-paste is not allowed! Please type your answer.'); }}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            placeholder="Type your answer here (copy-paste is disabled)..."
            helperText="⚠️ Copy-paste is disabled for academic integrity" />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={uploading}>
            {uploading ? 'Submitting...' : 'Submit Assignment'}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default StudentAssignments;