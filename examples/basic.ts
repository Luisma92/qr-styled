import { QRGenerator } from '../src/index.js';
import fs from 'fs';

/**
 * Basic usage example
 */
async function basicExample(): Promise<void> {
  console.log('📝 Basic Example - Simple QR Code\n');

  const generator = new QRGenerator({
    url: 'https://github.com'
  });

  await generator.generateToFile('examples/output/basic-qr.png');
  console.log('✅ Generated: examples/output/basic-qr.png\n');
}

/**
 * Gradient QR example
 */
async function gradientExample(): Promise<void> {
  console.log('🌈 Gradient Example\n');

  const generator = new QRGenerator({
    url: 'https://github.com',
    gradient: true,
    gradientColors: '#667eea,#764ba2',
    gradientAngle: 90
  });

  await generator.generateToFile('examples/output/gradient-qr.png');
  console.log('✅ Generated: examples/output/gradient-qr.png\n');
}

/**
 * Custom styled QR example
 */
async function customStyledExample(): Promise<void> {
  console.log('🎨 Custom Styled Example\n');

  const generator = new QRGenerator({
    url: 'https://github.com',
    size: 800,
    color: '#2d3748',
    rounded: true,
    moduleRadius: 0.45,
    cornerRadius: 80,
    backgroundColor: '#f7fafc'
  });

  await generator.generateToFile('examples/output/custom-styled-qr.png');
  console.log('✅ Generated: examples/output/custom-styled-qr.png\n');
}

// Create output directory if it doesn't exist
if (!fs.existsSync('examples/output')) {
  fs.mkdirSync('examples/output', { recursive: true });
}

// Run all examples
(async () => {
  try {
    await basicExample();
    await gradientExample();
    await customStyledExample();
    console.log('🎉 All examples generated successfully!');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Error:', errorMessage);
  }
})();
