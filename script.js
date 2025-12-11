// Script Manager Application
class ScriptManager {
    constructor() {
        this.scripts = [];
        this.currentEditingId = null;
        this.currentViewingId = null;
        this.currentCategory = 'all';
        this.searchTerm = '';
        this.useSupabase = supabase !== null;
        this.realtimeSubscription = null;
        
        this.initializeEventListeners();
        this.init();
    }

    async init() {
        this.showLoading(true);
        await this.loadScripts();
        this.renderScripts();
        this.showLoading(false);
        this.setupRealtime();
    }

    initializeEventListeners() {
        // Add script button
        document.getElementById('addScriptBtn').addEventListener('click', () => {
            this.openAddModal();
        });

        // Modal close buttons
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('closeViewModal').addEventListener('click', () => {
            this.closeViewModal();
        });

        // Cancel button
        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeModal();
        });

        // Form submission
        document.getElementById('scriptForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveScript();
        });

        // Search input
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.renderScripts();
        });

        // Category filters
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.renderScripts();
            });
        });

        // Close modals on outside click
        document.getElementById('scriptModal').addEventListener('click', (e) => {
            if (e.target.id === 'scriptModal') {
                this.closeModal();
            }
        });

        document.getElementById('viewModal').addEventListener('click', (e) => {
            if (e.target.id === 'viewModal') {
                this.closeViewModal();
            }
        });

        // View modal buttons
        document.getElementById('copyScriptBtn').addEventListener('click', () => {
            this.copyScript();
        });

        document.getElementById('editScriptBtn').addEventListener('click', () => {
            this.editScript();
        });

        document.getElementById('deleteScriptBtn').addEventListener('click', () => {
            this.deleteScript();
        });

        // Export/Import buttons
        document.getElementById('exportAllBtn').addEventListener('click', () => {
            this.exportAllScripts();
        });

        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });

        document.getElementById('importFile').addEventListener('change', (e) => {
            this.importScripts(e);
        });

        // Share script buttons
        document.getElementById('shareScriptBtn').addEventListener('click', () => {
            this.openShareModal();
        });

        document.getElementById('exportScriptBtn').addEventListener('click', () => {
            this.exportSingleScript();
        });

        document.getElementById('closeShareModal').addEventListener('click', () => {
            this.closeShareModal();
        });

        document.getElementById('copyShareLinkBtn').addEventListener('click', () => {
            this.copyShareLink();
        });

        document.getElementById('downloadScriptFileBtn').addEventListener('click', () => {
            this.downloadScriptFile();
        });

        // Close share modal on outside click
        document.getElementById('shareModal').addEventListener('click', (e) => {
            if (e.target.id === 'shareModal') {
                this.closeShareModal();
            }
        });

        // Check for shared script in URL on load
        this.checkForSharedScript();
    }

    async loadScripts() {
        if (this.useSupabase) {
            try {
                const { data, error } = await supabase
                    .from('scripts')
                    .select('*')
                    .order('updated_at', { ascending: false });

                if (error) {
                    console.error('Error loading scripts:', error);
                    this.showToast('Error loading scripts. Using local storage.', 'error');
                    this.useSupabase = false;
                    this.scripts = this.loadScriptsLocal();
                } else {
                    this.scripts = data.map(script => ({
                        id: script.id,
                        name: script.name,
                        category: script.category,
                        content: script.content,
                        description: script.description || '',
                        createdAt: script.created_at,
                        updatedAt: script.updated_at
                    }));
                }
            } catch (error) {
                console.error('Error connecting to Supabase:', error);
                this.showToast('Connection error. Using local storage.', 'error');
                this.useSupabase = false;
                this.scripts = this.loadScriptsLocal();
            }
        } else {
            this.scripts = this.loadScriptsLocal();
        }
    }

    loadScriptsLocal() {
        const stored = localStorage.getItem('cyberpatriotScripts');
        return stored ? JSON.parse(stored) : [];
    }

    async saveScripts() {
        if (this.useSupabase) {
            // Supabase saves happen individually, so this is mainly for local fallback
            return;
        } else {
            localStorage.setItem('cyberpatriotScripts', JSON.stringify(this.scripts));
        }
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    openAddModal() {
        this.currentEditingId = null;
        document.getElementById('modalTitle').textContent = 'Add New Script';
        document.getElementById('scriptForm').reset();
        document.getElementById('scriptModal').classList.add('show');
    }

    closeModal() {
        document.getElementById('scriptModal').classList.remove('show');
        this.currentEditingId = null;
    }

    openViewModal(scriptId) {
        const script = this.scripts.find(s => s.id === scriptId);
        if (!script) return;

        this.currentViewingId = scriptId;
        document.getElementById('viewScriptName').textContent = script.name;
        document.getElementById('viewScriptContent').textContent = script.content;
        document.getElementById('viewCategory').textContent = script.category;
        document.getElementById('viewCategory').className = `category-badge ${script.category}`;
        document.getElementById('viewDescription').textContent = script.description || 'No description provided.';
        
        document.getElementById('viewModal').classList.add('show');
    }

    closeViewModal() {
        document.getElementById('viewModal').classList.remove('show');
        this.currentViewingId = null;
    }

    async saveScript() {
        const name = document.getElementById('scriptName').value.trim();
        const category = document.getElementById('scriptCategory').value;
        const content = document.getElementById('scriptContent').value.trim();
        const description = document.getElementById('scriptDescription').value.trim();

        if (!name || !content) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        this.showLoading(true);

        try {
            if (this.currentEditingId) {
                // Update existing script
                if (this.useSupabase) {
                    const { data, error } = await supabase
                        .from('scripts')
                        .update({
                            name,
                            category,
                            content,
                            description,
                            updated_at: new Date().toISOString()
                        })
                        .eq('id', this.currentEditingId)
                        .select()
                        .single();

                    if (error) throw error;
                    this.showToast('Script updated successfully!');
                } else {
                    const index = this.scripts.findIndex(s => s.id === this.currentEditingId);
                    if (index !== -1) {
                        this.scripts[index] = {
                            ...this.scripts[index],
                            name,
                            category,
                            content,
                            description,
                            updatedAt: new Date().toISOString()
                        };
                        this.saveScripts();
                        this.showToast('Script updated successfully!');
                    }
                }
            } else {
                // Add new script
                if (this.useSupabase) {
                    const { data, error } = await supabase
                        .from('scripts')
                        .insert([{
                            name,
                            category,
                            content,
                            description,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        }])
                        .select()
                        .single();

                    if (error) throw error;
                    this.showToast('Script added successfully! Everyone can see it now!');
                } else {
                    const newScript = {
                        id: this.generateId(),
                        name,
                        category,
                        content,
                        description,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
                    this.scripts.push(newScript);
                    this.saveScripts();
                    this.showToast('Script added successfully!');
                }
            }

            // Reload scripts to get latest from database
            await this.loadScripts();
            this.renderScripts();
            this.closeModal();
        } catch (error) {
            console.error('Error saving script:', error);
            this.showToast('Error saving script. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    editScript() {
        if (!this.currentViewingId) return;

        const script = this.scripts.find(s => s.id === this.currentViewingId);
        if (!script) return;

        this.currentEditingId = this.currentViewingId;
        this.closeViewModal();

        // Populate form
        document.getElementById('modalTitle').textContent = 'Edit Script';
        document.getElementById('scriptName').value = script.name;
        document.getElementById('scriptCategory').value = script.category;
        document.getElementById('scriptContent').value = script.content;
        document.getElementById('scriptDescription').value = script.description || '';

        document.getElementById('scriptModal').classList.add('show');
    }

    async deleteScript() {
        if (!this.currentViewingId) return;

        if (confirm('Are you sure you want to delete this script? This action cannot be undone.')) {
            this.showLoading(true);
            try {
                if (this.useSupabase) {
                    const { error } = await supabase
                        .from('scripts')
                        .delete()
                        .eq('id', this.currentViewingId);

                    if (error) throw error;
                    this.showToast('Script deleted successfully!');
                } else {
                    this.scripts = this.scripts.filter(s => s.id !== this.currentViewingId);
                    this.saveScripts();
                    this.showToast('Script deleted successfully!');
                }

                await this.loadScripts();
                this.renderScripts();
                this.closeViewModal();
            } catch (error) {
                console.error('Error deleting script:', error);
                this.showToast('Error deleting script. Please try again.', 'error');
            } finally {
                this.showLoading(false);
            }
        }
    }

    copyScript() {
        if (!this.currentViewingId) return;

        const script = this.scripts.find(s => s.id === this.currentViewingId);
        if (!script) return;

        navigator.clipboard.writeText(script.content).then(() => {
            this.showToast('Script copied to clipboard!');
        }).catch(err => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = script.content;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.showToast('Script copied to clipboard!');
        });
    }

    getFilteredScripts() {
        let filtered = this.scripts;

        // Filter by category
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(s => s.category === this.currentCategory);
        }

        // Filter by search term
        if (this.searchTerm) {
            filtered = filtered.filter(s => 
                s.name.toLowerCase().includes(this.searchTerm) ||
                s.content.toLowerCase().includes(this.searchTerm) ||
                (s.description && s.description.toLowerCase().includes(this.searchTerm))
            );
        }

        // Sort by most recently updated
        return filtered.sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.createdAt);
            const dateB = new Date(b.updatedAt || b.createdAt);
            return dateB - dateA;
        });
    }

    renderScripts() {
        const scriptsList = document.getElementById('scriptsList');
        const emptyState = document.getElementById('emptyState');
        const filteredScripts = this.getFilteredScripts();

        if (filteredScripts.length === 0) {
            scriptsList.style.display = 'none';
            emptyState.style.display = 'block';
            if (this.scripts.length === 0) {
                emptyState.innerHTML = '<p>No scripts yet. Click "Add New Script" to get started!</p>';
            } else {
                emptyState.innerHTML = '<p>No scripts match your search or filter criteria.</p>';
            }
            return;
        }

        scriptsList.style.display = 'grid';
        emptyState.style.display = 'none';

        scriptsList.innerHTML = filteredScripts.map(script => {
            const preview = script.content.substring(0, 150) + (script.content.length > 150 ? '...' : '');
            return `
                <div class="script-card" onclick="scriptManager.openViewModal('${script.id}')">
                    <div class="script-card-header">
                        <div>
                            <div class="script-card-title">${this.escapeHtml(script.name)}</div>
                            <span class="category-badge ${script.category}">${script.category}</span>
                        </div>
                    </div>
                    ${script.description ? `<div class="script-card-description">${this.escapeHtml(script.description)}</div>` : ''}
                    <div class="script-card-preview">${this.escapeHtml(preview)}</div>
                </div>
            `;
        }).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type === 'error' ? 'error' : ''}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Export/Import Functions
    exportAllScripts() {
        if (this.scripts.length === 0) {
            this.showToast('No scripts to export', 'error');
            return;
        }

        const dataStr = JSON.stringify(this.scripts, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `cyberpatriot-scripts-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showToast(`Exported ${this.scripts.length} script(s) successfully!`);
    }

    async importScripts(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            this.showLoading(true);
            try {
                const importedScripts = JSON.parse(e.target.result);
                
                if (!Array.isArray(importedScripts)) {
                    this.showToast('Invalid file format', 'error');
                    return;
                }

                // Validate script structure
                const validScripts = importedScripts.filter(script => 
                    script.name && script.content && script.category
                );

                if (validScripts.length === 0) {
                    this.showToast('No valid scripts found in file', 'error');
                    return;
                }

                if (this.useSupabase) {
                    // Prepare scripts for Supabase
                    const scriptsToInsert = validScripts.map(script => ({
                        name: script.name,
                        category: script.category,
                        content: script.content,
                        description: script.description || '',
                        created_at: script.createdAt || new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    }));

                    const { error } = await supabase
                        .from('scripts')
                        .insert(scriptsToInsert);

                    if (error) throw error;
                    this.showToast(`Imported ${validScripts.length} script(s) successfully! Everyone can see them now!`);
                    
                    // Reload scripts
                    await this.loadScripts();
                    this.renderScripts();
                } else {
                    // Generate new IDs for imported scripts to avoid conflicts
                    validScripts.forEach(script => {
                        script.id = this.generateId();
                        script.createdAt = script.createdAt || new Date().toISOString();
                        script.updatedAt = new Date().toISOString();
                    });

                    // Add imported scripts
                    this.scripts.push(...validScripts);
                    this.saveScripts();
                    this.renderScripts();
                    
                    this.showToast(`Imported ${validScripts.length} script(s) successfully!`);
                }
            } catch (error) {
                this.showToast('Error reading file. Please check the file format.', 'error');
                console.error('Import error:', error);
            } finally {
                this.showLoading(false);
            }
        };

        reader.readAsText(file);
        // Reset file input
        event.target.value = '';
    }

    // Share Functions
    openShareModal() {
        if (!this.currentViewingId) return;

        const script = this.scripts.find(s => s.id === this.currentViewingId);
        if (!script) return;

        // Generate shareable link
        const scriptData = {
            name: script.name,
            category: script.category,
            content: script.content,
            description: script.description
        };

        // Encode script data in URL
        const encoded = btoa(JSON.stringify(scriptData));
        const shareUrl = `${window.location.origin}${window.location.pathname}?share=${encoded}`;
        
        document.getElementById('shareLinkInput').value = shareUrl;
        document.getElementById('shareModal').classList.add('show');
    }

    closeShareModal() {
        document.getElementById('shareModal').classList.remove('show');
    }

    copyShareLink() {
        const input = document.getElementById('shareLinkInput');
        input.select();
        input.setSelectionRange(0, 99999); // For mobile devices

        navigator.clipboard.writeText(input.value).then(() => {
            this.showToast('Share link copied to clipboard!');
        }).catch(() => {
            document.execCommand('copy');
            this.showToast('Share link copied to clipboard!');
        });
    }

    exportSingleScript() {
        if (!this.currentViewingId) return;

        const script = this.scripts.find(s => s.id === this.currentViewingId);
        if (!script) return;

        const scriptData = [{
            name: script.name,
            category: script.category,
            content: script.content,
            description: script.description
        }];

        const dataStr = JSON.stringify(scriptData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${script.name.replace(/[^a-z0-9]/gi, '_')}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showToast('Script exported successfully!');
    }

    downloadScriptFile() {
        this.exportSingleScript();
        this.closeShareModal();
    }

    setupRealtime() {
        if (!this.useSupabase) return;

        // Subscribe to changes in the scripts table
        this.realtimeSubscription = supabase
            .channel('scripts-changes')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'scripts' },
                async (payload) => {
                    console.log('Script changed:', payload);
                    // Reload scripts when any change occurs
                    await this.loadScripts();
                    this.renderScripts();
                    if (payload.eventType === 'INSERT') {
                        this.showToast('New script added by someone!', 'success');
                    }
                }
            )
            .subscribe();
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = show ? 'flex' : 'none';
        }
    }

    checkForSharedScript() {
        const urlParams = new URLSearchParams(window.location.search);
        const shareData = urlParams.get('share');
        
        if (shareData) {
            try {
                const scriptData = JSON.parse(atob(shareData));
                
                if (scriptData.name && scriptData.content) {
                    // Ask user if they want to import
                    if (confirm(`Would you like to import the shared script "${scriptData.name}"?`)) {
                        this.importSharedScript(scriptData);
                    }
                }
            } catch (error) {
                console.error('Error parsing shared script:', error);
                this.showToast('Invalid share link', 'error');
            }
        }
    }

    async importSharedScript(scriptData) {
        this.showLoading(true);
        try {
            if (this.useSupabase) {
                const { error } = await supabase
                    .from('scripts')
                    .insert([{
                        name: scriptData.name,
                        category: scriptData.category || 'other',
                        content: scriptData.content,
                        description: scriptData.description || '',
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    }]);

                if (error) throw error;
                this.showToast('Shared script imported successfully!');
            } else {
                const newScript = {
                    id: this.generateId(),
                    name: scriptData.name,
                    category: scriptData.category || 'other',
                    content: scriptData.content,
                    description: scriptData.description || '',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                
                this.scripts.push(newScript);
                this.saveScripts();
                this.showToast('Shared script imported successfully!');
            }

            await this.loadScripts();
            this.renderScripts();
            
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
            console.error('Error importing script:', error);
            this.showToast('Error importing script. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }
}

// Initialize the application
let scriptManager;
document.addEventListener('DOMContentLoaded', () => {
    scriptManager = new ScriptManager();
});

