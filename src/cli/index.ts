#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { QRGenerator } from '../lib/QRGenerator.js';
import chalk from 'chalk';

interface CLIArguments {
  url: string;
  out: string;
  size: number;
  color: string;
  logo: string;
  rounded: boolean;
  moduleRadius: number;
  logoPadding: number;
  logoShape: 'circle' | 'square';
  logoRadius: number;
  gradient: boolean;
  gradientColors: string;
  gradientAngle: number;
  padding: number;
  cornerRadius: number;
}

/**
 * CLI argument parser configuration
 */
export function buildCLI() {
  return yargs(hideBin(process.argv))
    .usage('Usage: $0 --url <text> [options]')
    .option('url', {
      type: 'string',
      demandOption: true,
      describe: 'URL or text for the QR code',
      alias: 'u'
    })
    .option('out', {
      type: 'string',
      default: 'qr.png',
      describe: 'Output file path',
      alias: 'o'
    })
    .option('size', {
      type: 'number',
      default: 600,
      describe: 'Canvas size in pixels'
    })
    .option('color', {
      type: 'string',
      default: '#000000',
      describe: 'QR code color (hex format)',
      alias: 'c'
    })
    .option('logo', {
      type: 'string',
      default: '',
      describe: 'Logo image path or URL',
      alias: 'l'
    })
    .option('rounded', {
      type: 'boolean',
      default: true,
      describe: 'Use rounded module corners'
    })
    .option('moduleRadius', {
      type: 'number',
      default: 0.35,
      describe: 'Module corner radius (0.0 - 0.5)'
    })
    .option('logoPadding', {
      type: 'number',
      default: 10,
      describe: 'Padding around logo'
    })
    .option('logoShape', {
      type: 'string',
      default: 'circle',
      choices: ['circle', 'square'] as const,
      describe: 'Logo background shape'
    })
    .option('logoRadius', {
      type: 'number',
      default: 20,
      describe: 'Corner radius for square logo background'
    })
    .option('gradient', {
      type: 'boolean',
      default: false,
      describe: 'Use gradient colors',
      alias: 'g'
    })
    .option('gradientColors', {
      type: 'string',
      default: '#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5',
      describe: 'Comma-separated gradient colors'
    })
    .option('gradientAngle', {
      type: 'number',
      default: 45,
      describe: 'Gradient angle in degrees (0-360)'
    })
    .option('padding', {
      type: 'number',
      default: 40,
      describe: 'Padding around QR code'
    })
    .option('cornerRadius', {
      type: 'number',
      default: 60,
      describe: 'Background corner radius'
    })
    .example('$0 --url "https://example.com"', 'Generate basic QR code')
    .example('$0 --url "https://example.com" --gradient', 'QR with gradient')
    .example('$0 --url "https://example.com" --logo ./logo.png', 'QR with logo')
    .help('h')
    .alias('h', 'help')
    .version()
    .alias('v', 'version')
    .strict() as yargs.Argv<CLIArguments>;
}

/**
 * Executes the CLI command
 */
export async function runCLI(): Promise<void> {
  try {
    const argv = await buildCLI().argv;

    // Extract output path and create options object for generator
    const { out, ...options } = argv;

    console.log(chalk.blue('🔄 Generating QR code...'));

    const generator = new QRGenerator(options);
    await generator.generateToFile(out);

    console.log(chalk.green(`✅ QR code generated successfully: ${out}`));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(chalk.red('❌ Error generating QR code:'), errorMessage);
    process.exit(1);
  }
}

// Run CLI if this file is executed directly
const isMainModule = process.argv[1] === new URL(import.meta.url).pathname;
if (isMainModule) {
  runCLI();
}
