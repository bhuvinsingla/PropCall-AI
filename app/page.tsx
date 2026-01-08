'use client';

import { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Tabs, Tab, Container, Divider, Paper, Grid } from '@mui/material';
import { Business as BusinessIcon, Person as PersonIcon, MenuBook as DocsIcon } from '@mui/icons-material';
import Logo from '../components/Logo';
import PropertyForm from '../components/PropertyForm';
import PropertyListing from '../components/PropertyListing';
import VoiceAgentPreview from '../components/VoiceAgentPreview';
import LeadsTable from '../components/LeadsTable';
import UserView from '../components/UserView';
import Documentation from '../components/Documentation';

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [refreshListing, setRefreshListing] = useState(0);
  const [refreshLeads, setRefreshLeads] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handlePropertyAdded = () => {
    // Trigger refresh of property listing
    setRefreshListing(prev => prev + 1);
  };

  const handleLeadGenerated = () => {
    // Trigger refresh of leads table when voice agent generates a lead
    setRefreshLeads(prev => prev + 1);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Logo size="medium" variant="light" />
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" sx={{ opacity: 0.9, color: 'white' }}>
            Convert Cold Calls to Quality Leads
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} sx={{ mt: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                minHeight: 64,
              },
            }}
          >
            <Tab label="Property Dealer / Owner" icon={<BusinessIcon />} iconPosition="start" />
            <Tab label="User / Customer" icon={<PersonIcon />} iconPosition="start" />
            <Tab label="Documentation" icon={<DocsIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* Property Dealer / Owner Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', mb: 1 }}>
              Property Dealer Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage properties, convert cold calls into quality leads with AI Voice Agent
            </Typography>
          </Box>

          {/* Property Form and Listing Side by Side */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
              🏢 Property Management
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <PropertyForm onSave={handlePropertyAdded} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
                    📋 All Properties
                  </Typography>
                  <PropertyListing key={refreshListing} />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* AI Voice Agent Section */}
          <Box sx={{ mb: 4 }}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                🎙️ AI Voice Agent - Convert Cold Calls to Quality Leads
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, opacity: 0.95 }}>
                The property details you add above are automatically sent to the AI voice agent. 
                When customers call or when you make outbound calls, the voice agent has complete 
                knowledge of all available properties and can recommend them based on customer requirements.
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                Use our AI-powered voice agent to handle inbound and outbound calls, collect customer information, 
                and automatically generate quality leads from cold calls.
              </Typography>
              <VoiceAgentPreview onLeadGenerated={handleLeadGenerated} />
            </Paper>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Leads Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
              📊 Collected Leads from Voice Agent
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              All leads collected by the voice agent during calls are displayed here. Track status, contact information, and follow up with potential customers.
            </Typography>
            <LeadsTable refreshTrigger={refreshLeads} />
          </Box>
        </TabPanel>

        {/* User / Customer Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', mb: 1, textAlign: 'center' }}>
              Welcome to PropCall AI
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
              Browse available properties or talk to our AI voice agent for personalized assistance
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                  transition: 'all 0.3s',
                }}
                onClick={() => {
                  // Scroll to properties section
                  const element = document.getElementById('available-properties');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Typography variant="h3" sx={{ mb: 2 }}>🏠</Typography>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Available Properties
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Browse through our extensive collection of properties. Search by location, price, and type.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  bgcolor: 'success.main',
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                  transition: 'all 0.3s',
                }}
                onClick={() => {
                  // Scroll to voice agent section
                  const element = document.getElementById('voice-agent-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Typography variant="h3" sx={{ mb: 2 }}>🎙️</Typography>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Talk to Voice Agent
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Get instant answers about properties, ask questions, and get personalized recommendations from our AI assistant.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box id="available-properties" sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3, textAlign: 'center' }}>
              Available Properties
            </Typography>
            <UserView />
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box id="voice-agent-section" sx={{ mb: 4 }}>
            <Paper elevation={2} sx={{ p: 4, bgcolor: 'success.main', color: 'white' }}>
              <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ textAlign: 'center', mb: 2 }}>
                🎙️ Talk to Our AI Voice Agent
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', opacity: 0.95 }}>
                Have questions about properties? Need help finding the perfect place? 
                Our AI voice agent is available 24/7 to assist you with property inquiries, 
                answer questions, and provide personalized recommendations.
              </Typography>
              <VoiceAgentPreview onLeadGenerated={handleLeadGenerated} />
            </Paper>
          </Box>
        </TabPanel>

        {/* Documentation Tab */}
        <TabPanel value={activeTab} index={2}>
          <Documentation />
        </TabPanel>
      </Container>
    </Box>
  );
}
