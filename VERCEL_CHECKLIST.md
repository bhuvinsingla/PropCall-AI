# ✅ Vercel Deployment Checklist

## 🔴 CRITICAL: Must Do Before Site Works

### Step 1: Add Environment Variables in Vercel

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select your **PropCall-AI** project

2. **Navigate to Environment Variables:**
   - Click **Settings** → **Environment Variables**

3. **Add Variable 1:**
   ```
   Key: NEXT_PUBLIC_SUPABASE_URL
   Value: https://nscimwhfwjwaisybkeab.supabase.co
   Environments: ☑️ Production ☑️ Preview ☑️ Development
   ```

4. **Add Variable 2 (CRITICAL!):**
   ```
   Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY2ltd2hmd2p3YWlzeWJrZWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2Mjk4NjksImV4cCI6MjA3ODIwNTg2OX0.AFlB9KGk7o5ObY33WmzhmyUlG0AUORQaiqG4IBDfdTo
   Environments: ☑️ Production ☑️ Preview ☑️ Development
   ```

5. **Click Save** for each variable

### Step 2: Redeploy (REQUIRED!)

- Go to **Deployments** tab
- Click **⋯** on latest deployment → **Redeploy**
- Wait for deployment to complete (1-2 minutes)

### Step 3: Verify It Works

1. Visit: https://prop-call-ai.vercel.app/
2. Open browser console (F12)
3. Check for errors:
   - ✅ Should NOT see "CRITICAL: Supabase anon key is not set!"
   - ✅ Should NOT see "Invalid API key" errors
   - ✅ Properties should load
   - ✅ API requests should return 200 OK

## 🔍 How to Verify Environment Variables Are Set

### Method 1: Check Vercel Dashboard
- Settings → Environment Variables
- You should see both variables listed

### Method 2: Check Browser Console
- Open DevTools (F12) → Console tab
- Look for the error message if placeholder key is being used

### Method 3: Check Network Requests
- Open DevTools (F12) → Network tab
- Look for requests to `supabase.co/rest/v1/properties`
- Check the `apikey` header:
  - ❌ If it contains "placeholder" → Variables not set
  - ✅ If it's your real key → Variables are set correctly

## 🐛 Troubleshooting

### Still seeing "Invalid API key" error?

1. **Verify variable names are EXACT:**
   - `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not `SUPABASE_ANON_KEY`)

2. **Check you selected all environments:**
   - Production ☑️
   - Preview ☑️
   - Development ☑️

3. **Did you redeploy?**
   - Environment variables only take effect after redeployment
   - Go to Deployments → Redeploy

4. **Verify the key is complete:**
   - The anon key should be very long (200+ characters)
   - Make sure you copied the ENTIRE key

5. **Check Vercel build logs:**
   - Go to Deployments → Click on deployment → View logs
   - Look for any errors related to environment variables

## ✅ Success Indicators

- ✅ No console errors about missing Supabase key
- ✅ Properties load successfully
- ✅ Leads table shows data
- ✅ API requests return 200 status codes
- ✅ No "Invalid API key" errors in network tab

## 📝 Quick Reference

**Your Supabase Anon Key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY2ltd2hmd2p3YWlzeWJrZWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2Mjk4NjksImV4cCI6MjA3ODIwNTg2OX0.AFlB9KGk7o5ObY33WmzhmyUlG0AUORQaiqG4IBDfdTo
```

**Your Supabase URL:**
```
https://nscimwhfwjwaisybkeab.supabase.co
```

