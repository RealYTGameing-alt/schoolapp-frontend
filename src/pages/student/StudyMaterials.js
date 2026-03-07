import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Chip, Button,
  TextField, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import Layout from '../../components/layout/Layout';
import { studentMenu } from '../../components/layout/menus';

const materials = [
  { id: 1, title: 'Quadratic Equations — Notes', subject: 'Mathematics', type: 'pdf', uploadedBy: 'Rajesh Kumar', date: '2026-03-01', size: '2.3 MB' },
  { id: 2, title: 'Newton\'s Laws — Summary', subject: 'Physics', type: 'pdf', uploadedBy: 'Sunita Sharma', date: '2026-03-02', size: '1.8 MB' },
  { id: 3, title: 'Essay Writing Guide', subject: 'English', type: 'doc', uploadedBy: 'Priya Menon', date: '2026-03-03', size: '0.9 MB' },
  { id: 4, title: 'World War II — Timeline', subject: 'History', type: 'pdf', uploadedBy: 'Amit Singh', date: '2026-03-04', size: '3.1 MB' },
  { id: 5, title: 'Trigonometry Formulas', subject: 'Mathematics', type: 'pdf', uploadedBy: 'Rajesh Kumar', date: '2026-03-05', size: '0.5 MB' },
];

const StudyMaterials = () => {
  const [search, setSearch] = useState('');

  const filtered = materials.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout menuItems={studentMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>📚 Study Materials</Typography>

      <TextField fullWidth placeholder="Search materials..."
        value={search} onChange={(e) => setSearch(e.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        sx={{ mb: 3, bgcolor: 'white', borderRadius: 2 }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filtered.map((m) => (
          <Card key={m.id} sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: m.type === 'pdf' ? '#fce8e6' : '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {m.type === 'pdf' ? <PictureAsPdfIcon sx={{ color: '#ea4335' }} /> : <ArticleIcon sx={{ color: '#1a73e8' }} />}
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={600}>{m.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {m.subject} • By {m.uploadedBy} • {m.date} • {m.size}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label={m.subject} size="small" />
                <Button variant="outlined" size="small" startIcon={<DownloadIcon />} sx={{ borderRadius: 2 }}>
                  Download
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Layout>
  );
};

export default StudyMaterials;