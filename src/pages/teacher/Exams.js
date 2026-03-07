import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Chip, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/layout/Layout';
import { teacherMenu } from '../../components/layout/menus';

const initialExams = [
  { id: 1, title: 'Unit Test 1 — Algebra', class: '10A', date: '2026-03-15', duration: '90 mins', maxMarks: 50, status: 'Upcoming' },
  { id: 2, title: 'Mid-term Exam', class: '9B', date: '2026-04-01', duration: '3 hours', maxMarks: 100, status: 'Upcoming' },
  { id: 3, title: 'Unit Test 1 — Geometry', class: '8C', date: '2026-02-20', duration: '90 mins', maxMarks: 50, status: 'Completed' },
];

const Exams = () => {
  const [exams, setExams] = useState(initialExams);
  const [open, setOpen] = useState(false);
  const [newExam, setNewExam] = useState({ title: '', class: '', date: '', duration: '', maxMarks: '' });

  const addExam = () => {
    setExams(prev => [...prev, { ...newExam, id: Date.now(), status: 'Upcoming' }]);
    setOpen(false);
    setNewExam({ title: '', class: '', date: '', duration: '', maxMarks: '' });
  };

  return (
    <Layout menuItems={teacherMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>📝 Exams</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>
          Schedule Exam
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0 }}>
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
                  <TableCell fontWeight={600}>{e.title}</TableCell>
                  <TableCell><Chip label={e.class} size="small" /></TableCell>
                  <TableCell>{e.date}</TableCell>
                  <TableCell>{e.duration}</TableCell>
                  <TableCell>{e.maxMarks}</TableCell>
                  <TableCell>
                    <Chip label={e.status} size="small" color={e.status === 'Completed' ? 'success' : 'primary'} />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>
                      {e.status === 'Completed' ? 'Results' : 'Edit'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>📝 Schedule New Exam</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Exam Title" fullWidth value={newExam.title} onChange={e => setNewExam({...newExam, title: e.target.value})} />
          <TextField label="Class" fullWidth value={newExam.class} onChange={e => setNewExam({...newExam, class: e.target.value})} />
          <TextField label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={newExam.date} onChange={e => setNewExam({...newExam, date: e.target.value})} />
          <TextField label="Duration" fullWidth placeholder="e.g. 90 mins" value={newExam.duration} onChange={e => setNewExam({...newExam, duration: e.target.value})} />
          <TextField label="Max Marks" type="number" fullWidth value={newExam.maxMarks} onChange={e => setNewExam({...newExam, maxMarks: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={addExam}>Schedule</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Exams;