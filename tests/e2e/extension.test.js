// E2E tests using Puppeteer for Chrome extension

const puppeteer = require('puppeteer');
const path = require('path');

describe('Extension E2E tests', () => {
  let browser;
  let page;
  
  beforeAll(async () => {
    // Launch browser with extension loaded
    const extensionPath = path.join(__dirname, '../../extension');
    browser = await puppeteer.launch({
      headless: false, // Extensions don't work in headless mode
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
        '--no-sandbox'
      ]
    });
    
    page = await browser.newPage();
  });
  
  afterAll(async () => {
    if (browser) await browser.close();
  });
  
  test('should load extension', async () => {
    expect(browser).toBeDefined();
  });
  
  test('should open ui', async () => {
    // Navigate to a test page
    await page.goto('https://example.com');
    
    // Get extension popup URL (extensions page lists it)
    const targets = await browser.targets();
    const extensionTarget = targets.find(target => 
      target.type() === 'service_worker' && target.url().includes('chrome-extension://')
    );
    expect(extensionTarget).toBeDefined();
    
    // Get extension ID from service worker URL
    const extensionId = extensionTarget.url().split('/')[2];
    const popupUrl = `chrome-extension://${extensionId}/popup/popup.html`;
    
    // Open popup in new page
    const popupPage = await browser.newPage();
    await popupPage.goto(popupUrl);
    
    // Verify popup UI elements exist
    const title = await popupPage.$eval('h1', el => el.textContent);
    expect(title).toBe('TabscrAIp');
    
    const button = await popupPage.$('#scrapeBtn');
    expect(button).toBeTruthy();
    
    const buttonText = await popupPage.$eval('#scrapeBtn', el => el.textContent);
    expect(buttonText).toBe('Scrape Current Page');
    
    await popupPage.close();
  });
  
  test('should display in phase1 popup with app data', async () => {
    // Navigate to a test page
    await page.goto('https://example.com', { waitUntil: 'networkidle0' });
    
    // Get extension ID
    const targets = await browser.targets();
    const extensionTarget = targets.find(target => 
      target.type() === 'service_worker' && target.url().includes('chrome-extension://')
    );
    const extensionId = extensionTarget.url().split('/')[2];
    
    // Open popup
    const popupPage = await browser.newPage();
    await popupPage.goto(`chrome-extension://${extensionId}/popup/popup.html`);
    
    // Click scrape button
    await popupPage.click('#scrapeBtn');
    
    // Wait for results to appear
    await popupPage.waitForSelector('#results:not(.hidden)', { timeout: 5000 });
    
    // Verify scraped data is displayed
    const resultsVisible = await popupPage.$eval('#results', el => !el.classList.contains('hidden'));
    expect(resultsVisible).toBe(true);
    
    // Verify JSON output contains expected fields
    const outputText = await popupPage.$eval('#tableContainer', el => el.textContent);
    expect(outputText).toContain('title');
    expect(outputText).toContain('url');
    expect(outputText).toContain('timestamp');
    expect(outputText).toContain('example.com');
    
    await popupPage.close();
  });
  
  // TODO: Add actual E2E tests for future features
  test.todo('should communicate with content script');
  test.todo('should handle drill-down into URLs');
  test.todo('should render sortable table');
});
