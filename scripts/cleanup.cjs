const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const publicImagesDir = path.join(__dirname, '../public/images');

// 1. Gather all files in src
function getAllSrcFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    for (const item of list) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllSrcFiles(fullPath, files);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
            files.push(fullPath);
        }
    }
    return files;
}

const allSrcFiles = getAllSrcFiles(srcDir);

// 2. Gather all images in public/images
function getAllImages(dir, images = []) {
    if (!fs.existsSync(dir)) return images;
    const list = fs.readdirSync(dir);
    for (const item of list) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllImages(fullPath, images);
        } else {
            images.push(fullPath.replace(/\\/g, '/'));
        }
    }
    return images;
}

const allImages = getAllImages(publicImagesDir);
const imagePaths = allImages.map(img => {
    // get relative path from public
    const idx = img.indexOf('/public/');
    return img.substring(idx + 8); // e.g. images/vr/vr.png
});

// 3. Scan all src files content
let allContent = '';
const fileContents = {};
allSrcFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf-8');
    fileContents[f] = content;
    allContent += content + '\n';
});

// Find unused images
const unusedImages = [];
for (let i = 0; i < imagePaths.length; i++) {
    const imgPath = imagePaths[i];
    const fullImgPath = allImages[i];
    
    // Some images might be referenced as "/images/..." or "images/..."
    const basename = path.basename(imgPath);
    
    // We do a simple string match. If the basename isn't even in the code, it's definitely unused.
    if (!allContent.includes(basename)) {
        unusedImages.push(fullImgPath);
    }
}

// Find unused components/files in src (excluding main.jsx, App.jsx, App.css, index.css)
const entryFiles = ['main.jsx', 'App.jsx', 'App.css', 'index.css', 'index.js'];
const unusedFiles = [];
allSrcFiles.forEach(f => {
    const basename = path.basename(f);
    if (entryFiles.includes(basename)) return;
    
    // Check if this file is imported anywhere
    const nameWithoutExt = basename.replace(/\.(js|jsx|css)$/, '');
    
    let isImported = false;
    for (const [otherFile, content] of Object.entries(fileContents)) {
        if (otherFile === f) continue;
        if (content.includes(`/${nameWithoutExt}`) || content.includes(`./${nameWithoutExt}`) || content.includes(`'${nameWithoutExt}'`) || content.includes(`"${nameWithoutExt}"`)) {
            isImported = true;
            break;
        }
    }
    
    if (!isImported) {
        unusedFiles.push(f);
    }
});

console.log('Unused Images:', unusedImages.length);
unusedImages.forEach(img => {
    console.log('Deleting:', img);
    fs.unlinkSync(img);
});

console.log('Unused Files:', unusedFiles.length);
unusedFiles.forEach(f => {
    console.log('Deleting:', f);
    fs.unlinkSync(f);
});

console.log('Cleanup complete!');
