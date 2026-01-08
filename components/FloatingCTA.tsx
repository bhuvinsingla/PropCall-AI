'use client';

import { useState } from 'react';
import {
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  SmartToy as AIIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const [activeCTA, setActiveCTA] = useState<'ai' | 'schedule' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    message: '',
  });

  const handleVapiCall = () => {
    const vapiPhoneNumber = '+1-XXX-XXX-XXXX';
    window.location.href = `tel:${vapiPhoneNumber}`;
    setOpen(false);
  };

  const handleScheduleCall = () => {
    setActiveCTA('schedule');
    setOpen(true);
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

    setOpen(false);
    setActiveCTA(null);
    setFormData({ name: '', email: '', phone: '', preferredTime: '', message: '' });
    alert('Redirecting to WhatsApp with all your details. Please send the message to confirm your demo call request.');
  };

  const handleTryAI = () => {
    setActiveCTA('ai');
    setOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Fab
          color="primary"
          aria-label="Try AI Assistant"
          onClick={handleTryAI}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            width: 64,
            height: 64,
            boxShadow: 4,
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s',
          }}
        >
          <AIIcon sx={{ fontSize: 28 }} />
        </Fab>

        <Fab
          color="secondary"
          aria-label="Schedule Call"
          onClick={handleScheduleCall}
          sx={{
            bgcolor: 'secondary.main',
            color: 'white',
            width: 64,
            height: 64,
            boxShadow: 4,
            '&:hover': {
              bgcolor: 'secondary.dark',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s',
          }}
        >
          <CalendarIcon sx={{ fontSize: 28 }} />
        </Fab>

        <Fab
          color="success"
          aria-label="Call Now"
          href="tel:+917355635544"
          sx={{
            bgcolor: 'success.main',
            color: 'white',
            width: 64,
            height: 64,
            boxShadow: 4,
            '&:hover': {
              bgcolor: 'success.dark',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s',
          }}
        >
          <PhoneIcon sx={{ fontSize: 28 }} />
        </Fab>
      </Box>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setActiveCTA(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {activeCTA === 'ai' ? 'Try AI Assistant' : 'Schedule a Demo Call'}
            </Typography>
            <IconButton onClick={() => {
              setOpen(false);
              setActiveCTA(null);
            }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {activeCTA === 'ai' ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <AIIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Experience Our AI Voice Agent
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Click the button below to initiate a call with our AI assistant. Ask about properties,
                get instant answers, and see how it handles inquiries 24/7.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<PhoneIcon />}
                onClick={handleVapiCall}
                sx={{ minWidth: 200 }}
              >
                Call AI Assistant Now
              </Button>
            </Box>
          ) : (
            <Box>
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
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {activeCTA === 'schedule' && (
            <>
              <Button onClick={() => {
                setOpen(false);
                setActiveCTA(null);
                setFormData({ name: '', email: '', phone: '', preferredTime: '', message: '' });
              }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleScheduleSubmit}
                disabled={!formData.name || !formData.email || !formData.phone}
                startIcon={<CalendarIcon />}
              >
                Send Details via WhatsApp
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

