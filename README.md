# PropCall-AI

A complete property management system built with Next.js, React, Material-UI, and Supabase. This application provides a comprehensive solution for property dealers with AI-powered voice agent integration, lead management, and data export capabilities.

## Features

- ✅ **Property Management**: Add, view, and manage property listings with automatic unit conversions
- ✅ **Lead Management**: Track and manage customer leads collected by the voice agent
- ✅ **Voice Agent Integration**: Preview and simulate AI-powered voice agent calls
- ✅ **Data Export**: Export leads to CSV and integrate with Google Sheets
- ✅ **Real-time Database**: Powered by Supabase for real-time data synchronization
- ✅ **Responsive Design**: Modern UI built with Material-UI
- ✅ **Documentation**: Complete system documentation with PDF export

## Tech Stack

- **Framework**: Next.js 16.1.1
- **UI Library**: Material-UI (MUI) 5.15.0
- **Database**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Styling**: Emotion (CSS-in-JS)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account and project
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd my-next-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Supabase**:
   - Follow the instructions in `SUPABASE_SETUP.md`
   - Create `.env.local` file with your Supabase credentials:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=https://nscimwhfwjwaisybkeab.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
     ```

4. **Run database migrations**:
   - Open Supabase SQL Editor
   - Copy and run the contents of `supabase-schema.sql`

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
my-next-app/
├── app/
│   ├── layout.tsx          # Root layout with MUI theme provider
│   ├── page.tsx            # Main page with tab navigation
│   └── globals.css          # Global styles
├── components/
│   ├── PropertyForm.tsx    # Property entry form
│   ├── LeadsTable.tsx      # Leads display and management
│   ├── VoiceAgentPreview.tsx # Voice agent simulation
│   ├── GoogleSheetPreview.tsx # Spreadsheet view
│   ├── Documentation.tsx  # System documentation
│   ├── CaseStudy.tsx       # Case study page
│   ├── CTASection.tsx      # Call-to-action section
│   ├── FloatingCTA.tsx     # Floating action buttons
│   └── GuideBot.tsx        # Interactive guide
├── lib/
│   └── supabase.ts         # Supabase client configuration
├── theme.ts                # MUI theme configuration
├── supabase-schema.sql     # Database schema and queries
└── SUPABASE_SETUP.md       # Detailed Supabase setup guide
```

## Database Schema

The application uses three main tables:

1. **properties**: Stores property listings with location, price, size, and type
2. **leads**: Stores customer leads with contact information and preferences
3. **calls**: Stores call history from the voice agent

See `supabase-schema.sql` for complete schema definition.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Supabase Queries

All required SQL queries are in `supabase-schema.sql`. This includes:

- Table creation
- Indexes for performance
- Functions for searching and statistics
- Row Level Security (RLS) policies
- Sample data

**Important**: Run the entire `supabase-schema.sql` file in your Supabase SQL Editor to set up the database.

## Environment Variables

Required environment variables (in `.env.local`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://nscimwhfwjwaisybkeab.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Features in Detail

### Property Form
- Enter property details (location, price, size, type)
- Automatic size unit conversions (sqft, sqm, acres, hectares)
- Real-time validation
- Saves to Supabase database

### Leads Management
- View all collected leads
- Search and filter leads
- Status tracking (New, Contacted, Qualified, Converted)
- Export to CSV

### Voice Agent Preview
- Simulate inbound/outbound calls
- View call history
- Track lead generation
- Database integration for property queries

### Google Sheets Integration
- Spreadsheet-like view of leads
- Real-time sync
- CSV export functionality
- Ready for Google Sheets API integration

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Support

For issues or questions:
- Email: bhuvinsingla@gmail.com
- GitHub: https://github.com/bhuvinsingla
- LinkedIn: https://linkedin.com/in/bhuvin-singla

## License

This project is private and proprietary.
