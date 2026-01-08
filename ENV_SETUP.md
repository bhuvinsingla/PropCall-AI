# Environment Variables Setup

## Quick Fix for "supabaseKey is required" Error

You need to create a `.env.local` file in the root of your project with your Supabase credentials.

## Step 1: Get Your Supabase API Key

1. Go to your Supabase project dashboard:
   https://supabase.com/dashboard/project/nscimwhfwjwaisybkeab

2. Navigate to **Settings** → **API** (left sidebar)

3. Find the **Project API keys** section

4. Copy the **`anon` `public`** key (NOT the `service_role` key)

## Step 2: Create .env.local File

Create a new file named `.env.local` in the root directory of your project:

**Location**: `C:\Users\dell\Documents\Ideas\property\my-next-app\.env.local`

**Content**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://nscimwhfwjwaisybkeab.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

Replace `paste_your_anon_key_here` with the actual anon key you copied from Step 1.

## Step 3: Restart Development Server

After creating the `.env.local` file:

1. **Stop** your current development server (Ctrl+C)
2. **Restart** it:
   ```bash
   npm run dev
   ```

## Example .env.local File

Your `.env.local` file should look something like this:

```env
NEXT_PUBLIC_SUPABASE_URL=https://nscimwhfwjwaisybkeab.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zY2ltd2hmd2p3YWlzeWJrZWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTcwMDAwMDAwMH0.example_key_here
```

**Important**: 
- The anon key is a long string starting with `eyJ...`
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Keep your keys secret and secure

## Troubleshooting

### Still getting the error after creating .env.local?

1. **Check file location**: Make sure `.env.local` is in the root directory (same level as `package.json`)

2. **Check file name**: It must be exactly `.env.local` (not `.env.local.txt` or `env.local`)

3. **Restart the server**: Environment variables are only loaded when the server starts

4. **Check for typos**: Make sure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is spelled correctly

5. **Verify the key**: Make sure you copied the entire anon key (it's a long string)

### How to verify your .env.local is working:

1. Create/update `.env.local` with your key
2. Stop the dev server (Ctrl+C)
3. Start it again: `npm run dev`
4. The error should be gone

## Security Notes

- ✅ `.env.local` is automatically ignored by git
- ✅ Never share your anon key publicly
- ✅ The anon key is safe to use in client-side code (it's public)
- ✅ Use service_role key only in server-side code (never expose it)

## Need Help?

If you're still having issues:
1. Double-check you copied the correct key from Supabase dashboard
2. Make sure the file is named exactly `.env.local`
3. Restart your development server
4. Check the Supabase dashboard to verify your project is active

