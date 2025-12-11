# CyberPatriot Script Manager

A modern web application for managing and organizing scripts for CyberPatriot competitions. Easily add, organize, search, and copy your competition scripts.

## Features

- ✅ **Add Custom Scripts**: Create and save your own scripts with categories
- 🌐 **Shared Database**: Everyone can see scripts added by anyone (with Supabase setup)
- 🔄 **Real-time Updates**: See new scripts appear automatically as teammates add them
- 📋 **One-Click Copy**: Copy scripts to clipboard with a single click
- 🔍 **Search Functionality**: Quickly find scripts by name or content
- 🏷️ **Category Organization**: Organize scripts by Windows, Linux, Security, Network, or Other
- 💾 **Local Storage Fallback**: Works offline with local storage if Supabase isn't configured
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface designed for efficiency
- 🔗 **Share Scripts**: Share scripts with teammates via shareable links or export files
- 📤 **Export/Import**: Export all scripts or import scripts from others

## How to Use

1. **Open the App**: Simply open `index.html` in your web browser
2. **Add a Script**: Click the "Add New Script" button
   - Enter a script name
   - Select a category
   - Paste your script content
   - (Optional) Add a description
   - Click "Save Script"
3. **View Scripts**: Click on any script card to view the full script
4. **Copy Script**: In the script view modal, click "Copy Script" to copy to clipboard
5. **Edit Script**: Click "Edit" in the script view modal to modify a script
6. **Delete Script**: Click "Delete" in the script view modal to remove a script
7. **Search**: Use the search box to find scripts by name or content
8. **Filter by Category**: Click category buttons to filter scripts
9. **Share Scripts**: 
   - Click "Share Script" in the script view to get a shareable link
   - Copy the link and send it to teammates
   - They can open the link to automatically import the script
   - Or export a script as a JSON file to share via email/USB
10. **Export All Scripts**: Click "Export All Scripts" to download all your scripts as a JSON file
11. **Import Scripts**: Click "Import Scripts" to import scripts from a JSON file (from teammates or backups)

## Categories

- **Windows**: Windows-specific scripts and configurations
- **Linux**: Linux/Unix scripts and commands
- **Security**: Security hardening and audit scripts
- **Network**: Network configuration and troubleshooting scripts
- **Other**: Miscellaneous scripts

## Setup

### Quick Start (Local Storage Only)
1. Open `index.html` in your browser
2. Start adding scripts - they'll be saved locally

### Shared Database Setup (Recommended for Teams)
To enable shared scripts where everyone can see each other's scripts:

1. **Set up Supabase** (free, takes ~5 minutes)
   - See [SETUP.md](SETUP.md) for detailed instructions
   - Create a free Supabase account
   - Create the database table
   - Add your API keys to `config.js`

2. **That's it!** Once configured, all scripts are shared automatically

## Technical Details

- Pure HTML, CSS, and JavaScript
- **With Supabase**: Shared database, real-time updates, everyone sees all scripts
- **Without Supabase**: Falls back to localStorage (local only)
- Works offline (with localStorage fallback)
- No build process required - just open and use!

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Sharing Scripts

### Method 1: Shareable Links
1. Open any script and click "Share Script"
2. Copy the generated shareable link
3. Send the link to teammates
4. When they open the link, they'll be prompted to import the script

### Method 2: Export/Import Files
1. **Export**: Click "Export All Scripts" or "Export Script" to download a JSON file
2. **Share**: Send the JSON file via email, USB drive, or file sharing service
3. **Import**: Recipients click "Import Scripts" and select the JSON file

## Data Storage

### With Supabase (Recommended)
- All scripts are stored in a shared Supabase database
- Everyone on your team can see all scripts
- Real-time updates - new scripts appear automatically
- Free tier includes 500 MB storage (plenty for scripts!)

### Without Supabase (Fallback)
- Scripts are stored locally in your browser's localStorage
- Only you can see your scripts
- No internet connection required
- To backup: Use the "Export All Scripts" feature
- To restore: Use the "Import Scripts" feature

## Tips for CyberPatriot Competitions

1. **Organize Early**: Create scripts for common tasks before the competition
2. **Use Categories**: Tag scripts appropriately for quick access
3. **Add Descriptions**: Help yourself remember what each script does
4. **Test Scripts**: Make sure your scripts work before saving them
5. **Keep It Updated**: Edit scripts as you learn new techniques

---

**Good luck with your CyberPatriot competitions!** 🛡️

