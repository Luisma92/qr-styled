/**
 * QR code examples with circular eyes (finder patterns)
 * Demonstrates the new eyeShape: 'circle' feature
 */

import { QRGenerator } from '../src/index.js';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'examples', 'output');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateCircularEyesExamples() {
  console.log('⭕ Generating QR codes with circular eyes...\n');

  // 1. Simple Circular Eyes
  console.log('🔵 Generating simple circular eyes QR...');
  const circularQR1 = new QRGenerator({
    url: 'https://github.com/Luisma92/qr-styled',
    size: 600,
    foregroundColor: '#2563eb',
    backgroundColor: '#ffffff',
    rounded: true,
    moduleRadius: 0.4,
    eyeColor: '#1e40af',
    eyeShape: 'circle',
    margin: 4
  });

  await circularQR1.generateToFile(
    path.join(OUTPUT_DIR, 'circular-eyes-simple.png')
  );
  console.log('✅ Simple circular eyes QR generated\n');

  // 2. Gradient with Circular Eyes
  console.log('🌈 Generating gradient + circular eyes QR...');
  const circularQR2 = new QRGenerator({
    url: 'https://www.npmjs.com/package/@qr-styled/node',
    size: 600,
    gradient: true,
    gradientColors: '#f093fb, #f5576c',
    gradientAngle: 135,
    backgroundColor: '#ffffff',
    rounded: true,
    moduleRadius: 0.45,
    eyeColor: '#c2185b',
    eyeShape: 'circle',
    margin: 4
  });

  await circularQR2.generateToFile(
    path.join(OUTPUT_DIR, 'circular-eyes-gradient.png')
  );
  console.log('✅ Gradient circular eyes QR generated\n');

  // 3. High Contrast Circular Eyes
  console.log('⚫ Generating high contrast circular eyes QR...');
  const circularQR3 = new QRGenerator({
    url: 'https://qr-styled.dev',
    size: 600,
    foregroundColor: '#1a1a1a',
    backgroundColor: '#ffffff',
    rounded: true,
    moduleRadius: 0.5,
    eyeColor: '#e91e63',
    eyeShape: 'circle',
    margin: 4
  });

  await circularQR3.generateToFile(
    path.join(OUTPUT_DIR, 'circular-eyes-contrast.png')
  );
  console.log('✅ High contrast circular eyes QR generated\n');

  // 4. Circular Eyes SVG Export
  console.log('📐 Generating circular eyes SVG...');
  const circularQRSVG = new QRGenerator({
    url: 'https://github.com/Luisma92/qr-styled',
    size: 600,
    foregroundColor: '#7c3aed',
    backgroundColor: '#ffffff',
    eyeColor: '#4c1d95',
    eyeShape: 'circle',
    margin: 4
  });

  await circularQRSVG.generateToSVGFile(
    path.join(OUTPUT_DIR, 'circular-eyes-vector.svg')
  );
  console.log('✅ SVG circular eyes QR generated\n');

  console.log('🎉 All circular eyes examples generated successfully!');
  console.log('📁 Check the examples/output directory for all QR codes.');
}

generateCircularEyesExamples().catch(console.error);
