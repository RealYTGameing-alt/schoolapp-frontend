import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Avatar, Chip, Button,
  TextField, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '../../components/layout/Layout';
import { principalMenu } from '../../components/layout/menus';

const students = [
  { id: 1, name: 'Aarav Sharma', class: '10A', rollNo: '001', attendance: '95%', avgScore: 88, fees: 'Paid' },
  { id: 2, name: 'Priya Patel', class: '10A', rollNo: '002', attendance: '88%', avgScore: 92, fees: 'Paid' },
  { id: 3, name: 'Rohan Singh', class: '9B', rollNo: '003', attendance: '92%', avgScore: 76, fees: 'Pending' },
  { id: 4, name: 'Ananya Gupta', class: '9B', rollNo: '004', attendance: '97%', avgScore: 95, fees: 'Paid' },
  { id: 5, name: 'Vikram Mehta', class: '8C', rollNo: '005', attendance: '78%', avgScore: 65, fees: 'Overdue' },
  { id: 6, name: 'Sneha Reddy', class: '8C', rollNo: '006', attendance: '91%', avgScore: 83, fees: 'Paid' },
];

const PrincipalStudents = () => {
  const [search, setSearch] = useState('');

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout menuItems={principalMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>🎓 Students Overview</Typography>

      <TextField fullWidth placeholder="Search by name or class..."
        value={search} onChange={e => setSearch(e.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        sx={{ mb: 3, bgcolor: 'white', borderRadius: 2 }} size="small"
      />

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0, overflow: 'auto' }}>
          <Box sx={{ minWidth: 600 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell>Student</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Roll No.</TableCell>
                  <TableCell>Attendance</TableCell>
                  <TableCell>Avg Score</TableCell>
                  <TableCell>Fees</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: '#1a73e8', width: 36, height: 36, fontSize: 14 }}>{s.name.charAt(0)}</Avatar>
                        <Typography variant="body2" fontWeight={600}>{s.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell><Chip label={s.class} size="small" /></TableCell>
                    <TableCell>{s.rollNo}</TableCell>
                    <TableCell>
                      <Chip label={s.attendance} size="small"
                        color={parseInt(s.attendance) >= 90 ? 'success' : parseInt(s.attendance) >= 80 ? 'warning' : 'error'} />
                    </TableCell>
                    <TableCell>
                      <Chip label={s.avgScore + '%'} size="small"
                        color={s.avgScore >= 80 ? 'success' : s.avgScore >= 60 ? 'warning' : 'error'} />
                    </TableCell>
                    <TableCell>
                      <Chip label={s.fees} size="small"
                        color={s.fees === 'Paid' ? 'success' : s.fees === 'Pending' ? 'warning' : 'error'} />
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default PrincipalStudents;