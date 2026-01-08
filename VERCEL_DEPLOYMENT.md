# Vercel Deployment Guide

## ⚠️ CRITICAL: Fixing "Invalid API key" Error (401 Unauthorized)

**If you're seeing "Invalid API key" errors in production, you MUST add the real Supabase anon key to Vercel environment variables.**

The placeholder key only works for builds - it will NOT work at runtime!

## Step 1: Get Your Supabase Anon Key

1. **Go to your Supabase project dashboard:**
   - Direct link: https://supabase.com/dashboard/project/nscimwhfwjwaisybkeab/settings/api

2. **Find the API Keys section:**
   - Look for **"Project API keys"** section
   - Find the **`anon` `public`** key (NOT the `service_role` key)
   - It's a very long JWT token that starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. **Click "Reveal" or "Copy"** to get the full key
   - ⚠️ Make sure you copy the ENTIRE key - it's very long (usually 200+ characters)

## Step 2: Add Environment Variables in Vercel

1. **Go to your Vercel project:**
   - Dashboard: https://vercel.com/dashboard
   - Select your **PropCall-AI** project (or the project name you used)

2. **Navigate to Environment Variables:**
   - Click **Settings** (top menu)
   - Click **Environment Variables** (left sidebar)

3. **Add Variable 1:**
   - Click **"Add New"** button
   - **Key:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** `https://nscimwhfwjwaisybkeab.supabase.co`
   - **Environment:** Check all three boxes:
     - ☑️ Production
     - ☑️ Preview  
     - ☑️ Development
   - Click **Save**

4. **Add Variable 2:**
   - Click **"Add New"** button again
   - **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** Paste your FULL anon key from Step 1 (the entire long JWT token)
   - **Environment:** Check all three boxes:
     - ☑️ Production
     - ☑️ Preview
     - ☑️ Development
   - Click **Save**

5. **Verify both variables are listed:**
   - You should see both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the list

## Step 3: Redeploy (REQUIRED!)

**⚠️ IMPORTANT: After adding environment variables, you MUST redeploy for them to take effect!**

### Option 1: Redeploy from Vercel Dashboard (Recommended)
1. Go to **Deployments** tab in Vercel
2. Find your latest deployment
3. Click the **⋯** (three dots) menu on the right
4. Click **Redeploy**
5. Wait for the deployment to complete (usually 1-2 minutes)

### Option 2: Push a new commit
```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push
```

## Step 4: Verify It's Working

After redeploying:

1. **Wait for deployment to finish** (check the Deployments tab)
2. **Visit your live site** (e.g., https://prop-call-ai.vercel.app)
3. **Open browser DevTools** (F12) → **Network** tab
4. **Try to load properties** (go to Property Dealer tab)
5. **Check the API request:**
   - Look for requests to `supabase.co/rest/v1/properties`
   - Status should be **200 OK** (not 401)
   - The `apikey` header should show your REAL key (not the placeholder)

## ✅ Success Indicators

- ✅ No "Invalid API key" errors in console
- ✅ Properties load successfully
- ✅ API requests return 200 status codes
- ✅ Data appears in your application

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

