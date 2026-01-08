'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  SmartToy as AIIcon,
  Close as CloseIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

export default function CTASection() {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [vapiCallActive, setVapiCallActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    message: '',
  });

  const contactDetails = {
    name: 'Bhuvin Singla',
    github: 'https://github.com/bhuvinsingla',
    linkedin: 'https://linkedin.com/in/bhuvin-singla',
    phone: '+917355635544',
    whatsapp: 'https://wa.me/917355635544',
    email: 'bhuvinsingla@gmail.com',
  };

  const handleScheduleCall = () => {
    setScheduleDialogOpen(true);
  };

  const handleScheduleSubmit = () => {
    let formattedTime = 'Not specified';
    if (formData.preferredTime) {
      try {
        const date = new Date(formData.preferredTime);
        formattedTime = date.toLocaleString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        formattedTime = formData.preferredTime;
      }
    }

    const whatsappMessage = encodeURIComponent(
      `Hello Bhuvin!\n\n` +
      `I would like to schedule a demo call for the Property Management System.\n\n` +
      `REQUEST DETAILS:\n` +
      `-------------------\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Preferred Time: ${formattedTime}\n` +
      `Message: ${formData.message || 'No additional message'}\n\n` +
      `-------------------\n\n` +
      `Please let me know your availability. Thank you!`
    );

    const whatsappLink = `https://wa.me/917355635544?text=${whatsappMessage}`;
    window.open(whatsappLink, '_blank');
    setScheduleDialogOpen(false);
    setFormData({ name: '', email: '', phone: '', preferredTime: '', message: '' });
    alert('Redirecting to WhatsApp with all your details. Please send the message to confirm your demo call request.');
  };

  const handleVapiCall = () => {
    setVapiCallActive(true);
    const vapiPhoneNumber = '+1-XXX-XXX-XXXX';
    window.location.href = `tel:${vapiPhoneNumber}`;
    setTimeout(() => {
      alert('Call initiated! Connect with our AI assistant to learn about properties.');
    }, 500);
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 1, color: 'primary.main', textAlign: 'center' }}>
        Get Started Today
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        Experience the power of AI-driven property management. Schedule a demo or try our AI assistant now!
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: '100%',
              bgcolor: 'primary.main',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
              transition: 'all 0.3s',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <AIIcon sx={{ fontSize: 40 }} />
                <Typography variant="h5" fontWeight="bold">
                  Try AI Assistant
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                Experience our AI-powered voice agent right now. Ask about properties, get instant answers, and see how it works!
              </Typography>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleVapiCall}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                  },
                }}
                startIcon={<PhoneIcon />}
              >
                {vapiCallActive ? 'Call Active...' : 'Call AI Assistant Now'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: '100%',
              bgcolor: 'secondary.main',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
              transition: 'all 0.3s',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <CalendarIcon sx={{ fontSize: 40 }} />
                <Typography variant="h5" fontWeight="bold">
                  Schedule a Call
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                Book a personalized demo call. We'll show you how this system can transform your property business.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleScheduleCall}
                sx={{
                  bgcolor: 'white',
                  color: 'secondary.main',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                  },
                }}
                startIcon={<CalendarIcon />}
              >
                Schedule Demo Call
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: '100%',
              bgcolor: 'success.main',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
              transition: 'all 0.3s',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <PhoneIcon sx={{ fontSize: 40 }} />
                <Typography variant="h5" fontWeight="bold">
                  Contact Us
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                Get in touch directly via phone, WhatsApp, or email. We're here to help!
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="medium"
                  href={`tel:${contactDetails.phone}`}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  startIcon={<PhoneIcon />}
                >
                  Call Now
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size="medium"
                  href={contactDetails.whatsapp}
                  target="_blank"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  startIcon={<WhatsAppIcon />}
                >
                  WhatsApp
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
            Contact Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {contactDetails.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Property Management System Developer
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                  Quick Contact
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

      <Dialog
        open={scheduleDialogOpen}
        onClose={() => setScheduleDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Schedule a Demo Call</Typography>
            <IconButton onClick={() => setScheduleDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Fill in your details below. All information will be sent to us via WhatsApp for scheduling your personalized demo call.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Your Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <TextField
              label="Phone Number"
              fullWidth
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <TextField
              label="Preferred Time"
              type="datetime-local"
              fullWidth
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Message (Optional)"
              multiline
              rows={3}
              fullWidth
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScheduleDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleScheduleSubmit}
            disabled={!formData.name || !formData.email || !formData.phone}
            startIcon={<CalendarIcon />}
          >
            Send Details via WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

