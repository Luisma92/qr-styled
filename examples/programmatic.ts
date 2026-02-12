import { QRGenerator, generateQRToFile } from '../src/index.js';
import fs from 'fs';

console.log('🚀 Programmatic Usage Examples for qr-generator-styled\n');

/**
 * Example 1: Using the QRGenerator class
 */
async function example1(): Promise<void> {
  console.log('📌 Example 1: QRGenerator Class');

  const generator = new QRGenerator({
    url: 'https://www.npmjs.com',
    gradient: true,
    gradientColors: '#ff6b6b,#ee5a6f,#d84371'
  });

  await generator.generateToFile('examples/output/programmatic-1.png');
  console.log('   ✓ Generated with QRGenerator class\n');
}

/**
 * Example 2: Using the helper function
 */
async function example2(): Promise<void> {
  console.log('📌 Example 2: Helper Function generateQRToFile');

  await generateQRToFile(
    {
      url: 'https://javascript.info',
      color: '#f7df1e',
      rounded: true,
      size: 700
    },
    'examples/output/programmatic-2.png'
  );

  console.log('   ✓ Generated with helper function\n');
}

/**
 * Example 3: Generating to buffer (for use in web servers, APIs, etc.)
 */
async function example3(): Promise<void> {
  console.log('📌 Example 3: Generate to Buffer (for APIs/Servers)');

  const generator = new QRGenerator({
    url: 'https://nodejs.org',
    gradient: true,
    gradientColors: '#68a063,#539e4d',
    gradientAngle: 45
  });

  const buffer = await generator.generateToBuffer('png');

  // In an Express server, you would do: res.type('png').send(buffer)
  console.log(`   ✓ Buffer generated (${buffer.length} bytes)`);
  console.log('   ℹ️  This buffer can be sent directly in HTTP responses\n');
}

/**
 * Example 4: Generating to Data URL (for embedding in HTML)
 */
async function example4(): Promise<void> {
  console.log('📌 Example 4: Generate to Data URL (for HTML/CSS)');

  const generator = new QRGenerator({
    url: 'https://developer.mozilla.org',
    gradient: true,
    gradientColors: '#83d0f5,#6684b9',
    size: 500
  });

  const dataURL = await generator.generateToDataURL('png');

  console.log(`   ✓ Data URL generated (${dataURL.length} characters)`);
  console.log(
    '   ℹ️  You can use this in <img src="data:image/png;base64,...">\n'
  );
}

/**
 * Example 5: Updating options dynamically
 */
async function example5(): Promise<void> {
  console.log('📌 Example 5: Update Options Dynamically');

  const generator = new QRGenerator({
    url: 'https://github.com',
    color: '#333'
  });

  // Generate first version
  await generator.generateToFile('examples/output/programmatic-5a.png');
  console.log('   ✓ First version generated');

  // Update options and generate again
  generator.updateOptions({
    gradient: true,
    gradientColors: '#f093fb,#f5576c'
  });

  await generator.generateToFile('examples/output/programmatic-5b.png');
  console.log('   ✓ Second version generated with updated options\n');
}

/**
 * Example 6: Error handling
 */
async function example6(): Promise<void> {
  console.log('📌 Example 6: Error Handling');

  try {
    const generator = new QRGenerator({
      url: 'https://example.com',
      moduleRadius: 0.8 // Invalid value (must be 0.0-0.5)
    });

    await generator.generateToFile('examples/output/invalid.png');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log('   ✓ Error caught correctly:', errorMessage);
    console.log('   ℹ️  Validation prevents invalid configurations\n');
  }
}

// Create output directory
if (!fs.existsSync('examples/output')) {
  fs.mkdirSync('examples/output', { recursive: true });
}

// Run all examples
(async () => {
  try {
    console.log('═══════════════════════════════════════════════════\n');
    await example1();
    await example2();
    await example3();
    await example4();
    await example5();
    await example6();
    console.log('═══════════════════════════════════════════════════');
    console.log('\n🎉 All examples executed successfully!\n');
    console.log('💡 Check the code in examples/programmatic.ts');
    console.log('📁 Generated files in examples/output/\n');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Error executing examples:', errorMessage);
    process.exit(1);
  }
})();
