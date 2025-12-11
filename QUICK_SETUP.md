# Quick Setup Guide for Your Supabase Project

Your Supabase URL: `https://klkoxkogdlrlayydcozh.supabase.co`

## Step 1: Get Your API Key

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/klkoxkogdlrlayydcozh
2. Click **Settings** (⚙️ icon) in the left sidebar
3. Click **API** in the settings menu
4. Find the **anon public** key (it's a long string starting with `eyJ...`)
5. Copy it

## Step 2: Update config.js

1. Open `config.js` in this project
2. Replace `YOUR_SUPABASE_ANON_KEY` with the key you just copied
3. Save the file

## Step 3: Create the Database Table

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file `setup-database.sql` in this project
4. Copy ALL the SQL code from that file
5. Paste it into the Supabase SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

## Step 4: Enable Realtime (Recommended)

1. In your Supabase dashboard, click **Database** → **Replication**
2. Find the `scripts` table in the list
3. Toggle the switch to **enable** replication
4. This allows everyone to see new scripts instantly!

## Step 5: Test It!

1. Open `index.html` in your browser
2. Try adding a script
3. If it works, you're all set! 🎉

## Troubleshooting

**"Supabase not configured" warning:**
- Make sure you added your API key to `config.js`

**"Error loading scripts":**
- Make sure you ran the SQL code in Step 3
- Check the browser console (F12) for error messages

**Scripts not appearing:**
- Make sure Realtime is enabled (Step 4)
- Refresh the page

