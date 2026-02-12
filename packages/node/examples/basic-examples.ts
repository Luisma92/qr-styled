/**
 * Basic QR code examples with simple, clean designs
 * Perfect for getting started with qr-generator-styled
 */

import { QRGenerator } from '../src/index.js';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'examples', 'output');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateBasicExamples() {
  console.log('🎯 Generating basic QR code examples...\n');

  // 1. Classic Black & White
  console.log('⚫ Generating classic black & white QR...');
  const classicQR = new QRGenerator({
    url: 'https://example.com',
    size: 600,
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    margin: 4
  });

  await classicQR.generateToFile(path.join(OUTPUT_DIR, 'basic-classic.png'));
  console.log('✅ Classic QR generated: examples/output/basic-classic.png\n');

  // 2. Blue Professional
  console.log('🔵 Generating blue professional QR...');
  const blueQR = new QRGenerator({
    url: 'https://example.com/contact',
    size: 600,
    foregroundColor: '#1E40AF',
    backgroundColor: '#EFF6FF',
    rounded: true,
    moduleRadius: 0.35,
    margin: 4
  });

  await blueQR.generateToFile(path.join(OUTPUT_DIR, 'basic-blue.png'));
  console.log('✅ Blue QR generated: examples/output/basic-blue.png\n');

  // 3. Green Eco
  console.log('🟢 Generating green eco QR...');
  const greenQR = new QRGenerator({
    url: 'https://example.com/sustainability',
    size: 600,
    foregroundColor: '#16A34A',
    backgroundColor: '#F0FDF4',
    rounded: true,
    moduleRadius: 0.4,
    eyeColor: '#14532D',
    eyeRadius: 0.4,
    margin: 4
  });

  await greenQR.generateToFile(path.join(OUTPUT_DIR, 'basic-green.png'));
  console.log('✅ Green QR generated: examples/output/basic-green.png\n');

  // 4. Red Alert
  console.log('🔴 Generating red alert QR...');
  const redQR = new QRGenerator({
    url: 'https://example.com/urgent',
    size: 600,
    foregroundColor: '#DC2626',
    backgroundColor: '#FEF2F2',
    rounded: true,
    moduleRadius: 0.35,
    eyeColor: '#991B1B',
    eyeRadius: 0.5,
    margin: 4
  });

  await redQR.generateToFile(path.join(OUTPUT_DIR, 'basic-red.png'));
  console.log('✅ Red QR generated: examples/output/basic-red.png\n');

  // 5. Purple Creative
  console.log('🟣 Generating purple creative QR...');
  const purpleQR = new QRGenerator({
    url: 'https://example.com/creative',
    size: 600,
    foregroundColor: '#9333EA',
    backgroundColor: '#FAF5FF',
    rounded: true,
    moduleRadius: 0.4,
    eyeColor: '#581C87',
    eyeRadius: 0.45,
    margin: 4
  });

  await purpleQR.generateToFile(path.join(OUTPUT_DIR, 'basic-purple.png'));
  console.log('✅ Purple QR generated: examples/output/basic-purple.png\n');

  // 6. Orange Energy
  console.log('🟠 Generating orange energy QR...');
  const orangeQR = new QRGenerator({
    url: 'https://example.com/energy',
    size: 600,
    foregroundColor: '#EA580C',
    backgroundColor: '#FFF7ED',
    rounded: true,
    moduleRadius: 0.35,
    eyeColor: '#9A3412',
    eyeRadius: 0.4,
    margin: 4
  });

  await orangeQR.generateToFile(path.join(OUTPUT_DIR, 'basic-orange.png'));
  console.log('✅ Orange QR generated: examples/output/basic-orange.png\n');

  console.log('🎉 All basic examples generated successfully!');
  console.log('📁 Check the examples/output directory for all QR codes.');
}

// Run examples
generateBasicExamples().catch(console.error);
