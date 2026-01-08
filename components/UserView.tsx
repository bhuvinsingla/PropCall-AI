'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Slider,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  AttachMoney as PriceIcon,
  SquareFoot as SizeIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { supabase } from '../lib/supabase';

interface Property {
  id: string;
  location: string;
  price: number;
  size: number;
  size_unit: string;
  size_sqft: number | null;
  size_sqm: number | null;
  property_type: string;
  description: string | null;
  created_at: string;
}

export default function UserView() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000000]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
      
      // Set max price from data
      if (data && data.length > 0) {
        const maxPrice = Math.max(...data.map(p => p.price));
        setPriceRange([0, maxPrice]);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSize = (size: number, unit: string) => {
    return `${size.toLocaleString()} ${unit}`;
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.property_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (property.description && property.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = filterType === 'all' || property.property_type === filterType;
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];

    return matchesSearch && matchesType && matchesPrice;
  });

  const propertyTypes = ['all', 'Residential', 'Commercial', 'Industrial', 'Agricultural', 'Mixed Use', 'Land'];

  return (
    <Box>

      {/* Search and Filter Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by location, type, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Property Type</InputLabel>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  label="Property Type"
                >
                  {propertyTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box>
                <Typography variant="body2" gutterBottom>
                  Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) => setPriceRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => formatPrice(value)}
                  min={0}
                  max={properties.length > 0 ? Math.max(...properties.map(p => p.price)) : 100000000}
                  step={100000}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Results Count */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
        </Typography>
      </Box>

      {/* Properties Grid */}
      {loading ? (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          Loading properties...
        </Typography>
      ) : filteredProperties.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No properties match your search criteria. Try adjusting your filters.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredProperties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 8,
                    transform: 'translateY(-8px)',
                  },
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Chip
                      label={property.property_type}
                      color="primary"
                      size="small"
                    />
                    <Chip
                      label="Available"
                      color="success"
                      size="small"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LocationIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {property.location}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <PriceIcon color="primary" />
                    <Typography variant="h5" color="primary.main" fontWeight="bold">
                      {formatPrice(property.price)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <SizeIcon color="action" />
                    <Typography variant="body1" color="text.secondary">
                      {formatSize(property.size, property.size_unit)}
                    </Typography>
                    {property.size_sqft && (
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        ({property.size_sqft.toLocaleString()} sqft)
                      </Typography>
                    )}
                  </Box>

                  {property.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {property.description}
                    </Typography>
                  )}

                  <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<PhoneIcon />}
                      sx={{ mb: 1 }}
                    >
                      Contact Owner
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<EmailIcon />}
                    >
                      Request Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Call to Action */}
      {filteredProperties.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            mt: 4,
            p: 4,
            textAlign: 'center',
            bgcolor: 'primary.main',
            color: 'white',
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Interested in a Property?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Contact us for more information or to schedule a viewing
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              },
            }}
            startIcon={<PhoneIcon />}
          >
            Call Now: +91 73556 35544
          </Button>
        </Paper>
      )}
    </Box>
  );
}

