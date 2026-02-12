import { QROptions } from '../utils/types.js';
import type { CanvasRenderingContext2D } from 'canvas';

/**
 * Handles background rendering for QR codes
 */
export class BackgroundRenderer {
  private ctx: CanvasRenderingContext2D;
  private options: Required<QROptions>;

  constructor(ctx: CanvasRenderingContext2D, options: Required<QROptions>) {
    this.ctx = ctx;
    this.options = options;
  }

  /**
   * Renders background with rounded corners
   */
  render(): void {
    const { size, cornerRadius, backgroundColor } = this.options;
    const ctx = this.ctx;

    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.moveTo(cornerRadius, 0);
    ctx.arcTo(size, 0, size, size, cornerRadius);
    ctx.arcTo(size, size, 0, size, cornerRadius);
    ctx.arcTo(0, size, 0, 0, cornerRadius);
    ctx.arcTo(0, 0, size, 0, cornerRadius);
    ctx.closePath();
    ctx.fill();
  }

  /**
   * Applies clipping path for rounded corners
   */
  applyClipping(): void {
    const { size, cornerRadius } = this.options;
    const ctx = this.ctx;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cornerRadius, 0);
    ctx.arcTo(size, 0, size, size, cornerRadius);
    ctx.arcTo(size, size, 0, size, cornerRadius);
    ctx.arcTo(0, size, 0, 0, cornerRadius);
    ctx.arcTo(0, 0, size, 0, cornerRadius);
    ctx.closePath();
    ctx.clip();
  }

  /**
   * Restores canvas context after clipping
   */
  restoreClipping(): void {
    this.ctx.restore();
  }
}
