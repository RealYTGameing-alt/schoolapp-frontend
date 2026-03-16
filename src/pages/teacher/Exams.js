import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Chip, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert, Tabs, Tab, Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GradeIcon from '@mui/icons-material/Grade';
import Layout from '../../components/layout/Layout';
import { teacherMenu } from '../../components/layout/menus';
import api from '../../services/api';

const initialExams = [
  { id: 1, title: 'Mid-term Math Exam', class: '10A', date: '2026-04-01', duration: '3 hrs', maxMarks: 100, status: 'Upcoming', examType: 'midterm' },
  { id: 2, title: 'Science Unit Test', class: '9B', date: '2026-03-20', duration: '1.5 hrs', maxMarks: 50, status: 'Upcoming', examType: 'unit_test' },
  { id: 3, title: 'Algebra Quiz', class: '8C', date: '2026-03-05', duration: '45 min', maxMarks: 25, status: 'Completed', examType: 'quiz' },
  { id: 4, title: 'Math Chapter 3 Test', class: '7A', date: '2026-02-20', duration: '1 hr', maxMarks: 40, status: 'Completed', examType: 'unit_test' },
];

const mockStudents = [
  { id: 1, name: 'Aarav Sharma', rollNo: '001' },
  { id: 2, name: 'Priya Patel', rollNo: '002' },
  { id: 3, name: 'Rohan Singh', rollNo: '003' },
  { id: 4, name: 'Ananya Gupta', rollNo: '004' },
  { id: 5, name: 'Vikram Mehta', rollNo: '005' },
  { id: 6, name: 'Sneha Reddy', rollNo: '006' },
];

const getGrade = (marks, total) => {
  if (!marks || !total) return '—';
  const pct = (marks / total) * 100;
  if (pct >= 90) return { label: 'A+', color: '#34a853' };
  if (pct >= 80) return { label: 'A', color: '#1a73e8' };
  if (pct >= 70) return { label: 'B+', color: '#00bcd4' };
  if (pct >= 60) return { label: 'B', color: '#fbbc04' };
  if (pct >= 50) return { label: 'C', color: '#ff9800' };
  if (pct >= 33) return { label: 'D', color: '#ea4335' };
  return { label: 'F', color: '#b71c1c' };
};

const Exams = () => {
  const [exams, setExams] = useState(initialExams);
  const [tab, setTab] = useState(0);
  const [addDialog, setAddDialog] = useState(false);
  const [resultsDialog, setResultsDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [success, setSuccess] = useState('');
  const [newExam, setNewExam] = useState({ title: '', class: '', date: '', duration: '', maxMarks: '', examType: 'unit_test' });
  const [marks, setMarks] = useState({});
  const [savedResults, setSavedResults] = useState({});

  const handleAdd = () => {
    const exam = { ...newExam, id: Date.now(), status: 'Upcoming' };
    setExams(prev => [exam, ...prev]);
    setAddDialog(false);
    setSuccess('✅ Exam scheduled successfully!');
    setNewExam({ title: '', class: '', date: '', duration: '', maxMarks: '', examType: 'unit_test' });
    setTimeout(() => setSuccess(''), 3000);
  };

  const openResults = (exam) => {
    setSelectedExam(exam);
    const existing = savedResults[exam.id] || {};
    setMarks(existing);
    setResultsDialog(true);
  };

  const handleSaveResults = async () => {
    try {
      const results = mockStudents.map(s => ({
        studentId: s.id,
        marksObtained: parseFloat(marks[s.id]) || 0,
        totalMarks: selectedExam.maxMarks,
        remarks: '',
      }));
      await api.post('/exams/results', { examId: selectedExam.id, results });
    } catch (err) {}

    setSavedResults(prev => ({ ...prev, [selectedExam.id]: { ...marks } }));
    setExams(prev => prev.map(e => e.id === selectedExam.id ? { ...e, status: 'Completed' } : e));
    setSuccess(`✅ Results saved for ${selectedExam.title}!`);
    setResultsDialog(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const upcomingExams = exams.filter(e => e.status === 'Upcoming');
  const completedExams = exams.filter(e => e.status === 'Completed');

  const examTypeColors = {
    unit_test: '#1a73e8', midterm: '#9c27b0',
    final: '#ea4335', quiz: '#34a853'
  };

  return (
    <Layout menuItems={teacherMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" fontWeight={700}>📝 Exams & Results</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialog(true)} sx={{ borderRadius: 2 }}>
          Schedule Exam
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label={`Upcoming (${upcomingExams.length})`} />
        <Tab label={`Completed (${completedExams.length})`} />
      </Tabs>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0, overflow: 'auto' }}>
          <Box sx={{ minWidth: 600 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell>Exam Title</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Max Marks</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(tab === 0 ? upcomingExams : completedExams).map((e) => (
                  <TableRow key={e.id} hover>
                    <TableCell><Typography variant="body2" fontWeight={600}>{e.title}</Typography></TableCell>
                    <TableCell><Chip label={e.class} size="small" /></TableCell>
                    <TableCell>{e.date}</TableCell>
                    <TableCell>
                      <Chip label={e.examType || 'unit_test'} size="small"
                        sx={{ bgcolor: (examTypeColors[e.examType] || '#1a73e8') + '20',
                              color: examTypeColors[e.examType] || '#1a73e8', fontWeight: 600 }} />
                    </TableCell>
                    <TableCell>{e.maxMarks}</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}
                        onClick={() => openResults(e)}>
                        {tab === 0 ? 'Enter Results' : 'View Results'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {(tab === 0 ? upcomingExams : completedExams).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">
                        No {tab === 0 ? 'upcoming' : 'completed'} exams
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>

      {/* Schedule Exam Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>📝 Schedule New Exam</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Exam Title" fullWidth value={newExam.title}
            onChange={e => setNewExam({...newExam, title: e.target.value})} />
          <TextField label="Class (e.g. 10A)" fullWidth value={newExam.class}
            onChange={e => setNewExam({...newExam, class: e.target.value})} />
          <TextField label="Exam Type" select fullWidth value={newExam.examType}
            onChange={e => setNewExam({...newExam, examType: e.target.value})}
            SelectProps={{ native: true }}>
            <option value="quiz">Quiz</option>
            <option value="unit_test">Unit Test</option>
            <option value="midterm">Mid-term</option>
            <option value="final">Final Exam</option>
          </TextField>
          <TextField label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }}
            value={newExam.date} onChange={e => setNewExam({...newExam, date: e.target.value})} />
          <TextField label="Duration (e.g. 3 hrs)" fullWidth value={newExam.duration}
            onChange={e => setNewExam({...newExam, duration: e.target.value})} />
          <TextField label="Max Marks" type="number" fullWidth value={newExam.maxMarks}
            onChange={e => setNewExam({...newExam, maxMarks: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!newExam.title || !newExam.date}>
            Schedule
          </Button>
        </DialogActions>
      </Dialog>

      {/* Enter/View Results Dialog */}
      <Dialog open={resultsDialog} onClose={() => setResultsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle fontWeight={700}>
          {tab === 0 ? '✏️ Enter Results' : '📊 View Results'} — {selectedExam?.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip label={`Class ${selectedExam?.class}`} />
            <Chip label={`Max Marks: ${selectedExam?.maxMarks}`} />
            <Chip label={`Date: ${selectedExam?.date}`} />
          </Box>

          <Box sx={{ overflow: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell>Roll No.</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Marks Obtained</TableCell>
                  <TableCell>Percentage</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockStudents.map((student) => {
                  const m = marks[student.id];
                  const pct = m && selectedExam ? Math.round((m / selectedExam.maxMarks) * 100) : null;
                  const grade = m ? getGrade(m, selectedExam?.maxMarks) : null;
                  const passed = m ? (m / selectedExam?.maxMarks) * 100 >= 33 : null;

                  return (
                    <TableRow key={student.id} hover>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 30, height: 30, fontSize: 12, bgcolor: '#1a73e8' }}>
                            {student.name.charAt(0)}
                          </Avatar>
                          {student.name}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="number"
                          value={marks[student.id] || ''}
                          onChange={e => {
                            const val = e.target.value;
                            const max = selectedExam?.maxMarks;
                            if (val === '') {
                              setMarks(prev => ({ ...prev, [student.id]: '' }));
                            } else if (parseFloat(val) > max) {
                              setMarks(prev => ({ ...prev, [student.id]: max }));
                            } else if (parseFloat(val) < 0) {
                              setMarks(prev => ({ ...prev, [student.id]: 0 }));
                            } else {
                              setMarks(prev => ({ ...prev, [student.id]: val }));
                            }
                          }}
                          inputProps={{ min: 0, max: selectedExam?.maxMarks, step: 0.5 }}
                          sx={{ width: 80 }}
                          disabled={tab === 1 && !savedResults[selectedExam?.id]}
                        />
                        <Typography variant="caption" color="text.secondary" ml={0.5}>
                          /{selectedExam?.maxMarks}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {pct !== null ? (
                          <Typography variant="body2" fontWeight={600}>{pct}%</Typography>
                        ) : '—'}
                      </TableCell>
                      <TableCell>
                        {grade ? (
                          <Chip label={grade.label} size="small"
                            sx={{ bgcolor: grade.color + '20', color: grade.color, fontWeight: 700 }} />
                        ) : '—'}
                      </TableCell>
                      <TableCell>
                        {passed !== null ? (
                          <Chip label={passed ? '✅ Pass' : '❌ Fail'} size="small"
                            color={passed ? 'success' : 'error'} />
                        ) : '—'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>

          {/* Class summary */}
          {Object.keys(marks).length > 0 && (
            <Box sx={{ mt: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight={700} mb={1}>📊 Class Summary</Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Class Average</Typography>
                  <Typography variant="h6" fontWeight={700} color="#1a73e8">
                    {Math.round(
                      Object.values(marks).reduce((a, b) => a + parseFloat(b || 0), 0) /
                      (Object.values(marks).filter(Boolean).length || 1)
                    )}/{selectedExam?.maxMarks}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Pass Rate</Typography>
                  <Typography variant="h6" fontWeight={700} color="#34a853">
                    {Math.round(
                      Object.values(marks).filter(m => (parseFloat(m) / selectedExam?.maxMarks) * 100 >= 33).length /
                      (Object.values(marks).filter(Boolean).length || 1) * 100
                    )}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Highest Mark</Typography>
                  <Typography variant="h6" fontWeight={700} color="#9c27b0">
                    {Math.max(...Object.values(marks).map(m => parseFloat(m) || 0))}/{selectedExam?.maxMarks}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Lowest Mark</Typography>
                  <Typography variant="h6" fontWeight={700} color="#ea4335">
                    {Math.min(...Object.values(marks).filter(Boolean).map(m => parseFloat(m) || 0))}/{selectedExam?.maxMarks}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setResultsDialog(false)}>Close</Button>
          {tab === 0 && (
            <Button variant="contained" startIcon={<GradeIcon />}
              onClick={handleSaveResults}
              disabled={Object.keys(marks).length === 0}>
              Save Results
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Exams;