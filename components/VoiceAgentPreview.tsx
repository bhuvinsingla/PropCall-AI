'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  Paper,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  PhoneInTalk as InboundIcon,
  PhoneCallback as OutboundIcon,
} from '@mui/icons-material';
import { supabase } from '../lib/supabase';

interface Call {
  id: string;
  type: 'inbound' | 'outbound';
  phone_number: string;
  name: string | null;
  duration: string | null;
  status: string;
  query: string | null;
  lead_generated: boolean;
  created_at: string;
}

interface VoiceAgentPreviewProps {
  onLeadGenerated?: () => void;
}

export default function VoiceAgentPreview({ onLeadGenerated }: VoiceAgentPreviewProps) {
  const [activeCall, setActiveCall] = useState<Call | null>(null);
  const [callHistory, setCallHistory] = useState<Call[]>([]);
  const [isCalling, setIsCalling] = useState(false);
  const [propertyCount, setPropertyCount] = useState(0);

  useEffect(() => {
    fetchCallHistory();
    fetchPropertyCount();
  }, []);

  const fetchCallHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('calls')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setCallHistory(data || []);
    } catch (error) {
      console.error('Error fetching call history:', error);
    }
  };

  const fetchPropertyCount = async () => {
    try {
      const { count, error } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      setPropertyCount(count || 0);
    } catch (error) {
      console.error('Error fetching property count:', error);
    }
  };

  const startCall = async (type: 'inbound' | 'outbound') => {
    setIsCalling(true);
    const phoneNumber = type === 'inbound' ? '+91 98765 43210' : '+91 91234 56789';
    const callerName = type === 'inbound' ? 'Incoming Caller' : 'Outbound Prospect';
    
    const newCall = {
      type,
      phone_number: phoneNumber,
      name: callerName,
      duration: '0:00',
      status: 'active',
      query: 'Voice agent is collecting information...',
      lead_generated: false,
    };

    try {
      const { data: callData, error: callError } = await supabase
        .from('calls')
        .insert(newCall)
        .select()
        .single();

      if (callError) throw callError;
      setActiveCall(callData);
      setCallHistory([callData, ...callHistory]);

      // Simulate call progress and lead generation
      setTimeout(async () => {
        setIsCalling(false);
        if (callData) {
          // Simulate successful call with lead generation
          const callDuration = '2:34';
          const customerQuery = type === 'inbound' 
            ? 'Looking for 3BHK apartment in Noida'
            : 'Interested in commercial property in Mumbai';
          
          // Create a lead from the call
          const newLead = {
            name: callerName,
            phone: phoneNumber,
            email: `${callerName.toLowerCase().replace(' ', '.')}@email.com`,
            location: type === 'inbound' ? 'Noida' : 'Mumbai',
            property_type: type === 'inbound' ? '3BHK Residential' : 'Commercial',
            budget: type === 'inbound' ? '₹ 50,00,000' : '₹ 2,00,00,000',
            status: 'New',
            source: type === 'inbound' ? 'Inbound Call' : 'Outbound Call',
            date: new Date().toISOString().split('T')[0],
            notes: `Generated from ${type} call. Query: ${customerQuery}`,
          };

          try {
            // Create lead in database
            const { data: leadData, error: leadError } = await supabase
              .from('leads')
              .insert(newLead)
              .select()
              .single();

            if (!leadError && leadData) {
              // Update call with lead information
              await supabase
                .from('calls')
                .update({ 
                  status: 'completed', 
                  duration: callDuration,
                  query: customerQuery,
                  lead_generated: true,
                  lead_id: leadData.id,
                })
                .eq('id', callData.id);
              
              // Notify parent component that a lead was generated
              if (onLeadGenerated) {
                onLeadGenerated();
              }
            }
          } catch (leadErr) {
            console.error('Error creating lead:', leadErr);
            // Still update call even if lead creation fails
            await supabase
              .from('calls')
              .update({ 
                status: 'completed', 
                duration: callDuration,
                query: customerQuery,
              })
              .eq('id', callData.id);
          }

          fetchCallHistory();
        }
        setActiveCall(null);
      }, 5000);
    } catch (error) {
      console.error('Error creating call:', error);
      setIsCalling(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 1, fontWeight: 'bold', color: 'white' }}>
        AI Voice Agent - Cold Call to Lead Conversion
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, opacity: 0.95, color: 'white' }}>
        Start inbound or outbound calls to convert cold prospects into quality leads. 
        The voice agent automatically collects customer information, understands requirements, 
        and creates leads in your database.
      </Typography>

      <Grid container spacing={3}>
        {/* Call Controls */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Start Call
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<InboundIcon />}
                  onClick={() => startCall('inbound')}
                  disabled={isCalling}
                  fullWidth
                  size="large"
                >
                  Simulate Inbound Call
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<OutboundIcon />}
                  onClick={() => startCall('outbound')}
                  disabled={isCalling}
                  fullWidth
                  size="large"
                >
                  Simulate Outbound Call
                </Button>
              </Box>

              {isCalling && (
                <Box sx={{ mt: 3 }}>
                  <LinearProgress />
                  <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                    Call in progress...
                  </Typography>
                </Box>
              )}

              {activeCall && (
                <Paper sx={{ p: 2, mt: 3, bgcolor: 'background.default' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <PhoneIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">{activeCall.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activeCall.phone_number}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={activeCall.type === 'inbound' ? 'Inbound' : 'Outbound'}
                    color={activeCall.type === 'inbound' ? 'success' : 'primary'}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Paper>
              )}
            </CardContent>
          </Card>

          {/* Database Info */}
          <Card sx={{ mt: 2, bgcolor: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Database Status
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Properties in DB: {propertyCount}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                The voice agent can query these properties based on location, price,
                and size requirements.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Call History */}
        <Grid item xs={12} md={8}>
          <Card sx={{ bgcolor: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Call History & Lead Collection
              </Typography>
              <Box sx={{ mt: 2 }}>
                {callHistory.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    No call history yet. Start a call to see it here.
                  </Typography>
                ) : (
                  callHistory.map((call) => (
                    <Paper
                      key={call.id}
                      sx={{
                        p: 2,
                        mb: 2,
                        borderLeft: `4px solid ${
                          call.type === 'inbound' ? '#4caf50' : '#1a5f3f'
                        }`,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 1,
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {call.name || 'Unknown'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {call.phone_number}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Chip
                            label={call.type === 'inbound' ? 'Inbound' : 'Outbound'}
                            color={call.type === 'inbound' ? 'success' : 'primary'}
                            size="small"
                          />
                          <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                            {call.duration || '0:00'}
                          </Typography>
                        </Box>
                      </Box>
                      {call.query && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <strong>Query:</strong> {call.query}
                        </Typography>
                      )}
                      {call.lead_generated && (
                        <Chip
                          label="Lead Generated"
                          color="success"
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Paper>
                  ))
                )}
              </Box>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card sx={{ mt: 2, bgcolor: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                How Voice Agent Works
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 2 }}>
                <li>
                  <Typography variant="body2">
                    Receives/initiates calls and greets customers professionally
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Understands customer requirements (location, budget, size)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Queries the database for matching properties
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Provides property details and answers questions
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Collects customer information and generates leads
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Saves leads automatically for follow-up
                  </Typography>
                </li>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

