'use client';

import { Box, Typography } from '@mui/material';
import { PhoneInTalk, Home } from '@mui/icons-material';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark';
}

export default function Logo({ size = 'medium', variant = 'dark' }: LogoProps) {
  const sizes = {
    small: { icon: 20, fontSize: '1rem', gap: 0.5 },
    medium: { icon: 32, fontSize: '1.5rem', gap: 1 },
    large: { icon: 48, fontSize: '2rem', gap: 1.5 },
  };

  const { icon, fontSize, gap } = sizes[size];
  const isLight = variant === 'light';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: gap,
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: icon + 8,
          height: icon + 8,
        }}
      >
        <Home
          sx={{
            fontSize: icon,
            color: isLight ? 'white' : 'primary.main',
            position: 'relative',
            zIndex: 2,
          }}
        />
        <PhoneInTalk
          sx={{
            fontSize: icon * 0.55,
            color: isLight ? '#d4af37' : 'success.main',
            position: 'absolute',
            bottom: -2,
            right: -4,
            zIndex: 3,
          }}
        />
      </Box>
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: 700,
          fontSize: fontSize,
          color: isLight ? 'white' : 'primary.main',
          letterSpacing: '0.5px',
        }}
      >
        PropCall AI
      </Typography>
    </Box>
  );
}

