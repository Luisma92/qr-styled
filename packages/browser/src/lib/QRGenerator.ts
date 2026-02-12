import QRCode from 'qrcode';
import { BackgroundRenderer } from './renderers/BackgroundRenderer.js';
import { GradientRenderer } from './renderers/GradientRenderer.js';
import { ModuleRenderer } from './renderers/ModuleRenderer.js';
import { LogoRenderer } from './renderers/LogoRenderer.js';
import { SVGRenderer } from './renderers/SVGRenderer.js';
import { QROptions, DEFAULT_OPTIONS } from './utils/types.js';
import { validateOptions, normalizeOptions } from './utils/validators.js';
import { formatQRData } from './utils/formatters.js';

/**
 * QR Code Generator with advanced styling options for browsers
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

    // Support deprecated 'color' field with backward compatibility
    if (options.color && !options.foregroundColor) {
      this.options.foregroundColor = options.color;
    }

    validateOptions(this.options);
  }

  /**
   * Generates QR code content from options
   */
  private getQRContent(): string {
    const { type, url, data } = this.options;

    // Use formatter to handle different data types
    return formatQRData(type, url, data);
  }

  /**
   * Generates QR code and returns the canvas
   */
  async generate(): Promise<HTMLCanvasElement> {
    const { errorCorrectionLevel, size, padding, foregroundColor } =
      this.options;

    const qrSize = size - padding * 2;

    // Get formatted content based on type
    const content = this.getQRContent();

    // Generate QR data
    const qrData = await QRCode.create(content, {
      errorCorrectionLevel
    } as any);

    const modules = qrData.modules;
    const moduleCount = modules.size;
    const moduleSize = qrSize / moduleCount;

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get 2D context from canvas. Canvas API may not be supported in this environment.');
    }

    // Render background
    const backgroundRenderer = new BackgroundRenderer(ctx, this.options);
    backgroundRenderer.render();
    backgroundRenderer.applyClipping();

    // Create fill style (gradient or solid)
    const gradientRenderer = new GradientRenderer(ctx, this.options);
    const fillStyle = gradientRenderer.getFillStyle();

    // Render QR modules with eye customization support
    const moduleRenderer = new ModuleRenderer(ctx, modules, {
      ...this.options,
      color: foregroundColor, // Use new foregroundColor
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
   * Generates QR code and returns Blob
   */
  async generateToBlob(format: 'png' | 'jpeg' = 'png'): Promise<Blob> {
    const canvas = await this.generate();
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate blob'));
          }
        },
        format === 'jpeg' ? 'image/jpeg' : 'image/png'
      );
    });
  }

  /**
   * Generates QR code and downloads it as an image file
   */
  async download(filename: string = 'qrcode.png'): Promise<void> {
    const format =
      filename.endsWith('.jpeg') || filename.endsWith('.jpg') ? 'jpeg' : 'png';
    const dataURL = await this.generateToDataURL(format);

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    link.click();
  }

  /**
   * Generates QR code as SVG string
   */
  async generateToSVG(): Promise<string> {
    const { errorCorrectionLevel, size } = this.options;

    // Get formatted content based on type
    const content = this.getQRContent();

    // Generate QR data
    const qrData = await QRCode.create(content, {
      errorCorrectionLevel
    } as any);

    // Use SVG renderer
    const svgRenderer = new SVGRenderer(qrData, this.options, size);
    return svgRenderer.generate();
  }

  /**
   * Generates QR code as SVG and downloads it
   */
  async downloadSVG(filename: string = 'qrcode.svg'): Promise<void> {
    const svg = await this.generateToSVG();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  }

  /**
   * Appends the generated QR code canvas to a DOM element
   */
  async appendTo(element: HTMLElement): Promise<HTMLCanvasElement> {
    const canvas = await this.generate();
    element.appendChild(canvas);
    return canvas;
  }

  /**
   * Updates generator options
   */
  updateOptions(options: Partial<QROptions>): void {
    this.options = normalizeOptions(
      { ...this.options, ...options },
      DEFAULT_OPTIONS
    ) as Required<QROptions>;

    // Support deprecated 'color' field
    if (options.color && !options.foregroundColor) {
      this.options.foregroundColor = options.color;
    }

    validateOptions(this.options);
  }
}

/**
 * Helper function to quickly generate a QR code
 */
export async function generateQR(
  options: QROptions
): Promise<HTMLCanvasElement> {
  const generator = new QRGenerator(options);
  return generator.generate();
}

/**
 * Helper function to quickly generate and append QR code to DOM
 */
export async function generateQRToElement(
  options: QROptions,
  element: HTMLElement
): Promise<HTMLCanvasElement> {
  const generator = new QRGenerator(options);
  return generator.appendTo(element);
}

/**
 * Helper function to quickly generate and download QR code
 */
export async function generateQRAndDownload(
  options: QROptions,
  filename?: string
): Promise<void> {
  const generator = new QRGenerator(options);
  return generator.download(filename);
}
