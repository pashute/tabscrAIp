# Contributing to TabscrAIp

Thank you for your interest in contributing to TabscrAIp! This document provides guidelines and information for developers.

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Chrome browser
- Git

### Initial Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/your-username/tabscrAIp.git
   cd tabscrAIp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Load the extension in Chrome (see INSTALLATION.md)

## Project Structure

```
tabscrAIp/
├── manifest.json       # Extension manifest (Manifest V3)
├── popup.html          # Main UI structure
├── popup.css           # UI styling
├── popup.js            # UI logic and event handling
├── content.js          # Content script (runs on web pages)
├── background.js       # Service worker (API calls)
├── icons/              # Extension icons
├── examples/           # Sample files and documentation
├── README.md           # Main documentation
├── INSTALLATION.md     # Installation guide
└── CONTRIBUTING.md     # This file
```

## Development Workflow

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to the relevant files

3. Test your changes:
   - Reload the extension in Chrome (`chrome://extensions/`)
   - Test all affected functionality
   - Check browser console for errors

4. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

5. Push and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

**JavaScript:**
- Use ES6+ features where appropriate
- Use `const` and `let`, avoid `var`
- Use meaningful variable and function names
- Add comments for complex logic
- Handle errors gracefully

**CSS:**
- Follow existing naming conventions
- Use classes, avoid inline styles
- Maintain responsive design principles
- Keep specificity low

**HTML:**
- Use semantic HTML5 elements
- Keep structure clean and accessible
- Add ARIA labels where helpful

### Testing Your Changes

**Manual Testing:**
1. Load extension in Chrome
2. Test on the sample page (`examples/sample-page.html`)
3. Test on real websites
4. Test all features:
   - Scraping
   - Sorting
   - Grouping
   - Drill-down
   - Export

**Browser Console:**
- Check for JavaScript errors
- Monitor network requests
- Verify API calls

**Testing Checklist:**
- [ ] Extension loads without errors
- [ ] Popup opens correctly
- [ ] API key saves and loads
- [ ] Scraping works on various pages
- [ ] Table displays correctly
- [ ] Sorting works in all modes
- [ ] Grouping toggles properly
- [ ] Drill-down fetches data
- [ ] Export CSV works
- [ ] Export JSON works
- [ ] No console errors

## Key Components

### popup.js

Main UI logic:
- Event handlers for buttons
- Table generation and rendering
- Sorting and grouping logic
- Export functionality
- Communication with background script

**Key Functions:**
- `scrapeCurrentPage()` - Initiates scraping
- `displayTable()` - Renders the data table
- `sortTable()` - Handles column sorting
- `drillDown()` - Fetches additional data
- `exportToCsv()` - Exports data to CSV
- `exportToJson()` - Exports data to JSON

### content.js

Web scraping logic:
- Extracts content from web pages
- Parses tables, lists, links
- Responds to scraping requests

**Key Functions:**
- `scrapePageContent()` - Main scraping function
- `extractTables()` - Extracts table data
- `extractLists()` - Extracts list data
- `extractLinks()` - Extracts links

### background.js

Background service worker:
- Handles Claude API calls
- Processes AI requests
- Manages API communication

**Key Functions:**
- `analyzeWithClaude()` - Sends data to Claude API

## Adding New Features

### Example: Adding a New Export Format

1. **Add UI Button** (popup.html):
   ```html
   <button id="exportXml" class="secondary-btn">Export XML</button>
   ```

2. **Add Event Listener** (popup.js):
   ```javascript
   document.getElementById('exportXml').addEventListener('click', exportToXml);
   ```

3. **Implement Function** (popup.js):
   ```javascript
   function exportToXml() {
       // Convert data to XML format
       // Use downloadFile() to trigger download
   }
   ```

4. **Test** the new feature

5. **Document** in README.md and USAGE.md

### Example: Adding a New Scraping Feature

1. **Update Content Script** (content.js):
   ```javascript
   function extractNewData() {
       // Your extraction logic
   }
   ```

2. **Add to scrapePageContent()**:
   ```javascript
   const pageData = {
       // ...existing fields...
       newData: extractNewData()
   };
   ```

3. **Update Claude Prompt** (background.js) to consider new data

4. **Test** on various pages

## API Integration

### Claude API

The extension uses Anthropic's Claude API:
- Model: claude-3-5-sonnet-20241022
- Endpoint: https://api.anthropic.com/v1/messages
- Authentication: API key in x-api-key header

**Modifying the Prompt:**
Edit the `analyzeWithClaude()` function in `background.js`:
```javascript
const prompt = `Your modified prompt here...`;
```

**Changing the Model:**
Update the model parameter:
```javascript
model: 'claude-3-5-sonnet-20241022'
```

## Icons

Icons are generated from `icons/icon.svg`:

### Regenerating Icons

1. Edit `icons/icon.svg`
2. Run the icon generator:
   ```bash
   node create-icons.js
   ```
3. Verify all PNG files are created:
   - icon16.png
   - icon48.png
   - icon128.png

## Common Development Tasks

### Adding a New Permission

1. Update `manifest.json`:
   ```json
   "permissions": [
       "activeTab",
       "storage",
       "newPermission"
   ]
   ```

2. Reload extension in Chrome
3. Document the new permission in README.md

### Debugging

**Content Script:**
- Open developer tools on the web page (F12)
- Check Console tab for content.js logs

**Popup:**
- Right-click extension icon → Inspect popup
- Check Console tab for popup.js logs

**Background Script:**
- Go to `chrome://extensions/`
- Click "service worker" link under TabscrAIp
- Check Console tab for background.js logs

### Performance Optimization

- Minimize API calls
- Cache scraped data when appropriate
- Use efficient DOM queries
- Limit table row rendering for large datasets

## Reporting Issues

When reporting bugs, include:
- Chrome version
- Extension version
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)
- Sample URL (if applicable)

## Pull Request Process

1. Ensure your code follows the style guidelines
2. Test all functionality
3. Update documentation if needed
4. Write a clear PR description
5. Reference any related issues

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (ISC).

## Questions?

Feel free to open an issue for questions or clarifications!

Happy coding! 🚀
