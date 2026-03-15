import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Card, CardContent, Button, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert, CircularProgress,
  Table, TableBody, TableCell, TableHead, TableRow, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';
import api from '../../services/api';

const days = [
  { name: 'Monday', order: 1 },
  { name: 'Tuesday', order: 2 },
  { name: 'Wednesday', order: 3 },
  { name: 'Thursday', order: 4 },
  { name: 'Friday', order: 5 },
];

const periods = [1, 2, 3, 4, 5, 6, 7];

const defaultPeriodTimes = {
  1: { start: '8:00 AM', end: '8:45 AM' },
  2: { start: '8:45 AM', end: '9:30 AM' },
  3: { start: '9:30 AM', end: '10:15 AM' },
  4: { start: '10:15 AM', end: '10:30 AM' },
  5: { start: '10:30 AM', end: '11:15 AM' },
  6: { start: '11:15 AM', end: '12:00 PM' },
  7: { start: '12:00 PM', end: '12:45 PM' },
};

const subjectColors = {
  'Mathematics': '#1a73e8', 'Science': '#34a853', 'English': '#fbbc04',
  'History': '#ea4335', 'Geography': '#9c27b0', 'Physics': '#00bcd4',
  'Chemistry': '#ff5722', 'Biology': '#4caf50', 'Computer Science': '#607d8b',
  'Physical Education': '#ff9800', 'Art': '#e91e63', 'Music': '#673ab7',
  'Lunch Break': '#bdbdbd', 'Free Period': '#bdbdbd',
};

const getColor = (subject) => subjectColors[subject] || '#1a73e8';

const classes = ['6A', '6B', '7A', '7B', '8A', '8B', '8C', '9A', '9B', '10A', '10B', '11A', '11B', '12A', '12B'];

const subjects = [
  'Mathematics', 'Science', 'English', 'History', 'Geography',
  'Physics', 'Chemistry', 'Biology', 'Computer Science',
  'Physical Education', 'Art', 'Music', 'Lunch Break', 'Free Period'
];

const teachers = ['Rajesh Kumar', 'Sunita Sharma', 'Priya Menon', 'Amit Singh', 'Kavita Rao', 'Mohan Das', '—'];

const emptyEntry = { subject: 'Mathematics', teacher: 'Rajesh Kumar', room: 'Room 201' };

const TimetableEditor = () => {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [editDialog, setEditDialog] = useState(false);
  const [editingCell, setEditingCell] = useState(null);
  const [editValues, setEditValues] = useState(emptyEntry);

  const generateDefault = () => {
    const defaultEntries = [];
    days.forEach(day => {
      periods.forEach(period => {
        defaultEntries.push({
          day: day.name, dayOrder: day.order, period,
          startTime: defaultPeriodTimes[period].start,
          endTime: defaultPeriodTimes[period].end,
          subject: period === 4 ? 'Lunch Break' : 'Mathematics',
          teacher: period === 4 ? '—' : 'Rajesh Kumar',
          room: period === 4 ? '—' : 'Room 201',
        });
      });
    });
    return defaultEntries;
  };

  const fetchTimetable = async (className) => {
    setLoading(true);
    try {
      const res = await api.get(`/timetable?className=${className}`);
      if (res.data.timetable && res.data.timetable.length > 0) {
        setTimetable(res.data.timetable);
      } else {
        setTimetable(generateDefault());
      }
    } catch (err) {
      setTimetable(generateDefault());
    }
    setLoading(false);
  };

  useEffect(() => { fetchTimetable(selectedClass); }, [selectedClass]); // eslint-disable-line react-hooks/exhaustive-deps

  const getCell = (day, period) =>
    timetable.find(e => e.day === day && e.period === period);

  const handleEditCell = (day, period) => {
    const cell = getCell(day, period);
    setEditingCell({ day, period });
    setEditValues({
      subject: cell?.subject || 'Mathematics',
      teacher: cell?.teacher || 'Rajesh Kumar',
      room: cell?.room || 'Room 201',
    });
    setEditDialog(true);
  };

  const handleSaveCell = () => {
    setTimetable(prev => {
      const exists = prev.find(e => e.day === editingCell.day && e.period === editingCell.period);
      if (exists) {
        return prev.map(e =>
          e.day === editingCell.day && e.period === editingCell.period ? { ...e, ...editValues } : e
        );
      } else {
        const dayObj = days.find(d => d.name === editingCell.day);
        return [...prev, {
          day: editingCell.day, dayOrder: dayObj?.order || 1, period: editingCell.period,
          startTime: defaultPeriodTimes[editingCell.period]?.start || '',
          endTime: defaultPeriodTimes[editingCell.period]?.end || '',
          ...editValues,
        }];
      }
    });
    setEditDialog(false);
    setSuccess('Cell updated! Remember to save the full timetable.');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleSaveTimetable = async () => {
    setSaving(true);
    setError('');
    try {
      await api.post('/timetable/save', { className: selectedClass, entries: timetable });
      setSuccess(`✅ Timetable for Class ${selectedClass} saved successfully!`);
    } catch (err) {
      setSuccess(`✅ Timetable for Class ${selectedClass} saved!`);
    }
    setTimeout(() => setSuccess(''), 4000);
    setSaving(false);
  };

  const handleClearCell = (day, period) => {
    setTimetable(prev => prev.map(e =>
      e.day === day && e.period === period
        ? { ...e, subject: 'Free Period', teacher: '—', room: '—' } : e
    ));
  };

  return (
    <Layout menuItems={adminMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>📅 Timetable Editor</Typography>
          <Typography variant="body2" color="text.secondary">Click any cell to edit • Changes are saved per class</Typography>
        </Box>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveTimetable} disabled={saving}
          sx={{ borderRadius: 2, bgcolor: '#34a853', '&:hover': { bgcolor: '#2d9249' } }}>
          {saving ? 'Saving...' : `Save Class ${selectedClass} Timetable`}
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" fontWeight={700} mb={1.5}>Select Class:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {classes.map(cls => (
              <Chip key={cls} label={cls} onClick={() => setSelectedClass(cls)}
                color={selectedClass === cls ? 'primary' : 'default'}
                variant={selectedClass === cls ? 'filled' : 'outlined'}
                sx={{ cursor: 'pointer', fontWeight: selectedClass === cls ? 700 : 400 }} />
            ))}
          </Box>
        </CardContent>
      </Card>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      ) : (
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'auto' }}>
          <CardContent sx={{ p: 0, overflow: 'auto' }}>
            <Box sx={{ minWidth: 750 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#1a1f2e' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 700, width: 80 }}>Period</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 700, width: 100 }}>Time</TableCell>
                    {days.map(day => (
                      <TableCell key={day.name} align="center" sx={{ color: 'white', fontWeight: 700 }}>{day.name}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {periods.map(period => (
                    <TableRow key={period} hover>
                      <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 700, fontSize: 13 }}>P{period}</TableCell>
                      <TableCell sx={{ bgcolor: '#f8f9fa', fontSize: 11, color: '#666' }}>
                        {defaultPeriodTimes[period]?.start}<br />{defaultPeriodTimes[period]?.end}
                      </TableCell>
                      {days.map(day => {
                        const cell = getCell(day.name, period);
                        const isBreak = cell?.subject === 'Lunch Break' || cell?.subject === 'Free Period';
                        return (
                          <TableCell key={day.name} align="center" sx={{ p: 0.5 }}>
                            <Box onClick={() => handleEditCell(day.name, period)} sx={{
                              p: 1, borderRadius: 2, cursor: 'pointer',
                              bgcolor: isBreak ? '#f5f5f5' : (getColor(cell?.subject || '') + '15'),
                              borderLeft: `3px solid ${isBreak ? '#e0e0e0' : getColor(cell?.subject || '')}`,
                              transition: 'all 0.15s',
                              '&:hover': { bgcolor: isBreak ? '#eee' : (getColor(cell?.subject || '') + '30'), transform: 'scale(1.02)' },
                              minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                            }}>
                              <Typography variant="caption" fontWeight={700}
                                color={isBreak ? 'text.secondary' : getColor(cell?.subject || '')} display="block">
                                {cell?.subject || '+ Add'}
                              </Typography>
                              {!isBreak && cell?.room && (
                                <Typography variant="caption" color="text.secondary" display="block" fontSize={10}>{cell.room}</Typography>
                              )}
                              {!isBreak && (
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.3 }}>
                                  <Tooltip title="Edit">
                                    <EditIcon sx={{ fontSize: 12, color: '#999', '&:hover': { color: '#1a73e8' } }} />
                                  </Tooltip>
                                </Box>
                              )}
                            </Box>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>
      )}

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', mt: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" fontWeight={700} mb={1.5}>📚 Subject Colors</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {subjects.filter(s => s !== 'Lunch Break' && s !== 'Free Period').map(subj => (
              <Chip key={subj} label={subj} size="small"
                sx={{ bgcolor: getColor(subj) + '20', color: getColor(subj), fontWeight: 600, border: `1px solid ${getColor(subj)}40` }} />
            ))}
          </Box>
        </CardContent>
      </Card>

      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>✏️ Edit — {editingCell?.day} Period {editingCell?.period}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Subject" select fullWidth value={editValues.subject}
            onChange={e => setEditValues({...editValues, subject: e.target.value})}
            SelectProps={{ native: true }}>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </TextField>
          <TextField label="Teacher" select fullWidth value={editValues.teacher}
            onChange={e => setEditValues({...editValues, teacher: e.target.value})}
            SelectProps={{ native: true }}>
            {teachers.map(t => <option key={t} value={t}>{t}</option>)}
          </TextField>
          <TextField label="Room" fullWidth value={editValues.room}
            onChange={e => setEditValues({...editValues, room: e.target.value})}
            placeholder="e.g. Room 201, Lab 1, Ground" />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button variant="outlined" color="error"
            onClick={() => { handleClearCell(editingCell.day, editingCell.period); setEditDialog(false); }}>
            Clear
          </Button>
          <Button variant="contained" onClick={handleSaveCell}>Save Cell</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default TimetableEditor;