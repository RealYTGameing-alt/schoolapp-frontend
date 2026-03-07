import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Chip, Button, Avatar
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';

const applications = [
  { id: 1, name: 'Arjun Nair', applyingFor: 'Class 6', parent: 'Suresh Nair', date: '2026-03-01', status: 'Pending' },
  { id: 2, name: 'Kavya Reddy', applyingFor: 'Class 9', parent: 'Ramesh Reddy', date: '2026-03-02', status: 'Approved' },
  { id: 3, name: 'Dev Patel', applyingFor: 'Class 7', parent: 'Nitin Patel', date: '2026-03-03', status: 'Pending' },
  { id: 4, name: 'Ishaan Gupta', applyingFor: 'Class 11', parent: 'Anil Gupta', date: '2026-03-04', status: 'Rejected' },
  { id: 5, name: 'Riya Sharma', applyingFor: 'Class 8', parent: 'Deepak Sharma', date: '2026-03-05', status: 'Pending' },
];

const Admissions = () => {
  const [data, setData] = useState(applications);

  const updateStatus = (id, status) => {
    setData(prev => prev.map(a => a.id === id ? {...a, status} : a));
  };

  return (
    <Layout menuItems={adminMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>📋 Admissions</Typography>
      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell>Applicant</TableCell>
                <TableCell>Applying For</TableCell>
                <TableCell>Parent Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((a) => (
                <TableRow key={a.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: '#1a73e8', width: 32, height: 32, fontSize: 13 }}>{a.name.charAt(0)}</Avatar>
                      <Typography variant="body2" fontWeight={600}>{a.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{a.applyingFor}</TableCell>
                  <TableCell>{a.parent}</TableCell>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>
                    <Chip label={a.status} size="small"
                      color={a.status === 'Approved' ? 'success' : a.status === 'Rejected' ? 'error' : 'warning'} />
                  </TableCell>
                  <TableCell>
                    {a.status === 'Pending' && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="small" variant="contained" color="success" sx={{ borderRadius: 2 }} onClick={() => updateStatus(a.id, 'Approved')}>Approve</Button>
                        <Button size="small" variant="outlined" color="error" sx={{ borderRadius: 2 }} onClick={() => updateStatus(a.id, 'Rejected')}>Reject</Button>
                      </Box>
                    )}
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

export default Admissions;