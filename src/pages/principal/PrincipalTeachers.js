import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Avatar, Chip, Button,
  TextField, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '../../components/layout/Layout';
import { principalMenu } from '../../components/layout/menus';

const teachers = [
  { id: 1, name: 'Rajesh Kumar', subject: 'Mathematics', classes: '7A, 8C, 9B, 10A', email: 'rajesh@school.com', attendance: '96%', lessonsSubmitted: 10, status: 'Active' },
  { id: 2, name: 'Sunita Sharma', subject: 'Science', classes: '8C, 9B, 10A', email: 'sunita@school.com', attendance: '98%', lessonsSubmitted: 10, status: 'Active' },
  { id: 3, name: 'Priya Menon', subject: 'English', classes: '9B, 10A', email: 'priya@school.com', attendance: '94%', lessonsSubmitted: 9, status: 'Active' },
  { id: 4, name: 'Amit Singh', subject: 'History', classes: '8C, 9B', email: 'amit@school.com', attendance: '91%', lessonsSubmitted: 8, status: 'Active' },
  { id: 5, name: 'Kavita Rao', subject: 'Geography', classes: '7A, 8C', email: 'kavita@school.com', attendance: '88%', lessonsSubmitted: 7, status: 'On Leave' },
];

const PrincipalTeachers = () => {
  const [search, setSearch] = useState('');

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout menuItems={principalMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>👨‍🏫 Teachers Overview</Typography>

      <TextField fullWidth placeholder="Search by name or subject..."
        value={search} onChange={e => setSearch(e.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        sx={{ mb: 3, bgcolor: 'white', borderRadius: 2 }}
      />

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell>Teacher</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Classes</TableCell>
                <TableCell>Attendance</TableCell>
                <TableCell>Lesson Plans</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: '#1a73e8', width: 36, height: 36, fontSize: 14 }}>{t.name.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{t.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{t.email}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{t.subject}</TableCell>
                  <TableCell><Typography variant="caption">{t.classes}</Typography></TableCell>
                  <TableCell>
                    <Chip label={t.attendance} size="small"
                      color={parseInt(t.attendance) >= 95 ? 'success' : parseInt(t.attendance) >= 90 ? 'warning' : 'error'} />
                  </TableCell>
                  <TableCell>
                    <Chip label={`${t.lessonsSubmitted}/10`} size="small"
                      color={t.lessonsSubmitted >= 9 ? 'success' : 'warning'} />
                  </TableCell>
                  <TableCell>
                    <Chip label={t.status} size="small" color={t.status === 'Active' ? 'success' : 'warning'} />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default PrincipalTeachers;