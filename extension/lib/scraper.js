// Scraping utilities for TabscrAIp

/**
 * Parse HTML string and extract structured data
 */
export function parseHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  return {
    title: doc.title,
    text: doc.body ? doc.body.textContent.slice(0, 10000) : '',
    links: extractLinksFromDoc(doc),
    tables: extractTablesFromDoc(doc)
  };
}

/**
 * Extract links from document
 */
function extractLinksFromDoc(doc) {
  const links = [];
  doc.querySelectorAll('a[href]').forEach(link => {
    links.push({
      text: link.textContent.trim().slice(0, 200),
      href: link.href
    });
  });
  return links;
}

/**
 * Extract tables from document
 */
function extractTablesFromDoc(doc) {
  const tables = [];
  doc.querySelectorAll('table').forEach(table => {
    const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim());
    const rows = Array.from(table.querySelectorAll('tr')).map(tr => 
      Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim())
    ).filter(row => row.length > 0);
    
    if (headers.length > 0 || rows.length > 0) {
      tables.push({ headers, rows });
    }
  });
  return tables;
}
