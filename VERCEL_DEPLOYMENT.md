# Vercel Deployment Guide

## Fixing Build Error: "supabaseKey is required"

Your build is failing because the Supabase environment variables are not set in Vercel.

## Step 1: Get Your Supabase Anon Key

1. Go to your Supabase project dashboard:
   https://supabase.com/dashboard/project/nscimwhfwjwaisybkeab

2. Navigate to **Settings** → **API** (left sidebar)

3. Find the **Project API keys** section

4. Copy the **`anon` `public`** key (it's a long JWT token starting with `eyJ...`)

## Step 2: Add Environment Variables in Vercel

1. Go to your Vercel project dashboard:
   https://vercel.com/dashboard

2. Select your **PropCall-AI** project

3. Go to **Settings** → **Environment Variables**

4. Add the following two variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://nscimwhfwjwaisybkeab.supabase.co`
   - Environment: Select all (Production, Preview, Development)

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `[paste your anon key from Step 1]`
   - Environment: Select all (Production, Preview, Development)

5. Click **Save**

## Step 3: Redeploy

After adding the environment variables:

1. Go to **Deployments** tab in Vercel
2. Click the **⋯** (three dots) menu on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger a new deployment

## Verification

After redeploying, your build should succeed and the application should work correctly.

## Important Notes

- ✅ The anon key is safe to use in client-side code (it's public)
- ✅ Never commit your `.env.local` file to git
- ✅ Environment variables in Vercel are encrypted and secure
- ✅ You need to set these variables for each environment (Production, Preview, Development)

## Troubleshooting

### Build still failing?

1. **Double-check the variable names**: They must be exactly:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **Verify the key format**: The anon key should be a long JWT token starting with `eyJ...`

3. **Check environment selection**: Make sure you selected all environments (Production, Preview, Development)

4. **Redeploy**: After adding variables, you must redeploy for them to take effect

### Still having issues?

- Check Vercel build logs for specific error messages
- Verify your Supabase project is active
- Make sure you copied the entire anon key (it's very long)

