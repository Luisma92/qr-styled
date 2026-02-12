import { QROptions } from '../utils/types.js';

/**
 * Handles logo rendering on QR codes
 */
export class LogoRenderer {
  private ctx: CanvasRenderingContext2D;
  private options: Required<QROptions>;

  constructor(ctx: CanvasRenderingContext2D, options: Required<QROptions>) {
    this.ctx = ctx;
    this.options = options;
  }

  /**
   * Renders logo with background
   */
  async render(logo: string | HTMLImageElement): Promise<void> {
    if (!logo) return;

    let img: HTMLImageElement;

    if (typeof logo === 'string') {
      // Load image from URL
      img = await this.loadImage(logo);
    } else {
      img = logo;
    }

    const { size, logoPadding } = this.options;

    const logoSize = size * 0.25;
    const bgSize = logoSize + logoPadding;
    const centerX = size / 2;
    const centerY = size / 2;

    // Draw logo background
    this.drawLogoBackground(centerX, centerY, bgSize);

    // Draw logo with shadow
    this.drawLogoWithShadow(img, centerX, centerY, logoSize);
  }

  /**
   * Loads an image from URL
   */
  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  /**
   * Draws logo background (circle or rounded square)
   */
  private drawLogoBackground(
    centerX: number,
    centerY: number,
    bgSize: number
  ): void {
    const { logoShape, logoRadius, backgroundColor } = this.options;
    const ctx = this.ctx;

    ctx.fillStyle = backgroundColor;

    if (logoShape === 'circle') {
      ctx.beginPath();
      ctx.arc(centerX, centerY, bgSize / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Rounded square
      const squareX = centerX - bgSize / 2;
      const squareY = centerY - bgSize / 2;

      ctx.beginPath();
      ctx.moveTo(squareX + logoRadius, squareY);
      ctx.arcTo(
        squareX + bgSize,
        squareY,
        squareX + bgSize,
        squareY + bgSize,
        logoRadius
      );
      ctx.arcTo(
        squareX + bgSize,
        squareY + bgSize,
        squareX,
        squareY + bgSize,
        logoRadius
      );
      ctx.arcTo(squareX, squareY + bgSize, squareX, squareY, logoRadius);
      ctx.arcTo(squareX, squareY, squareX + bgSize, squareY, logoRadius);
      ctx.closePath();
      ctx.fill();
    }
  }

  /**
   * Draws logo with shadow effect
   */
  private drawLogoWithShadow(
    img: HTMLImageElement,
    centerX: number,
    centerY: number,
    logoSize: number
  ): void {
    const ctx = this.ctx;

    // Apply shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;

    // Draw logo
    const logoX = centerX - logoSize / 2;
    const logoY = centerY - logoSize / 2;
    ctx.drawImage(img, logoX, logoY, logoSize, logoSize);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }
}
