// Supabase Configuration
// Get these values from your Supabase project: https://supabase.com/dashboard
// 
// SETUP INSTRUCTIONS:
// 1. Go to https://supabase.com and create a free account
// 2. Create a new project
// 3. Go to Project Settings > API
// 4. Copy your "Project URL" and "anon public" key
// 5. Replace the values below

const SUPABASE_CONFIG = {
    url: 'https://klkoxkogdlrlayydcozh.supabase.co',  // Your Supabase project URL
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsa294a29nZGxybGF5eWRjb3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2ODk4MjksImV4cCI6MjA4MDI2NTgyOX0.cts6REX7oJnJ3lSIAaIesZtX90gLjN-YeITlhwYkqco'  // TODO: Get this from Supabase Dashboard → Settings → API → anon public key
};

// Initialize Supabase client
let supabase;
if (SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_URL' && SUPABASE_CONFIG.anonKey !== 'YOUR_SUPABASE_ANON_KEY') {
    supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
} else {
    console.warn('Supabase not configured. Please set up your credentials in config.js');
    supabase = null;
}

