-- Property Management System - Supabase Database Schema
-- Project: bhuvinsingla@gmail.com's Project
-- Project ID: nscimwhfwjwaisybkeab

-- ============================================
-- 1. PROPERTIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL,
  price NUMERIC NOT NULL,
  size NUMERIC NOT NULL,
  size_unit TEXT NOT NULL DEFAULT 'sqft',
  size_sqft NUMERIC,
  size_sqm NUMERIC,
  size_acres NUMERIC,
  size_hectares NUMERIC,
  property_type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  location TEXT,
  property_type TEXT,
  budget TEXT,
  status TEXT DEFAULT 'New',
  source TEXT DEFAULT 'Inbound Call',
  date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. CALLS TABLE (for voice agent call history)
-- ============================================
CREATE TABLE IF NOT EXISTS calls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('inbound', 'outbound')),
  phone_number TEXT NOT NULL,
  name TEXT,
  duration TEXT,
  status TEXT DEFAULT 'completed',
  query TEXT,
  lead_generated BOOLEAN DEFAULT false,
  lead_id UUID REFERENCES leads(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. INDEXES for better query performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_date ON leads(date);
CREATE INDEX IF NOT EXISTS idx_calls_type ON calls(type);
CREATE INDEX IF NOT EXISTS idx_calls_date ON calls(created_at);

-- ============================================
-- 5. FUNCTIONS
-- ============================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for properties table
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for leads table
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to search properties by location and price range
CREATE OR REPLACE FUNCTION search_properties(
  p_location TEXT DEFAULT NULL,
  p_min_price NUMERIC DEFAULT NULL,
  p_max_price NUMERIC DEFAULT NULL,
  p_property_type TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  location TEXT,
  price NUMERIC,
  size NUMERIC,
  size_unit TEXT,
  property_type TEXT,
  description TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.location,
    p.price,
    p.size,
    p.size_unit,
    p.property_type,
    p.description
  FROM properties p
  WHERE 
    (p_location IS NULL OR p.location ILIKE '%' || p_location || '%')
    AND (p_min_price IS NULL OR p.price >= p_min_price)
    AND (p_max_price IS NULL OR p.price <= p_max_price)
    AND (p_property_type IS NULL OR p.property_type = p_property_type)
  ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get leads statistics
CREATE OR REPLACE FUNCTION get_leads_stats()
RETURNS TABLE (
  total_leads BIGINT,
  new_leads BIGINT,
  contacted_leads BIGINT,
  qualified_leads BIGINT,
  converted_leads BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_leads,
    COUNT(*) FILTER (WHERE status = 'New')::BIGINT as new_leads,
    COUNT(*) FILTER (WHERE status = 'Contacted')::BIGINT as contacted_leads,
    COUNT(*) FILTER (WHERE status = 'Qualified')::BIGINT as qualified_leads,
    COUNT(*) FILTER (WHERE status = 'Converted')::BIGINT as converted_leads
  FROM leads;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;

-- Policies for properties table (allow all operations for now - adjust based on your auth needs)
CREATE POLICY "Allow all operations on properties" ON properties
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Policies for leads table
CREATE POLICY "Allow all operations on leads" ON leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Policies for calls table
CREATE POLICY "Allow all operations on calls" ON calls
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 7. SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample properties
INSERT INTO properties (location, price, size, size_unit, size_sqft, size_sqm, size_acres, size_hectares, property_type, description)
VALUES 
  ('Downtown Mumbai', 5000000, 1200, 'sqft', 1200, 111.48, 0.0275, 0.0111, 'Residential', 'Beautiful 3BHK apartment in prime location'),
  ('Sector 15 Noida', 3500000, 1500, 'sqft', 1500, 139.35, 0.0344, 0.0139, 'Residential', 'Spacious 3BHK with modern amenities'),
  ('Bangalore IT Park', 20000000, 5000, 'sqft', 5000, 464.5, 0.1147, 0.0464, 'Commercial', 'Prime commercial space for office'),
  ('Ahmedabad', 2500000, 2000, 'sqft', 2000, 185.8, 0.0459, 0.0186, 'Residential', 'Luxury 4BHK villa')
ON CONFLICT DO NOTHING;

-- Insert sample leads
INSERT INTO leads (name, phone, email, location, property_type, budget, status, source, date)
VALUES 
  ('Rajesh Kumar', '+91 98765 43210', 'rajesh.kumar@email.com', 'Noida', '3BHK Residential', '₹ 50,00,000', 'New', 'Inbound Call', '2024-01-15'),
  ('Priya Sharma', '+91 91234 56789', 'priya.sharma@email.com', 'Mumbai', 'Commercial', '₹ 2,00,00,000', 'Contacted', 'Outbound Call', '2024-01-14'),
  ('Amit Patel', '+91 99876 54321', 'amit.patel@email.com', 'Ahmedabad', '2BHK Residential', '₹ 35,00,000', 'Qualified', 'Inbound Call', '2024-01-13'),
  ('Sneha Reddy', '+91 98765 12345', 'sneha.reddy@email.com', 'Bangalore', '4BHK Residential', '₹ 1,20,00,000', 'New', 'Inbound Call', '2024-01-12')
ON CONFLICT DO NOTHING;

