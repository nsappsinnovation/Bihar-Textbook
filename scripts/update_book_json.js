import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public/PDFs');
const TARGET_JSON = path.join(__dirname, '../src/Pages/Book.json');

// Default Images or Map
const COVER_IMAGES = {
    'default': '/bookcover.png',
    'english': '/images/classes/english.png', // valid example? using default for safety
    'math': '/images/classes/math.png'
};

function updateBookJson() {
    if (!fs.existsSync(PUBLIC_DIR)) {
        console.error("Public PDF directory not found.");
        return;
    }

    const classesData = [];

    // Iterate Classes 1-12
    for (let i = 1; i <= 12; i++) {
        const classDirName = `Class_${i}`;
        const classDirPath = path.join(PUBLIC_DIR, classDirName);

        if (!fs.existsSync(classDirPath)) {
            console.warn(`Skipping ${classDirName} (Not found)`);
            continue;
        }

        const books = [];
        const files = fs.readdirSync(classDirPath);
        let bookIndex = 1;

        // Find manifests
        files.filter(f => f.endsWith('_manifest.json')).forEach(manifestFile => {
            try {
                const content = fs.readFileSync(path.join(classDirPath, manifestFile));
                const manifest = JSON.parse(content);

                // Use manifest subject. Ensure Title Case for display if possible, or use raw.
                // Scraper stored "subject: 'Hindi (ANKUR HINDI)'"

                const title = manifest.subject || manifest.subjectSlug;
                const subject = manifest.subjectSlug; // e.g. "hindi", "aatit_se_vartaman"

                books.push({
                    id: `c${i}b${bookIndex++}`,
                    title: title.charAt(0).toUpperCase() + title.slice(1), // Capitalize
                    image: '/bookcover.png', // Default
                    subject: title // Used for slug matching in UI logic
                });

            } catch (err) {
                console.error(`Error parsing ${manifestFile}:`, err);
            }
        });

        classesData.push({
            id: i,
            name: `Class ${i}`,
            books: books
        });
    }

    const output = {
        classes: classesData
    };

    fs.writeFileSync(TARGET_JSON, JSON.stringify(output, null, 2));
    console.log(`Updated ${TARGET_JSON} with ${classesData.reduce((acc, c) => acc + c.books.length, 0)} books.`);
}

updateBookJson();
