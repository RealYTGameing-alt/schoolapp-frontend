import React, { useState } from 'react';
import {
  Typography, Box, Card, CardContent, Table, TableBody,
  TableCell, TableHead, TableRow, Avatar, Chip, Button,
  Tabs, Tab
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import { adminMenu } from '../../components/layout/menus';

const staff = [
  { id: 1, name: 'Rajesh Kumar', role: 'Teacher', subject: 'Mathematics', email: 'rajesh@school.com', status: 'Active' },
  { id: 2, name: 'Sunita Sharma', role: 'Teacher', subject: 'Science', email: 'sunita@school.com', status: 'Active' },
  { id: 3, name: 'Dr. Meena Verma', role: 'Principal', subject: '—', email: 'meena@school.com', status: 'Active' },
  { id: 4, name: 'Vikram Nair', role: 'Admin Staff', subject: '—', email: 'vikram@school.com', status: 'On Leave' },
  { id: 5, name: 'Priya Menon', role: 'Teacher', subject: 'English', email: 'priya@school.com', status: 'Active' },
];

const leaveRequests = [
  { id: 1, name: 'Vikram Nair', type: 'Sick Leave', from: '2026-03-10', to: '2026-03-12', status: 'Pending' },
  { id: 2, name: 'Sunita Sharma', type: 'Personal Leave', from: '2026-03-20', to: '2026-03-20', status: 'Approved' },
];

const StaffHR = () => {
  const [tab, setTab] = useState(0);

  return (
    <Layout menuItems={adminMenu}>
      <Typography variant="h5" fontWeight={700} mb={3}>👥 Staff & HR</Typography>
      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="All Staff" />
        <Tab label="Leave Requests" />
        <Tab label="Payroll" />
      </Tabs>

      {tab === 0 && (
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent sx={{ p: 0 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staff.map((s) => (
                  <TableRow key={s.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: '#1a73e8', width: 36, height: 36, fontSize: 14 }}>{s.name.charAt(0)}</Avatar>
                        <Typography variant="body2" fontWeight={600}>{s.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell><Chip label={s.role} size="small" /></TableCell>
                    <TableCell>{s.subject}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>
                      <Chip label={s.status} size="small" color={s.status === 'Active' ? 'success' : 'warning'} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {tab === 1 && (
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent sx={{ p: 0 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell>Staff Name</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveRequests.map((l) => (
                  <TableRow key={l.id} hover>
                    <TableCell>{l.name}</TableCell>
                    <TableCell>{l.type}</TableCell>
                    <TableCell>{l.from}</TableCell>
                    <TableCell>{l.to}</TableCell>
                    <TableCell>
                      <Chip label={l.status} size="small" color={l.status === 'Approved' ? 'success' : 'warning'} />
                    </TableCell>
                    <TableCell>
                      {l.status === 'Pending' && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button size="small" variant="contained" color="success" sx={{ borderRadius: 2 }}>Approve</Button>
                          <Button size="small" variant="outlined" color="error" sx={{ borderRadius: 2 }}>Reject</Button>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {tab === 2 && (
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent sx={{ p: 0 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell>Staff Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staff.map((s) => (
                  <TableRow key={s.id} hover>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.role}</TableCell>
                    <TableCell>₹{s.role === 'Principal' ? '85,000' : s.role === 'Teacher' ? '45,000' : '30,000'}</TableCell>
                    <TableCell><Chip label="Paid" size="small" color="success" /></TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>Payslip</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </Layout>
  );
};

export default StaffHR;