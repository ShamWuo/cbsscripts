# CyberPatriot Script Manager

A modern web application for managing and organizing scripts for CyberPatriot competitions. Easily add, organize, search, and copy your competition scripts.

## Features

- ✅ **Add Custom Scripts**: Create and save your own scripts with categories
- 📋 **One-Click Copy**: Copy scripts to clipboard with a single click
- 🔍 **Search Functionality**: Quickly find scripts by name or content
- 🏷️ **Category Organization**: Organize scripts by Windows, Linux, Security, Network, or Other
- 💾 **Local Storage**: All scripts are saved locally in your browser
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

## Technical Details

- Pure HTML, CSS, and JavaScript (no dependencies)
- Uses localStorage for data persistence
- Works offline after initial load
- No server required - runs entirely in the browser

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

All scripts are stored locally in your browser's localStorage. This means:
- Your data stays on your device
- No account or internet connection required
- Data persists between browser sessions
- To backup: Use the "Export All Scripts" feature
- To restore: Use the "Import Scripts" feature
- To clear: Clear your browser's localStorage

## Tips for CyberPatriot Competitions

1. **Organize Early**: Create scripts for common tasks before the competition
2. **Use Categories**: Tag scripts appropriately for quick access
3. **Add Descriptions**: Help yourself remember what each script does
4. **Test Scripts**: Make sure your scripts work before saving them
5. **Keep It Updated**: Edit scripts as you learn new techniques

---

**Good luck with your CyberPatriot competitions!** 🛡️

