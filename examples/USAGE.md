# TabscrAIp Usage Guide

This guide provides step-by-step instructions and examples for using the TabscrAIp Chrome extension.

## Quick Start

### 1. Installation
1. Load the extension in Chrome (`chrome://extensions/`)
2. Enable Developer mode
3. Click "Load unpacked" and select the TabscrAIp directory

### 2. Configuration
1. Click the TabscrAIp icon in your toolbar
2. Enter your Claude API key
3. Click "Save"

### 3. First Scrape
1. Open `examples/sample-page.html` in Chrome
2. Click the TabscrAIp icon
3. Click "Scrape Current Page"
4. Wait for Claude to analyze the page
5. View the generated table

## Features Walkthrough

### Sorting Columns

**How to use:**
1. After scraping a page, look at the table headers
2. Click on any column header to sort
3. First click: Sort ascending ↑
4. Second click: Sort descending ↓
5. Third click: Return to original order

**Example:**
- Click "Price" to see lowest prices first
- Click "Stock" to find low-stock items

### Grouping Data

**How it works:**
- Claude AI automatically suggests grouping when appropriate
- Groups are collapsed/expanded by clicking the group header

**Example:**
- In the sample page, products might be grouped by "Category"
- Click "Electronics (5 items)" to expand/collapse that group

### Drill-Down Feature

**How to use:**
1. Look for "Drill Down" buttons in the Actions column
2. Click the button to fetch additional data from the linked URL
3. Data appears as a subtable below the row
4. Click again to collapse

**Note:** The drill-down feature requires the target URL to be accessible. The sample page uses example.com URLs which won't return real data.

### Export Data

**CSV Export:**
- Click "Export CSV" to download a comma-separated file
- Open in Excel, Google Sheets, or any spreadsheet application

**JSON Export:**
- Click "Export JSON" to download structured data
- Use for programming or data analysis

## Real-World Examples

### E-commerce Product Listings

**Use case:** Scrape product data from online stores

1. Navigate to an e-commerce product listing page
2. Scrape the page
3. Claude will identify:
   - Product names
   - Prices
   - Stock levels
   - Product URLs for drill-down

**Benefits:**
- Compare prices across products
- Track inventory
- Export for analysis

### News Aggregator Sites

**Use case:** Extract article information

1. Visit a news site with article listings
2. Scrape the page
3. Claude identifies:
   - Headlines
   - Authors
   - Publication dates
   - Article URLs

**Benefits:**
- Create a reading list
- Track topics of interest
- Export headlines

### Directory Listings

**Use case:** Extract contact information

1. Visit a business directory or contact page
2. Scrape the page
3. Claude extracts:
   - Names
   - Addresses
   - Phone numbers
   - Website URLs

**Benefits:**
- Build contact databases
- Organize business information
- Export for CRM systems

## Tips and Best Practices

### For Best Results:

1. **Structured Pages Work Best**
   - Pages with tables, lists, or clear data structures
   - Claude can extract from any page, but structured data is easier

2. **API Key Management**
   - Keep your API key secure
   - The key is stored locally in Chrome
   - Never share your API key

3. **Rate Limits**
   - Be mindful of Claude API rate limits
   - Large pages may take longer to analyze

4. **Data Quality**
   - Review AI-suggested fields
   - Claude is intelligent but may need manual verification
   - Export and refine data as needed

### Common Issues:

**"API key not found"**
- Solution: Enter and save your Claude API key in the extension popup

**"Failed to scrape"**
- Solution: Ensure the page has loaded completely
- Some dynamic content may not be captured immediately

**"Drill-down not working"**
- Solution: CORS policies may prevent fetching some URLs
- Works best with URLs on the same domain

## Advanced Usage

### Custom Scraping Scenarios

**Multiple Tables:**
If a page has multiple tables, Claude will analyze all of them and suggest the most relevant data to extract.

**Dynamic Content:**
For pages with JavaScript-loaded content, wait for the page to fully load before scraping.

**Large Datasets:**
For pages with lots of data, Claude will intelligently sample and suggest the most important fields.

## Testing

Use the provided `sample-page.html` to test all features:
- Open the file in Chrome
- Practice sorting, grouping, and exporting
- Familiarize yourself with the interface

## Support

For issues or questions:
- Check the main README.md
- Review common issues above
- Create an issue on GitHub
