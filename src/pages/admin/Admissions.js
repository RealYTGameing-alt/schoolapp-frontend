import adminMenuItems from '../../components/layout/adminMenu';
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Grid, Stepper, Step, StepLabel
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



const steps = ['Inquiry', 'Application', 'Document Verification', 'Merit List', 'Seat Allotted', 'Enrolled'];

const initialAdmissions = [
  { id: 1, name: 'Kavya Nair', dob: '2012-05-10', class: 'Class 6', parent: 'Mohan Nair', phone: '9876543210', email: 'mohan@email.com', status: 'Enrolled', merit: 92 },
  { id: 2, name: 'Dev Malhotra', dob: '2011-08-22', class: 'Class 7', parent: 'Rajiv Malhotra', phone: '9876543211', email: 'rajiv@email.com', status: 'Merit List', merit: 88 },
  { id: 3, name: 'Sia Joshi', dob: '2013-01-15', class: 'Class 5', parent: 'Amit Joshi', phone: '9876543212', email: 'amit@email.com', status: 'Document Verification', merit: 79 },
  { id: 4, name: 'Aryan Bose', dob: '2010-11-30', class: 'Class 8', parent: 'Subir Bose', phone: '9876543213', email: 'subir@email.com', status: 'Inquiry', merit: null },
];

const statusColor = { Inquiry: 'default', Application: 'info', 'Document Verification': 'warning', 'Merit List': 'secondary', 'Seat Allotted': 'primary', Enrolled: 'success' };

const Admissions = () => {
  const [admissions, setAdmissions] = useState(initialAdmissions);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setAdmissions(prev => [...prev, { id: Date.now(), ...data, status: 'Inquiry', merit: null }]);
    toast.success('✅ New admission inquiry added!');
    setOpen(false);
    reset();
  };

  return (
    <Layout menuItems={adminMenuItems}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>🎓 Admissions Management</Typography>
          <Typography variant="body2" color="text.secondary">Track students from inquiry to enrollment</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ borderRadius: 2 }}>
          New Application
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>📊 Admission Pipeline</Typography>
          <Stepper alternativeLabel>
            {steps.map((step) => (
              <Step key={step} active>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      <Grid container spacing={2} mb={3}>
        {[
          { label: 'Total Inquiries', value: admissions.length, color: '#1a73e8' },
          { label: 'Enrolled', value: admissions.filter(a => a.status === 'Enrolled').length, color: '#34a853' },
          { label: 'In Progress', value: admissions.filter(a => !['Enrolled', 'Inquiry'].includes(a.status)).length, color: '#fbbc04' },
          { label: 'Seats Available', value: 47, color: '#ea4335' },
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

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell><strong>Applicant</strong></TableCell>
              <TableCell><strong>Class</strong></TableCell>
              <TableCell><strong>Parent</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Merit Score</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admissions.map((a) => (
              <TableRow key={a.id} hover>
                <TableCell><Typography variant="body2" fontWeight={500}>{a.name}</Typography></TableCell>
                <TableCell>{a.class}</TableCell>
                <TableCell>{a.parent}</TableCell>
                <TableCell>{a.phone}</TableCell>
                <TableCell>{a.merit ? <Chip label={`${a.merit}%`} size="small" color="primary" /> : '—'}</TableCell>
                <TableCell><Chip label={a.status} size="small" color={statusColor[a.status] || 'default'} /></TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}
                    onClick={() => {
                      const idx = steps.indexOf(a.status);
                      if (idx < steps.length - 1) {
                        setAdmissions(prev => prev.map(x => x.id === a.id ? { ...x, status: steps[idx + 1] } : x));
                        toast.info(`Moved to: ${steps[idx + 1]}`);
                      }
                    }}>
                    Advance
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>New Admission Application</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Applicant Name" margin="normal" {...register('name', { required: true })} />
          <TextField fullWidth label="Date of Birth" type="date" margin="normal"
            InputLabelProps={{ shrink: true }} {...register('dob')} />
          <TextField fullWidth label="Applying for Class" margin="normal" {...register('class', { required: true })} />
          <TextField fullWidth label="Parent/Guardian Name" margin="normal" {...register('parent', { required: true })} />
          <TextField fullWidth label="Parent Phone" margin="normal" {...register('phone')} />
          <TextField fullWidth label="Parent Email" margin="normal" {...register('email')} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{ borderRadius: 2 }}>Submit Application</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Admissions;