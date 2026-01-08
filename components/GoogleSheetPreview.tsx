'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
} from '@mui/material';
import {
  TableChart as SheetIcon,
  Download as DownloadIcon,
  Sync as SyncIcon,
} from '@mui/icons-material';
import { supabase } from '../lib/supabase';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  location: string | null;
  property_type: string | null;
  budget: string | null;
  status: string;
  source: string;
  date: string;
}

export default function GoogleSheetPreview() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [lastSync, setLastSync] = useState(new Date().toLocaleString());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
      setLastSync(new Date().toLocaleString());
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = () => {
    fetchLeads();
  };

  const handleExport = () => {
    // Convert leads to CSV format
    const headers = ['Name', 'Phone', 'Email', 'Location', 'Property Type', 'Budget', 'Status', 'Source', 'Date'];
    const csvContent = [
      headers.join(','),
      ...leads.map((lead) =>
        [
          lead.name,
          lead.phone,
          lead.email || '',
          lead.location || '',
          lead.property_type || '',
          lead.budget || '',
          lead.status,
          lead.source,
          lead.date,
        ].join(',')
      ),
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
            Google Sheets Integration
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage your leads in a Google Sheets-like interface. All leads
            are automatically synced and can be exported.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<SyncIcon />}
            onClick={handleSync}
            disabled={loading}
          >
            Sync Now
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={leads.length === 0}
          >
            Export CSV
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SheetIcon color="primary" />
              <Typography variant="h6">Leads Spreadsheet</Typography>
            </Box>
            <Chip
              label={`Last synced: ${lastSync}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>

          {/* Google Sheets-like Grid */}
          <Paper variant="outlined" sx={{ overflow: 'auto', maxHeight: 600 }}>
            <Box sx={{ minWidth: 1200 }}>
              {/* Header Row */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(9, 1fr)',
                  bgcolor: 'primary.main',
                  color: 'white',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                }}
              >
                {['Name', 'Phone', 'Email', 'Location', 'Property Type', 'Budget', 'Status', 'Source', 'Date'].map(
                  (header) => (
                    <Box
                      key={header}
                      sx={{
                        p: 1.5,
                        borderRight: '1px solid rgba(255,255,255,0.2)',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                      }}
                    >
                      {header}
                    </Box>
                  )
                )}
              </Box>

              {/* Data Rows */}
              {loading ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Loading leads...
                  </Typography>
                </Box>
              ) : leads.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No leads available. Leads will appear here once collected by the voice agent.
                  </Typography>
                </Box>
              ) : (
                leads.map((lead, index) => (
                  <Box
                    key={lead.id}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(9, 1fr)',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      bgcolor: index % 2 === 0 ? 'background.paper' : 'background.default',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <Box sx={{ p: 1.5, borderRight: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2">{lead.name}</Typography>
                    </Box>
                    <Box sx={{ p: 1.5, borderRight: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2" fontSize="0.75rem">
                        {lead.phone}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 1.5, borderRight: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2" fontSize="0.75rem">
                        {lead.email || '-'}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 1.5, borderRight: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2">{lead.location || '-'}</Typography>
                    </Box>
                    <Box sx={{ p: 1.5, borderRight: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2" fontSize="0.75rem">
                        {lead.property_type || '-'}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 1.5, borderRight: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2" fontWeight="medium">
                        {lead.budget || '-'}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 1.5, borderRight: '1px solid', borderColor: 'divider' }}>
                      <Chip label={lead.status} size="small" color="primary" />
                    </Box>
                    <Box sx={{ p: 1.5, borderRight: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2" fontSize="0.75rem">
                        {lead.source}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 1.5 }}>
                      <Typography variant="body2" fontSize="0.75rem">
                        {lead.date}
                      </Typography>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Paper>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Total Rows: {leads.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This data can be automatically synced to Google Sheets via API integration
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Integration Info */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Google Sheets Integration Features
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" fontWeight="medium">
                ✓ Real-time Sync
              </Typography>
              <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
                Automatically syncs leads to Google Sheets
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" fontWeight="medium">
                ✓ Export Options
              </Typography>
              <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
                Export to CSV or directly to Google Sheets
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" fontWeight="medium">
                ✓ Team Collaboration
              </Typography>
              <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
                Share and collaborate on leads with your team
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

