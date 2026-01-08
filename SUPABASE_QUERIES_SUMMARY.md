# Supabase Queries Summary

## All Queries to Run in Supabase SQL Editor

**Location**: Supabase Dashboard → SQL Editor → New Query

**Important**: Copy the entire contents of `supabase-schema.sql` and run it in the SQL Editor. This will create all tables, functions, indexes, and sample data.

---

## Quick Reference: What Gets Created

### 1. Tables (3 tables)

#### `properties` table
- Stores property listings
- Fields: id, location, price, size, size_unit, size_sqft, size_sqm, size_acres, size_hectares, property_type, description, created_at, updated_at

#### `leads` table
- Stores customer leads
- Fields: id, name, phone, email, location, property_type, budget, status, source, date, notes, created_at, updated_at

#### `calls` table
- Stores voice agent call history
- Fields: id, type, phone_number, name, duration, status, query, lead_generated, lead_id, created_at

### 2. Indexes (6 indexes)
- `idx_properties_location` - For fast location searches
- `idx_properties_type` - For property type filtering
- `idx_properties_price` - For price range queries
- `idx_leads_status` - For status filtering
- `idx_leads_date` - For date-based queries
- `idx_calls_type` - For call type filtering
- `idx_calls_date` - For call history queries

### 3. Functions (3 functions)

#### `update_updated_at_column()`
- Automatically updates `updated_at` timestamp when records are modified
- Used by triggers

#### `search_properties(p_location, p_min_price, p_max_price, p_property_type)`
- Search properties with filters
- Example usage:
  ```sql
  SELECT * FROM search_properties(
    p_location := 'Mumbai',
    p_min_price := 1000000,
    p_max_price := 10000000,
    p_property_type := 'Residential'
  );
  ```

#### `get_leads_stats()`
- Returns lead statistics
- Example usage:
  ```sql
  SELECT * FROM get_leads_stats();
  ```
- Returns: total_leads, new_leads, contacted_leads, qualified_leads, converted_leads

### 4. Triggers (2 triggers)
- `update_properties_updated_at` - Auto-updates properties.updated_at
- `update_leads_updated_at` - Auto-updates leads.updated_at

### 5. Row Level Security (RLS) Policies
- All tables have RLS enabled
- Policies allow all operations (for now)
- Can be customized for production use

### 6. Sample Data
- 4 sample properties
- 4 sample leads

---

## Step-by-Step Instructions

### Step 1: Open SQL Editor
1. Go to https://supabase.com/dashboard/project/nscimwhfwjwaisybkeab
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 2: Copy and Paste
1. Open `supabase-schema.sql` file from this project
2. Copy ALL contents (Ctrl+A, Ctrl+C)
3. Paste into the SQL Editor

### Step 3: Run the Query
1. Click the **Run** button (or press Ctrl+Enter)
2. Wait for execution to complete
3. You should see "Success. No rows returned" or similar success message

### Step 4: Verify
1. Go to **Table Editor** in the left sidebar
2. You should see three tables:
   - `properties`
   - `leads`
   - `calls`
3. Click on each table to verify they have the correct columns
4. Check that sample data was inserted

---

## Testing the Database

### Test 1: Insert a Property
```sql
INSERT INTO properties (location, price, size, size_unit, property_type, description)
VALUES ('Test Location', 5000000, 1500, 'sqft', 'Residential', 'Test property');
```

### Test 2: Query Properties
```sql
SELECT * FROM properties ORDER BY created_at DESC;
```

### Test 3: Search Properties Function
```sql
SELECT * FROM search_properties(
  p_location := 'Mumbai',
  p_min_price := 1000000,
  p_max_price := 10000000
);
```

### Test 4: Get Leads Statistics
```sql
SELECT * FROM get_leads_stats();
```

### Test 5: Insert a Lead
```sql
INSERT INTO leads (name, phone, email, location, property_type, budget, status, source)
VALUES ('Test User', '+91 99999 99999', 'test@example.com', 'Mumbai', 'Residential', '₹ 50,00,000', 'New', 'Inbound Call');
```

---

## Common Issues and Solutions

### Issue: "relation already exists"
**Solution**: Drop existing tables first (if you're re-running):
```sql
DROP TABLE IF EXISTS calls CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
```

### Issue: "function already exists"
**Solution**: Drop existing functions first:
```sql
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS search_properties(TEXT, NUMERIC, NUMERIC, TEXT) CASCADE;
DROP FUNCTION IF EXISTS get_leads_stats() CASCADE;
```

### Issue: "permission denied"
**Solution**: Make sure you're logged in as the project owner or have admin privileges

### Issue: "syntax error"
**Solution**: 
- Make sure you copied the entire SQL file
- Check for any missing semicolons
- Verify you're using PostgreSQL syntax

---

## Next Steps After Running Queries

1. ✅ Verify tables exist in Table Editor
2. ✅ Check that sample data was inserted
3. ✅ Test the search_properties function
4. ✅ Test the get_leads_stats function
5. ✅ Set up environment variables in your Next.js app
6. ✅ Test the application locally
7. ✅ Customize RLS policies if needed for production

---

## Production Considerations

Before deploying to production:

1. **Update RLS Policies**: Create user-specific policies instead of allowing all operations
2. **Set Up Authentication**: Integrate Supabase Auth for user management
3. **Backup Strategy**: Set up regular database backups
4. **Monitoring**: Enable Supabase monitoring and alerts
5. **API Rate Limiting**: Configure rate limits if needed
6. **Remove Sample Data**: Delete sample data before going live

---

## Support

If you encounter any issues:
1. Check the Supabase logs in the dashboard
2. Verify your SQL syntax
3. Check the Supabase documentation
4. Contact: bhuvinsingla@gmail.com

