/**
 * QR code examples with logo integration
 * Demonstrates how to add branded logos to QR codes
 */

import { QRGenerator } from '../src/index.js';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'examples', 'output');
const LOGO_DIR = path.join(process.cwd(), 'examples', 'logos');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateLogoExamples() {
  console.log('🏢 Generating QR codes with logos...\n');

  // 1. Corporate Blue with Circle Logo
  console.log('🔵 Generating corporate QR with circle logo...');
  const corporateQR = new QRGenerator({
    url: 'https://company.com',
    size: 600,
    foregroundColor: '#1E3A8A',
    backgroundColor: '#FFFFFF',
    rounded: true,
    moduleRadius: 0.35,
    logo: path.join(LOGO_DIR, 'logo-blue.png'),
    logoSize: 100,
    logoShape: 'circle',
    logoPadding: 8,
    logoBackgroundColor: '#FFFFFF',
    margin: 4
  });

  await corporateQR.generateToFile(
    path.join(OUTPUT_DIR, 'logo-corporate.png')
  );
  console.log('✅ Corporate logo QR generated: examples/output/logo-corporate.png\n');

  // 2. Eco Brand with Square Logo
  console.log('🌿 Generating eco QR with square logo...');
  const ecoQR = new QRGenerator({
    url: 'https://eco-brand.com',
    size: 600,
    gradient: true,
    gradientColors: '#059669,#10B981',
    gradientAngle: 45,
    backgroundColor: '#FFFFFF',
    logo: path.join(LOGO_DIR, 'logo-green.png'),
    logoSize: 110,
    logoShape: 'square',
    logoRadius: 15,
    logoPadding: 10,
    logoBackgroundColor: '#F0FDF4',
    eyeColor: '#065F46',
    eyeRadius: 0.4,
    rounded: true,
    moduleRadius: 0.35,
    margin: 4
  });

  await ecoQR.generateToFile(path.join(OUTPUT_DIR, 'logo-eco.png'));
  console.log('✅ Eco logo QR generated: examples/output/logo-eco.png\n');

  // 3. Tech Startup with Circle Logo
  console.log('🚀 Generating tech startup QR with logo...');
  const techQR = new QRGenerator({
    url: 'https://tech-startup.com',
    size: 600,
    gradient: true,
    gradientColors: '#7C3AED,#A78BFA',
    gradientAngle: 135,
    backgroundColor: '#FFFFFF',
    logo: path.join(LOGO_DIR, 'logo-purple.png'),
    logoSize: 95,
    logoShape: 'circle',
    logoPadding: 8,
    logoBackgroundColor: '#FFFFFF',
    eyeColor: '#581C87',
    eyeRadius: 0.45,
    rounded: true,
    moduleRadius: 0.4,
    margin: 4
  });

  await techQR.generateToFile(path.join(OUTPUT_DIR, 'logo-tech.png'));
  console.log('✅ Tech logo QR generated: examples/output/logo-tech.png\n');

  // 4. Restaurant with Square Logo
  console.log('🍽️ Generating restaurant QR with logo...');
  const restaurantQR = new QRGenerator({
    url: 'https://restaurant.com/menu',
    size: 600,
    gradient: true,
    gradientColors: '#DC2626,#F87171',
    gradientAngle: 90,
    backgroundColor: '#FFFFFF',
    logo: path.join(LOGO_DIR, 'logo-red.png'),
    logoSize: 105,
    logoShape: 'square',
    logoRadius: 20,
    logoPadding: 10,
    logoBackgroundColor: '#FEF2F2',
    eyeColor: '#991B1B',
    eyeRadius: 0.5,
    rounded: true,
    moduleRadius: 0.35,
    margin: 4
  });

  await restaurantQR.generateToFile(path.join(OUTPUT_DIR, 'logo-restaurant.png'));
  console.log('✅ Restaurant logo QR generated: examples/output/logo-restaurant.png\n');

  // 5. Energy Company with Circle Logo
  console.log('⚡ Generating energy company QR with logo...');
  const energyQR = new QRGenerator({
    url: 'https://energy-corp.com',
    size: 600,
    gradient: true,
    gradientColors: '#EA580C,#FB923C',
    gradientAngle: 45,
    backgroundColor: '#FFFFFF',
    logo: path.join(LOGO_DIR, 'logo-orange.png'),
    logoSize: 100,
    logoShape: 'circle',
    logoPadding: 8,
    logoBackgroundColor: '#FFFFFF',
    eyeColor: '#9A3412',
    eyeRadius: 0.4,
    rounded: true,
    moduleRadius: 0.35,
    margin: 4
  });

  await energyQR.generateToFile(path.join(OUTPUT_DIR, 'logo-energy.png'));
  console.log('✅ Energy logo QR generated: examples/output/logo-energy.png\n');

  // 6. Minimalist with Large Logo
  console.log('✨ Generating minimalist QR with large logo...');
  const minimalistQR = new QRGenerator({
    url: 'https://minimalist-brand.com',
    size: 600,
    foregroundColor: '#374151',
    backgroundColor: '#F9FAFB',
    logo: path.join(LOGO_DIR, 'logo-blue.png'),
    logoSize: 120,
    logoShape: 'circle',
    logoPadding: 12,
    logoBackgroundColor: '#FFFFFF',
    eyeColor: '#111827',
    eyeRadius: 0.3,
    rounded: true,
    moduleRadius: 0.3,
    margin: 4
  });

  await minimalistQR.generateToFile(path.join(OUTPUT_DIR, 'logo-minimalist.png'));
  console.log('✅ Minimalist logo QR generated: examples/output/logo-minimalist.png\n');

  console.log('🎉 All logo examples generated successfully!');
  console.log('📁 Check the examples/output directory for all QR codes.');
}

// Run examples
generateLogoExamples().catch(console.error);
