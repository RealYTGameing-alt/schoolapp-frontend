import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Grid, LinearProgress
} from '@mui/material';
import adminMenuItems from '../../components/layout/adminMenu';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const initialPayments = [
  { id: 1, student: 'Arjun Sharma', class: '10A', type: 'Tuition Fee', amount: 12000, date: '2026-03-01', method: 'Online', status: 'paid', receipt: 'RCP001' },
  { id: 2, student: 'Priya Patel', class: '9B', type: 'Transport Fee', amount: 3000, date: '2026-03-02', method: 'Cash', status: 'paid', receipt: 'RCP002' },
  { id: 3, student: 'Rohan Singh', class: '8C', type: 'Activity Fee', amount: 1500, date: '2026-03-05', method: 'UPI', status: 'overdue', receipt: null },
  { id: 4, student: 'Ananya Gupta', class: '10A', type: 'Tuition Fee', amount: 12000, date: '2026-03-10', method: 'Cheque', status: 'pending', receipt: null },
];

const FeeManagement = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const newPayment = {
      id: Date.now(),
      ...data,
      amount: Number(data.amount),
      status: 'paid',
      receipt: `RCP${String(payments.length + 1).padStart(3, '0')}`
    };
    setPayments(prev => [newPayment, ...prev]);
    toast.success('✅ Payment recorded successfully!');
    setOpen(false);
    reset();
  };

  const totalCollected = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status !== 'paid').reduce((sum, p) => sum + p.amount, 0);

  return (
    <Layout menuItems={adminMenuItems}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>💰 Fee Management</Typography>
          <Typography variant="body2" color="text.secondary">Track and manage all fee payments</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>
          Record Payment
        </Button>
      </Box>

      <Grid container spacing={3} mb={3}>
        {[
          { label: 'Total Collected', value: `₹${totalCollected.toLocaleString()}`, color: '#34a853', progress: 75 },
          { label: 'Pending Amount', value: `₹${totalPending.toLocaleString()}`, color: '#ea4335', progress: 25 },
          { label: 'Total Students', value: '1,247', color: '#1a73e8', progress: 100 },
          { label: 'Collection Rate', value: '78%', color: '#fbbc04', progress: 78 },
        ].map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                <Typography variant="h5" fontWeight={700} color={stat.color} mt={1}>{stat.value}</Typography>
                <LinearProgress variant="determinate" value={stat.progress} sx={{
                  mt: 1.5, height: 6, borderRadius: 3,
                  bgcolor: `${stat.color}20`, '& .MuiLinearProgress-bar': { bgcolor: stat.color }
                }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell><strong>Student</strong></TableCell>
              <TableCell><strong>Class</strong></TableCell>
              <TableCell><strong>Fee Type</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Method</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Receipt</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell><Typography variant="body2" fontWeight={500}>{p.student}</Typography></TableCell>
                <TableCell>{p.class}</TableCell>
                <TableCell>{p.type}</TableCell>
                <TableCell><strong>₹{Number(p.amount).toLocaleString()}</strong></TableCell>
                <TableCell>{p.date}</TableCell>
                <TableCell>{p.method}</TableCell>
                <TableCell>
                  <Chip
                    label={p.status.toUpperCase()}
                    size="small"
                    color={p.status === 'paid' ? 'success' : p.status === 'overdue' ? 'error' : 'warning'}
                  />
                </TableCell>
                <TableCell>
                  {p.receipt
                    ? <Chip label={p.receipt} size="small" variant="outlined" color="primary" />
                    : <Typography variant="caption" color="text.secondary">—</Typography>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Record Fee Payment</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Student Name" margin="normal" {...register('student', { required: true })} />
          <TextField fullWidth label="Class" margin="normal" {...register('class', { required: true })} />
          <TextField fullWidth label="Fee Type" margin="normal" {...register('type', { required: true })} />
          <TextField fullWidth label="Amount (₹)" type="number" margin="normal" {...register('amount', { required: true })} />
          <TextField fullWidth label="Payment Date" type="date" margin="normal"
            InputLabelProps={{ shrink: true }} {...register('date', { required: true })} />
          <TextField fullWidth label="Payment Method" margin="normal"
            {...register('method')} placeholder="Cash / UPI / Online / Cheque" />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{ borderRadius: 2 }}>Save Payment</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default FeeManagement;