'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  NavigateNext as NextIcon,
} from '@mui/icons-material';

interface GuideBotProps {
  activeTab: number;
}

export default function GuideBot({ activeTab }: GuideBotProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [hasSeenTab, setHasSeenTab] = useState<Record<number, boolean>>({});

  const tabGuides: Record<number, { emoji: string; title: string; message: string; action: string }> = {
    0: {
      emoji: '📝',
      title: 'Step 1: Enter Property Details',
      message: "Fill in the property form below. Enter location, price, size, and property type. The system will automatically convert size units (sqft, sqm, acres, hectares) for you!",
      action: "Try entering a property now →",
    },
    1: {
      emoji: '🎙️',
      title: 'Step 2: Voice Agent Preview',
      message: "This AI-powered voice agent handles calls and queries your property database. Click the buttons to simulate calls and see how it collects leads automatically!",
      action: "Simulate a call to see it in action →",
    },
    2: {
      emoji: '📊',
      title: 'Step 3: View Collected Leads',
      message: "All leads from voice agent calls appear here. You can search, filter, and see customer details. These leads are ready to be exported!",
      action: "Check out the leads table below →",
    },
    3: {
      emoji: '📈',
      title: 'Step 4: Export to Google Sheets',
      message: "Your leads displayed in spreadsheet format. Sync data, export to CSV, or integrate with Google Sheets API for team collaboration.",
      action: "Export your leads now →",
    },
    4: {
      emoji: '📚',
      title: 'Step 5: Documentation & Contact',
      message: "View complete system workflow, see how we solve real property dealer problems, and download documentation as PDF. Get in touch for more information!",
      action: "Download PDF documentation →",
    },
    5: {
      emoji: '🚀',
      title: 'Get Free Demo',
      message: "Try our AI assistant, schedule a demo call, or contact us directly. Experience the power of AI-driven property management!",
      action: "Try AI assistant or schedule a call →",
    }
  };

  const currentGuide = tabGuides[activeTab] || {
    emoji: '👋',
    title: 'Welcome!',
    message: "Navigate through the tabs to see the complete property management flow.",
    action: "Start with Property Form →",
  };

  useEffect(() => {
    // Auto-open when switching to a new tab
    if (!hasSeenTab[activeTab]) {
      setIsOpen(true);
      setHasSeenTab(prev => ({ ...prev, [activeTab]: true }));
    }
  }, [activeTab, hasSeenTab]);

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        mb: 3,
        animation: 'slideDown 0.5s ease-out',
        '@keyframes slideDown': {
          from: {
            opacity: 0,
            transform: 'translateY(-20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          bgcolor: 'background.paper',
          background: 'linear-gradient(135deg, rgba(26, 95, 63, 0.08) 0%, rgba(212, 175, 55, 0.05) 100%)',
          borderRadius: 3,
          border: '2px solid',
          borderColor: 'primary.main',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(26, 95, 63, 0.15)',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '5px',
            bgcolor: 'primary.main',
            borderRadius: '3px 0 0 3px',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 2, gap: 2 }}>
          {/* Cartoon Character/Emoji */}
          <Box
            sx={{
              fontSize: '3rem',
              lineHeight: 1,
              animation: 'bounce 2s ease-in-out infinite',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              borderRadius: '50%',
              bgcolor: 'rgba(26, 95, 63, 0.1)',
              flexShrink: 0,
              '@keyframes bounce': {
                '0%, 100%': {
                  transform: 'translateY(0) scale(1)',
                },
                '50%': {
                  transform: 'translateY(-8px) scale(1.05)',
                },
              },
            }}
          >
            {currentGuide.emoji}
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{
                  color: 'primary.dark',
                  fontSize: '0.9rem',
                }}
              >
                {currentGuide.title}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setIsOpen(false)}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.05)',
                  },
                  width: 24,
                  height: 24,
                }}
              >
                <CloseIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'text.primary',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                mb: 1,
              }}
            >
              {currentGuide.message}
            </Typography>
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'primary.main',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                mt: 0.5,
                '&:hover': {
                  color: 'primary.dark',
                  gap: 1,
                  '& svg': {
                    transform: 'translateX(3px)',
                  },
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Typography variant="caption" fontWeight="bold" component="span">
                {currentGuide.action}
              </Typography>
              <NextIcon sx={{ fontSize: 16, transition: 'transform 0.3s ease' }} />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

