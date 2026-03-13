import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Chip, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/layout/Layout';
import { teacherMenu } from '../../components/layout/menus';

const initialExams = [
  { id: 1, title: 'Mid-term Math Exam', class: '10A', date: '2026-04-01', duration: '3 hrs', maxMarks: 100, status: 'Upcoming' },
  { id: 2, title: 'Science Unit Test', class: '9B', date: '2026-03-20', duration: '1.5 hrs', maxMarks: 50, status: 'Upcoming' },
  { id: 3, title: 'Algebra Quiz', class: '8C', date: '2026-03-05', duration: '45 min', maxMarks: 25, status: 'Completed' },
  { id: 4, title: 'Math Chapter 3 Test', class: '7A', date: '2026-02-20', duration: '1 hr', maxMarks: 40, status: 'Completed' },
];

const Exams = () => {
  const [exams, setExams] = useState(initialExams);
  const [addDialog, setAddDialog] = useState(false);
  const [success, setSuccess] = useState('');
  const [newExam, setNewExam] = useState({ title: '', class: '', date: '', duration: '', maxMarks: '' });

  const handleAdd = () => {
    const exam = { ...newExam, id: Date.now(), status: 'Upcoming' };
    setExams(prev => [exam, ...prev]);
    setAddDialog(false);
    setSuccess('✅ Exam scheduled successfully!');
    setNewExam({ title: '', class: '', date: '', duration: '', maxMarks: '' });
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Layout menuItems={teacherMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" fontWeight={700}>📝 Exams</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialog(true)} sx={{ borderRadius: 2 }}>
          Schedule Exam
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0, overflow: 'auto' }}>
          <Box sx={{ minWidth: 550 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell>Exam Title</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Max Marks</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exams.map((e) => (
                  <TableRow key={e.id} hover>
                    <TableCell><Typography variant="body2" fontWeight={600}>{e.title}</Typography></TableCell>
                    <TableCell><Chip label={e.class} size="small" /></TableCell>
                    <TableCell>{e.date}</TableCell>
                    <TableCell>{e.duration}</TableCell>
                    <TableCell>{e.maxMarks}</TableCell>
                    <TableCell>
                      <Chip label={e.status} size="small"
                        color={e.status === 'Completed' ? 'success' : 'warning'} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>View</Button>
                        {e.status === 'Completed' && (
                          <Button size="small" variant="contained" sx={{ borderRadius: 2 }}>Results</Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>📝 Schedule New Exam</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Exam Title" fullWidth value={newExam.title} onChange={e => setNewExam({...newExam, title: e.target.value})} />
          <TextField label="Class (e.g. 10A)" fullWidth value={newExam.class} onChange={e => setNewExam({...newExam, class: e.target.value})} />
          <TextField label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }}
            value={newExam.date} onChange={e => setNewExam({...newExam, date: e.target.value})} />
          <TextField label="Duration (e.g. 3 hrs)" fullWidth value={newExam.duration} onChange={e => setNewExam({...newExam, duration: e.target.value})} />
          <TextField label="Max Marks" type="number" fullWidth value={newExam.maxMarks} onChange={e => setNewExam({...newExam, maxMarks: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!newExam.title || !newExam.date}>Schedule</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Exams;