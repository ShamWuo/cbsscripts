# Supabase Setup Instructions

To enable shared scripts (where everyone can see scripts added by anyone), you need to set up a Supabase database.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account (no credit card required)
3. Create a new project
   - Choose a project name
   - Set a database password (save this!)
   - Choose a region close to you
   - Wait for the project to be created (takes ~2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** (gear icon) → **API**
2. Find these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (a long string starting with `eyJ...`)

## Step 3: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL code:

```sql
-- Create the scripts table
CREATE TABLE IF NOT EXISTS scripts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read scripts
CREATE POLICY "Anyone can read scripts"
    ON scripts FOR SELECT
    USING (true);

-- Create a policy that allows anyone to insert scripts
CREATE POLICY "Anyone can insert scripts"
    ON scripts FOR INSERT
    WITH CHECK (true);

-- Create a policy that allows anyone to update scripts
CREATE POLICY "Anyone can update scripts"
    ON scripts FOR UPDATE
    USING (true);

-- Create a policy that allows anyone to delete scripts
CREATE POLICY "Anyone can delete scripts"
    ON scripts FOR DELETE
    USING (true);

-- Create a function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_scripts_updated_at
    BEFORE UPDATE ON scripts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## Step 4: Enable Realtime (Optional but Recommended)

1. In your Supabase dashboard, go to **Database** → **Replication**
2. Find the `scripts` table
3. Toggle the switch to enable replication
4. This allows everyone to see new scripts in real-time!

## Step 5: Configure the App

1. Open `config.js` in your project
2. Replace `YOUR_SUPABASE_URL` with your Project URL
3. Replace `YOUR_SUPABASE_ANON_KEY` with your anon public key
4. Save the file

Example:
```javascript
const SUPABASE_CONFIG = {
    url: 'https://abcdefghijklmnop.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
};
```

## Step 6: Test It Out!

1. Open `index.html` in your browser
2. Add a script
3. Open the same page in another browser/device
4. You should see the script appear automatically!

## Troubleshooting

**"Supabase not configured" warning:**
- Make sure you've updated `config.js` with your actual credentials
- Check that there are no extra spaces or quotes

**"Error loading scripts":**
- Check that you've created the `scripts` table (Step 3)
- Verify your API keys are correct
- Check the browser console for detailed error messages

**Scripts not appearing in real-time:**
- Make sure you enabled Replication (Step 4)
- Check that Row Level Security policies are set up correctly

**Can't insert/update/delete:**
- Verify the RLS policies were created correctly
- Check the Supabase dashboard → Authentication → Policies

## Security Note

The current setup allows **anyone** to read, add, edit, and delete scripts. This is fine for a team competition, but if you want to add authentication later, you can:
1. Enable Supabase Authentication
2. Modify the RLS policies to require authentication
3. Add a login system to the app

## Free Tier Limits

Supabase free tier includes:
- 500 MB database storage
- 2 GB bandwidth
- Unlimited API requests
- Real-time subscriptions

This should be more than enough for a CyberPatriot team!

