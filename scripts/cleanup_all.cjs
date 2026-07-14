const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const publicDir = path.join(__dirname, '../public');

// 1. Gather all files in src
function getAllSrcFiles(dir, files = []) {
    if (!fs.existsSync(dir)) return files;
    const list = fs.readdirSync(dir);
    for (const item of list) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllSrcFiles(fullPath, files);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.css') || fullPath.endsWith('.json')) {
            files.push(fullPath);
        }
    }
    return files;
}

const allSrcFiles = getAllSrcFiles(srcDir);

// 2. Gather all media/static files in public/ (except index.html, robots.txt etc)
function getAllPublicFiles(dir, files = []) {
    if (!fs.existsSync(dir)) return files;
    const list = fs.readdirSync(dir);
    for (const item of list) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllPublicFiles(fullPath, files);
        } else {
            // Ignore common web files
            const ext = path.extname(fullPath).toLowerCase();
            if (!['.html', '.txt', '.ico', '.json'].includes(ext)) {
                files.push(fullPath.replace(/\\/g, '/'));
            }
        }
    }
    return files;
}

const allPublicFiles = getAllPublicFiles(publicDir);

// 3. Scan all src files content
let allContent = '';
allSrcFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf-8');
    allContent += content + '\n';
});

// Also scan index.html
const indexContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
allContent += indexContent + '\n';

// Find unused files in public
const unusedPublicFiles = [];
for (let i = 0; i < allPublicFiles.length; i++) {
    const fullPath = allPublicFiles[i];
    const basename = path.basename(fullPath);
    
    // Check if the basename is anywhere in the codebase
    // This is very aggressive: if the exact filename is not in any string in src or index.html, it's unused.
    if (!allContent.includes(basename)) {
        // One exception: if it's named something generic like "A.png" we already deleted it, but let's just delete
        unusedPublicFiles.push(fullPath);
    }
}

console.log('Unused Public Files:', unusedPublicFiles.length);
unusedPublicFiles.forEach(f => {
    console.log('Deleting:', f);
    fs.unlinkSync(f);
});

console.log('Cleanup complete!');
