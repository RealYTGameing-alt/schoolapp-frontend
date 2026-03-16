import React, { useState } from 'react';
import {
  Box, Typography, Button, Card, CardContent,
  Grid, Chip, TextField, Avatar, Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: <SchoolIcon sx={{ fontSize: 32 }} />, title: 'Student Management', desc: 'Manage admissions, attendance, grades and progress all in one place.', color: '#1a73e8' },
  { icon: <PeopleIcon sx={{ fontSize: 32 }} />, title: 'Staff & HR', desc: 'Track teacher attendance, lesson plans, leave applications and payroll.', color: '#34a853' },
  { icon: <AssignmentIcon sx={{ fontSize: 32 }} />, title: 'Assignments & Exams', desc: 'Create assignments, collect submissions and grade them digitally.', color: '#fbbc04' },
  { icon: <SmartToyIcon sx={{ fontSize: 32 }} />, title: 'AI Plagiarism Detection', desc: 'Automatically detect AI-generated content and plagiarism in submissions.', color: '#ea4335' },
  { icon: <BarChartIcon sx={{ fontSize: 32 }} />, title: 'Reports & Analytics', desc: 'Get real-time insights on attendance, fees, and student performance.', color: '#9c27b0' },
  { icon: <NotificationsIcon sx={{ fontSize: 32 }} />, title: 'Smart Notifications', desc: 'Automatically notify students and parents about attendance and grades.', color: '#00bcd4' },
  { icon: <PhoneAndroidIcon sx={{ fontSize: 32 }} />, title: 'Mobile Friendly', desc: 'Works perfectly on phones and tablets — no app download needed.', color: '#ff9800' },
  { icon: <SecurityIcon sx={{ fontSize: 32 }} />, title: 'Secure & Reliable', desc: 'Bank-grade security with role-based access for every user type.', color: '#607d8b' },
];

const plans = [
  {
    name: 'Starter', price: '₹2,999', period: '/month',
    desc: 'Perfect for small schools', color: '#1a73e8', bg: '#e8f0fe',
    features: ['Up to 200 students', '10 teacher accounts', 'Attendance & assignments', 'Basic reports', 'Mobile app access', 'Email support'],
    popular: false,
  },
  {
    name: 'Growth', price: '₹5,999', period: '/month',
    desc: 'Most popular for growing schools', color: '#34a853', bg: '#e6f4ea',
    features: ['Up to 600 students', '30 teacher accounts', 'All Starter features', 'AI plagiarism detection', 'Advanced analytics', 'Fee management', 'Priority support'],
    popular: true,
  },
  {
    name: 'Enterprise', price: '₹12,999', period: '/month',
    desc: 'For large institutions', color: '#9c27b0', bg: '#f3e5f5',
    features: ['Unlimited students', 'Unlimited teachers', 'All Growth features', 'Custom branding', 'Dedicated support', 'Data export', 'API access'],
    popular: false,
  },
];

const testimonials = [
  { name: 'Sunita Sharma', role: 'Principal, Bright Future School, Nagpur', text: 'EduManage Pro transformed how we manage our school. Attendance tracking alone saves us 2 hours every day!', avatar: 'SS', color: '#1a73e8' },
  { name: 'Rajesh Patel', role: 'Admin, Delhi Public School, Pune', text: 'Parents love getting instant notifications when their child is absent. The fee management is incredibly simple.', avatar: 'RP', color: '#34a853' },
  { name: 'Meena Verma', role: "Principal, St. Mary's Academy, Mumbai", text: 'The AI plagiarism detection has completely changed how our teachers grade assignments. Highly recommend!', avatar: 'MV', color: '#ea4335' },
];

const stats = [
  { value: '50+', label: 'Schools' },
  { value: '25K+', label: 'Students' },
  { value: '98%', label: 'Satisfaction' },
  { value: '4hrs', label: 'Saved/Day' },
];

const roles = [
  { role: 'Admin', emoji: '👨‍💼', color: '#ea4335', bg: '#fce8e6',
    points: ['Manage all users', 'Track fee payments', 'School-wide reports', 'Control admissions'] },
  { role: 'Principal', emoji: '🏫', color: '#9c27b0', bg: '#f3e5f5',
    points: ['Monitor teachers', 'Attendance reports', 'Send announcements', 'School metrics'] },
  { role: 'Teacher', emoji: '👨‍🏫', color: '#1a73e8', bg: '#e8f0fe',
    points: ['Digital attendance', 'Create assignments', 'Submit lesson plans', 'AI plagiarism check'] },
  { role: 'Student', emoji: '🎓', color: '#34a853', bg: '#e6f4ea',
    points: ['View timetable', 'Submit assignments', 'Track progress', 'Get notifications'] },
  { role: 'Parent', emoji: '👨‍👩‍👧', color: '#fbbc04', bg: '#fef9e7',
    points: ["Monitor attendance", 'View grades', 'Pay fees online', 'Message teachers'] },
];

const Landing = () => {
  const navigate = useNavigate();
  const [demoForm, setDemoForm] = useState({ name: '', school: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDemoSubmit = () => {
    if (!demoForm.name || !demoForm.school || !demoForm.phone) return;
    setSubmitted(true);
  };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh', fontFamily: '"Google Sans", Roboto, sans-serif', overflowX: 'hidden' }}>

      {/* NAVBAR */}
      <Box sx={{
        position: 'sticky', top: 0, zIndex: 1000,
        bgcolor: 'white', boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
        px: { xs: 2, md: 6 }, py: 1.5,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={800} color="#1a73e8" sx={{ fontSize: { xs: 16, md: 20 } }}>
            🎓 EduManage Pro
          </Typography>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <Button onClick={() => scrollTo('features')} sx={{ color: '#444' }}>Features</Button>
            <Button onClick={() => scrollTo('pricing')} sx={{ color: '#444' }}>Pricing</Button>
            <Button onClick={() => scrollTo('roles')} sx={{ color: '#444' }}>Who It's For</Button>
            <Button onClick={() => scrollTo('demo')} sx={{ color: '#444' }}>Contact</Button>
            <Button variant="outlined" onClick={() => navigate('/login')} sx={{ borderRadius: 2, ml: 1 }}>Login</Button>
            <Button variant="contained" onClick={() => scrollTo('demo')} sx={{ borderRadius: 2 }}>
              Free Demo
            </Button>
          </Box>

          {/* Mobile nav toggle */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <Button variant="outlined" size="small" onClick={() => navigate('/login')} sx={{ borderRadius: 2, fontSize: 12 }}>Login</Button>
            <Button size="small" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} sx={{ minWidth: 36, p: 0.5 }}>
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </Button>
          </Box>
        </Box>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1, pt: 2, pb: 1, borderTop: '1px solid #f0f0f0', mt: 1.5 }}>
            {['features', 'pricing', 'roles', 'demo'].map(id => (
              <Button key={id} onClick={() => scrollTo(id)} sx={{ justifyContent: 'flex-start', color: '#444', textTransform: 'capitalize' }}>
                {id === 'roles' ? "Who It's For" : id.charAt(0).toUpperCase() + id.slice(1)}
              </Button>
            ))}
          </Box>
        )}
      </Box>

      {/* HERO */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1a1f2e 0%, #1a73e8 100%)',
        px: { xs: 3, md: 8 }, py: { xs: 7, md: 12 },
        textAlign: 'center', color: 'white',
      }}>
        <Chip label="🚀 Trusted by 50+ schools across India"
          sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', mb: 3, fontWeight: 600, fontSize: { xs: 11, md: 13 } }} />
        <Typography fontWeight={800} mb={2}
          sx={{ fontSize: { xs: '1.9rem', sm: '2.5rem', md: '3.5rem' }, lineHeight: 1.2 }}>
          The Complete School<br />Management System
        </Typography>
        <Typography sx={{ opacity: 0.85, mb: 4, maxWidth: 580, mx: 'auto', fontWeight: 400, fontSize: { xs: '0.95rem', md: '1.15rem' } }}>
          Manage students, teachers, attendance, fees and more — all in one powerful platform. Save 4+ hours every day.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" onClick={() => scrollTo('demo')}
            sx={{ borderRadius: 3, px: { xs: 3, md: 4 }, py: 1.5, bgcolor: 'white', color: '#1a73e8',
                  fontWeight: 700, '&:hover': { bgcolor: '#f0f0f0' }, fontSize: { xs: 14, md: 16 } }}>
            🎯 Get Free 3-Month Trial
          </Button>
          <Button variant="outlined" size="large" onClick={() => navigate('/login')}
            sx={{ borderRadius: 3, px: { xs: 3, md: 4 }, py: 1.5, borderColor: 'white', color: 'white',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }, fontSize: { xs: 14, md: 16 } }}>
            👀 View Live Demo
          </Button>
        </Box>

        {/* Stats */}
        <Grid container spacing={2} sx={{ mt: { xs: 5, md: 6 }, maxWidth: 700, mx: 'auto' }}>
          {stats.map((s) => (
            <Grid item xs={6} sm={3} key={s.label}>
              <Typography fontWeight={800} sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' } }}>{s.value}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.75, fontSize: { xs: 11, md: 13 } }}>{s.label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FEATURES */}
      <Box id="features" sx={{ px: { xs: 2, sm: 4, md: 8 }, py: { xs: 6, md: 10 }, bgcolor: '#f8f9fa' }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Chip label="FEATURES" color="primary" sx={{ mb: 2, fontWeight: 700 }} />
          <Typography fontWeight={800} mb={1} sx={{ fontSize: { xs: '1.6rem', md: '2.5rem' } }}>
            Everything Your School Needs
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', px: 2 }}>
            One platform to replace 5 different tools. Save time, reduce costs, improve results.
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ maxWidth: 1100, mx: 'auto' }}>
          {features.map((f) => (
            <Grid item xs={12} sm={6} md={3} key={f.title}>
              <Card sx={{
                borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }
              }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Box sx={{ width: 52, height: 52, borderRadius: 2, bgcolor: f.color + '18',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, mb: 2 }}>
                    {f.icon}
                  </Box>
                  <Typography variant="body1" fontWeight={700} mb={0.5}>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* WHO IT'S FOR */}
      <Box id="roles" sx={{ px: { xs: 2, sm: 4, md: 8 }, py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Chip label="FOR EVERYONE" color="primary" sx={{ mb: 2, fontWeight: 700 }} />
          <Typography fontWeight={800} mb={1} sx={{ fontSize: { xs: '1.6rem', md: '2.5rem' } }}>
            Designed for Every Role
          </Typography>
          <Typography variant="body2" color="text.secondary">One app for admins, principals, teachers, students and parents.</Typography>
        </Box>
        <Grid container spacing={2} sx={{ maxWidth: 1000, mx: 'auto' }}>
          {roles.map((r) => (
            <Grid item xs={12} sm={6} md={4} key={r.role}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', height: '100%' }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: r.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                      {r.emoji}
                    </Box>
                    <Typography variant="h6" fontWeight={700}>{r.role}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                    {r.points.map((p, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleIcon sx={{ fontSize: 16, color: r.color, flexShrink: 0 }} />
                        <Typography variant="body2">{p}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* PRICING */}
      <Box id="pricing" sx={{ px: { xs: 2, sm: 4, md: 8 }, py: { xs: 6, md: 10 }, bgcolor: '#f8f9fa' }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Chip label="PRICING" color="primary" sx={{ mb: 2, fontWeight: 700 }} />
          <Typography fontWeight={800} mb={1} sx={{ fontSize: { xs: '1.6rem', md: '2.5rem' } }}>
            Simple, Transparent Pricing
          </Typography>
          <Typography variant="body2" color="text.secondary">Start free for 3 months. No credit card required.</Typography>
        </Box>
        <Grid container spacing={3} sx={{ maxWidth: 1000, mx: 'auto' }} alignItems="stretch">
          {plans.map((plan) => (
            <Grid item xs={12} sm={4} key={plan.name}>
              <Card sx={{
                borderRadius: 3, height: '100%',
                boxShadow: plan.popular ? `0 8px 32px ${plan.color}44` : '0 2px 12px rgba(0,0,0,0.06)',
                border: plan.popular ? `2px solid ${plan.color}` : '2px solid transparent',
                position: 'relative', overflow: 'visible',
              }}>
                {plan.popular && (
                  <Box sx={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                    <Chip label="⭐ MOST POPULAR" sx={{ bgcolor: plan.color, color: 'white', fontWeight: 700, fontSize: 11 }} />
                  </Box>
                )}
                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Box sx={{ bgcolor: plan.bg, borderRadius: 2, p: 2, mb: 2, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight={700} color={plan.color}>{plan.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{plan.desc}</Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography fontWeight={800} color={plan.color} display="inline"
                        sx={{ fontSize: { xs: '1.8rem', md: '2rem' } }}>{plan.price}</Typography>
                      <Typography variant="body2" color="text.secondary" display="inline">{plan.period}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                    {plan.features.map((f, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleIcon sx={{ fontSize: 16, color: plan.color, flexShrink: 0 }} />
                        <Typography variant="body2">{f}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Button fullWidth variant={plan.popular ? 'contained' : 'outlined'}
                    onClick={() => scrollTo('demo')}
                    sx={{ borderRadius: 2, py: 1.2, fontWeight: 700,
                          bgcolor: plan.popular ? plan.color : 'transparent',
                          borderColor: plan.color, color: plan.popular ? 'white' : plan.color,
                          '&:hover': { bgcolor: plan.popular ? plan.color : plan.bg } }}>
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="body2" color="text.secondary" textAlign="center" mt={3} px={2}>
          🎁 All plans include a <strong>FREE 3-month trial</strong>. No credit card needed. Cancel anytime.
        </Typography>
      </Box>

      {/* TESTIMONIALS */}
      <Box sx={{ px: { xs: 2, sm: 4, md: 8 }, py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Chip label="TESTIMONIALS" color="primary" sx={{ mb: 2, fontWeight: 700 }} />
          <Typography fontWeight={800} mb={1} sx={{ fontSize: { xs: '1.6rem', md: '2.5rem' } }}>
            Loved by Schools Across India
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ maxWidth: 1000, mx: 'auto' }}>
          {testimonials.map((t) => (
            <Grid item xs={12} md={4} key={t.name}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', height: '100%' }}>
                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Typography variant="body1" color="text.secondary" mb={2} sx={{ fontStyle: 'italic', lineHeight: 1.7 }}>
                    "{t.text}"
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: t.color, width: 40, height: 40, fontSize: 14, fontWeight: 700 }}>{t.avatar}</Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={700}>{t.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{t.role}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* DEMO FORM */}
      <Box id="demo" sx={{
        px: { xs: 2, sm: 4, md: 8 }, py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #1a1f2e 0%, #1a73e8 100%)',
        color: 'white',
      }}>
        <Grid container spacing={4} sx={{ maxWidth: 1000, mx: 'auto' }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography fontWeight={800} mb={2} sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' } }}>
              Get a Free Demo for Your School
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.85, mb: 3, lineHeight: 1.7 }}>
              We'll set up EduManage Pro for your school completely free for 3 months. No credit card, no commitment.
            </Typography>
            {['✅ Free 3-month trial', '✅ Full setup assistance', '✅ Staff training included',
              '✅ 24/7 WhatsApp support', '✅ No credit card required'].map((item, i) => (
              <Typography key={i} variant="body2" mb={0.8} sx={{ opacity: 0.9 }}>{item}</Typography>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                {submitted ? (
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography sx={{ fontSize: 48, mb: 2 }}>🎉</Typography>
                    <Typography variant="h6" fontWeight={700} mb={1}>Request Received!</Typography>
                    <Typography variant="body2" color="text.secondary">
                      We'll WhatsApp you within 24 hours to set up your free trial.
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Typography variant="h6" fontWeight={700} mb={2} color="text.primary">
                      Book Your Free Demo
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <TextField label="Your Name" fullWidth size="small" value={demoForm.name}
                        onChange={e => setDemoForm({...demoForm, name: e.target.value})} />
                      <TextField label="School Name" fullWidth size="small" value={demoForm.school}
                        onChange={e => setDemoForm({...demoForm, school: e.target.value})} />
                      <TextField label="WhatsApp Number" fullWidth size="small" value={demoForm.phone}
                        onChange={e => setDemoForm({...demoForm, phone: e.target.value})} />
                      <TextField label="Email Address" fullWidth size="small" value={demoForm.email}
                        onChange={e => setDemoForm({...demoForm, email: e.target.value})} />
                      <Button fullWidth variant="contained" size="large"
                        onClick={handleDemoSubmit}
                        disabled={!demoForm.name || !demoForm.school || !demoForm.phone}
                        sx={{ borderRadius: 2, py: 1.5, fontWeight: 700, bgcolor: '#1a73e8', fontSize: 15 }}>
                        🎯 Get Free 3-Month Trial
                      </Button>
                      <Typography variant="caption" color="text.secondary" textAlign="center">
                        We'll WhatsApp you within 24 hours
                      </Typography>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* FOOTER */}
      <Box sx={{ bgcolor: '#1a1f2e', px: { xs: 2, sm: 4, md: 8 }, py: { xs: 4, md: 5 }, color: 'white' }}>
        <Grid container spacing={3} sx={{ maxWidth: 1000, mx: 'auto', mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight={800} color="#1a73e8" mb={1}>🎓 EduManage Pro</Typography>
            <Typography variant="body2" sx={{ opacity: 0.6, lineHeight: 1.7 }}>
              The complete school management system trusted by 50+ schools across India.
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={700} mb={1.5}>Product</Typography>
            {['Features', 'Pricing', 'Demo', 'Login'].map(item => (
              <Typography key={item} variant="body2" sx={{ opacity: 0.6, mb: 0.5, cursor: 'pointer',
                '&:hover': { opacity: 1 } }} onClick={() => item === 'Login' ? navigate('/login') : scrollTo(item.toLowerCase())}>
                {item}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={700} mb={1.5}>Roles</Typography>
            {['Admin', 'Principal', 'Teacher', 'Student', 'Parent'].map(item => (
              <Typography key={item} variant="body2" sx={{ opacity: 0.6, mb: 0.5 }}>{item}</Typography>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" fontWeight={700} mb={1.5}>Contact Us</Typography>
            <Typography variant="body2" sx={{ opacity: 0.6, mb: 0.5 }}>📧 support@edumanagepro.com</Typography>
            <Typography variant="body2" sx={{ opacity: 0.6, mb: 0.5 }}>📱 WhatsApp: +91 98765 43210</Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>📍 Nagpur, Maharashtra, India</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />
        <Typography variant="caption" sx={{ opacity: 0.4 }} display="block" textAlign="center">
          © 2026 EduManage Pro. All rights reserved. Made with ❤️ in India.
        </Typography>
      </Box>

    </Box>
  );
};

export default Landing;
