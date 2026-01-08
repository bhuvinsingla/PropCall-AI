# ✅ Vercel Environment Variables Setup

## Your Supabase Keys

**✅ USE THIS ONE (Anon Key - Safe for Client-Side):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY2ltd2hmd2p3YWlzeWJrZWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2Mjk4NjksImV4cCI6MjA3ODIwNTg2OX0.AFlB9KGk7o5ObY33WmzhmyUlG0AUORQaiqG4IBDfdTo
```

**❌ DO NOT USE (Service Role - Server-Side Only):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY2ltd2hmd2p3YWlzeWJrZWFiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjYyOTg2OSwiZXhwIjoyMDc4MjA1ODY5fQ.mEbZnHvFfRhPwoM66Hzd2wUrJEtd6qbUYBOpj4LKSuI
```

## Step-by-Step: Add to Vercel

### 1. Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Select your **PropCall-AI** project

### 2. Navigate to Environment Variables
- Click **Settings** (top menu)
- Click **Environment Variables** (left sidebar)

### 3. Add Variable 1: Supabase URL
- Click **"Add New"** button
- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://nscimwhfwjwaisybkeab.supabase.co`
- **Environment:** Check all three:
  - ☑️ Production
  - ☑️ Preview
  - ☑️ Development
- Click **Save**

### 4. Add Variable 2: Supabase Anon Key (IMPORTANT!)
- Click **"Add New"** button again
- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Copy and paste this EXACT key:
  ```
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY2ltd2hmd2p3YWlzeWJrZWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2Mjk4NjksImV4cCI6MjA3ODIwNTg2OX0.AFlB9KGk7o5ObY33WmzhmyUlG0AUORQaiqG4IBDfdTo
  ```
- **Environment:** Check all three:
  - ☑️ Production
  - ☑️ Preview
  - ☑️ Development
- Click **Save**

### 5. Verify Both Variables Are Added
You should see:
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 6. Redeploy (REQUIRED!)
- Go to **Deployments** tab
- Find your latest deployment
- Click **⋯** (three dots) → **Redeploy**
- Wait 1-2 minutes for deployment to complete

### 7. Test Your Site
- Visit: https://prop-call-ai.vercel.app/
- Properties should load now! ✅
- Check browser console (F12) - no more "Invalid API key" errors

## ⚠️ Security Notes

- ✅ **Anon Key** is safe to use in client-side code (it's public)
- ❌ **Service Role Key** should NEVER be exposed in client-side code
- ✅ Environment variables in Vercel are encrypted and secure
- ✅ Never commit keys to git (they're in `.gitignore`)

## Troubleshooting

### Still seeing "Invalid API key"?
1. Make sure you copied the ENTIRE anon key (all 3 parts separated by dots)
2. Verify the key name is exactly: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Make sure you selected all environments (Production, Preview, Development)
4. **Did you redeploy?** Environment variables only take effect after redeployment!

### How to verify it's working:
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Refresh the page
4. Look for requests to `supabase.co/rest/v1/properties`
5. Status should be **200 OK** (not 401)
6. Response should contain data, not error messages

