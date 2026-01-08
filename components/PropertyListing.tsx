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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  AttachMoney as PriceIcon,
  SquareFoot as SizeIcon,
  Home as HomeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
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
  size_acres: number | null;
  size_hectares: number | null;
  property_type: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export default function PropertyListing() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

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
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchProperties();
      setDeleteDialogOpen(false);
      setPropertyToDelete(null);
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
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

    return matchesSearch && matchesType;
  });

  const propertyTypes = ['all', 'Residential', 'Commercial', 'Industrial', 'Agricultural', 'Mixed Use', 'Land'];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Total: {filteredProperties.length} properties
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={7}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  label="Type"
                >
                  {propertyTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type === 'all' ? 'All' : type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Properties List - Scrollable */}
      {loading ? (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          Loading...
        </Typography>
      ) : filteredProperties.length === 0 ? (
        <Card>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              No properties found. Add your first property.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ maxHeight: '60vh', overflowY: 'auto', pr: 1 }}>
          <Grid container spacing={2}>
            {filteredProperties.map((property) => (
              <Grid item xs={12} key={property.id}>
              <Card
                sx={{
                  '&:hover': {
                    boxShadow: 4,
                    bgcolor: 'action.hover',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        {property.location}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <PriceIcon fontSize="small" color="primary" />
                        <Typography variant="body1" color="primary.main" fontWeight="bold">
                          {formatPrice(property.price)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SizeIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {formatSize(property.size, property.size_unit)}
                        </Typography>
                        <Chip
                          label={property.property_type}
                          color="primary"
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => setSelectedProperty(property)}
                        color="primary"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setPropertyToDelete(property.id);
                          setDeleteDialogOpen(true);
                        }}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          </Grid>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Property</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this property? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => propertyToDelete && handleDelete(propertyToDelete)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

