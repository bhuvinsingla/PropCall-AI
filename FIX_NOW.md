# 🚨 FIX YOUR LIVE SITE NOW - 5 Minutes

Your site is live but APIs are failing because the Supabase key isn't set in Vercel.

## ⚡ Quick Steps

### 1️⃣ Get Supabase Key (1 min)
- Go to: https://supabase.com/dashboard/project/nscimwhfwjwaisybkeab/settings/api
- Copy the **`anon` `public`** key (click "Reveal" first)
- It's a very long token starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 2️⃣ Add to Vercel (2 min)
- Go to: https://vercel.com/dashboard
- Your Project → **Settings** → **Environment Variables**
- Click **"Add New"**
- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Paste the full key from step 1
- **Environments:** ☑️ Production ☑️ Preview ☑️ Development
- Click **Save**

### 3️⃣ Redeploy (2 min)
- Go to **Deployments** tab
- Click **⋯** → **Redeploy**
- Wait 1-2 minutes

### 4️⃣ Test
- Visit: https://prop-call-ai.vercel.app/
- Should work now! ✅

---

## 🔍 How to Verify It's Fixed

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Refresh the page
4. Look for requests to `supabase.co/rest/v1/properties`
5. Status should be **200 OK** (not 401)
6. Properties should load on the page

## ❌ Still Not Working?

- Make sure you copied the ENTIRE key (200+ characters)
- Verify key name is exactly: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Make sure you clicked "Save" after adding
- Make sure you redeployed after adding the variable
- Check Vercel deployment logs for errors

