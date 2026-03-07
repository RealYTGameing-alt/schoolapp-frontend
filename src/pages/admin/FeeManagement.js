import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Chip, Button, Grid
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';

const feeData = [
  { id: 1, student: 'Aarav Sharma', class: '10A', amount: '₹12,000', dueDate: '2026-03-01', status: 'Paid', paidOn: '2026-02-28' },
  { id: 2, student: 'Priya Patel', class: '10A', amount: '₹12,000', dueDate: '2026-03-01', status: 'Paid', paidOn: '2026-03-01' },
  { id: 3, student: 'Rohan Singh', class: '9B', amount: '₹10,500', dueDate: '2026-03-01', status: 'Pending', paidOn: '—' },
  { id: 4, student: 'Vikram Mehta', class: '8C', amount: '₹9,000', dueDate: '2026-02-01', status: 'Overdue', paidOn: '—' },
  { id: 5, student: 'Sneha Reddy', class: '8C', amount: '₹9,000', dueDate: '2026-03-01', status: 'Paid', paidOn: '2026-03-02' },
];

const summaryStats = [
  { label: 'Total Collected', value: '₹12.4L', color: '#34a853' },
  { label: 'Pending', value: '₹1.2L', color: '#fbbc04' },
  { label: 'Overdue', value: '₹45,000', color: '#ea4335' },
  { label: 'Collection Rate', value: '91%', color: '#1a73e8' },
];

const FeeManagement = () => {
  return (
    <Layout menuItems={adminMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>💰 Fee Management</Typography>

      <Grid container spacing={3} mb={3}>
        {summaryStats.map((stat) => (
          <Grid item xs={6} md={3} key={stat.label}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: `4px solid ${stat.color}` }}>
              <CardContent>
                <Typography variant="h5" fontWeight={700} color={stat.color}>{stat.value}</Typography>
                <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell>Student</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Paid On</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeData.map((f) => (
                <TableRow key={f.id} hover>
                  <TableCell>{f.student}</TableCell>
                  <TableCell><Chip label={f.class} size="small" /></TableCell>
                  <TableCell fontWeight={600}>{f.amount}</TableCell>
                  <TableCell>{f.dueDate}</TableCell>
                  <TableCell>
                    <Chip label={f.status} size="small"
                      color={f.status === 'Paid' ? 'success' : f.status === 'Pending' ? 'warning' : 'error'} />
                  </TableCell>
                  <TableCell>{f.paidOn}</TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>Receipt</Button>
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

export default FeeManagement;