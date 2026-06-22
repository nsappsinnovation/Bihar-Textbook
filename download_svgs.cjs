const fs = require('fs');
const path = require('path');
const axios = require('axios');

const alphabetsDir = path.join(__dirname, 'public', 'images', 'signlanguage', 'alphabets');

if (!fs.existsSync(alphabetsDir)) {
  fs.mkdirSync(alphabetsDir, { recursive: true });
}

// User-Agent is required by Wikimedia API to avoid 403/429 errors
const headers = {
  'User-Agent': 'BiharTextBookISLBot/1.0 (anushkanandan57@gmail.com) Axios/1.0'
};

async function getSvgUrl(letter) {
  const title = `File:BSL_letter_${letter}.svg`;
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`;
  
  try {
    const response = await axios.get(apiUrl, { headers });
    const pages = response.data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1') {
      console.error(`File not found for letter ${letter}`);
      return null;
    }
    const url = pages[pageId].imageinfo[0].url;
    return url;
  } catch (error) {
    console.error(`Error fetching URL for letter ${letter}:`, error.message);
    return null;
  }
}

async function downloadSvg(letter, url) {
  const destPath = path.join(alphabetsDir, `${letter}.svg`);
  try {
    const response = await axios.get(url, { responseType: 'stream', headers });
    const writer = fs.createWriteStream(destPath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Downloaded ${letter}.svg successfully`);
        resolve();
      });
      writer.on('error', (err) => {
        console.error(`Error writing file for letter ${letter}:`, err.message);
        reject(err);
      });
    });
  } catch (error) {
    console.error(`Error downloading SVG for letter ${letter}:`, error.message);
  }
}

async function run() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (const letter of letters) {
    console.log(`Processing letter ${letter}...`);
    const url = await getSvgUrl(letter);
    if (url) {
      console.log(`Direct URL for ${letter}: ${url}`);
      await downloadSvg(letter, url);
      // Small delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  console.log('Finished downloading all SVGs!');
}

run();
