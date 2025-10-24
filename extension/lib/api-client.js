// Claude API client utilities

/**
 * Send scraped data to Claude for analysis via proxy server
 */
export async function analyzeWithClaude(scrapedData, proxyUrl = 'http://localhost:3000/api/suggest') {
  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ page: scrapedData })
    });
    
    if (!response.ok) {
      throw new Error(`Proxy error: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.schema;
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
}

/**
 * Extract data from a URL using Claude
 */
export async function extractFromUrl(url, html, schema, proxyUrl = 'http://localhost:3000/api/extract') {
  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url, html, schema })
    });
    
    if (!response.ok) {
      throw new Error(`Proxy error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Extract error:', error);
    throw error;
  }
}
