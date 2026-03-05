import adminMenuItems from '../../components/layout/adminMenu';
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Grid, Avatar, Tabs, Tab
} from '@mui/material';
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


const initialStaff = [
  { id: 1, name: 'Rajesh Kumar', role: 'Teacher', dept: 'Mathematics', joined: '2019-06-01', salary: 45000, status: 'active', leaves: 2 },
  { id: 2, name: 'Sunita Sharma', role: 'Teacher', dept: 'Science', joined: '2020-07-15', salary: 42000, status: 'active', leaves: 0 },
  { id: 3, name: 'Vikram Nair', role: 'Admin Staff', dept: 'Administration', joined: '2018-03-01', salary: 35000, status: 'active', leaves: 1 },
  { id: 4, name: 'Priya Menon', role: 'Teacher', dept: 'English', joined: '2021-08-01', salary: 40000, status: 'on leave', leaves: 5 },
];

const StaffHR = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setStaff(prev => [...prev, { id: Date.now(), ...data, salary: Number(data.salary), status: 'active', leaves: 0 }]);
    toast.success('✅ Staff member added!');
    setOpen(false);
    reset();
  };

  const leaveRequests = [
    { name: 'Priya Menon', type: 'Medical Leave', from: '2026-03-10', to: '2026-03-15', status: 'pending' },
    { name: 'Rajesh Kumar', type: 'Casual Leave', from: '2026-03-20', to: '2026-03-21', status: 'approved' },
  ];

  return (
    <Layout menuItems={adminMenuItems}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>👥 Staff & HR Management</Typography>
          <Typography variant="body2" color="text.secondary">Manage employees, leaves and payroll</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>
          Add Staff
        </Button>
      </Box>

      <Grid container spacing={2} mb={3}>
        {[
          { label: 'Total Staff', value: staff.length, color: '#1a73e8' },
          { label: 'Active', value: staff.filter(s => s.status === 'active').length, color: '#34a853' },
          { label: 'On Leave', value: staff.filter(s => s.status === 'on leave').length, color: '#ea4335' },
          { label: 'Monthly Payroll', value: `₹${(staff.reduce((s, e) => s + e.salary, 0) / 1000).toFixed(0)}K`, color: '#fbbc04' },
        ].map((stat) => (
          <Grid item xs={6} md={3} key={stat.label}>
            <Card sx={{ borderRadius: 3, textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Typography variant="h4" fontWeight={700} color={stat.color}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ borderBottom: '1px solid #eee', px: 2 }}>
          <Tab label="All Staff" />
          <Tab label="Leave Requests" />
          <Tab label="Payroll" />
        </Tabs>

        {tab === 0 && (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                <TableRow>
                  <TableCell><strong>Employee</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Department</strong></TableCell>
                  <TableCell><strong>Joined</strong></TableCell>
                  <TableCell><strong>Salary</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staff.map((s) => (
                  <TableRow key={s.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: '#1a73e8', fontSize: 14 }}>
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>{s.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{s.role}</TableCell>
                    <TableCell>{s.dept}</TableCell>
                    <TableCell>{s.joined}</TableCell>
                    <TableCell><strong>₹{s.salary.toLocaleString()}</strong></TableCell>
                    <TableCell>
                      <Chip label={s.status} size="small" color={s.status === 'active' ? 'success' : 'warning'} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tab === 1 && (
          <Box p={3}>
            {leaveRequests.map((req, i) => (
              <Box key={i} sx={{ p: 2, mb: 2, bgcolor: '#f8f9fa', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1" fontWeight={600}>{req.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{req.type} • {req.from} to {req.to}</Typography>
                </Box>
                <Box display="flex" gap={1} alignItems="center">
                  <Chip label={req.status} size="small" color={req.status === 'approved' ? 'success' : 'warning'} />
                  {req.status === 'pending' && (
                    <>
                      <Button size="small" variant="contained" color="success" sx={{ borderRadius: 2 }}
                        onClick={() => toast.success('Leave approved!')}>Approve</Button>
                      <Button size="small" variant="outlined" color="error" sx={{ borderRadius: 2 }}
                        onClick={() => toast.error('Leave rejected!')}>Reject</Button>
                    </>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {tab === 2 && (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                <TableRow>
                  <TableCell><strong>Employee</strong></TableCell>
                  <TableCell><strong>Basic Salary</strong></TableCell>
                  <TableCell><strong>PF (12%)</strong></TableCell>
                  <TableCell><strong>Tax</strong></TableCell>
                  <TableCell><strong>Net Salary</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staff.map((s) => {
                  const pf = Math.round(s.salary * 0.12);
                  const tax = Math.round(s.salary * 0.05);
                  const net = s.salary - pf - tax;
                  return (
                    <TableRow key={s.id} hover>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>₹{s.salary.toLocaleString()}</TableCell>
                      <TableCell>₹{pf.toLocaleString()}</TableCell>
                      <TableCell>₹{tax.toLocaleString()}</TableCell>
                      <TableCell><strong>₹{net.toLocaleString()}</strong></TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}
                          onClick={() => toast.success(`Payslip generated for ${s.name}`)}>
                          Generate Payslip
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Add New Staff Member</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Full Name" margin="normal" {...register('name', { required: true })} />
          <TextField fullWidth label="Role" margin="normal" {...register('role', { required: true })} />
          <TextField fullWidth label="Department" margin="normal" {...register('dept', { required: true })} />
          <TextField fullWidth label="Date of Joining" type="date" margin="normal"
            InputLabelProps={{ shrink: true }} {...register('joined')} />
          <TextField fullWidth label="Monthly Salary (₹)" type="number" margin="normal" {...register('salary', { required: true })} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{ borderRadius: 2 }}>Add Staff</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default StaffHR;