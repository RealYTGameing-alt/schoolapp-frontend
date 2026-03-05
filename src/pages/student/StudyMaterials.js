import MessageIcon from '@mui/icons-material/Message';
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Button, Grid,
  Chip, TextField, InputAdornment, Avatar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LinkIcon from '@mui/icons-material/Link';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { toast } from 'react-toastify';

const menuItems = [
  { text: 'Dashboard', path: '/student', icon: <DashboardIcon /> },
  { text: 'Assignments', path: '/student/assignments', icon: <AssignmentIcon /> },
  { text: 'Study Materials', path: '/student/materials', icon: <MenuBookIcon /> },
  { text: 'My Progress', path: '/student/progress', icon: <BarChartIcon /> },
  { text: 'Timetable', path: '/student/timetable', icon: <EventNoteIcon /> },
  { text: 'Messages', path: '/student/messages', icon: <MessageIcon /> },
];

const typeIcon = { pdf: <PictureAsPdfIcon />, video: <VideoLibraryIcon />, link: <LinkIcon />, audio: <AudiotrackIcon /> };
const typeColor = { pdf: '#ea4335', video: '#1a73e8', link: '#34a853', audio: '#fbbc04' };

const materials = [
  { id: 1, title: 'Chapter 5 - Quadratic Equations', subject: 'Mathematics', type: 'pdf', teacher: 'Rajesh Kumar', date: '2026-03-01', size: '2.4 MB' },
  { id: 2, title: 'Photosynthesis Explained', subject: 'Science', type: 'video', teacher: 'Sunita Sharma', date: '2026-03-02', size: '45 mins' },
  { id: 3, title: 'Grammar Rules - Advanced', subject: 'English', type: 'pdf', teacher: 'Priya Menon', date: '2026-03-03', size: '1.1 MB' },
  { id: 4, title: 'World War II Summary', subject: 'History', type: 'link', teacher: 'Vikram Nair', date: '2026-03-04', size: 'External' },
  { id: 5, title: 'Periodic Table Audio Guide', subject: 'Chemistry', type: 'audio', teacher: 'Sunita Sharma', date: '2026-03-05', size: '12 mins' },
  { id: 6, title: 'Algebra Practice Problems', subject: 'Mathematics', type: 'pdf', teacher: 'Rajesh Kumar', date: '2026-03-05', size: '890 KB' },
];

const StudyMaterials = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = materials.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || m.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <Layout menuItems={menuItems}>
      <Typography variant="h5" fontWeight={700} mb={1}>📚 Study Materials</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>All resources uploaded by your teachers</Typography>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField placeholder="Search materials..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          size="small" sx={{ minWidth: 280, bgcolor: 'white', borderRadius: 2 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
        />
        <Box display="flex" gap={1}>
          {['all', 'pdf', 'video', 'audio', 'link'].map((type) => (
            <Chip key={type} label={type.toUpperCase()} onClick={() => setFilter(type)}
              color={filter === type ? 'primary' : 'default'}
              sx={{ cursor: 'pointer', fontWeight: 600 }} />
          ))}
        </Box>
      </Box>

      <Grid container spacing={2}>
        {filtered.map((mat) => (
          <Grid item xs={12} sm={6} md={4} key={mat.id}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }, transition: 'box-shadow 0.2s' }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                  <Avatar sx={{ bgcolor: `${typeColor[mat.type]}20`, color: typeColor[mat.type], width: 44, height: 44 }}>
                    {typeIcon[mat.type]}
                  </Avatar>
                  <Box>
                    <Chip label={mat.type.toUpperCase()} size="small" sx={{ bgcolor: `${typeColor[mat.type]}20`, color: typeColor[mat.type], fontWeight: 700, fontSize: 10 }} />
                    <Typography variant="caption" display="block" color="text.secondary">{mat.size}</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" fontWeight={600} mb={0.5}>{mat.title}</Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                  📚 {mat.subject} • 👨‍🏫 {mat.teacher}
                </Typography>
                <Typography variant="caption" color="text.secondary">📅 {mat.date}</Typography>
                <Button fullWidth variant="outlined" size="small" sx={{ mt: 2, borderRadius: 2 }}
                  onClick={() => toast.info(`📥 Downloading: ${mat.title}`)}>
                  {mat.type === 'link' ? '🔗 Open Link' : mat.type === 'video' ? '▶️ Watch' : '📥 Download'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default StudyMaterials;