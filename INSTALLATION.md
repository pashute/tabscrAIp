# TabscrAIp Installation Guide

## Prerequisites

1. **Google Chrome Browser** (Version 88 or higher)
2. **Claude API Key** from [Anthropic Console](https://console.anthropic.com/)

## Installation Steps

### Step 1: Get the Extension

1. Clone or download this repository to your local machine:
   ```bash
   git clone https://github.com/pashute/tabscrAIp.git
   ```

2. Navigate to the extension directory:
   ```bash
   cd tabscrAIp
   ```

### Step 2: Load Extension in Chrome

1. Open Google Chrome

2. Navigate to the Extensions page:
   - Type `chrome://extensions/` in the address bar, OR
   - Click the three dots menu → More Tools → Extensions

3. Enable **Developer mode**:
   - Toggle the switch in the top-right corner

4. Click **"Load unpacked"** button

5. Select the `tabscrAIp` folder (the main directory containing manifest.json)

6. The TabscrAIp extension icon should now appear in your Chrome toolbar
   - If you don't see it, click the puzzle piece icon and pin TabscrAIp

### Step 3: Configure API Key

1. Click the TabscrAIp icon in your toolbar

2. In the popup window, find the "Claude API Key" field

3. Enter your Claude API key from Anthropic

4. Click the **"Save"** button

5. You should see a green success message: "API key saved successfully"

## Verification

### Test the Installation

1. Open the sample test page:
   - In Chrome, press `Ctrl+O` (Windows/Linux) or `Cmd+O` (Mac)
   - Navigate to: `tabscrAIp/examples/sample-page.html`
   - Click "Open"

2. Click the TabscrAIp extension icon

3. Click **"Scrape Current Page"** button

4. Wait for the analysis (may take 5-15 seconds)

5. You should see a table with product data appear

### Expected Results

If everything is working correctly, you should see:
- ✅ A table with columns: Product ID, Name, Category, Price, Stock, Rating, Details
- ✅ Clickable column headers for sorting
- ✅ "Drill Down" buttons in the Actions column
- ✅ Export CSV and Export JSON buttons

## Troubleshooting

### Extension Won't Load

**Error: "Manifest file is missing or unreadable"**
- Solution: Ensure you selected the correct folder containing `manifest.json`

**Error: "Could not load icon"**
- Solution: Verify the `icons` folder exists with PNG files

### API Key Issues

**Error: "API key not found"**
- Solution: Enter and save your API key in the extension popup

**Error: "Claude API error"**
- Solution: Verify your API key is correct and has available credits
- Check [Anthropic Console](https://console.anthropic.com/) for key status

### Scraping Fails

**Error: "Failed to scrape content"**
- Solution: Refresh the page and try again
- Ensure the page has fully loaded before scraping

**No data appears**
- Solution: Check the browser console for errors (F12)
- Verify the page has actual content to scrape

### Drill-Down Not Working

- CORS policies prevent fetching some external URLs
- The sample page uses example.com URLs which won't return real data
- Test with same-domain URLs for best results

## Updating the Extension

When you make changes or update the extension:

1. Go to `chrome://extensions/`
2. Find TabscrAIp
3. Click the refresh icon (🔄)
4. Test your changes

## Uninstalling

To remove the extension:

1. Go to `chrome://extensions/`
2. Find TabscrAIp
3. Click "Remove"
4. Confirm removal

Your API key will be deleted from Chrome storage.

## Next Steps

- Read the [Usage Guide](examples/USAGE.md) for detailed feature explanations
- Try scraping different websites
- Explore the sorting, grouping, and drill-down features
- Export your data to CSV or JSON

## Support

For issues or questions:
- Check the [README.md](README.md)
- Review [USAGE.md](examples/USAGE.md)
- Create an issue on GitHub

Enjoy scraping with AI! 🚀
