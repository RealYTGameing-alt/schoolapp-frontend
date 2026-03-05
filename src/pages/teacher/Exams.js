import teacherMenuItems from '../../components/layout/teacherMenu';
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Grid, Tab, Tabs
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const initialExams = [
  { id: 1, title: 'Mid-Term Mathematics', class: '10A', subject: 'Mathematics', date: '2026-04-01', time: '9:00 AM', duration: 120, total: 100, passing: 33, status: 'scheduled' },
  { id: 2, title: 'Unit Test - Science', class: '9B', subject: 'Science', date: '2026-03-20', time: '10:00 AM', duration: 60, total: 50, passing: 17, status: 'completed' },
];

const initialResults = [
  { id: 1, student: 'Arjun Sharma', roll: 'STU001', exam: 'Unit Test - Science', marks: 42, total: 50, grade: 'A', status: 'pass' },
  { id: 2, student: 'Priya Patel', roll: 'STU002', exam: 'Unit Test - Science', marks: 38, total: 50, grade: 'B', status: 'pass' },
  { id: 3, student: 'Rohan Singh', roll: 'STU003', exam: 'Unit Test - Science', marks: 15, total: 50, grade: 'F', status: 'fail' },
  { id: 4, student: 'Ananya Gupta', roll: 'STU004', exam: 'Unit Test - Science', marks: 47, total: 50, grade: 'A+', status: 'pass' },
];

const gradeColor = { 'A+': 'success', A: 'success', B: 'primary', C: 'warning', F: 'error' };

const Exams = () => {
  const [tab, setTab] = useState(0);
  const [exams, setExams] = useState(initialExams);
  const [results, setResults] = useState(initialResults);
  const [open, setOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { register: regResult, handleSubmit: handleResult, reset: resetResult } = useForm();

  const onCreateExam = (data) => {
    setExams(prev => [...prev, { id: Date.now(), ...data, duration: Number(data.duration), total: Number(data.total), passing: Number(data.passing), status: 'scheduled' }]);
    toast.success('✅ Exam scheduled!');
    setOpen(false);
    reset();
  };

  const onEnterResult = (data) => {
    const marks = Number(data.marks);
    const exam = exams.find(e => e.id === selectedExam);
    const percentage = (marks / exam.total) * 100;
    const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : 'F';
    setResults(prev => [...prev, {
      id: Date.now(), student: data.student, roll: data.roll,
      exam: exam.title, marks, total: exam.total, grade,
      status: marks >= exam.passing ? 'pass' : 'fail'
    }]);
    toast.success('✅ Result entered!');
    setResultOpen(false);
    resetResult();
  };

  return (
    <Layout menuItems={teacherMenuItems}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>📝 Exams & Results</Typography>
          <Typography variant="body2" color="text.secondary">Schedule exams and manage results</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>
          Schedule Exam
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ borderBottom: '1px solid #eee', px: 2 }}>
          <Tab label="Scheduled Exams" />
          <Tab label="Results" />
        </Tabs>

        {tab === 0 && (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                <TableRow>
                  <TableCell><strong>Exam Title</strong></TableCell>
                  <TableCell><strong>Class</strong></TableCell>
                  <TableCell><strong>Date & Time</strong></TableCell>
                  <TableCell><strong>Duration</strong></TableCell>
                  <TableCell><strong>Total Marks</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exams.map((exam) => (
                  <TableRow key={exam.id} hover>
                    <TableCell><Typography variant="body2" fontWeight={500}>{exam.title}</Typography></TableCell>
                    <TableCell><Chip label={exam.class} size="small" color="primary" variant="outlined" /></TableCell>
                    <TableCell>{exam.date} at {exam.time}</TableCell>
                    <TableCell>{exam.duration} mins</TableCell>
                    <TableCell>{exam.total} (Pass: {exam.passing})</TableCell>
                    <TableCell>
                      <Chip label={exam.status} size="small" color={exam.status === 'completed' ? 'success' : 'warning'} />
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}
                        onClick={() => { setSelectedExam(exam.id); setResultOpen(true); }}>
                        Enter Result
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tab === 1 && (
          <>
            <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
              {[
                { label: 'Total Results', value: results.length, color: '#1a73e8' },
                { label: 'Pass', value: results.filter(r => r.status === 'pass').length, color: '#34a853' },
                { label: 'Fail', value: results.filter(r => r.status === 'fail').length, color: '#ea4335' },
                { label: 'Pass Rate', value: `${Math.round(results.filter(r => r.status === 'pass').length / results.length * 100)}%`, color: '#fbbc04' },
              ].map((stat) => (
                <Card key={stat.label} sx={{ borderRadius: 2, flex: 1, textAlign: 'center' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h5" fontWeight={700} color={stat.color}>{stat.value}</Typography>
                    <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                  <TableRow>
                    <TableCell><strong>Student</strong></TableCell>
                    <TableCell><strong>Roll No.</strong></TableCell>
                    <TableCell><strong>Exam</strong></TableCell>
                    <TableCell><strong>Marks</strong></TableCell>
                    <TableCell><strong>Grade</strong></TableCell>
                    <TableCell><strong>Result</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((r) => (
                    <TableRow key={r.id} hover>
                      <TableCell><Typography variant="body2" fontWeight={500}>{r.student}</Typography></TableCell>
                      <TableCell>{r.roll}</TableCell>
                      <TableCell>{r.exam}</TableCell>
                      <TableCell><strong>{r.marks}/{r.total}</strong> ({Math.round(r.marks/r.total*100)}%)</TableCell>
                      <TableCell><Chip label={r.grade} size="small" color={gradeColor[r.grade] || 'default'} /></TableCell>
                      <TableCell><Chip label={r.status.toUpperCase()} size="small" color={r.status === 'pass' ? 'success' : 'error'} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Card>

      {/* Create Exam Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Schedule New Exam</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Exam Title" margin="normal" {...register('title', { required: true })} />
          <TextField fullWidth label="Subject" margin="normal" {...register('subject', { required: true })} />
          <TextField fullWidth label="Class" margin="normal" {...register('class', { required: true })} />
          <TextField fullWidth label="Date" type="date" margin="normal" InputLabelProps={{ shrink: true }} {...register('date', { required: true })} />
          <TextField fullWidth label="Time" type="time" margin="normal" InputLabelProps={{ shrink: true }} {...register('time')} />
          <Grid container spacing={2}>
            <Grid item xs={4}><TextField fullWidth label="Duration (mins)" type="number" margin="normal" {...register('duration')} /></Grid>
            <Grid item xs={4}><TextField fullWidth label="Total Marks" type="number" margin="normal" {...register('total')} /></Grid>
            <Grid item xs={4}><TextField fullWidth label="Passing Marks" type="number" margin="normal" {...register('passing')} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onCreateExam)} sx={{ borderRadius: 2 }}>Schedule</Button>
        </DialogActions>
      </Dialog>

      {/* Enter Result Dialog */}
      <Dialog open={resultOpen} onClose={() => setResultOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Enter Student Result</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Student Name" margin="normal" {...regResult('student', { required: true })} />
          <TextField fullWidth label="Roll Number" margin="normal" {...regResult('roll', { required: true })} />
          <TextField fullWidth label="Marks Obtained" type="number" margin="normal" {...regResult('marks', { required: true })} />
          <TextField fullWidth label="Remarks" margin="normal" {...regResult('remarks')} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setResultOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleResult(onEnterResult)} sx={{ borderRadius: 2 }}>Save Result</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Exams;