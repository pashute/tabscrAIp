# Testing Guide

## Unit Testing

Unit tests verify individual functions and modules in isolation using **Jest**.

### Running Unit Tests

```bash
cd tests
npm install  # First time only
npm run test:unit
```

### Watch Mode (auto-rerun on changes)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

Unit test files are located in `tests/unit/` and test individual modules like `scraper.js`, `table-builder.js`, and `api-client.js`.

## Overall Testing (E2E)

End-to-end tests verify the complete extension functionality in a real Chrome browser using **Puppeteer**.

### Running E2E Tests

```bash
cd tests
npm install  # First time only
npm run test:e2e
```

**Note:** E2E tests run Chrome in non-headless mode (visible browser window) because Chrome extensions don't work in headless mode. The tests will automatically load your extension and interact with it programmatically.

### Running All Tests

```bash
cd tests
npm test
```

This runs both unit tests and E2E tests together.

## Test Files

- `tests/unit/*.test.js` - Unit tests for individual modules
- `tests/e2e/*.test.js` - End-to-end tests for full extension workflows
- `tests/package.json` - Test dependencies and scripts
