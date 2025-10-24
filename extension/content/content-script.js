// Content script for TabscrAIp - runs in the context of web pages

console.log('TabscrAIp content script loaded');

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrape') {
    const scrapedData = scrapePageContent();
    sendResponse({ success: true, data: scrapedData });
  }
  return true; // Keep message channel open for async response
});

/**
 * Scrape content from the current page
 */
function scrapePageContent() {
  const data = {
    title: document.title,
    url: window.location.href,
    meta: extractMetadata(),
    text: extractMainText(),
    links: extractLinks(),
    tables: extractTables(),
    timestamp: new Date().toISOString()
  };
  
  return data;
}

/**
 * Extract metadata from page
 */
function extractMetadata() {
  const meta = {};
  document.querySelectorAll('meta').forEach(tag => {
    const name = tag.getAttribute('name') || tag.getAttribute('property');
    const content = tag.getAttribute('content');
    if (name && content) {
      meta[name] = content;
    }
  });
  return meta;
}

/**
 * Extract main text content (limit to first 10000 chars)
 */
function extractMainText() {
  const body = document.body;
  if (!body) return '';
  
  // Remove script and style elements
  const clone = body.cloneNode(true);
  clone.querySelectorAll('script, style, noscript').forEach(el => el.remove());
  
  const text = clone.innerText || clone.textContent || '';
  return text.trim().slice(0, 10000);
}

/**
 * Extract all links from page
 */
function extractLinks() {
  const links = [];
  document.querySelectorAll('a[href]').forEach(link => {
    links.push({
      text: link.textContent.trim().slice(0, 200),
      href: link.href,
      title: link.title || null
    });
  });
  return links.slice(0, 100); // Limit to first 100 links
}

/**
 * Extract table data from page
 */
function extractTables() {
  const tables = [];
  document.querySelectorAll('table').forEach((table, idx) => {
    if (idx >= 5) return; // Limit to first 5 tables
    
    const headers = [];
    table.querySelectorAll('th').forEach(th => {
      headers.push(th.textContent.trim());
    });
    
    const rows = [];
    table.querySelectorAll('tr').forEach(tr => {
      const cells = [];
      tr.querySelectorAll('td').forEach(td => {
        cells.push(td.textContent.trim());
      });
      if (cells.length > 0) {
        rows.push(cells);
      }
    });
    
    if (headers.length > 0 || rows.length > 0) {
      tables.push({ headers, rows });
    }
  });
  
  return tables;
}
