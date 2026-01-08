# 🚨 QUICK FIX: "Invalid API key" Error

## The Problem
Your Vercel deployment is using a placeholder API key, which causes **401 Unauthorized** errors.

## The Solution (5 Minutes)

### 1. Get Your Real Supabase Key (2 min)
1. Go to: https://supabase.com/dashboard/project/nscimwhfwjwaisybkeab/settings/api
2. Find **"Project API keys"** → **`anon` `public`** key
3. Click **"Reveal"** and copy the ENTIRE key (it's very long, starts with `eyJ...`)

### 2. Add to Vercel (2 min)
1. Go to: https://vercel.com/dashboard
2. Select your project → **Settings** → **Environment Variables**
3. Click **"Add New"**
4. **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. **Value:** Paste your full anon key from step 1
6. **Environment:** Check all (Production, Preview, Development)
7. Click **Save**

### 3. Redeploy (1 min)
1. Go to **Deployments** tab
2. Click **⋯** on latest deployment → **Redeploy**
3. Wait 1-2 minutes

### 4. Test
Visit your site - the API should work now! ✅

---

**Still not working?**
- Make sure you copied the ENTIRE key (it's 200+ characters)
- Verify the key name is exactly: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Make sure you redeployed after adding the variable
- Check Vercel deployment logs for errors

