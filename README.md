# TabscrAIp - AI Web Scraper Chrome Extension

An intelligent Chrome extension that leverages Claude AI to scrape web pages and automatically generate sortable, grouped tables with drill-down capabilities.

## Features

- 🤖 **AI-Powered Analysis**: Uses Claude AI to intelligently suggest data fields from scraped web content
- 📊 **Sortable Tables**: Click column headers to sort data in ascending or descending order
- 🔗 **URL Drill-Down**: Identify columns with URLs and fetch additional data inline or as subtables
- 📁 **Data Grouping**: Automatically group related data for better organization
- 💾 **Export Options**: Export scraped data to CSV or JSON formats
- 🎨 **Beautiful UI**: Modern, gradient-styled interface with intuitive controls

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/pashute/tabscrAIp.git
   cd tabscrAIp
   ```

2. Install dependencies (for icon generation):
   ```bash
   npm install
   ```

3. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `tabscrAIp` directory

## Configuration

1. Click the TabscrAIp extension icon in your Chrome toolbar
2. Enter your Claude API key from [Anthropic](https://console.anthropic.com/)
3. Click "Save" to store your API key locally

## Usage

1. Navigate to any web page you want to scrape
2. Click the TabscrAIp extension icon
3. Click "Scrape Current Page"
4. Wait for Claude AI to analyze the page content
5. View the generated table with suggested data fields

### Sorting Data

- Click on any column header to sort the data
- First click: Sort ascending (↑)
- Second click: Sort descending (↓)
- Third click: Return to original order

### Grouping Data

If Claude AI suggests grouping, data will be automatically grouped by the suggested field:
- Click group headers to expand/collapse groups
- Groups show the number of items they contain

### Drill-Down

When Claude AI identifies URL columns:
- Click "Drill Down" button next to any row
- The extension fetches additional data from the URL
- Drill-down data appears as a subtable below the row
- Click "Drill Down" again to collapse the subtable

### Export Data

- **Export CSV**: Download data as a comma-separated values file
- **Export JSON**: Download data as a JSON file

## How It Works

1. **Content Scraping**: The content script extracts text, tables, lists, links, and metadata from the current page
2. **AI Analysis**: Claude AI analyzes the scraped content and suggests:
   - Appropriate data fields and column names
   - Data types for each field (text, number, URL, date)
   - Fields containing URLs for drill-down
   - Fields suitable for grouping data
3. **Table Generation**: The popup displays an interactive table based on AI suggestions
4. **Interactive Features**: Users can sort, group, and drill down into the data

## Files Structure

```
tabscrAIp/
├── manifest.json       # Extension configuration
├── popup.html          # Extension popup UI
├── popup.css           # Popup styling
├── popup.js            # Popup logic and table management
├── content.js          # Content script for web scraping
├── background.js       # Background service worker (AI API calls)
├── icons/              # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon.svg
└── README.md           # This file
```

## Privacy & Security

- Your Claude API key is stored locally in Chrome's storage
- API keys are never transmitted to any server except Anthropic's Claude API
- All scraping happens locally in your browser
- No data is collected or stored by the extension beyond local Chrome storage

## Requirements

- Chrome browser (version 88 or higher)
- Claude API key from Anthropic

## Development

To modify the extension:

1. Make your changes to the source files
2. Reload the extension in `chrome://extensions/`
3. Test your changes

To regenerate icons after modifying `icons/icon.svg`:
```bash
node create-icons.js
```

## Troubleshooting

**Extension doesn't load:**
- Ensure all required files are present
- Check the Chrome Extensions page for error messages

**Scraping fails:**
- Verify your Claude API key is correct
- Check that the API key has sufficient credits
- Some pages may have anti-scraping measures

**Drill-down doesn't work:**
- The target URL must be accessible from the current page's context
- CORS policies may prevent fetching some URLs

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## License

ISC

## Author

Created for intelligent web scraping with AI assistance.
