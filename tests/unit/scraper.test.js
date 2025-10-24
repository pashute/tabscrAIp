// Unit tests for scraper utilities
// Testing the content-script.js scraping functions

/**
 * Note: Since content-script.js runs in browser context with DOM access,
 * we'll test the logic by creating mock DOM elements in jsdom environment
 */

describe('Content Script Scraper', () => {
  beforeEach(() => {
    // Clear DOM before each test
    document.body.innerHTML = '';
    document.head.innerHTML = '';
  });

  describe('extractMetadata', () => {
    test('should extract meta tags with name attribute', () => {
      document.head.innerHTML = `
        <meta name="description" content="Test description">
        <meta name="keywords" content="test, keywords">
      `;
      
      // This will fail until we implement the function to test
      const meta = extractMetadata();
      expect(meta.description).toBe('Test description');
      expect(meta.keywords).toBe('test, keywords');
    });

    test('should extract meta tags with property attribute (Open Graph)', () => {
      document.head.innerHTML = `
        <meta property="og:title" content="OG Title">
        <meta property="og:description" content="OG Description">
      `;
      
      const meta = extractMetadata();
      expect(meta['og:title']).toBe('OG Title');
      expect(meta['og:description']).toBe('OG Description');
    });

    test('should return empty object when no meta tags exist', () => {
      const meta = extractMetadata();
      expect(meta).toEqual({});
    });
  });

  describe('extractMainText', () => {
    test('should extract text content from body', () => {
      document.body.innerHTML = `
        <div>Hello World</div>
        <p>This is a test paragraph.</p>
      `;
      
      const text = extractMainText();
      expect(text).toContain('Hello World');
      expect(text).toContain('This is a test paragraph');
    });

    test('should exclude script and style tags', () => {
      document.body.innerHTML = `
        <p>Visible text</p>
        <script>console.log('should not appear');</script>
        <style>.hidden { display: none; }</style>
      `;
      
      const text = extractMainText();
      expect(text).toContain('Visible text');
      expect(text).not.toContain('console.log');
      expect(text).not.toContain('.hidden');
    });

    test('should limit text to 10000 characters', () => {
      const longText = 'a'.repeat(15000);
      document.body.innerHTML = `<p>${longText}</p>`;
      
      const text = extractMainText();
      expect(text.length).toBeLessThanOrEqual(10000);
    });
  });

  describe('extractLinks', () => {
    test('should extract links with href and text', () => {
      document.body.innerHTML = `
        <a href="https://example.com">Example Link</a>
        <a href="/relative">Relative Link</a>
      `;
      
      const links = extractLinks();
      expect(links).toHaveLength(2);
      expect(links[0]).toEqual({
        text: 'Example Link',
        href: 'https://example.com',
        title: null
      });
    });

    test('should include title attribute if present', () => {
      document.body.innerHTML = `
        <a href="https://test.com" title="Test Title">Link</a>
      `;
      
      const links = extractLinks();
      expect(links[0].title).toBe('Test Title');
    });

    test('should limit to 100 links', () => {
      const manyLinks = Array(150).fill(0).map((_, i) => 
        `<a href="/link${i}">Link ${i}</a>`
      ).join('');
      document.body.innerHTML = manyLinks;
      
      const links = extractLinks();
      expect(links).toHaveLength(100);
    });
  });

  describe('extractTables', () => {
    test('should extract table headers and rows', () => {
      document.body.innerHTML = `
        <table>
          <tr><th>Name</th><th>Age</th></tr>
          <tr><td>John</td><td>30</td></tr>
          <tr><td>Jane</td><td>25</td></tr>
        </table>
      `;
      
      const tables = extractTables();
      expect(tables).toHaveLength(1);
      expect(tables[0].headers).toEqual(['Name', 'Age']);
      expect(tables[0].rows).toHaveLength(2);
      expect(tables[0].rows[0]).toEqual(['John', '30']);
    });

    test('should handle tables without headers', () => {
      document.body.innerHTML = `
        <table>
          <tr><td>Data 1</td><td>Data 2</td></tr>
        </table>
      `;
      
      const tables = extractTables();
      expect(tables[0].headers).toEqual([]);
      expect(tables[0].rows).toHaveLength(1);
    });

    test('should limit to first 5 tables', () => {
      const manyTables = Array(10).fill(0).map(() => 
        '<table><tr><td>data</td></tr></table>'
      ).join('');
      document.body.innerHTML = manyTables;
      
      const tables = extractTables();
      expect(tables).toHaveLength(5);
    });
  });

  describe('scrapePageContent (integration)', () => {
    test('should return complete scraped data object', () => {
      document.title = 'Test Page';
      document.head.innerHTML = '<meta name="description" content="Test">';
      document.body.innerHTML = `
        <p>Some text</p>
        <a href="/link">Link</a>
        <table><tr><th>Col</th></tr></table>
      `;
      
      const data = scrapePageContent();
      expect(data).toHaveProperty('title', 'Test Page');
      expect(data).toHaveProperty('url');
      expect(data).toHaveProperty('meta');
      expect(data).toHaveProperty('text');
      expect(data).toHaveProperty('links');
      expect(data).toHaveProperty('tables');
      expect(data).toHaveProperty('timestamp');
    });
  });
});

// Helper function declarations (will be imported from content-script.js)
// For now, these will cause ReferenceErrors until we export/import properly
function extractMetadata() {
  throw new Error('Function not yet exported from content-script.js');
}

function extractMainText() {
  throw new Error('Function not yet exported from content-script.js');
}

function extractLinks() {
  throw new Error('Function not yet exported from content-script.js');
}

function extractTables() {
  throw new Error('Function not yet exported from content-script.js');
}

function scrapePageContent() {
  throw new Error('Function not yet exported from content-script.js');
}
