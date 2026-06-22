import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://bstbpc.bihar.gov.in';
const PUBLIC_DIR = path.join(__dirname, '../public/PDFs');

// Helper to download file
async function downloadFile(url, outputPath) {
    try {
        const writer = fs.createWriteStream(outputPath);
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            httpsAgent: new (await import('https')).Agent({
                rejectUnauthorized: false
            })
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading ${url}:`, error.message);
    }
}

// Helper to sanitize filename
function sanitize(str) {
    return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

async function scrapeClass(classId) {
    console.log(`\n--- Starting Scrape for Class ${classId} ---`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Create Class Directory
    const classDir = path.join(PUBLIC_DIR, `Class_${classId}`);
    if (!fs.existsSync(classDir)) {
        fs.mkdirSync(classDir, { recursive: true });
    }

    try {
        // 1. Go to Class Page
        const classUrl = `${BASE_URL}/Class${classId}.aspx`;
        console.log(`Navigating to ${classUrl}...`);
        await page.goto(classUrl, { waitUntil: 'domcontentloaded' });

        // 2. Get Subject Links (Books.aspx)
        // Adjust selector based on inspection. Links usually have 'Books.aspx'
        // 2. Get Subject Links (Books.aspx)
        const subjectLinks = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("a[href^='Books.aspx']"))
                .map(a => {
                    // Try to finding a heading inside if direct text is empty
                    let title = a.innerText.trim();
                    if (!title) {
                        const heading = a.querySelector('h1, h2, h3, h4, h5, h6, .card-title, .title');
                        if (heading) title = heading.innerText.trim();
                    }
                    if (!title) title = a.textContent.trim();

                    return {
                        title: title,
                        href: a.href
                    };
                })
                .filter(item => item.title.length > 0 && !item.title.match(/Home|Back|Class/i)); // Filter nav links
        });

        console.log(`Found ${subjectLinks.length} subjects.`);

        for (const subject of subjectLinks) {
            const subjectName = sanitize(subject.title);
            console.log(`  Processing Subject: ${subject.title} (${subjectName})`);

            const subjectPage = await browser.newPage();
            let bookManifest;
            try {
                await subjectPage.goto(subject.href, { waitUntil: 'domcontentloaded' });

                // 3. Get Chapter Links (BookRead.aspx)
                // They are usually in panel-body inside accordions
                const chapterLinks = await subjectPage.evaluate(() => {
                    return Array.from(document.querySelectorAll(".panel-body a[href^='BookRead.aspx']"))
                        .map(a => ({
                            title: a.innerText.trim(),
                            href: a.href
                        }));
                });

                console.log(`    Found ${chapterLinks.length} chapters.`);

                // Manifest to store chapter mapping
                bookManifest = {
                    classId: classId,
                    subject: subject.title,
                    subjectSlug: subjectName,
                    chapters: []
                };

                for (let i = 0; i < chapterLinks.length; i++) {
                    const chapter = chapterLinks[i];
                    // Name mapping: "Chapter 1" -> "1"
                    // If title is "Chapter 1: ...", extract "1".
                    // Fallback to index+1 if parsing fails.
                    let chapterId = (i + 1).toString();
                    const match = chapter.title.match(/Chapter\s*(\d+)/i);
                    if (match) {
                        chapterId = match[1];
                    }

                    const fileName = `${chapterId}_${subjectName}.pdf`;
                    const filePath = path.join(classDir, fileName);

                    // Add to manifest
                    bookManifest.chapters.push({
                        id: chapterId,
                        title: chapter.title,
                        fileName: fileName
                    });

                    if (fs.existsSync(filePath)) {
                        console.log(`      Skipping ${fileName} (Already exists)`);
                        continue;
                    }

                    console.log(`      Scraping Chapter: ${chapter.title} -> ${fileName}`);

                    const readerPage = await browser.newPage();
                    try {
                        // Intercept Network Requests to find PDF
                        let pdfUrl = null;
                        await readerPage.setRequestInterception(true);
                        readerPage.on('request', request => {
                            if (request.resourceType() === 'document' || request.resourceType() === 'xhr' || request.resourceType() === 'fetch') {
                                if (request.url().toLowerCase().endsWith('.pdf')) {
                                    pdfUrl = request.url();
                                }
                            }
                            request.continue();
                        });

                        // Also look for response
                        readerPage.on('response', response => {
                            if (response.url().toLowerCase().endsWith('.pdf')) {
                                pdfUrl = response.url();
                            }
                        });


                        await readerPage.goto(chapter.href, { waitUntil: 'networkidle0', timeout: 30000 });

                        // Fallback: Check page content/scripts if network intercept failed
                        if (!pdfUrl) {
                            pdfUrl = await readerPage.evaluate(() => {
                                // Check for common PDF embedding patterns
                                const scripts = Array.from(document.querySelectorAll('script'));
                                for (const s of scripts) {
                                    if (s.src && s.src.includes('.pdf')) return s.src;
                                    if (s.innerText && s.innerText.includes('.pdf')) {
                                        const match = s.innerText.match(/['"]([^'"]+\.pdf)['"]/);
                                        if (match) return match[1];
                                    }
                                }
                                // Check iframes
                                const iframe = document.querySelector('iframe');
                                if (iframe && iframe.src.includes('.pdf')) return iframe.src;

                                return null;
                            });
                        }

                        if (pdfUrl) {
                            // Handle relative URLs
                            if (!pdfUrl.startsWith('http')) {
                                pdfUrl = new URL(pdfUrl, BASE_URL).href;
                            }
                            console.log(`      Found PDF URL: ${pdfUrl}`);
                            await downloadFile(pdfUrl, filePath);
                            console.log(`      Downloaded.`);
                        } else {
                            console.log(`      [!] Could not find PDF URL for ${chapter.title}`);
                        }

                    } catch (err) {
                        console.error(`      Error reading chapter page: ${err.message}`);
                    } finally {
                        await readerPage.close();
                    }
                }

            } catch (err) {
                console.error(`    Error processing subject ${subject.title}: ${err.message}`);
            } finally {
                // Write Manifest (even if partial)
                if (typeof bookManifest !== 'undefined' && bookManifest.chapters.length > 0) {
                    const manifestPath = path.join(classDir, `${subjectName}_manifest.json`);
                    fs.writeFileSync(manifestPath, JSON.stringify(bookManifest, null, 2));
                    console.log(`    Saved manifest to ${manifestPath}`);
                }
                await subjectPage.close();
            }
        }

    } catch (error) {
        console.error(`Error processing Class ${classId}:`, error);
    } finally {
        await browser.close();
    }
}

// Run for Class 1 as requested first (or loop all)
// The user said "every class", but let's test with Class 1 first to be safe.
// I will add a loop but maybe comment it out or limit to Class 1 for the first run.
// Use args to control?
(async () => {
    // Loop through classes 1 to 12
    for (let c = 1; c <= 12; c++) {
        await scrapeClass(c);
    }
})();
