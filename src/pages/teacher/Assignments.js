import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Button, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Table, TableBody, TableCell, TableHead,
  TableRow, Avatar, Alert, Tabs, Tab
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MessageIcon from '@mui/icons-material/Message';
import DownloadIcon from '@mui/icons-material/Download';
import GradeIcon from '@mui/icons-material/Grade';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/layout/Layout';

const menuItems = [
  { text: 'Dashboard', path: '/teacher', icon: <DashboardIcon /> },
  { text: 'Attendance', path: '/teacher/attendance', icon: <CheckCircleIcon /> },
  { text: 'Assignments', path: '/teacher/assignments', icon: <AssignmentIcon /> },
  { text: 'Exams', path: '/teacher/exams', icon: <QuizIcon /> },
  { text: 'Lesson Plans', path: '/teacher/lessons', icon: <MenuBookIcon /> },
  { text: 'Messages', path: '/teacher/messages', icon: <MessageIcon /> },
];

const mockAssignments = [
  {
    id: 1, title: 'Algebra Chapter 5 Problems', subject: 'Mathematics',
    class: '10A', dueDate: '2026-03-10', maxMarks: 20, totalStudents: 6,
    submissions: [
      { id: 1, studentName: 'Aarav Sharma', submittedAt: '2026-03-09 10:30', isLate: false, status: 'submitted', hasFile: true, textContent: null, grade: null },
      { id: 2, studentName: 'Priya Patel', submittedAt: '2026-03-09 14:20', isLate: false, status: 'graded', hasFile: false, textContent: 'My solutions to all 20 problems...', grade: 18 },
      { id: 3, studentName: 'Rohan Singh', submittedAt: '2026-03-11 09:00', isLate: true, status: 'submitted', hasFile: true, textContent: null, grade: null },
    ]
  },
  {
    id: 2, title: 'Essay: Climate Change', subject: 'English',
    class: '10A', dueDate: '2026-03-08', maxMarks: 30, totalStudents: 6,
    submissions: [
      { id: 4, studentName: 'Ananya Gupta', submittedAt: '2026-03-07 16:00', isLate: false, status: 'submitted', hasFile: true, textContent: null, grade: null },
    ]
  },
];

const TeacherAssignments = () => {
  const [tab, setTab] = useState(0);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [gradeDialog, setGradeDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [success, setSuccess] = useState('');
  const [createDialog, setCreateDialog] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', subject: '', class: '', dueDate: '', maxMarks: '', description: '' });

  const handleGrade = () => {
    setSuccess(`✅ Graded ${selectedSubmission.studentName}: ${grade} marks`);
    setTimeout(() => { setGradeDialog(false); setSuccess(''); }, 2000);
  };

  return (
    <Layout menuItems={menuItems}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>📝 Assignments</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateDialog(true)} sx={{ borderRadius: 2 }}>
          Create Assignment
        </Button>
      </Box>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="All Assignments" />
        <Tab label="View Submissions" />
      </Tabs>

      {tab === 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {mockAssignments.map((a) => (
            <Card key={a.id} sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography variant="body1" fontWeight={600}>{a.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {a.subject} • Class {a.class} • Max: {a.maxMarks} marks • Due: {new Date(a.dueDate).toLocaleDateString('en-IN')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip label={`${a.submissions.length}/${a.totalStudents} submitted`}
                    color={a.submissions.length === a.totalStudents ? 'success' : 'warning'} size="small" />
                  <Button variant="outlined" size="small" onClick={() => { setSelectedAssignment(a); setTab(1); }} sx={{ borderRadius: 2 }}>
                    View Submissions
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {tab === 1 && (
        <Box>
          {/* Assignment selector */}
          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
            {mockAssignments.map(a => (
              <Chip key={a.id} label={a.title} onClick={() => setSelectedAssignment(a)}
                color={selectedAssignment?.id === a.id ? 'primary' : 'default'} />
            ))}
          </Box>

          {selectedAssignment ? (
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  {selectedAssignment.title} — Submissions ({selectedAssignment.submissions.length}/{selectedAssignment.totalStudents})
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                      <TableCell fontWeight={700}>Student</TableCell>
                      <TableCell>Submitted At</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>File</TableCell>
                      <TableCell>Grade</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedAssignment.submissions.map((sub) => (
                      <TableRow key={sub.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: '#1a73e8' }}>
                              {sub.studentName.charAt(0)}
                            </Avatar>
                            {sub.studentName}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{sub.submittedAt}</Typography>
                          {sub.isLate && <Chip label="Late" size="small" color="error" sx={{ ml: 1 }} />}
                        </TableCell>
                        <TableCell>
                          <Chip label={sub.status} size="small"
                            color={sub.status === 'graded' ? 'success' : 'warning'} />
                        </TableCell>
                        <TableCell>
                          {sub.hasFile ? (
                            <Button size="small" startIcon={<DownloadIcon />} variant="outlined" sx={{ borderRadius: 2 }}>
                              Download
                            </Button>
                          ) : (
                            <Typography variant="caption" color="text.secondary">Text submission</Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          {sub.grade !== null ? (
                            <Chip label={`${sub.grade}/${selectedAssignment.maxMarks}`} color="success" size="small" />
                          ) : '—'}
                        </TableCell>
                        <TableCell>
                          <Button size="small" startIcon={<GradeIcon />} variant="contained"
                            onClick={() => { setSelectedSubmission(sub); setGrade(''); setFeedback(''); setGradeDialog(true); }}
                            sx={{ borderRadius: 2 }}>
                            Grade
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {selectedAssignment.submissions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography color="text.secondary" py={3}>No submissions yet</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h4">📋</Typography>
              <Typography color="text.secondary" mt={1}>Select an assignment to view submissions</Typography>
            </Box>
          )}
        </Box>
      )}

      {/* Grade Dialog */}
      <Dialog open={gradeDialog} onClose={() => setGradeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Grade Submission — {selectedSubmission?.studentName}</DialogTitle>
        <DialogContent>
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <TextField fullWidth label={`Grade (out of ${selectedAssignment?.maxMarks})`}
            type="number" value={grade} onChange={(e) => setGrade(e.target.value)}
            sx={{ mb: 2, mt: 1 }} inputProps={{ min: 0, max: selectedAssignment?.maxMarks }} />
          <TextField fullWidth multiline rows={3} label="Feedback for student"
            value={feedback} onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write feedback..." />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setGradeDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleGrade} disabled={!grade}>Save Grade</Button>
        </DialogActions>
      </Dialog>

      {/* Create Assignment Dialog */}
      <Dialog open={createDialog} onClose={() => setCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>➕ Create New Assignment</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Title" fullWidth value={newAssignment.title} onChange={e => setNewAssignment({...newAssignment, title: e.target.value})} />
          <TextField label="Subject" fullWidth value={newAssignment.subject} onChange={e => setNewAssignment({...newAssignment, subject: e.target.value})} />
          <TextField label="Class" fullWidth value={newAssignment.class} onChange={e => setNewAssignment({...newAssignment, class: e.target.value})} />
          <TextField label="Due Date" type="date" fullWidth InputLabelProps={{ shrink: true }}
            value={newAssignment.dueDate} onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})} />
          <TextField label="Max Marks" type="number" fullWidth value={newAssignment.maxMarks} onChange={e => setNewAssignment({...newAssignment, maxMarks: e.target.value})} />
          <TextField label="Description" multiline rows={3} fullWidth value={newAssignment.description} onChange={e => setNewAssignment({...newAssignment, description: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCreateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { setCreateDialog(false); setSuccess('Assignment created!'); }}>Create</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default TeacherAssignments;
