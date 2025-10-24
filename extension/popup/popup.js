// Popup script for TabscrAIp
document.addEventListener('DOMContentLoaded', () => {
  const scrapeBtn = document.getElementById('scrapeBtn');
  const status = document.getElementById('status');
  const results = document.getElementById('results');
  const tableContainer = document.getElementById('tableContainer');

  scrapeBtn.addEventListener('click', async () => {
    try {
      status.textContent = 'Scraping page...';
      scrapeBtn.disabled = true;

      // Get active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // Execute content script to scrape page
      const [result] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: scrapePage
      });

      if (result && result.result) {
        status.textContent = 'Scraping complete!';
        displayResults(result.result);
      } else {
        status.textContent = 'No data found';
      }
    } catch (error) {
      status.textContent = `Error: ${error.message}`;
      console.error('Scraping error:', error);
    } finally {
      scrapeBtn.disabled = false;
    }
  });

  function displayResults(data) {
    results.classList.remove('hidden');
    tableContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }
});

// Function injected into page context
function scrapePage() {
  return {
    title: document.title,
    url: window.location.href,
    timestamp: new Date().toISOString()
  };
}
