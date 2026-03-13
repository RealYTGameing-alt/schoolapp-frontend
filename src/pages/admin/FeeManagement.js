import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Chip, Button,
  TextField, InputAdornment, Alert, Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';

const feeData = [
  { id: 1, student: 'Aarav Sharma', class: '10A', term: 'Term 1', amount: '₹12,000', due: '2026-01-15', paid: '2026-01-10', status: 'Paid' },
  { id: 2, student: 'Priya Patel', class: '10A', term: 'Term 1', amount: '₹12,000', due: '2026-01-15', paid: '2026-01-14', status: 'Paid' },
  { id: 3, student: 'Rohan Singh', class: '9B', term: 'Term 1', amount: '₹10,000', due: '2026-01-15', paid: '—', status: 'Pending' },
  { id: 4, student: 'Ananya Gupta', class: '9B', term: 'Term 1', amount: '₹10,000', due: '2026-01-15', paid: '2026-01-08', status: 'Paid' },
  { id: 5, student: 'Vikram Mehta', class: '8C', term: 'Term 1', amount: '₹8,500', due: '2026-01-15', paid: '—', status: 'Overdue' },
  { id: 6, student: 'Sneha Reddy', class: '8C', term: 'Term 1', amount: '₹8,500', due: '2026-01-15', paid: '2026-01-12', status: 'Paid' },
];

const statCards = [
  { label: 'Total Collected', value: '₹12.4L', color: '#34a853', bg: '#e6f4ea' },
  { label: 'Pending', value: '₹1.8L', color: '#fbbc04', bg: '#fef9e7' },
  { label: 'Overdue', value: '₹0.5L', color: '#ea4335', bg: '#fce8e6' },
  { label: 'Collection Rate', value: '87%', color: '#1a73e8', bg: '#e8f0fe' },
];

const FeeManagement = () => {
  const [search, setSearch] = useState('');
  const [success, setSuccess] = useState('');

  const filtered = feeData.filter(f =>
    f.student.toLowerCase().includes(search.toLowerCase()) ||
    f.class.toLowerCase().includes(search.toLowerCase())
  );

  const markPaid = (id) => {
    setSuccess('✅ Fee marked as paid!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Layout menuItems={adminMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>💰 Fee Management</Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Grid container spacing={2} mb={3}>
        {statCards.map((s) => (
          <Grid item xs={6} md={3} key={s.label}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: `4px solid ${s.color}` }}>
              <CardContent sx={{ py: 1.5 }}>
                <Typography variant="h6" fontWeight={700} color={s.color}>{s.value}</Typography>
                <Typography variant="caption" color="text.secondary">{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <TextField fullWidth placeholder="Search by student or class..."
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
                  <TableCell>Term</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((f) => (
                  <TableRow key={f.id} hover>
                    <TableCell><Typography variant="body2" fontWeight={600}>{f.student}</Typography></TableCell>
                    <TableCell><Chip label={f.class} size="small" /></TableCell>
                    <TableCell>{f.term}</TableCell>
                    <TableCell><Typography variant="body2" fontWeight={600}>{f.amount}</Typography></TableCell>
                    <TableCell>{f.due}</TableCell>
                    <TableCell>
                      <Chip label={f.status} size="small"
                        color={f.status === 'Paid' ? 'success' : f.status === 'Pending' ? 'warning' : 'error'} />
                    </TableCell>
                    <TableCell>
                      {f.status !== 'Paid' ? (
                        <Button size="small" variant="contained" color="success"
                          onClick={() => markPaid(f.id)} sx={{ borderRadius: 2 }}>
                          Mark Paid
                        </Button>
                      ) : (
                        <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>Receipt</Button>
                      )}
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

export default FeeManagement;