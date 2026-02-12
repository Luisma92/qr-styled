import * as esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  // Build the bundle for the demo
  await esbuild.build({
    entryPoints: [join(__dirname, 'src/index.ts')],
    bundle: true,
    outfile: join(__dirname, 'dist/bundle.js'),
    format: 'esm',
    platform: 'browser',
    target: 'es2020',
    minify: true,
    sourcemap: true,
    external: []
  });

  console.log('✅ Demo bundle created successfully at dist/bundle.js');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
