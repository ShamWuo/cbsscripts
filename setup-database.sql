-- CyberPatriot Scripts Database Setup
-- Run this in your Supabase SQL Editor

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

