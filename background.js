// Background service worker
console.log('TabscrAIp background script loaded');

// Handle installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('TabscrAIp extension installed');
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'analyzeWithClaude') {
        analyzeWithClaude(request.data, request.apiKey)
            .then(result => sendResponse({ success: true, result }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true;
    }
});

async function analyzeWithClaude(scrapedData, apiKey) {
    const prompt = `You are an expert at analyzing web page content and suggesting structured data fields for table representation.

I have scraped the following web page content:

URL: ${scrapedData.url}
Title: ${scrapedData.title}

Page Content Summary:
${scrapedData.text.substring(0, 5000)}

${scrapedData.tables.length > 0 ? `Found ${scrapedData.tables.length} tables on the page.` : ''}
${scrapedData.lists.length > 0 ? `Found ${scrapedData.lists.length} lists on the page.` : ''}
${scrapedData.links.length > 0 ? `Found ${scrapedData.links.length} links on the page.` : ''}

Please analyze this content and suggest:
1. The most important data fields that should be extracted into a structured table
2. Appropriate column names for these fields
3. Which field(s) might contain URLs that could be used for drill-down functionality
4. How the data should be grouped (if applicable)

Return your response as a JSON object with the following structure:
{
    "fields": [
        {
            "name": "field_name",
            "type": "text|number|url|date",
            "description": "what this field represents"
        }
    ],
    "suggestedData": [
        {
            "field_name": "value",
            ...
        }
    ],
    "drillDownField": "field_name_containing_urls",
    "groupByField": "field_name_to_group_by"
}

Respond ONLY with valid JSON, no additional text.`;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 4096,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Claude API error: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const content = data.content[0].text;
        
        // Try to extract JSON from the response
        let jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        // If no JSON found, try to parse the entire content
        return JSON.parse(content);
    } catch (error) {
        console.error('Error calling Claude API:', error);
        throw error;
    }
}
