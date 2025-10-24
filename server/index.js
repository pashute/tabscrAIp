require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Suggest table schema based on scraped page content
 */
app.post('/api/suggest', async (req, res) => {
  try {
    const { page } = req.body;
    
    if (!page) {
      return res.status(400).json({ error: 'Page data required' });
    }
    
    // TODO: Implement Claude API integration
    // For now, return a mock schema
    const mockSchema = {
      fields: [
        { name: 'title', type: 'text', sortable: true, groupable: false, guess_url: false },
        { name: 'url', type: 'url', sortable: true, groupable: false, guess_url: true },
        { name: 'category', type: 'text', sortable: true, groupable: true, guess_url: false }
      ],
      notes: 'Mock schema - Claude API integration pending',
      recommended_primary_key: 'url'
    };
    
    res.json({ schema: mockSchema });
  } catch (error) {
    console.error('Suggest error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Extract data from a URL based on schema
 */
app.post('/api/extract', async (req, res) => {
  try {
    const { url, html, schema } = req.body;
    
    if (!url || !html || !schema) {
      return res.status(400).json({ error: 'URL, HTML, and schema required' });
    }
    
    // TODO: Implement Claude API extraction
    // For now, return mock extracted data
    const mockExtracted = {
      title: 'Extracted title',
      url: url,
      category: 'Unknown'
    };
    
    res.json(mockExtracted);
  } catch (error) {
    console.error('Extract error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`TabscrAIp proxy server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
