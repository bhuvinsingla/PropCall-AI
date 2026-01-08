'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  AccessTime as TimeIcon,
  TrendingUp as GrowthIcon,
  Message as MessageIcon,
  Phone as PhoneIcon,
  Build as BuildIcon,
} from '@mui/icons-material';

export default function CaseStudy() {
  const benefits = [
    {
      icon: <TimeIcon />,
      title: '24/7 Availability',
      description: 'Never miss a rental inquiry, even outside business hours. AI handles all inquiries instantly.',
    },
    {
      icon: <MessageIcon />,
      title: 'Automated Communications',
      description: 'Automatically respond to tenant messages, maintenance requests, and property inquiries.',
    },
    {
      icon: <PhoneIcon />,
      title: 'Instant Lead Response',
      description: 'Respond to property inquiries within seconds, increasing conversion rates significantly.',
    },
    {
      icon: <BuildIcon />,
      title: 'Maintenance Request Handling',
      description: 'AI collects maintenance details, schedules appointments, and keeps tenants informed.',
    },
    {
      icon: <GrowthIcon />,
      title: 'Increased Efficiency',
      description: 'Reduce manual work by 70% and focus on closing deals instead of answering routine questions.',
    },
  ];

  const stats = [
    { label: 'Response Time', value: '< 5 seconds', color: 'success' as const },
    { label: 'Inquiry Coverage', value: '100%', color: 'primary' as const },
    { label: 'Time Saved', value: '70%', color: 'secondary' as const },
    { label: 'Lead Conversion', value: '+45%', color: 'success' as const },
  ];

  const features = [
    'Automated tenant inquiry handling',
    '24/7 property availability checks',
    'Maintenance request collection and routing',
    'Rental application pre-screening',
    'Appointment scheduling automation',
    'Multi-language support',
    'Integration with property database',
    'Lead qualification and scoring',
  ];

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 1, color: 'primary.main' }}>
        Case Study
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Real-world application of AI Assistant for Property Management
      </Typography>

      <Card
        sx={{
          mb: 4,
          bgcolor: 'primary.main',
          color: 'white',
          background: 'linear-gradient(135deg, #1a5f3f 0%, #0f3d26 100%)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Chip
            label="Case Study"
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              mb: 2,
            }}
          />
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            AI Assistant for Property Management
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
            24/7 Tenant Support, Automated Communications & Lead Response
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', opacity: 0.95, maxWidth: 800 }}>
            Never miss a rental inquiry. Let AI handle maintenance requests and tenant messages
            automatically, ensuring your property business runs smoothly around the clock.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent>
                <Typography variant="h3" fontWeight="bold" color={`${stat.color}.main`}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
            The Challenge
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, bgcolor: 'error.light', color: 'white' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Before AI Assistant
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Missed 40% of inquiries after hours" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Average response time: 4-6 hours" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Manual handling of all tenant messages" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Maintenance requests lost in email threads" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, bgcolor: 'success.light', color: 'white' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  After AI Assistant
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="100% inquiry coverage, 24/7" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Instant response within 5 seconds" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Automated tenant communication" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Organized maintenance request tracking" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
            Key Benefits
          </Typography>
          <Grid container spacing={3}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {benefit.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
            AI Assistant Features
          </Typography>
          <Grid container spacing={2}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckIcon color="success" />
                  <Typography variant="body2">{feature}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
            Real-World Use Cases
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Rental Inquiries
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  AI instantly responds to property inquiries, provides availability, pricing,
                  and schedules viewings. Never lose a potential tenant due to delayed response.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Maintenance Requests
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tenants report issues via call or message. AI collects details, categorizes
                  urgency, and routes to appropriate maintenance team with all necessary information.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Tenant Communication
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Automated responses to common questions about lease terms, payment methods,
                  parking, amenities, and building policies. Frees up time for complex issues.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

