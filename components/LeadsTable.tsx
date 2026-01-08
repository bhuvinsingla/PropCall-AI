'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
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

interface LeadsTableProps {
  refreshTrigger?: number;
}

export default function LeadsTable({ refreshTrigger }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, [refreshTrigger]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): "default" | "info" | "success" => {
    switch (status) {
      case 'New':
        return 'default';
      case 'Contacted':
        return 'info';
      case 'Qualified':
      case 'Converted':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.location && lead.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.property_type && lead.property_type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 1, color: 'primary.main' }}>
        Collected Leads
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        All leads collected by the voice agent are displayed here. These leads can
        be exported to Google Sheets for further management.
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Leads Database</Typography>
            <TextField
              size="small"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300 }}
            />
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'background.default' }}>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Contact</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Location</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Property Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Budget</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Source</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Date</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Loading leads...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        No leads found. Leads will appear here once the voice agent
                        collects customer information.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {lead.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <PhoneIcon fontSize="small" color="action" />
                            <Typography variant="body2">{lead.phone}</Typography>
                          </Box>
                          {lead.email && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                              <EmailIcon fontSize="small" color="action" />
                              <Typography variant="body2" fontSize="0.75rem" color="text.secondary">
                                {lead.email}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {lead.location && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocationIcon fontSize="small" color="action" />
                            <Typography variant="body2">{lead.location}</Typography>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{lead.property_type || '-'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {lead.budget || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={lead.status}
                          color={getStatusColor(lead.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontSize="0.75rem">
                          {lead.source}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontSize="0.75rem">
                          {lead.date}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Total Leads: {filteredLeads.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredLeads.length} of {leads.length} leads
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

