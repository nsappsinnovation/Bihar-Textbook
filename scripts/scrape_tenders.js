import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Disable SSL verification for scraping
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function scrapeTenders() {
  try {
    console.log('Fetching tenders page...');
    const response = await fetch('https://bstbpc.bihar.gov.in/Tenders.aspx');
    const html = await response.text();
    const $ = cheerio.load(html);
    const tenders = [];

    const rows = $('table tr');
    console.log(`Found ${rows.length} rows`);

    rows.each((i, row) => {
      // Skip header row
      if (i === 0) return;

      const cells = $(row).find('td');
      if (cells.length < 5) return;

      const id = $(cells[0]).text().trim();
      const title = $(cells[1]).text().trim();
      const date = $(cells[2]).text().trim();
      const descCell = $(cells[3]);
      
      // Clean up description: remove newlines and extra spaces
      const description = descCell.text().replace(/\s+/g, ' ').trim();
      
      const link = descCell.find('a').attr('href');
      
      let documentUrl = '';
      if (link) {
        const baseUrl = 'https://bstbpc.bihar.gov.in/Tenders.aspx'; // Base context
        // Handle various URL formats
        if (link.startsWith('http')) {
          documentUrl = link;
        } else {
          try {
             // Resolve relative URL against base
             documentUrl = new URL(link, 'https://bstbpc.bihar.gov.in/').href;
          } catch (e) {
             console.warn(`Could not resolve URL: ${link}`);
             documentUrl = link;
          }
        }
      }

      tenders.push({
        id,
        title,
        description,
        date,
        document: documentUrl
      });
    });

    console.log(`Extracted ${tenders.length} tenders`);
    
    const outputDir = path.join(__dirname, '../src/data');
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'tenders.json');
    fs.writeFileSync(outputPath, JSON.stringify(tenders, null, 2));
    console.log(`Saved to ${outputPath}`);

  } catch (error) {
    console.error('Error scraping tenders:', error);
  }
}

scrapeTenders();
