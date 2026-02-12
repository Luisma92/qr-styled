/**
 * Helper to create simple logo images for testing
 */

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const LOGO_DIR = path.join(process.cwd(), 'examples', 'logos');

// Ensure logo directory exists
if (!fs.existsSync(LOGO_DIR)) {
  fs.mkdirSync(LOGO_DIR, { recursive: true });
}

function createSimpleLogo(filename: string, color: string, letter: string) {
  const size = 200;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);

  // Letter
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 120px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, size / 2, size / 2);

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(LOGO_DIR, filename), buffer);
}

// Create sample logos
console.log('🎨 Creating sample logos...\n');

createSimpleLogo('logo-blue.png', '#2563EB', 'B');
console.log('✅ Created blue logo');

createSimpleLogo('logo-green.png', '#16A34A', 'G');
console.log('✅ Created green logo');

createSimpleLogo('logo-red.png', '#DC2626', 'R');
console.log('✅ Created red logo');

createSimpleLogo('logo-purple.png', '#9333EA', 'P');
console.log('✅ Created purple logo');

createSimpleLogo('logo-orange.png', '#EA580C', 'O');
console.log('✅ Created orange logo');

console.log('\n🎉 All logos created successfully!');
console.log('📁 Check the examples/logos directory.');
