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
  
  // TODO: Add actual E2E tests
  test.todo('should scrape page when button clicked');
  test.todo('should display scraped data in popup');
  test.todo('should communicate with content script');
  test.todo('should handle drill-down into URLs');
  test.todo('should render sortable table');
});
