# TabscrAIp Screenshots and UI Guide

This document describes the visual interface and user experience of the TabscrAIp extension.

## Extension Popup

The main interface is accessed by clicking the TabscrAIp icon in the Chrome toolbar.

### Layout

```
┌─────────────────────────────────────────────────┐
│           TabscrAIp                              │
│      AI-Powered Web Scraper                      │
├─────────────────────────────────────────────────┤
│  API Configuration                               │
│  Claude API Key: [●●●●●●●●●●●●] [Save]          │
│  ✓ API key saved successfully                    │
├─────────────────────────────────────────────────┤
│  Scraping Options                                │
│  [🔍 Scrape Current Page]                        │
│  ℹ Analyzing with Claude AI...                   │
│  [████████░░] Progress                           │
├─────────────────────────────────────────────────┤
│  Scraped Data                                    │
│  [Export CSV] [Export JSON]                      │
│                                                  │
│  ┌───────────────────────────────────────┐      │
│  │ Name ⇅ │ Price ⇅ │ Category ⇅ │ ... │      │
│  ├─────────┼─────────┼────────────┼─────┤      │
│  │ Mouse   │ $29.99  │ Electronics│ ... │      │
│  │ Keyboard│ $89.99  │ Electronics│ ... │      │
│  └───────────────────────────────────────┘      │
└─────────────────────────────────────────────────┘
```

## Color Scheme

- **Primary Gradient**: Purple to Blue (#667eea to #764ba2)
- **Background**: White with light gray borders
- **Hover States**: Subtle purple tints
- **Success Messages**: Green background
- **Error Messages**: Red background
- **Info Messages**: Blue background

## UI Elements

### Header
- Large "TabscrAIp" title in purple
- Subtitle: "AI-Powered Web Scraper"
- Bottom border in primary gradient

### API Configuration Section
- Text input for API key (password type, hidden characters)
- Save button in primary purple color
- Status message below (green for success, red for errors)

### Scraping Controls
- Large primary button with gradient background
- Icon (🔍) and text: "Scrape Current Page"
- Status message area below
- Animated progress bar (gradient moving animation)

### Results Section
- Hidden until data is available
- Export buttons (CSV and JSON) with outline style
- Scrollable table container (max height: 400px)

### Data Table
- Sticky header row (stays visible when scrolling)
- Sortable columns with visual indicators:
  - Default: ⇅ (both arrows)
  - Ascending: ↑ (up arrow, purple)
  - Descending: ↓ (down arrow, purple)
- Hover effect on rows (light purple background)
- Alternating row colors for readability

### Grouped View
- Group headers in gray background
- Click to expand/collapse groups
- Triangle indicator (▼ expanded, ▶ collapsed)
- Item count shown in parentheses

### Drill-Down
- Small purple button in Actions column
- Click to expand subtable
- Subtable has left border in primary color
- Indented content area
- Pre-formatted JSON display

## Responsive Design

The popup is fixed at:
- Width: 600px
- Min Height: 400px
- Maximum comfortable height for table viewing

## Accessibility Features

- Clear visual hierarchy
- Adequate color contrast
- Hover states for interactive elements
- Keyboard navigation support (native browser)
- Screen reader friendly (semantic HTML)

## State Indicators

### Loading State
- Progress bar visible
- "Analyzing with Claude AI..." message
- Button disabled during scraping

### Success State
- Green status message
- Table appears
- Export buttons enabled

### Error State
- Red status message
- Descriptive error text
- Button re-enabled for retry

## Animation Effects

1. **Progress Bar**: Continuous gradient animation during loading
2. **Button Hover**: Slight lift effect (translateY)
3. **Row Hover**: Background color transition
4. **Group Toggle**: Smooth expand/collapse
5. **Status Messages**: Fade out after 5 seconds (success/error)

## Icon Design

The extension icon features:
- Circular gradient background (purple to blue)
- White table grid symbol (representing data tables)
- Sparkle effect in corner (representing AI)
- Available in 16px, 48px, and 128px sizes

## Table Features Visualization

### Sorting Example
```
Before:          Click "Price" →  After (Ascending):
Name    Price                     Name       Price
Mouse   $89.99                    Lamp       $24.99
Lamp    $24.99                    Mouse      $29.99
Desk    $299.99                   Desk       $299.99
```

### Grouping Example
```
▼ Electronics (5 items)
  │ Mouse      │ $29.99  │ ...
  │ Keyboard   │ $89.99  │ ...
  
▼ Office (3 items)
  │ Desk Lamp  │ $34.99  │ ...
  │ Chair      │ $299.99 │ ...
```

### Drill-Down Example
```
│ Product     │ Details                        │ Actions      │
│ Mouse       │ https://example.com/mouse      │ [Drill Down] │
│   ↳ Additional Data:                                        │
│     { "specs": "wireless", "color": "black" }               │
│ Keyboard    │ https://example.com/keyboard   │ [Drill Down] │
```

## User Interaction Flow

1. **Initial Load**: Empty popup with API key input focused
2. **API Key Entry**: User types, clicks Save → Green confirmation
3. **Scrape Trigger**: User clicks button → Progress animation
4. **Analysis**: Status updates, progress bar animates
5. **Results Display**: Table fades in, export buttons appear
6. **Interaction**: User can sort, group, drill-down, export

## Best Practices for Users

- **First Use**: Configure API key before attempting to scrape
- **Sorting**: Click column headers to organize data
- **Grouping**: Use collapsed groups to manage large datasets
- **Export**: Use CSV for spreadsheets, JSON for programming
- **Drill-Down**: Only works when URLs are accessible

## Future UI Enhancements (Potential)

- Dark mode toggle
- Custom color themes
- Table column filtering
- Inline editing of cells
- Bulk drill-down operations
- Save/load table configurations
