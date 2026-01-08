'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { supabase } from '../lib/supabase';

interface PropertyFormProps {
  onSave?: () => void;
}

export default function PropertyForm({ onSave }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    location: '',
    price: '',
    size: '',
    sizeUnit: 'sqft',
    propertyType: '',
    description: '',
  });

  const [convertedSize, setConvertedSize] = useState({
    sqft: '',
    sqm: '',
    acres: '',
    hectares: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sizeUnits = [
    { value: 'sqft', label: 'Square Feet (sqft)' },
    { value: 'sqm', label: 'Square Meters (sqm)' },
    { value: 'acres', label: 'Acres' },
    { value: 'hectares', label: 'Hectares' },
  ];

  const propertyTypes = [
    'Residential',
    'Commercial',
    'Industrial',
    'Agricultural',
    'Mixed Use',
    'Land',
  ];

  // Conversion factors
  const convertSize = (value: string, fromUnit: string) => {
    if (!value || isNaN(parseFloat(value))) {
      setConvertedSize({ sqft: '', sqm: '', acres: '', hectares: '' });
      return;
    }

    const numValue = parseFloat(value);
    let sqft: number, sqm: number, acres: number, hectares: number;

    // Convert to sqft first
    switch (fromUnit) {
      case 'sqft':
        sqft = numValue;
        break;
      case 'sqm':
        sqft = numValue * 10.764;
        break;
      case 'acres':
        sqft = numValue * 43560;
        break;
      case 'hectares':
        sqft = numValue * 107639;
        break;
      default:
        sqft = numValue;
    }

    // Convert from sqft to all units
    sqm = sqft / 10.764;
    acres = sqft / 43560;
    hectares = sqft / 107639;

    setConvertedSize({
      sqft: sqft.toFixed(2),
      sqm: sqm.toFixed(2),
      acres: acres.toFixed(4),
      hectares: hectares.toFixed(4),
    });
  };

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);

    if (field === 'size' || field === 'sizeUnit') {
      const sizeValue = field === 'size' ? value : formData.size;
      const unit = field === 'sizeUnit' ? value : formData.sizeUnit;
      convertSize(sizeValue, unit);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const { data, error: supabaseError } = await supabase
        .from('properties')
        .insert({
          location: formData.location,
          price: parseFloat(formData.price),
          size: parseFloat(formData.size),
          size_unit: formData.sizeUnit,
          size_sqft: parseFloat(convertedSize.sqft) || null,
          size_sqm: parseFloat(convertedSize.sqm) || null,
          size_acres: parseFloat(convertedSize.acres) || null,
          size_hectares: parseFloat(convertedSize.hectares) || null,
          property_type: formData.propertyType,
          description: formData.description || null,
        })
        .select();

      if (supabaseError) {
        throw supabaseError;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      // Reset form
      setFormData({
        location: '',
        price: '',
        size: '',
        sizeUnit: 'sqft',
        propertyType: '',
        description: '',
      });
      setConvertedSize({ sqft: '', sqm: '', acres: '', hectares: '' });

      // Notify parent component to refresh listing
      if (onSave) {
        onSave();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save property');
      console.error('Error saving property:', err);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
        Add New Property
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Enter property details below. Data will be saved and available to the voice agent.
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Property saved successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  required
                  placeholder="e.g., Downtown Mumbai, Sector 15 Noida"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  required
                  placeholder="Enter price"
                  InputProps={{
                    startAdornment: '₹ ',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Property Type</InputLabel>
                  <Select
                    value={formData.propertyType}
                    onChange={(e) => handleChange('propertyType', e.target.value)}
                    label="Property Type"
                  >
                    {propertyTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Size"
                  type="number"
                  value={formData.size}
                  onChange={(e) => handleChange('size', e.target.value)}
                  required
                  placeholder="Enter size"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Size Unit</InputLabel>
                  <Select
                    value={formData.sizeUnit}
                    onChange={(e) => handleChange('sizeUnit', e.target.value)}
                    label="Size Unit"
                  >
                    {sizeUnits.map((unit) => (
                      <MenuItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {formData.size && (
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ bgcolor: 'background.default', p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Size Conversions:
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="text.secondary">
                          Square Feet
                        </Typography>
                        <Typography variant="h6">{convertedSize.sqft}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="text.secondary">
                          Square Meters
                        </Typography>
                        <Typography variant="h6">{convertedSize.sqm}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="text.secondary">
                          Acres
                        </Typography>
                        <Typography variant="h6">{convertedSize.acres}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="text.secondary">
                          Hectares
                        </Typography>
                        <Typography variant="h6">{convertedSize.hectares}</Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={2}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Additional details..."
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  startIcon={<SaveIcon />}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Save Property
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

