import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Button, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Table, TableBody, TableCell, TableHead,
  TableRow, Avatar, Alert, Tabs, Tab, CircularProgress,
  LinearProgress
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import GradeIcon from '@mui/icons-material/Grade';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/layout/Layout';
import { teacherMenu } from '../../components/layout/menus';
import api from '../../services/api';

const mockAssignments = [
  {
    id: 1, title: 'Algebra Chapter 5 Problems', subject: 'Mathematics',
    class: '10A', dueDate: '2026-03-10', maxMarks: 20, totalStudents: 6,
    submissions: [
      { id: 1, studentName: 'Aarav Sharma', submittedAt: '2026-03-09 10:30', isLate: false, status: 'submitted', hasFile: true, textContent: null, grade: null },
      { id: 2, studentName: 'Priya Patel', submittedAt: '2026-03-09 14:20', isLate: false, status: 'graded', hasFile: false, textContent: 'Furthermore, the solutions to all 20 problems are comprehensive and multifaceted. It is important to note that each equation was solved utilizing the standard quadratic formula. Moreover, the results underscore the importance of algebraic thinking.', grade: 18 },
      { id: 3, studentName: 'Rohan Singh', submittedAt: '2026-03-11 09:00', isLate: true, status: 'submitted', hasFile: true, textContent: 'Furthermore, the solutions to all 20 problems are comprehensive and multifaceted. It is important to note that each equation was solved utilizing the standard quadratic formula.', grade: null },
    ]
  },
  {
    id: 2, title: 'Essay: Climate Change', subject: 'English',
    class: '10A', dueDate: '2026-03-08', maxMarks: 30, totalStudents: 6,
    submissions: [
      { id: 4, studentName: 'Ananya Gupta', submittedAt: '2026-03-07 16:00', isLate: false, status: 'submitted', hasFile: true, textContent: 'Climate change is a big problem. I think we should use less plastic. My dad says the weather is getting hotter every year.', grade: null },
    ]
  },
];

const checkPlagiarism = (text1, text2) => {
  if (!text1 || !text2) return 0;
  const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3);
  const words1 = new Set(normalize(text1));
  const words2 = new Set(normalize(text2));
  if (words1.size === 0 || words2.size === 0) return 0;
  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);
  return Math.round((intersection.size / union.size) * 100);
};

const detectAI = (text) => {
  if (!text || text.length < 50) return { score: 0, verdict: 'Too short to analyze' };
  const aiPatterns = [
    /\b(furthermore|moreover|additionally|consequently|therefore|thus)\b/gi,
    /\b(it is worth noting|it is important to note|in conclusion|to summarize)\b/gi,
    /\b(delve|underscore|leverage|utilize|facilitate|implement)\b/gi,
    /\b(comprehensive|multifaceted|nuanced|intricate|robust)\b/gi,
  ];
  let patternCount = 0;
  aiPatterns.forEach(pattern => { const m = text.match(pattern); if (m) patternCount += m.length; });
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const lengths = sentences.map(s => s.trim().split(/\s+/).length);
  const avgLength = lengths.reduce((a, b) => a + b, 0) / (lengths.length || 1);
  const variance = lengths.reduce((sum, l) => sum + Math.pow(l - avgLength, 2), 0) / (lengths.length || 1);
  const wordCount = text.split(/\s+/).length;
  const patternDensity = (patternCount / wordCount) * 100;
  let aiScore = 0;
  if (patternDensity > 3) aiScore += 40;
  else if (patternDensity > 1.5) aiScore += 20;
  if (variance < 15 && sentences.length > 3) aiScore += 30;
  if (patternCount > 5) aiScore += 20;
  aiScore = Math.min(aiScore, 95);
  let verdict;
  if (aiScore >= 70) verdict = '🔴 Likely AI-generated';
  else if (aiScore >= 40) verdict = '🟡 Possibly AI-assisted';
  else verdict = '🟢 Likely human-written';
  return { score: aiScore, verdict };
};

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
  const [analysisDialog, setAnalysisDialog] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleGrade = () => {
    setSuccess(`✅ Graded ${selectedSubmission.studentName}: ${grade} marks`);
    setTimeout(() => { setGradeDialog(false); setSuccess(''); }, 2000);
  };

  const handleAnalyze = async (sub) => {
    setAnalyzing(true);
    setAnalysisDialog(true);
    setAnalysisResult(null);
    try {
      const res = await api.get(`/plagiarism/analyze/${sub.id}`);
      setAnalysisResult(res.data);
    } catch (err) {
      const aiAnalysis = detectAI(sub.textContent);
      const otherSubs = selectedAssignment.submissions.filter(s => s.id !== sub.id && s.textContent);
      const plagiarismComparisons = otherSubs.map(other => ({
        studentName: other.studentName,
        similarity: checkPlagiarism(sub.textContent, other.textContent)
      })).sort((a, b) => b.similarity - a.similarity);
      const maxSimilarity = plagiarismComparisons.length > 0 ? plagiarismComparisons[0].similarity : 0;
      setAnalysisResult({
        studentName: sub.studentName,
        wordCount: sub.textContent ? sub.textContent.split(/\s+/).length : 0,
        hasTextContent: !!sub.textContent,
        aiDetection: aiAnalysis,
        plagiarism: {
          maxSimilarity,
          verdict: maxSimilarity >= 70 ? '🔴 High plagiarism detected' : maxSimilarity >= 40 ? '🟡 Moderate similarity' : '🟢 Original work',
          comparisons: plagiarismComparisons,
        }
      });
    }
    setAnalyzing(false);
  };

  return (
    <Layout menuItems={teacherMenu}>
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
                  <Button variant="outlined" size="small"
                    onClick={() => { setSelectedAssignment(a); setTab(1); }} sx={{ borderRadius: 2 }}>
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
                <Box sx={{ overflow: 'auto' }}>
                  <Box sx={{ minWidth: 700 }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                          <TableCell>Student</TableCell>
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
                              <Chip label={sub.status} size="small" color={sub.status === 'graded' ? 'success' : 'warning'} />
                            </TableCell>
                            <TableCell>
                              {sub.hasFile ? (
                                <Button size="small" startIcon={<DownloadIcon />} variant="outlined" sx={{ borderRadius: 2 }}>Download</Button>
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
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Button size="small" variant="outlined" color="warning"
                                  onClick={() => handleAnalyze(sub)} sx={{ borderRadius: 2 }}>
                                  🔍 Analyze
                                </Button>
                                <Button size="small" startIcon={<GradeIcon />} variant="contained"
                                  onClick={() => { setSelectedSubmission(sub); setGrade(''); setFeedback(''); setGradeDialog(true); }}
                                  sx={{ borderRadius: 2 }}>
                                  Grade
                                </Button>
                              </Box>
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
                  </Box>
                </Box>
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
            value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Write feedback..." />
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

      {/* Analysis Dialog */}
      <Dialog open={analysisDialog} onClose={() => setAnalysisDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>🔍 Integrity Analysis</DialogTitle>
        <DialogContent>
          {analyzing && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress />
              <Typography variant="body2" mt={2} color="text.secondary">Analyzing submission...</Typography>
            </Box>
          )}
          {analysisResult && !analyzing && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" fontWeight={600}>{analysisResult.studentName}</Typography>
                <Chip label={`${analysisResult.wordCount} words`} size="small" />
              </Box>
              <Card sx={{ borderRadius: 2, bgcolor: '#f8f9fa' }}>
                <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Typography variant="subtitle2" fontWeight={700} mb={1}>🤖 AI Detection</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2">{analysisResult.aiDetection.verdict}</Typography>
                    <Chip label={`${analysisResult.aiDetection.score}% AI`} size="small"
                      color={analysisResult.aiDetection.score >= 70 ? 'error' : analysisResult.aiDetection.score >= 40 ? 'warning' : 'success'} />
                  </Box>
                  <LinearProgress variant="determinate" value={analysisResult.aiDetection.score}
                    sx={{ height: 8, borderRadius: 4, bgcolor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': { borderRadius: 4,
                        bgcolor: analysisResult.aiDetection.score >= 70 ? '#ea4335' : analysisResult.aiDetection.score >= 40 ? '#fbbc04' : '#34a853' } }} />
                </CardContent>
              </Card>
              <Card sx={{ borderRadius: 2, bgcolor: '#f8f9fa' }}>
                <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Typography variant="subtitle2" fontWeight={700} mb={1}>📄 Plagiarism Check</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2">{analysisResult.plagiarism.verdict}</Typography>
                    <Chip label={`${analysisResult.plagiarism.maxSimilarity}% match`} size="small"
                      color={analysisResult.plagiarism.maxSimilarity >= 70 ? 'error' : analysisResult.plagiarism.maxSimilarity >= 40 ? 'warning' : 'success'} />
                  </Box>
                  <LinearProgress variant="determinate" value={analysisResult.plagiarism.maxSimilarity}
                    sx={{ height: 8, borderRadius: 4, bgcolor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': { borderRadius: 4,
                        bgcolor: analysisResult.plagiarism.maxSimilarity >= 70 ? '#ea4335' : analysisResult.plagiarism.maxSimilarity >= 40 ? '#fbbc04' : '#34a853' } }} />
                  {analysisResult.plagiarism.comparisons?.length > 0 && (
                    <Box mt={1.5}>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>Compared with:</Typography>
                      {analysisResult.plagiarism.comparisons.slice(0, 3).map((c, i) => (
                        <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">{c.studentName}</Typography>
                          <Chip label={`${c.similarity}% similar`} size="small"
                            color={c.similarity >= 70 ? 'error' : c.similarity >= 40 ? 'warning' : 'default'}
                            sx={{ height: 18, fontSize: 10 }} />
                        </Box>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
              {!analysisResult.hasTextContent && (
                <Alert severity="info" sx={{ borderRadius: 2 }}>File submission — AI detection only works on text submissions.</Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAnalysisDialog(false)} variant="outlined">Close</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default TeacherAssignments;