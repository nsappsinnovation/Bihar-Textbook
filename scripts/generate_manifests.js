import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public/PDFs');

// Helper to sanitize filename
function sanitize(str) {
    return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

function generateManifests() {
    if (!fs.existsSync(PUBLIC_DIR)) {
        console.log("Public dir not found.");
        return;
    }

    const classes = fs.readdirSync(PUBLIC_DIR).filter(f => f.startsWith('Class_'));

    classes.forEach(classDirName => {
        const classDirPath = path.join(PUBLIC_DIR, classDirName);
        console.log(`Processing ${classDirName}...`);

        const files = fs.readdirSync(classDirPath).filter(f => f.endsWith('.pdf'));

        // Group by subject: "1_hindi.pdf" -> subject "hindi"
        const filesBySubject = {};

        files.forEach(file => {
            // Pattern: [id]_[subject].pdf
            // Splitting by first underscore might be risky if id has underscore, but our scraper uses numerical ids usually.
            // Scraper: `${chapterId}_${subjectName}.pdf`

            const parts = file.replace('.pdf', '').split('_');
            if (parts.length >= 2) {
                const id = parts[0];
                const subject = parts.slice(1).join('_'); // Rejoin rest as subject

                if (!filesBySubject[subject]) {
                    filesBySubject[subject] = [];
                }
                filesBySubject[subject].push({
                    id: id,
                    fileName: file
                });
            }
        });

        // Write Manifests
        for (const [subject, chapters] of Object.entries(filesBySubject)) {
            // Sort chapters by ID (numeric)
            chapters.sort((a, b) => parseInt(a.id) - parseInt(b.id));

            const manifest = {
                classId: classDirName.replace('Class_', ''),
                subject: subject, // slug
                subjectSlug: subject,
                chapters: chapters.map(c => ({
                    id: c.id,
                    title: `Chapter ${c.id}`, // Placeholder title since we lost the real one
                    fileName: c.fileName
                }))
            };

            const manifestPath = path.join(classDirPath, `${subject}_manifest.json`);
            fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
            console.log(`  Generated ${subject}_manifest.json with ${chapters.length} chapters.`);
        }
    });
}

generateManifests();
