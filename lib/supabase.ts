import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nscimwhfwjwaisybkeab.supabase.co';

// Get the anon key from environment variables
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Placeholder key for build time only (prevents build errors)
const PLACEHOLDER_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY2ltd2hmd2p3YWlzeWJrZWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6OTk5OTk5OTk5OX0.build-placeholder-key-replace-in-vercel';

// Use placeholder only if no key is provided (for build time)
const finalKey = supabaseAnonKey || PLACEHOLDER_KEY;

// Runtime check: Warn if placeholder key is being used in production
if (typeof window !== 'undefined' && finalKey === PLACEHOLDER_KEY) {
  console.error('❌ CRITICAL: Supabase anon key is not set!');
  console.error('Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to Vercel environment variables.');
  console.error('See VERCEL_ENV_SETUP.md for instructions.');
}

export const supabase = createClient(supabaseUrl, finalKey);

