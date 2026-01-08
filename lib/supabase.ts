import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nscimwhfwjwaisybkeab.supabase.co';
// For build time: use a minimal valid JWT format to prevent build errors
// IMPORTANT: You MUST set NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel environment variables for production
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY2ltd2hmd2p3YWlzeWJrZWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6OTk5OTk5OTk5OX0.build-placeholder-key-replace-in-vercel';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

