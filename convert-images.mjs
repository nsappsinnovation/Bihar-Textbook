import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const TARGET_DIRS = ['public', 'src'];
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg'];
const TEXT_EXTS = ['.js', '.jsx', '.ts', '.tsx', '.css', '.html', '.json'];

async function getFiles(dir, exts = null) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res, exts) : res;
  }));
  let flatFiles = files.flat();
  if (exts) {
    flatFiles = flatFiles.filter(f => exts.includes(path.extname(f).toLowerCase()));
  }
  return flatFiles;
}

async function run() {
  console.log('Finding images...');
  let imageFiles = [];
  for (const dir of TARGET_DIRS) {
    const dirPath = path.resolve(process.cwd(), dir);
    try {
      const files = await getFiles(dirPath, IMAGE_EXTS);
      imageFiles = imageFiles.concat(files);
    } catch (e) {
      console.log(`Skipping ${dirPath}`);
    }
  }

  console.log(`Found ${imageFiles.length} images to convert.`);

  const renameMap = new Map();

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const webpFile = file.slice(0, -ext.length) + '.webp';
    
    try {
      await sharp(file)
        .webp({ quality: 85, nearLossless: true })
        .toFile(webpFile);
      
      await fs.unlink(file);
      
      const basename = path.basename(file);
      const newBasename = path.basename(webpFile);
      renameMap.set(basename, newBasename);
      
      console.log(`Converted: ${basename} -> ${newBasename}`);
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err);
    }
  }

  console.log('Finding text files to update...');
  let textFiles = [];
  for (const dir of TARGET_DIRS) {
    const dirPath = path.resolve(process.cwd(), dir);
    try {
      const files = await getFiles(dirPath, TEXT_EXTS);
      textFiles = textFiles.concat(files);
    } catch (e) {
      // ignore
    }
  }
  
  // Also include index.html in root
  try {
    const rootIndex = path.resolve(process.cwd(), 'index.html');
    await fs.access(rootIndex);
    textFiles.push(rootIndex);
  } catch (e) {}

  console.log(`Updating references in ${textFiles.length} text files...`);
  
  for (const file of textFiles) {
    let content = await fs.readFile(file, 'utf8');
    let changed = false;
    
    for (const [oldName, newName] of renameMap.entries()) {
      // Simple string replace, might need regex for exact matches but since basenames are unique mostly, it's ok.
      // A safer replace: look for the old name preceded by a slash, quote, or similar boundary.
      // But standard split/join is fast and usually safe for filenames.
      if (content.includes(oldName)) {
        content = content.split(oldName).join(newName);
        changed = true;
      }
    }
    
    if (changed) {
      await fs.writeFile(file, content, 'utf8');
      console.log(`Updated references in: ${path.relative(process.cwd(), file)}`);
    }
  }

  console.log('Done!');
}

run().catch(console.error);
