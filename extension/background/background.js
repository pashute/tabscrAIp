// Background service worker for TabscrAIp

console.log('TabscrAIp background service worker loaded');

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('TabscrAIp installed');
  } else if (details.reason === 'update') {
    console.log('TabscrAIp updated');
  }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeWithClaude') {
    handleClaudeAnalysis(request.data)
      .then(result => sendResponse({ success: true, result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep message channel open for async response
  }
});

/**
 * Handle Claude API analysis (placeholder for now)
 * In production, this would call a proxy server
 */
async function handleClaudeAnalysis(data) {
  // TODO: Implement Claude API integration via proxy server
  console.log('Analyzing data with Claude:', data);
  
  // Placeholder response
  return {
    fields: [
      { name: 'title', type: 'text', sortable: true, groupable: false },
      { name: 'url', type: 'url', sortable: true, groupable: false }
    ],
    notes: 'Placeholder schema - Claude integration pending'
  };
}

/**
 * Fetch content from URL (for drill-down functionality)
 */
async function fetchUrl(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    return { success: true, html };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
