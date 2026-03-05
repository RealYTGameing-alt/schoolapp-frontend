import React from 'react';
import {
  Card, CardContent, Typography, Box, Grid, Chip, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MessageIcon from '@mui/icons-material/Message';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { toast } from 'react-toastify';

const menuItems = [
  { text: 'Dashboard', path: '/parent', icon: <DashboardIcon /> },
  { text: "Child's Progress", path: '/parent/progress', icon: <BarChartIcon /> },
  { text: 'Fee Payments', path: '/parent/fees', icon: <AttachMoneyIcon /> },
  { text: 'Messages', path: '/parent/messages', icon: <MessageIcon /> },
  { text: 'School Calendar', path: '/parent/calendar', icon: <EventNoteIcon /> },
];

const feeHistory = [
  { id: 1, type: 'Tuition Fee', amount: 12000, due: '2026-03-01', paid: '2026-03-01', method: 'UPI', receipt: 'RCP001', status: 'paid' },
  { id: 2, type: 'Transport Fee', amount: 3000, due: '2026-03-01', paid: '2026-03-02', method: 'Cash', receipt: 'RCP002', status: 'paid' },
  { id: 3, type: 'Activity Fee', amount: 1500, due: '2026-03-10', paid: null, method: null, receipt: null, status: 'overdue' },
  { id: 4, type: 'Tuition Fee', amount: 12000, due: '2026-04-01', paid: null, method: null, receipt: null, status: 'upcoming' },
];

const ParentFees = () => {
  const totalPaid = feeHistory.filter(f => f.status === 'paid').reduce((s, f) => s + f.amount, 0);
  const totalDue = feeHistory.filter(f => f.status !== 'paid').reduce((s, f) => s + f.amount, 0);

  return (
    <Layout menuItems={menuItems}>
      <Typography variant="h5" fontWeight={700} mb={1}>💰 Fee Payments</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>Arjun Sharma — Class 10A</Typography>

      <Grid container spacing={3} mb={3}>
        {[
          { label: 'Total Paid', value: `₹${totalPaid.toLocaleString()}`, color: '#34a853', bg: '#e8f5e9' },
          { label: 'Amount Due', value: `₹${totalDue.toLocaleString()}`, color: '#ea4335', bg: '#ffebee' },
          { label: 'Next Due Date', value: 'Mar 10', color: '#fbbc04', bg: '#fff8e1' },
          { label: 'Academic Year', value: '2025-26', color: '#1a73e8', bg: '#e8f0fe' },
        ].map((stat) => (
          <Grid item xs={6} md={3} key={stat.label}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', bgcolor: stat.bg }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight={700} color={stat.color}>{stat.value}</Typography>
                <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {feeHistory.filter(f => f.status === 'overdue').length > 0 && (
        <Card sx={{ borderRadius: 3, bgcolor: '#ffebee', border: '1px solid #ffcdd2', mb: 3 }}>
          <CardContent sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body1" fontWeight={700} color="error.main">⚠️ Overdue Payment</Typography>
              <Typography variant="body2" color="text.secondary">Activity Fee of ₹1,500 was due on Mar 10</Typography>
            </Box>
            <Button variant="contained" color="error" sx={{ borderRadius: 2 }}
              onClick={() => toast.success('💳 Redirecting to payment gateway...')}>
              Pay Now
            </Button>
          </CardContent>
        </Card>
      )}

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell><strong>Fee Type</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Due Date</strong></TableCell>
              <TableCell><strong>Paid On</strong></TableCell>
              <TableCell><strong>Method</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Receipt</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feeHistory.map((fee) => (
              <TableRow key={fee.id} hover>
                <TableCell><Typography variant="body2" fontWeight={500}>{fee.type}</Typography></TableCell>
                <TableCell><strong>₹{fee.amount.toLocaleString()}</strong></TableCell>
                <TableCell>{fee.due}</TableCell>
                <TableCell>{fee.paid || '—'}</TableCell>
                <TableCell>{fee.method || '—'}</TableCell>
                <TableCell>
                  <Chip label={fee.status.toUpperCase()} size="small"
                    color={fee.status === 'paid' ? 'success' : fee.status === 'overdue' ? 'error' : 'warning'} />
                </TableCell>
                <TableCell>
                  {fee.receipt
                    ? <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}
                        onClick={() => toast.info(`🧾 Downloading ${fee.receipt}`)}>
                        {fee.receipt}
                      </Button>
                    : fee.status !== 'paid'
                      ? <Button size="small" variant="contained" color="primary" sx={{ borderRadius: 2 }}
                          onClick={() => toast.success('💳 Redirecting to payment...')}>
                          Pay
                        </Button>
                      : '—'
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default ParentFees;