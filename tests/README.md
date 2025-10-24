# Tests

This directory contains automated tests for the TabscrAIp extension.

## Structure

- `unit/` - Unit tests for individual functions and modules (Jest)
- `e2e/` - End-to-end tests for the full extension UI (Puppeteer)

## Setup

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run only unit tests
npm run test:unit

# Run only E2E tests
npm run test:e2e

# Watch mode (auto-rerun on file changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

## Writing Tests

### Unit Tests (Jest)
Test individual functions in isolation. Place in `unit/` directory with `.test.js` extension.

### E2E Tests (Puppeteer)
Test the extension in a real Chrome browser. These tests load the actual extension and interact with it programmatically.

**Note:** E2E tests require running Chrome in non-headless mode since extensions don't work in headless mode.
