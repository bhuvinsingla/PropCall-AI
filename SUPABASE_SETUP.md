# Supabase Setup Instructions

## Project Information
- **Project Name**: bhuvinsingla@gmail.com's Project
- **Project ID**: nscimwhfwjwaisybkeab
- **Project URL**: https://nscimwhfwjwaisybkeab.supabase.co

## Step 1: Get Your Supabase API Keys

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/nscimwhfwjwaisybkeab
2. Navigate to **Settings** → **API**
3. Copy the following:
   - **Project URL**: `https://nscimwhfwjwaisybkeab.supabase.co`
   - **anon/public key**: This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 2: Set Up Environment Variables

Create a `.env.local` file in the root of your Next.js project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://nscimwhfwjwaisybkeab.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_anon_key_here` with the actual anon key from Step 1.

## Step 3: Run Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire contents of `supabase-schema.sql` file
4. Click **Run** to execute all the SQL statements

This will create:
- `properties` table
- `leads` table
- `calls` table
- Indexes for better performance
- Functions for searching and statistics
- Row Level Security (RLS) policies
- Sample data for testing

## Step 4: Verify Tables

After running the SQL, verify that the tables were created:

1. Go to **Table Editor** in your Supabase dashboard
2. You should see three tables:
   - `properties`
   - `leads`
   - `calls`

## Step 5: Test the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser

4. Test the Property Form:
   - Fill in property details
   - Submit the form
   - Check Supabase dashboard to see the data in the `properties` table

5. Test the Leads Table:
   - Navigate to the "Leads" tab
   - You should see sample leads from the database

## Database Schema Overview

### Properties Table
Stores all property information:
- Location, price, size, property type
- Automatic size conversions (sqft, sqm, acres, hectares)
- Created/updated timestamps

### Leads Table
Stores customer leads collected by the voice agent:
- Contact information (name, phone, email)
- Property preferences
- Status tracking (New, Contacted, Qualified, Converted)
- Source tracking

### Calls Table
Stores call history from the voice agent:
- Call type (inbound/outbound)
- Phone number, duration, status
- Query information
- Lead generation status

## Functions Available

### search_properties()
Search properties by location, price range, and property type:
```sql
SELECT * FROM search_properties(
  p_location := 'Mumbai',
  p_min_price := 1000000,
  p_max_price := 10000000,
  p_property_type := 'Residential'
);
```

### get_leads_stats()
Get statistics about leads:
```sql
SELECT * FROM get_leads_stats();
```

## Row Level Security (RLS)

Currently, all tables have RLS enabled with policies that allow all operations. In production, you should:
1. Set up authentication
2. Create more restrictive RLS policies
3. Limit access based on user roles

## Troubleshooting

### Issue: "Invalid API key"
- Make sure your `.env.local` file has the correct `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your development server after changing environment variables

### Issue: "Table does not exist"
- Make sure you ran the `supabase-schema.sql` file in the SQL Editor
- Check that all tables were created in the Table Editor

### Issue: "Permission denied"
- Check RLS policies in Supabase dashboard
- Make sure the policies allow the operations you're trying to perform

## Next Steps

1. Set up authentication if needed
2. Customize RLS policies for your use case
3. Add more functions or tables as needed
4. Deploy to production (Vercel, Netlify, etc.)

