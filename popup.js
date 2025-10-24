// Popup script - handles UI interactions and data management
let currentData = null;
let currentAnalysis = null;
let sortState = {};
let groupState = {};

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
    await loadApiKey();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('saveApiKey').addEventListener('click', saveApiKey);
    document.getElementById('scrapeButton').addEventListener('click', scrapeCurrentPage);
    document.getElementById('exportCsv').addEventListener('click', exportToCsv);
    document.getElementById('exportJson').addEventListener('click', exportToJson);
}

async function loadApiKey() {
    const result = await chrome.storage.local.get(['claudeApiKey']);
    if (result.claudeApiKey) {
        document.getElementById('apiKey').value = result.claudeApiKey;
        showStatus('apiStatus', 'API key loaded', 'success');
    }
}

async function saveApiKey() {
    const apiKey = document.getElementById('apiKey').value.trim();
    
    if (!apiKey) {
        showStatus('apiStatus', 'Please enter an API key', 'error');
        return;
    }
    
    await chrome.storage.local.set({ claudeApiKey: apiKey });
    showStatus('apiStatus', 'API key saved successfully', 'success');
}

async function scrapeCurrentPage() {
    const apiKey = document.getElementById('apiKey').value.trim();
    
    if (!apiKey) {
        showStatus('scrapeStatus', 'Please configure your Claude API key first', 'error');
        return;
    }
    
    showStatus('scrapeStatus', 'Scraping page...', 'info');
    showProgress(true);
    
    try {
        // Get active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // Send message to content script to scrape the page
        const response = await chrome.tabs.sendMessage(tab.id, { action: 'scrapeContent' });
        
        if (!response.success) {
            throw new Error(response.error);
        }
        
        currentData = response.data;
        showStatus('scrapeStatus', 'Analyzing with Claude AI...', 'info');
        
        // Analyze with Claude
        const analysis = await analyzeWithClaude(currentData, apiKey);
        currentAnalysis = analysis;
        
        showStatus('scrapeStatus', 'Analysis complete! Displaying results...', 'success');
        showProgress(false);
        
        // Display the table
        displayTable(analysis);
        
    } catch (error) {
        console.error('Scraping error:', error);
        showStatus('scrapeStatus', `Error: ${error.message}`, 'error');
        showProgress(false);
    }
}

async function analyzeWithClaude(scrapedData, apiKey) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
            { action: 'analyzeWithClaude', data: scrapedData, apiKey },
            response => {
                if (response.success) {
                    resolve(response.result);
                } else {
                    reject(new Error(response.error));
                }
            }
        );
    });
}

function displayTable(analysis) {
    const resultsSection = document.getElementById('resultsSection');
    const tableContainer = document.getElementById('tableContainer');
    
    resultsSection.classList.remove('hidden');
    
    if (!analysis.suggestedData || analysis.suggestedData.length === 0) {
        tableContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: #666;">No data to display</p>';
        return;
    }
    
    const fields = analysis.fields || Object.keys(analysis.suggestedData[0]).map(key => ({
        name: key,
        type: 'text'
    }));
    
    const table = document.createElement('table');
    table.className = 'data-table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    fields.forEach(field => {
        const th = document.createElement('th');
        th.textContent = field.name;
        th.className = 'sortable';
        th.dataset.field = field.name;
        th.addEventListener('click', () => sortTable(field.name, analysis));
        headerRow.appendChild(th);
    });
    
    // Add drill-down column if applicable
    if (analysis.drillDownField) {
        const th = document.createElement('th');
        th.textContent = 'Actions';
        headerRow.appendChild(th);
    }
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    
    // Apply grouping if specified
    if (analysis.groupByField && analysis.suggestedData.length > 0) {
        displayGroupedData(tbody, analysis, fields);
    } else {
        displayRegularData(tbody, analysis, fields);
    }
    
    table.appendChild(tbody);
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

function displayRegularData(tbody, analysis, fields) {
    analysis.suggestedData.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        tr.dataset.rowIndex = rowIndex;
        
        fields.forEach(field => {
            const td = document.createElement('td');
            const value = row[field.name];
            
            if (field.type === 'url' && value) {
                const link = document.createElement('a');
                link.href = value;
                link.textContent = value;
                link.target = '_blank';
                td.appendChild(link);
            } else {
                td.textContent = value || '';
            }
            
            tr.appendChild(td);
        });
        
        // Add drill-down button if applicable
        if (analysis.drillDownField && row[analysis.drillDownField]) {
            const td = document.createElement('td');
            const button = document.createElement('button');
            button.className = 'drill-down-btn';
            button.textContent = 'Drill Down';
            button.addEventListener('click', () => drillDown(row[analysis.drillDownField], rowIndex));
            td.appendChild(button);
            tr.appendChild(td);
        }
        
        tbody.appendChild(tr);
    });
}

function displayGroupedData(tbody, analysis, fields) {
    const groupField = analysis.groupByField;
    const grouped = {};
    
    // Group the data
    analysis.suggestedData.forEach(row => {
        const groupValue = row[groupField] || 'Ungrouped';
        if (!grouped[groupValue]) {
            grouped[groupValue] = [];
        }
        grouped[groupValue].push(row);
    });
    
    // Display grouped data
    Object.keys(grouped).sort().forEach(groupValue => {
        // Create group header row
        const groupRow = document.createElement('tr');
        groupRow.className = 'grouped-row';
        const groupCell = document.createElement('td');
        groupCell.colSpan = fields.length + (analysis.drillDownField ? 1 : 0);
        
        const toggle = document.createElement('span');
        toggle.className = 'group-toggle';
        toggle.textContent = `${groupValue} (${grouped[groupValue].length} items)`;
        toggle.dataset.group = groupValue;
        toggle.addEventListener('click', (e) => toggleGroup(e.target));
        
        groupCell.appendChild(toggle);
        groupRow.appendChild(groupCell);
        tbody.appendChild(groupRow);
        
        // Create rows for this group
        grouped[groupValue].forEach((row, rowIndex) => {
            const tr = document.createElement('tr');
            tr.dataset.group = groupValue;
            tr.dataset.rowIndex = rowIndex;
            
            fields.forEach(field => {
                const td = document.createElement('td');
                const value = row[field.name];
                
                if (field.type === 'url' && value) {
                    const link = document.createElement('a');
                    link.href = value;
                    link.textContent = value;
                    link.target = '_blank';
                    td.appendChild(link);
                } else {
                    td.textContent = value || '';
                }
                
                tr.appendChild(td);
            });
            
            // Add drill-down button if applicable
            if (analysis.drillDownField && row[analysis.drillDownField]) {
                const td = document.createElement('td');
                const button = document.createElement('button');
                button.className = 'drill-down-btn';
                button.textContent = 'Drill Down';
                button.addEventListener('click', () => drillDown(row[analysis.drillDownField], rowIndex));
                td.appendChild(button);
                tr.appendChild(td);
            }
            
            tbody.appendChild(tr);
        });
    });
}

function toggleGroup(toggle) {
    const group = toggle.dataset.group;
    const rows = document.querySelectorAll(`tr[data-group="${group}"]`);
    
    toggle.classList.toggle('collapsed');
    rows.forEach(row => {
        row.classList.toggle('hidden');
    });
}

function sortTable(fieldName, analysis) {
    const currentSort = sortState[fieldName] || 'none';
    let newSort;
    
    if (currentSort === 'none') {
        newSort = 'asc';
    } else if (currentSort === 'asc') {
        newSort = 'desc';
    } else {
        newSort = 'none';
    }
    
    sortState = { [fieldName]: newSort };
    
    // Update header classes
    document.querySelectorAll('.data-table th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        if (th.dataset.field === fieldName) {
            if (newSort === 'asc') {
                th.classList.add('sorted-asc');
            } else if (newSort === 'desc') {
                th.classList.add('sorted-desc');
            }
        }
    });
    
    // Sort the data
    if (newSort !== 'none') {
        analysis.suggestedData.sort((a, b) => {
            const aVal = a[fieldName];
            const bVal = b[fieldName];
            
            if (aVal === bVal) return 0;
            
            const comparison = aVal < bVal ? -1 : 1;
            return newSort === 'asc' ? comparison : -comparison;
        });
    } else {
        // Reset to original order (would need to store original order)
    }
    
    // Redisplay table
    displayTable(analysis);
}

async function drillDown(url, rowIndex) {
    showStatus('scrapeStatus', `Fetching data from ${url}...`, 'info');
    
    try {
        // Get active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // Send message to content script to scrape the URL
        const response = await chrome.tabs.sendMessage(tab.id, { 
            action: 'scrapeUrl',
            url: url 
        });
        
        if (!response.success) {
            throw new Error(response.error);
        }
        
        // Display drill-down data
        displayDrillDownData(rowIndex, response.data);
        showStatus('scrapeStatus', 'Drill-down data loaded', 'success');
        
    } catch (error) {
        console.error('Drill-down error:', error);
        showStatus('scrapeStatus', `Drill-down error: ${error.message}`, 'error');
    }
}

function displayDrillDownData(rowIndex, data) {
    const row = document.querySelector(`tr[data-row-index="${rowIndex}"]`);
    if (!row) return;
    
    // Check if subtable already exists
    const existingSubtable = row.nextElementSibling?.classList.contains('subtable-row');
    if (existingSubtable) {
        row.nextElementSibling.remove();
        return;
    }
    
    // Create subtable row
    const subtableRow = document.createElement('tr');
    subtableRow.className = 'subtable-row';
    
    const subtableCell = document.createElement('td');
    subtableCell.colSpan = row.children.length;
    
    const subtableDiv = document.createElement('div');
    subtableDiv.className = 'subtable';
    
    // Display the drill-down data
    subtableDiv.innerHTML = `
        <strong>Additional Data:</strong>
        <pre style="font-size: 11px; margin-top: 5px; white-space: pre-wrap;">${JSON.stringify(data, null, 2)}</pre>
    `;
    
    subtableCell.appendChild(subtableDiv);
    subtableRow.appendChild(subtableCell);
    
    row.parentNode.insertBefore(subtableRow, row.nextSibling);
}

function exportToCsv() {
    if (!currentAnalysis || !currentAnalysis.suggestedData) {
        showStatus('scrapeStatus', 'No data to export', 'error');
        return;
    }
    
    const fields = currentAnalysis.fields || Object.keys(currentAnalysis.suggestedData[0]).map(key => ({
        name: key
    }));
    
    // Create CSV header
    let csv = fields.map(f => f.name).join(',') + '\n';
    
    // Add data rows
    currentAnalysis.suggestedData.forEach(row => {
        const values = fields.map(f => {
            const value = row[f.name] || '';
            // Escape quotes and wrap in quotes if contains comma
            const escaped = String(value).replace(/"/g, '""');
            return escaped.includes(',') ? `"${escaped}"` : escaped;
        });
        csv += values.join(',') + '\n';
    });
    
    // Download
    downloadFile(csv, 'scraped-data.csv', 'text/csv');
    showStatus('scrapeStatus', 'CSV exported successfully', 'success');
}

function exportToJson() {
    if (!currentAnalysis || !currentAnalysis.suggestedData) {
        showStatus('scrapeStatus', 'No data to export', 'error');
        return;
    }
    
    const json = JSON.stringify(currentAnalysis.suggestedData, null, 2);
    downloadFile(json, 'scraped-data.json', 'application/json');
    showStatus('scrapeStatus', 'JSON exported successfully', 'success');
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function showStatus(elementId, message, type) {
    const statusEl = document.getElementById(elementId);
    statusEl.textContent = message;
    statusEl.className = `status-message ${type}`;
    
    if (type === 'success' || type === 'error') {
        setTimeout(() => {
            statusEl.textContent = '';
            statusEl.className = 'status-message';
        }, 5000);
    }
}

function showProgress(show) {
    const progressBar = document.getElementById('progressBar');
    if (show) {
        progressBar.classList.remove('hidden');
    } else {
        progressBar.classList.add('hidden');
    }
}
