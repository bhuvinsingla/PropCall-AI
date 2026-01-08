'use client';

import { useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  RadioButtonUnchecked as PartialIcon,
  Cancel as NotSolvedIcon,
  Download as DownloadIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Documentation() {
  const contentRef = useRef<HTMLDivElement>(null);

  const contactDetails = {
    name: 'Bhuvin Singla',
    github: 'https://github.com/bhuvinsingla',
    linkedin: 'https://linkedin.com/in/bhuvin-singla',
    phone: '+917355635544',
    whatsapp: 'https://wa.me/917355635544',
    email: 'bhuvinsingla@gmail.com',
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Property-Management-System-Documentation.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const workflowSteps = [
    {
      label: 'Property Entry',
      description: 'Dealers enter property details (location, price, size, type)',
      details: 'All property information is stored in a centralized database with automatic unit conversions.',
    },
    {
      label: 'Data Storage',
      description: 'Property data saved to database',
      details: 'Single source of truth for all property information - rates, area, availability, legal status.',
    },
    {
      label: 'Voice Agent Activation',
      description: 'AI voice agent receives/makes calls',
      details: 'Voice agent is trained to handle property queries and can work 24/7 for both inbound and outbound calls.',
    },
    {
      label: 'Query Processing',
      description: 'Voice agent queries property database',
      details: 'When customers ask about properties, the agent searches the database based on location, budget, and size requirements.',
    },
    {
      label: 'Lead Collection',
      description: 'Customer information collected automatically',
      details: 'Voice agent gathers customer details, preferences, and requirements during conversations.',
    },
    {
      label: 'Lead Management',
      description: 'Leads displayed in organized table',
      details: 'All collected leads are shown with search and filter options. Status tracking helps prioritize follow-ups.',
    },
    {
      label: 'Data Export',
      description: 'Export leads to Google Sheets',
      details: 'Leads can be exported to CSV or synced with Google Sheets for team collaboration and further analysis.',
    },
  ];

  const problemsSolved = [
    {
      id: 1,
      title: 'Property Data is Scattered & Outdated',
      status: 'solved',
      solution: 'Centralized property database serves as single source of truth. All property information (rates, area, availability, legal status) is stored in one place and can be updated in real-time.',
      features: ['Centralized database', 'Real-time updates', 'Structured property information'],
    },
    {
      id: 2,
      title: 'No Proper Inventory Management',
      status: 'solved',
      solution: 'Digital property database with searchable records. All properties stored in organized format - no more scattered photos/videos on phone. Quick search and retrieval capabilities.',
      features: ['Digital property storage', 'Searchable database', 'Organized inventory'],
    },
    {
      id: 3,
      title: 'Zero Tech Adoption',
      status: 'solved',
      solution: 'Complete CRM-like system with automation. User-friendly interface with guide bot makes it easy for small dealers to adopt technology without complex setup.',
      features: ['CRM-like system', 'User-friendly interface', 'Automation features', 'Guide bot assistance'],
    },
    {
      id: 4,
      title: 'Lead Quality & Fake Inquiries',
      status: 'partial',
      solution: 'AI voice agent collects detailed customer information during calls, including location preferences, budget, and property requirements. Leads are automatically categorized with status tracking.',
      features: ['Automated lead collection', 'Customer requirement tracking', 'Lead status management'],
    },
    {
      id: 5,
      title: 'Too Much Manual Follow-up',
      status: 'partial',
      solution: 'Voice agent automatically collects leads and stores them in organized format. Reduces manual data entry and provides searchable lead database.',
      features: ['Automated lead collection', 'Organized lead storage', 'Search and filter capabilities'],
    },
    {
      id: 6,
      title: 'Competition from Portals & Direct Owners',
      status: 'partial',
      solution: 'Professional AI voice agent provides 24/7 customer engagement. Instant responses and professional service help dealers compete with online portals.',
      features: ['24/7 availability', 'Professional customer service', 'Instant query responses'],
    },
    {
      id: 7,
      title: 'Language & Communication Gaps',
      status: 'partial',
      solution: 'AI voice agent can be trained for multiple languages. Consistent communication quality without regional accent barriers.',
      features: ['Multi-language support capability', 'Consistent communication', 'No accent barriers'],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solved':
        return <CheckIcon sx={{ color: 'success.main' }} />;
      case 'partial':
        return <PartialIcon sx={{ color: 'warning.main' }} />;
      case 'not-solved':
        return <NotSolvedIcon sx={{ color: 'error.main' }} />;
      default:
        return null;
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'solved':
        return <Chip label="Fully Solved" color="success" size="small" />;
      case 'partial':
        return <Chip label="Partially Solved" color="warning" size="small" />;
      case 'not-solved':
        return <Chip label="Future Enhancement" color="default" size="small" />;
      default:
        return null;
    }
  };

  const solvedCount = problemsSolved.filter(p => p.status === 'solved').length;
  const partialCount = problemsSolved.filter(p => p.status === 'partial').length;

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 1, color: 'primary.main' }}>
            Documentation
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Complete workflow and problem-solving analysis for the Property Management System
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadPDF}
          sx={{ minWidth: 200 }}
        >
          Download as PDF
        </Button>
      </Box>

      <Box ref={contentRef} sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ bgcolor: 'success.light', color: 'white' }}>
              <CardContent>
                <Typography variant="h3" fontWeight="bold">
                  {solvedCount}
                </Typography>
                <Typography variant="body2">Fully Solved</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ bgcolor: 'warning.light', color: 'white' }}>
              <CardContent>
                <Typography variant="h3" fontWeight="bold">
                  {partialCount}
                </Typography>
                <Typography variant="body2">Partially Solved</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
              System Workflow
            </Typography>
            <Stepper orientation="vertical">
              {workflowSteps.map((step, index) => (
                <Step key={index} active={true} completed={true}>
                  <StepLabel>
                    <Typography variant="h6" fontWeight="bold">
                      {step.label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                      {step.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.details}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
              Real-Time Property Problems & Solutions
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              How PropCall AI addresses key challenges faced by property dealers
            </Typography>
            <Grid container spacing={3}>
              {problemsSolved.map((problem) => (
                <Grid item xs={12} key={problem.id}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      borderLeft: `4px solid ${
                        problem.status === 'solved'
                          ? '#4caf50'
                          : problem.status === 'partial'
                          ? '#ff9800'
                          : '#9e9e9e'
                      }`,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                      <Box sx={{ mt: 0.5 }}>{getStatusIcon(problem.status)}</Box>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography variant="h6" fontWeight="bold">
                            {problem.id}. {problem.title}
                          </Typography>
                          {getStatusChip(problem.status)}
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {problem.solution}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {problem.features.map((feature, idx) => (
                            <Chip
                              key={idx}
                              label={feature}
                              size="small"
                              variant="outlined"
                              color={
                                problem.status === 'solved'
                                  ? 'success'
                                  : problem.status === 'partial'
                                  ? 'warning'
                                  : 'default'
                              }
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Key Benefits Section */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
              Key Benefits
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <CheckIcon color="success" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Centralized Data Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      All property information in one place - no more scattered data
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <CheckIcon color="success" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Automated Lead Collection
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Voice agent collects leads automatically - saves time and effort
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <CheckIcon color="success" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      24/7 Customer Engagement
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      AI voice agent available round the clock for customer queries
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <CheckIcon color="success" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Professional Tech Adoption
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Easy-to-use system for small dealers to adopt technology
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Contact Details Section */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
              Contact Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {contactDetails.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    PropCall AI Developer
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <IconButton
                      color="primary"
                      href={contactDetails.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ border: '1px solid', borderColor: 'primary.main' }}
                    >
                      <GitHubIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      href={contactDetails.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ border: '1px solid', borderColor: 'primary.main' }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      href={`tel:${contactDetails.phone}`}
                      sx={{ border: '1px solid', borderColor: 'primary.main' }}
                    >
                      <PhoneIcon />
                    </IconButton>
                    <IconButton
                      color="success"
                      href={contactDetails.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ border: '1px solid', borderColor: 'success.main' }}
                    >
                      <WhatsAppIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      href={`mailto:${contactDetails.email}`}
                      sx={{ border: '1px solid', borderColor: 'primary.main' }}
                    >
                      <EmailIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Get in Touch
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <GitHubIcon color="action" />
                      <Typography variant="body2">
                        <strong>GitHub:</strong>{' '}
                        <a href={contactDetails.github} target="_blank" rel="noopener noreferrer" style={{ color: '#1a5f3f' }}>
                          {contactDetails.github}
                        </a>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <LinkedInIcon color="action" />
                      <Typography variant="body2">
                        <strong>LinkedIn:</strong>{' '}
                        <a href={contactDetails.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#1a5f3f' }}>
                          {contactDetails.linkedin}
                        </a>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <PhoneIcon color="action" />
                      <Typography variant="body2">
                        <strong>Phone:</strong>{' '}
                        <a href={`tel:${contactDetails.phone}`} style={{ color: '#1a5f3f' }}>
                          {contactDetails.phone}
                        </a>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <WhatsAppIcon color="action" />
                      <Typography variant="body2">
                        <strong>WhatsApp:</strong>{' '}
                        <a href={contactDetails.whatsapp} target="_blank" rel="noopener noreferrer" style={{ color: '#1a5f3f' }}>
                          {contactDetails.phone}
                        </a>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <EmailIcon color="action" />
                      <Typography variant="body2">
                        <strong>Email:</strong>{' '}
                        <a href={`mailto:${contactDetails.email}`} style={{ color: '#1a5f3f' }}>
                          {contactDetails.email}
                        </a>
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

