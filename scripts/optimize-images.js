const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const glob = require('glob');

const CONFIG = {
  inputDirs: [
    'public/images/hero',
    'public/images/products',
    'public/images/packages',
    'public/images/media-wall',
    'public/images/projects',
    'public/images/showrooms',
    'public/images/blog',
  ],

  outputDir: 'public/images/optimized',

  sizes: [
    { name: 'thumbnail', width: 150, height: 150 },
    { name: 'small', width: 320, height: null },
    { name: 'medium', width: 640, height: null },
    { name: 'large', width: 1024, height: null },
    { name: 'xlarge', width: 1920, height: null },
  ],

  quality: {
    jpeg: 80,
    webp: 80,
    avif: 75,
    png: 80,
  },

  formats: ['jpeg', 'webp', 'avif'],

  placeholder: {
    enabled: true,
    width: 20,
    blur: 10,
  },
};

function getImageFiles() {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
  const files = [];
  
  CONFIG.inputDirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    
    if (!fs.existsSync(dirPath)) {
      console.warn(`⚠️  Directory not found: ${dir}`);
      return;
    }
    
    imageExtensions.forEach(ext => {
      const pattern = path.join(dirPath, `**/*.${ext}`);
      const matches = glob.sync(pattern);
      files.push(...matches);
    });
  });
  
  return files;
}

function ensureOutputDir(outputPath) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getRelativePath(filePath) {
  const publicDir = path.join(process.cwd(), 'public');
  return path.relative(publicDir, filePath);
}

function generateOutputFilename(inputPath, size, format) {
  const parsed = path.parse(inputPath);
  const relativePath = getRelativePath(inputPath);
  const relativeDir = path.dirname(relativePath);
  
  const sizeStr = size ? `_${size.name}` : '';
  const filename = `${parsed.name}${sizeStr}.${format}`;
  
  return path.join(CONFIG.outputDir, relativeDir, filename);
}

async function optimizeImage(inputPath, size, format) {
  try {
    const outputPath = generateOutputFilename(inputPath, size, format);
    ensureOutputDir(outputPath);

    if (fs.existsSync(outputPath)) {
      const inputStat = fs.statSync(inputPath);
      const outputStat = fs.statSync(outputPath);
      
      if (outputStat.mtime > inputStat.mtime) {
        return { skipped: true, path: outputPath };
      }
    }
    
    let processor = sharp(inputPath);
    
    const metadata = await processor.metadata();
    
    if (size) {
      const resizeOptions = {
        width: size.width,
        height: size.height,
        fit: 'inside',
        withoutEnlargement: true,
      };
      processor = processor.resize(resizeOptions);
    }
    
    switch (format) {
      case 'jpeg':
      case 'jpg':
        processor = processor.jpeg({
          quality: CONFIG.quality.jpeg,
          progressive: true,
          mozjpeg: true,
        });
        break;
      
      case 'webp':
        processor = processor.webp({
          quality: CONFIG.quality.webp,
          effort: 6,
        });
        break;
      
      case 'avif':
        processor = processor.avif({
          quality: CONFIG.quality.avif,
          effort: 6,
        });
        break;
      
      case 'png':
        processor = processor.png({
          quality: CONFIG.quality.png,
          compressionLevel: 9,
          adaptiveFiltering: true,
        });
        break;
    }

    await processor.toFile(outputPath);
    
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(2);
    
    return {
      success: true,
      path: outputPath,
      inputSize,
      outputSize,
      savings: `${savings}%`,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
      path: inputPath,
    };
  }
}

async function generatePlaceholder(inputPath) {
  try {
    const outputPath = generateOutputFilename(
      inputPath,
      { name: 'placeholder' },
      'jpeg'
    );
    ensureOutputDir(outputPath);
    
    await sharp(inputPath)
      .resize(CONFIG.placeholder.width)
      .blur(CONFIG.placeholder.blur)
      .jpeg({ quality: 50 })
      .toFile(outputPath);
    
    const buffer = fs.readFileSync(outputPath);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64}`;
    
    return {
      success: true,
      path: outputPath,
      dataUrl,
      size: buffer.length,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}

async function processImage(inputPath, options = {}) {
  const results = {
    input: inputPath,
    outputs: [],
    placeholder: null,
    errors: [],
  };
  
  console.log(`\n📸 Processing: ${getRelativePath(inputPath)}`);
  
  const originalFormat = path.extname(inputPath).slice(1).toLowerCase();

  for (const format of CONFIG.formats) {
    for (const size of CONFIG.sizes) {
      const result = await optimizeImage(inputPath, size, format);
      
      if (result.error) {
        console.error(`   ❌ Error (${size.name}, ${format}): ${result.message}`);
        results.errors.push(result);
      } else if (result.skipped) {
        console.log(`   ⏭️  Skipped (${size.name}, ${format}): Already optimized`);
      } else {
        console.log(
          `   ✅ ${size.name.padEnd(10)} ${format.padEnd(6)} - ` +
          `${formatBytes(result.inputSize)} → ${formatBytes(result.outputSize)} ` +
          `(${result.savings} savings)`
        );
        results.outputs.push(result);
      }
    }
  }

  for (const format of CONFIG.formats.filter(f => f !== originalFormat)) {
    const result = await optimizeImage(inputPath, null, format);
    
    if (result.error) {
      console.error(`   ❌ Error (original, ${format}): ${result.message}`);
      results.errors.push(result);
    } else if (result.skipped) {
      console.log(`   ⏭️  Skipped (original, ${format}): Already optimized`);
    } else {
      console.log(
        `   ✅ original    ${format.padEnd(6)} - ` +
        `${formatBytes(result.inputSize)} → ${formatBytes(result.outputSize)} ` +
        `(${result.savings} savings)`
      );
      results.outputs.push(result);
    }
  }

  if (CONFIG.placeholder.enabled) {
    const placeholderResult = await generatePlaceholder(inputPath);
    
    if (placeholderResult.error) {
      console.error(`   ❌ Placeholder error: ${placeholderResult.message}`);
      results.errors.push(placeholderResult);
    } else {
      console.log(`   ✅ Placeholder generated (${formatBytes(placeholderResult.size)})`);
      results.placeholder = placeholderResult;
    }
  }
  
  return results;
}

function generateManifest(results) {
  const manifest = {};
  
  results.forEach(result => {
    const relativePath = getRelativePath(result.input);
    
    manifest[relativePath] = {
      original: relativePath,
      sizes: {},
      formats: {},
      placeholder: result.placeholder?.dataUrl || null,
    };
    
    result.outputs.forEach(output => {
      const outputRelative = getRelativePath(output.path);
      const parsed = path.parse(output.path);
      const format = parsed.ext.slice(1);

      let size = 'original';
      for (const sizeConfig of CONFIG.sizes) {
        if (parsed.name.includes(`_${sizeConfig.name}`)) {
          size = sizeConfig.name;
          break;
        }
      }
      
      if (!manifest[relativePath].sizes[size]) {
        manifest[relativePath].sizes[size] = {};
      }
      
      manifest[relativePath].sizes[size][format] = {
        path: outputRelative,
        size: output.outputSize,
      };
    });
  });
  
  return manifest;
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function calculateStats(results) {
  let totalInput = 0;
  let totalOutput = 0;
  let successCount = 0;
  let errorCount = 0;
  
  results.forEach(result => {
    result.outputs.forEach(output => {
      if (output.inputSize && output.outputSize) {
        totalInput += output.inputSize;
        totalOutput += output.outputSize;
        successCount++;
      }
    });
    
    errorCount += result.errors.length;
  });
  
  const totalSavings = totalInput - totalOutput;
  const savingsPercentage = totalInput > 0 
    ? ((totalSavings / totalInput) * 100).toFixed(2) 
    : 0;
  
  return {
    totalInput,
    totalOutput,
    totalSavings,
    savingsPercentage,
    successCount,
    errorCount,
    filesProcessed: results.length,
  };
}

async function optimizeSpecific(imagePaths) {
  console.log('🎨 Optimizing specific images...\n');
  
  const results = [];
  
  for (const imagePath of imagePaths) {
    const fullPath = path.join(process.cwd(), imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ File not found: ${imagePath}`);
      continue;
    }
    
    const result = await processImage(fullPath);
    results.push(result);
  }
  
  return results;
}

async function optimizeAll() {
  console.log('🎨 Lomash Wood - Image Optimization\n');
  console.log('📁 Scanning directories...');
  
  const imageFiles = getImageFiles();
  
  if (imageFiles.length === 0) {
    console.log('⚠️  No images found to optimize');
    return;
  }
  
  console.log(`✅ Found ${imageFiles.length} images\n`);
  
  const results = [];
  
  for (let i = 0; i < imageFiles.length; i++) {
    console.log(`\n[${i + 1}/${imageFiles.length}]`);
    const result = await processImage(imageFiles[i]);
    results.push(result);
  }
  
  return results;
}

function cleanOldImages() {
  const optimizedDir = path.join(process.cwd(), CONFIG.outputDir);
  
  if (fs.existsSync(optimizedDir)) {
    console.log('\n🧹 Cleaning old optimized images...');
    fs.rmSync(optimizedDir, { recursive: true, force: true });
    console.log('✅ Cleaned');
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Lomash Wood Image Optimization Script

Usage:
  node scripts/optimize-images.js [options] [files...]

Options:
  --help, -h              Show this help message
  --clean                 Clean old optimized images before processing
  --no-placeholder        Don't generate placeholder images
  --formats <formats>     Comma-separated list of formats (jpeg,webp,avif)
  --quality <number>      JPEG quality (1-100, default: 80)
  --manifest              Generate image manifest JSON file

Examples:
  node scripts/optimize-images.js
  node scripts/optimize-images.js --clean
  node scripts/optimize-images.js public/images/hero/hero-1.jpg
  node scripts/optimize-images.js --formats webp,avif
  node scripts/optimize-images.js --quality 85 --manifest
    `);
    process.exit(0);
  }

  if (args.includes('--clean')) {
    cleanOldImages();
  }
  
  if (args.includes('--no-placeholder')) {
    CONFIG.placeholder.enabled = false;
  }
  
  const formatsIndex = args.indexOf('--formats');
  if (formatsIndex !== -1 && args[formatsIndex + 1]) {
    CONFIG.formats = args[formatsIndex + 1].split(',');
  }
  
  const qualityIndex = args.indexOf('--quality');
  if (qualityIndex !== -1 && args[qualityIndex + 1]) {
    const quality = parseInt(args[qualityIndex + 1]);
    if (quality >= 1 && quality <= 100) {
      CONFIG.quality.jpeg = quality;
      CONFIG.quality.webp = quality;
      CONFIG.quality.avif = Math.max(quality - 5, 1);
    }
  }
  
  const generateManifestFile = args.includes('--manifest');

  const specificFiles = args.filter(arg => 
    !arg.startsWith('--') && 
    (arg.endsWith('.jpg') || arg.endsWith('.jpeg') || 
     arg.endsWith('.png') || arg.endsWith('.webp'))
  );
  
  try {
    let results;
    
    if (specificFiles.length > 0) {
      results = await optimizeSpecific(specificFiles);
    } else {
      results = await optimizeAll();
    }

    console.log('\n\n📊 Optimization Summary');
    console.log('═'.repeat(50));
    
    const stats = calculateStats(results);
    
    console.log(`Files processed:    ${stats.filesProcessed}`);
    console.log(`Images optimized:   ${stats.successCount}`);
    console.log(`Errors:            ${stats.errorCount}`);
    console.log(`\nOriginal size:     ${formatBytes(stats.totalInput)}`);
    console.log(`Optimized size:    ${formatBytes(stats.totalOutput)}`);
    console.log(`Total savings:     ${formatBytes(stats.totalSavings)} (${stats.savingsPercentage}%)`);

    if (generateManifestFile) {
      console.log('\n📝 Generating image manifest...');
      const manifest = generateManifest(results);
      const manifestPath = path.join(
        process.cwd(),
        CONFIG.outputDir,
        'image-manifest.json'
      );
      ensureOutputDir(manifestPath);
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      console.log(`✅ Manifest saved to: ${manifestPath}`);
    }
    
    console.log('\n✨ Optimization complete!\n');
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

try {
  require.resolve('sharp');
} catch (e) {
  console.error('❌ Missing dependency: sharp');
  console.error('Install with: npm install --save-dev sharp');
  process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = {
  optimizeImage,
  optimizeAll,
  optimizeSpecific,
  generatePlaceholder,
  generateManifest,
  CONFIG,
};