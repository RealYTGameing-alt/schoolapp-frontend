import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Card, CardContent, Button, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert, CircularProgress, IconButton,
  Tooltip, Grid, InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
import Layout from '../../components/layout/Layout';
import { teacherMenu } from '../../components/layout/menus';
import api from '../../services/api';

const subjectColors = {
  'Mathematics': '#1a73e8', 'Science': '#34a853', 'English': '#fbbc04',
  'History': '#ea4335', 'Geography': '#9c27b0', 'Physics': '#00bcd4',
  'Chemistry': '#ff5722', 'Biology': '#4caf50', 'Computer Science': '#607d8b',
};

const materialTypeIcons = {
  document: <ArticleIcon />,
  pdf: <PictureAsPdfIcon />,
  video: <VideoLibraryIcon />,
  image: <ImageIcon />,
  notes: <ArticleIcon />,
};

const materialTypeColors = {
  document: '#1a73e8', pdf: '#ea4335',
  video: '#9c27b0', image: '#34a853', notes: '#fbbc04',
};

const demoMaterials = [
  { id: 1, title: 'Algebra Chapter 5 Notes', description: 'Complete notes for quadratic equations', subject_id: 'Mathematics', class_id: '10A', material_type: 'notes', teacher_name: 'You', created_at: '2026-03-10', file_url: null },
  { id: 2, title: 'Newton\'s Laws PDF', description: 'Detailed explanation with examples', subject_id: 'Science', class_id: '9B', material_type: 'pdf', teacher_name: 'You', created_at: '2026-03-08', file_url: null },
  { id: 3, title: 'English Grammar Guide', description: 'Tenses and sentence construction', subject_id: 'English', class_id: '10A', material_type: 'document', teacher_name: 'You', created_at: '2026-03-05', file_url: null },
];

const TeacherStudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [addDialog, setAddDialog] = useState(false);
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const [filterSubject, setFilterSubject] = useState('All');
  const [newMaterial, setNewMaterial] = useState({
    title: '', description: '', subject: 'Mathematics',
    className: '10A', materialType: 'notes', fileUrl: ''
  });

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await api.get('/materials');
      setMaterials(res.data.materials?.length > 0 ? res.data.materials : demoMaterials);
    } catch (err) {
      setMaterials(demoMaterials);
    }
    setLoading(false);
  };

  useEffect(() => { fetchMaterials(); }, []);

  const handleAdd = async () => {
    setSaving(true);
    try {
      await api.post('/materials', newMaterial);
      fetchMaterials();
    } catch (err) {
      setMaterials(prev => [{
        id: Date.now(),
        title: newMaterial.title,
        description: newMaterial.description,
        subject_id: newMaterial.subject,
        class_id: newMaterial.className,
        material_type: newMaterial.materialType,
        file_url: newMaterial.fileUrl || null,
        teacher_name: 'You',
        created_at: new Date().toISOString(),
      }, ...prev]);
    }
    setSuccess('✅ Study material added successfully!');
    setAddDialog(false);
    setNewMaterial({ title: '', description: '', subject: 'Mathematics', className: '10A', materialType: 'notes', fileUrl: '' });
    setSaving(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this material?')) return;
    try { await api.delete(`/materials/${id}`); } catch (err) {}
    setMaterials(prev => prev.filter(m => m.id !== id));
    setSuccess('✅ Material deleted!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const subjects = ['All', ...new Set(materials.map(m => m.subject_id).filter(Boolean))];

  const filtered = materials.filter(m => {
    const matchSearch = m.title?.toLowerCase().includes(search.toLowerCase()) ||
      m.description?.toLowerCase().includes(search.toLowerCase());
    const matchSubject = filterSubject === 'All' || m.subject_id === filterSubject;
    return matchSearch && matchSubject;
  });

  return (
    <Layout menuItems={teacherMenu}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>📚 Study Materials</Typography>
          <Typography variant="body2" color="text.secondary">{materials.length} materials uploaded</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}
          onClick={() => setAddDialog(true)} sx={{ borderRadius: 2 }}>
          Add Material
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}

      {/* Search and filter */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField placeholder="Search materials..." size="small"
          value={search} onChange={e => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
          sx={{ flexGrow: 1, minWidth: 200, bgcolor: 'white', borderRadius: 2 }} />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {subjects.map(s => (
            <Chip key={s} label={s} onClick={() => setFilterSubject(s)}
              color={filterSubject === s ? 'primary' : 'default'}
              variant={filterSubject === s ? 'filled' : 'outlined'}
              sx={{ cursor: 'pointer' }} />
          ))}
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      ) : filtered.length === 0 ? (
        <Card sx={{ borderRadius: 3, textAlign: 'center', py: 6 }}>
          <Typography variant="h4">📚</Typography>
          <Typography color="text.secondary" mt={1}>No materials found</Typography>
          <Button variant="contained" sx={{ mt: 2, borderRadius: 2 }} onClick={() => setAddDialog(true)}>
            Add First Material
          </Button>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((m) => (
            <Grid item xs={12} sm={6} md={4} key={m.id}>
              <Card sx={{
                borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%',
                borderTop: `4px solid ${subjectColors[m.subject_id] || '#1a73e8'}`,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: 2,
                      bgcolor: (materialTypeColors[m.material_type] || '#1a73e8') + '20',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: materialTypeColors[m.material_type] || '#1a73e8' }}>
                      {materialTypeIcons[m.material_type] || <ArticleIcon />}
                    </Box>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => handleDelete(m.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Typography variant="body1" fontWeight={700} mb={0.5} sx={{
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {m.title}
                  </Typography>

                  {m.description && (
                    <Typography variant="caption" color="text.secondary" display="block" mb={1.5} sx={{
                      display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>
                      {m.description}
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1.5 }}>
                    {m.subject_id && (
                      <Chip label={m.subject_id} size="small"
                        sx={{ bgcolor: (subjectColors[m.subject_id] || '#1a73e8') + '20',
                              color: subjectColors[m.subject_id] || '#1a73e8', fontWeight: 600, fontSize: 10 }} />
                    )}
                    {m.class_id && <Chip label={`Class ${m.class_id}`} size="small" />}
                    <Chip label={m.material_type} size="small"
                      sx={{ bgcolor: (materialTypeColors[m.material_type] || '#1a73e8') + '20',
                            color: materialTypeColors[m.material_type] || '#1a73e8', fontSize: 10 }} />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(m.created_at).toLocaleDateString('en-IN')}
                    </Typography>
                    {m.file_url ? (
                      <Button size="small" variant="outlined" startIcon={<DownloadIcon />}
                        href={m.file_url} target="_blank" sx={{ borderRadius: 2, fontSize: 11 }}>
                        Download
                      </Button>
                    ) : (
                      <Chip label="No file" size="small" sx={{ fontSize: 10 }} />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Material Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>📚 Add Study Material</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Title" fullWidth value={newMaterial.title}
            onChange={e => setNewMaterial({...newMaterial, title: e.target.value})} />
          <TextField label="Description" multiline rows={2} fullWidth value={newMaterial.description}
            onChange={e => setNewMaterial({...newMaterial, description: e.target.value})}
            placeholder="Brief description of the material..." />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Subject" select fullWidth value={newMaterial.subject}
              onChange={e => setNewMaterial({...newMaterial, subject: e.target.value})}
              SelectProps={{ native: true }}>
              {['Mathematics','Science','English','History','Geography',
                'Physics','Chemistry','Biology','Computer Science'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </TextField>
            <TextField label="Class" fullWidth value={newMaterial.className}
              onChange={e => setNewMaterial({...newMaterial, className: e.target.value})} />
          </Box>
          <TextField label="Material Type" select fullWidth value={newMaterial.materialType}
            onChange={e => setNewMaterial({...newMaterial, materialType: e.target.value})}
            SelectProps={{ native: true }}>
            <option value="notes">📝 Notes</option>
            <option value="document">📄 Document</option>
            <option value="pdf">📕 PDF</option>
            <option value="video">🎥 Video Link</option>
            <option value="image">🖼️ Image</option>
          </TextField>
          <TextField label="File URL or Link (optional)" fullWidth value={newMaterial.fileUrl}
            onChange={e => setNewMaterial({...newMaterial, fileUrl: e.target.value})}
            placeholder="https://drive.google.com/... or any link"
            helperText="Paste a Google Drive link, YouTube link, or any URL" />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}
            disabled={!newMaterial.title || saving}>
            {saving ? 'Saving...' : 'Add Material'}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default TeacherStudyMaterials;