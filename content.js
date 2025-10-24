// Content script that runs on web pages to scrape content
console.log('TabscrAIp content script loaded');

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrapeContent') {
        try {
            const scrapedData = scrapePageContent();
            sendResponse({ success: true, data: scrapedData });
        } catch (error) {
            sendResponse({ success: false, error: error.message });
        }
        return true; // Keep the message channel open for async response
    }
    
    if (request.action === 'scrapeUrl') {
        // Scrape a specific URL (for drill-down functionality)
        fetch(request.url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const data = extractDataFromDocument(doc);
                sendResponse({ success: true, data });
            })
            .catch(error => {
                sendResponse({ success: false, error: error.message });
            });
        return true;
    }
});

function scrapePageContent() {
    const pageData = {
        url: window.location.href,
        title: document.title,
        html: document.documentElement.outerHTML,
        text: document.body.innerText,
        metadata: {
            description: document.querySelector('meta[name="description"]')?.content || '',
            keywords: document.querySelector('meta[name="keywords"]')?.content || '',
            author: document.querySelector('meta[name="author"]')?.content || '',
        },
        tables: extractTables(),
        lists: extractLists(),
        links: extractLinks(),
        images: extractImages(),
        headings: extractHeadings(),
    };
    
    return pageData;
}

function extractDataFromDocument(doc) {
    return {
        text: doc.body.innerText,
        tables: extractTablesFromDoc(doc),
        lists: extractListsFromDoc(doc),
        links: extractLinksFromDoc(doc),
    };
}

function extractTables() {
    const tables = [];
    document.querySelectorAll('table').forEach((table, index) => {
        const headers = [];
        const rows = [];
        
        // Extract headers
        table.querySelectorAll('thead th, thead td').forEach(th => {
            headers.push(th.innerText.trim());
        });
        
        // If no thead, try first row
        if (headers.length === 0) {
            const firstRow = table.querySelector('tr');
            if (firstRow) {
                firstRow.querySelectorAll('th, td').forEach(cell => {
                    headers.push(cell.innerText.trim());
                });
            }
        }
        
        // Extract rows
        table.querySelectorAll('tbody tr, tr').forEach((tr, rowIndex) => {
            if (rowIndex === 0 && headers.length === 0) return; // Skip header row
            
            const row = [];
            tr.querySelectorAll('td').forEach(td => {
                row.push(td.innerText.trim());
            });
            
            if (row.length > 0) {
                rows.push(row);
            }
        });
        
        if (rows.length > 0) {
            tables.push({ headers, rows, index });
        }
    });
    
    return tables;
}

function extractTablesFromDoc(doc) {
    const tables = [];
    doc.querySelectorAll('table').forEach((table, index) => {
        const headers = [];
        const rows = [];
        
        table.querySelectorAll('thead th, thead td').forEach(th => {
            headers.push(th.innerText.trim());
        });
        
        if (headers.length === 0) {
            const firstRow = table.querySelector('tr');
            if (firstRow) {
                firstRow.querySelectorAll('th, td').forEach(cell => {
                    headers.push(cell.innerText.trim());
                });
            }
        }
        
        table.querySelectorAll('tbody tr, tr').forEach((tr, rowIndex) => {
            if (rowIndex === 0 && headers.length === 0) return;
            
            const row = [];
            tr.querySelectorAll('td').forEach(td => {
                row.push(td.innerText.trim());
            });
            
            if (row.length > 0) {
                rows.push(row);
            }
        });
        
        if (rows.length > 0) {
            tables.push({ headers, rows, index });
        }
    });
    
    return tables;
}

function extractLists() {
    const lists = [];
    document.querySelectorAll('ul, ol').forEach((list, index) => {
        const items = [];
        list.querySelectorAll('li').forEach(li => {
            items.push(li.innerText.trim());
        });
        
        if (items.length > 0) {
            lists.push({
                type: list.tagName.toLowerCase(),
                items,
                index
            });
        }
    });
    
    return lists;
}

function extractListsFromDoc(doc) {
    const lists = [];
    doc.querySelectorAll('ul, ol').forEach((list, index) => {
        const items = [];
        list.querySelectorAll('li').forEach(li => {
            items.push(li.innerText.trim());
        });
        
        if (items.length > 0) {
            lists.push({
                type: list.tagName.toLowerCase(),
                items,
                index
            });
        }
    });
    
    return lists;
}

function extractLinks() {
    const links = [];
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.href;
        const text = link.innerText.trim();
        
        if (href && text) {
            links.push({ url: href, text });
        }
    });
    
    return links;
}

function extractLinksFromDoc(doc) {
    const links = [];
    doc.querySelectorAll('a[href]').forEach(link => {
        const href = link.href;
        const text = link.innerText.trim();
        
        if (href && text) {
            links.push({ url: href, text });
        }
    });
    
    return links;
}

function extractImages() {
    const images = [];
    document.querySelectorAll('img[src]').forEach(img => {
        images.push({
            src: img.src,
            alt: img.alt || '',
            title: img.title || ''
        });
    });
    
    return images;
}

function extractHeadings() {
    const headings = [];
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        headings.push({
            level: heading.tagName.toLowerCase(),
            text: heading.innerText.trim()
        });
    });
    
    return headings;
}
