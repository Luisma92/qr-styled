import QRCode from 'qrcode';
import { createCanvas, Canvas } from 'canvas';
import fs from 'fs';
import { BackgroundRenderer } from './renderers/BackgroundRenderer.js';
import { GradientRenderer } from './renderers/GradientRenderer.js';
import { ModuleRenderer } from './renderers/ModuleRenderer.js';
import { LogoRenderer } from './renderers/LogoRenderer.js';
import { QROptions, DEFAULT_OPTIONS } from './utils/types.js';
import { validateOptions, normalizeOptions } from './utils/validators.js';

/**
 * QR Code Generator with advanced styling options
 */
export class QRGenerator {
  private options: Required<QROptions>;

  /**
   * Creates a new QR generator instance
   */
  constructor(options: QROptions) {
    this.options = normalizeOptions(
      options,
      DEFAULT_OPTIONS
    ) as Required<QROptions>;
    validateOptions(this.options);
  }

  /**
   * Generates QR code and returns the canvas
   */
  async generate(): Promise<Canvas> {
    const { url, errorCorrectionLevel, size, padding } = this.options;
    const qrSize = size - padding * 2;

    // Generate QR data
    const qrData = await QRCode.create(url, {
      errorCorrectionLevel
    });

    const modules = qrData.modules;
    const moduleCount = modules.size;
    const moduleSize = qrSize / moduleCount;

    // Create canvas
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Render background
    const backgroundRenderer = new BackgroundRenderer(ctx, this.options);
    backgroundRenderer.render();
    backgroundRenderer.applyClipping();

    // Create fill style (gradient or solid)
    const gradientRenderer = new GradientRenderer(ctx, this.options);
    const fillStyle = gradientRenderer.getFillStyle();

    // Render QR modules
    const moduleRenderer = new ModuleRenderer(ctx, modules, {
      ...this.options,
      moduleCount,
      moduleSize
    });
    moduleRenderer.render(fillStyle);

    backgroundRenderer.restoreClipping();

    // Render logo if provided
    if (this.options.logo) {
      const logoRenderer = new LogoRenderer(ctx, this.options);
      await logoRenderer.render(this.options.logo);
    }

    return canvas;
  }

  /**
   * Generates QR code and saves to file
   */
  async generateToFile(outputPath: string): Promise<void> {
    const canvas = await this.generate();
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
  }

  /**
   * Generates QR code and returns buffer
   */
  async generateToBuffer(format: 'png' | 'jpeg' = 'png'): Promise<Buffer> {
    const canvas = await this.generate();
    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    return canvas.toBuffer(mimeType as any);
  }

  /**
   * Generates QR code and returns data URL
   */
  async generateToDataURL(format: 'png' | 'jpeg' = 'png'): Promise<string> {
    const canvas = await this.generate();
    if (format === 'jpeg') {
      return canvas.toDataURL('image/jpeg');
    }
    return canvas.toDataURL('image/png');
  }

  /**
   * Updates generator options
   */
  updateOptions(options: Partial<QROptions>): void {
    this.options = normalizeOptions(
      { ...this.options, ...options },
      DEFAULT_OPTIONS
    ) as Required<QROptions>;
    validateOptions(this.options);
  }
}

/**
 * Helper function to quickly generate a QR code
 */
export async function generateQR(options: QROptions): Promise<Canvas> {
  const generator = new QRGenerator(options);
  return generator.generate();
}

/**
 * Helper function to quickly generate and save a QR code
 */
export async function generateQRToFile(
  options: QROptions,
  outputPath: string
): Promise<void> {
  const generator = new QRGenerator(options);
  return generator.generateToFile(outputPath);
}
