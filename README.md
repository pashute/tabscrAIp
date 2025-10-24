# tabscrAIp
AI web scraper chrome addon

## Features

A Chrome extension that intelligently scrapes and structures web content for the current tab:

- **AI-Powered Scraping**: Scrapes the current tab's webpage and sends content to Claude AI
- **Smart Table Suggestions**: Claude analyzes the content and suggests optimal fields for a sortable, groupable table
- **Dynamic Table Controls**: Sort and group table data by columns 
- **URL Drill-Down**: Select a column containing URLs to fetch additional data from linked pages
- **Flexible Data Display**: Choose to display drill-down data either:
  - Inline with the main table (merged columns)
  - As expandable subtables for each row

## Testing

See [Testing.md](Testing.md) for detailed instructions on running unit tests and E2E tests.

## Project Structure

```
tabscrAIp/
├── extension/
│   ├── manifest.json           # Extension configuration and permissions
│   ├── icons/                  # Extension icons (16x16, 48x48, 128x128)
│   │   ├── icon16.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   ├── popup/
│   │   ├── popup.html          # Extension popup UI
│   │   ├── popup.js            # Popup logic and user interactions
│   │   └── popup.css           # Popup styles
│   ├── content/
│   │   └── content-script.js   # Injected into web pages to scrape DOM
│   ├── background/
│   │   └── background.js       # Service worker for background tasks & API calls
│   ├── lib/
│   │   ├── scraper.js          # Scraping utilities and DOM parsing
│   │   ├── table-builder.js    # Table rendering, sort, and group controls
│   │   └── api-client.js       # Claude API communication helper
│   └── styles/
│       └── table.css           # Table component styles
├── server/                      # Node.js proxy for secure Claude API access
│   ├── package.json
│   ├── index.js                # Express server to proxy Claude requests
│   └── .env.example            # API key template (never commit .env)
├── tests/                       # Automated tests
│   ├── unit/
│   └── integration/
├── README.md
└── .gitignore
```

**Key Components:**
- **manifest.json** - Chrome extension config (permissions, scripts, popup definition)
- **popup/** - UI displayed when clicking extension icon
- **content-script.js** - Runs in webpage context to extract data from DOM
- **background.js** - Handles cross-origin requests and coordinates components
- **server/** - Optional Node.js proxy to keep Claude API key secure (recommended)

## Development Tasks

- [x] Set up Chrome extension basic structure (manifest, popup, content script, background script) - [ ] UTest
- [x] Set up automated testing environment (Jest + Puppeteer) - [ ] UTest
- [ ] Implement webpage scraping functionality in content script - [ ] UTest
- [ ] Create popup UI for user interaction - [ ] UTest
- [ ] Integrate Claude API for content analysis - [ ] UTest
- [ ] Parse Claude's suggested table schema - [ ] UTest
- [ ] Build dynamic table component with sort/group capabilities - [ ] UTest
- [ ] Implement URL column selection UI - [ ] UTest
- [ ] Create drill-down fetch mechanism for URLs - [ ] UTest
- [ ] Add inline data merge functionality - [ ] UTest
- [ ] Add expandable subtable functionality - [ ] UTest
- [ ] Implement error handling and user feedback - [ ] UTest
- [ ] Add configuration/settings storage - [ ] UTest

