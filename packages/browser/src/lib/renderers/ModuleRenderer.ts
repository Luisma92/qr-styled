import { QROptions } from '../utils/types.js';

interface QRModules {
  size: number;
  get(row: number, col: number): number;
}

interface RenderOptions extends Required<QROptions> {
  moduleCount: number;
  moduleSize: number;
}

interface CornerRounding {
  roundTL: boolean;
  roundTR: boolean;
  roundBR: boolean;
  roundBL: boolean;
}

interface EdgeExtensions {
  extendTop: number;
  extendRight: number;
  extendBottom: number;
  extendLeft: number;
}

/**
 * Handles QR module rendering with rounded corners
 */
export class ModuleRenderer {
  private ctx: CanvasRenderingContext2D;
  private modules: QRModules;
  private options: RenderOptions;

  constructor(
    ctx: CanvasRenderingContext2D,
    modules: QRModules,
    options: RenderOptions
  ) {
    this.ctx = ctx;
    this.modules = modules;
    this.options = options;
  }

  /**
   * Checks if a module exists at given position
   */
  private hasModule(row: number, col: number): boolean {
    const { moduleCount } = this.options;
    if (row < 0 || row >= moduleCount || col < 0 || col >= moduleCount) {
      return false;
    }
    return this.modules.get(row, col) === 1;
  }

  /**
   * Checks if position is part of finder pattern (eye)
   */
  private isPartOfEye(row: number, col: number): boolean {
    const { moduleCount } = this.options;
    // Top-left eye
    if (row < 7 && col < 7) return true;
    // Top-right eye
    if (row < 7 && col >= moduleCount - 7) return true;
    // Bottom-left eye
    if (row >= moduleCount - 7 && col < 7) return true;
    return false;
  }

  /**
   * Renders all QR modules
   */
  render(fillStyle: string | CanvasGradient): void {
    const { rounded, eyeShape } = this.options;
    this.ctx.fillStyle = fillStyle;

    // Handle circular eyes separately
    if (eyeShape === 'circle') {
      this.renderModulesExcludingEyes(fillStyle, rounded);
      this.renderCircularEyes();
    } else {
      // Normal rendering with square or rounded eyes
      if (rounded) {
        this.renderRoundedModules();
      } else {
        this.renderSquareModules();
      }
    }
  }

  /**
   * Renders modules excluding eye areas (for circular eyes)
   */
  private renderModulesExcludingEyes(
    fillStyle: string | CanvasGradient,
    rounded: boolean
  ): void {
    const { moduleCount, moduleSize, padding, moduleRadius } = this.options;
    const ctx = this.ctx;
    ctx.fillStyle = fillStyle;

    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        // Skip eye modules
        if (this.isPartOfEye(row, col)) continue;

        if (this.modules.get(row, col)) {
          const x = padding + col * moduleSize;
          const y = padding + row * moduleSize;

          if (rounded) {
            const cornerRadius = moduleSize * moduleRadius;
            const top = this.hasModule(row - 1, col);
            const right = this.hasModule(row, col + 1);
            const bottom = this.hasModule(row + 1, col);
            const left = this.hasModule(row, col - 1);

            const roundTL = !top && !left;
            const roundTR = !top && !right;
            const roundBR = !bottom && !right;
            const roundBL = !bottom && !left;

            const gap = 0.5;
            const extendTop = top ? gap : 0;
            const extendRight = right ? gap : 0;
            const extendBottom = bottom ? gap : 0;
            const extendLeft = left ? gap : 0;

            this.drawRoundedModule(
              x,
              y,
              moduleSize,
              cornerRadius,
              { roundTL, roundTR, roundBR, roundBL },
              { extendTop, extendRight, extendBottom, extendLeft }
            );
          } else {
            ctx.fillRect(x, y, moduleSize, moduleSize);
          }
        }
      }
    }
  }

  /**
   * Renders circular finder patterns (eyes)
   */
  private renderCircularEyes(): void {
    const { moduleCount, moduleSize, padding, eyeColor, backgroundColor } =
      this.options;
    const ctx = this.ctx;

    // Define the 3 eye positions (center of 7x7 area)
    const eyePositions = [
      { row: 3, col: 3 }, // Top-left
      { row: 3, col: moduleCount - 4 }, // Top-right
      { row: moduleCount - 4, col: 3 } // Bottom-left
    ];

    eyePositions.forEach(({ row, col }) => {
      const centerX = padding + col * moduleSize;
      const centerY = padding + row * moduleSize;

      // Outer ring (7 modules diameter = 3.5 radius)
      ctx.fillStyle = eyeColor || ctx.fillStyle;
      ctx.beginPath();
      ctx.arc(centerX, centerY, moduleSize * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // White space (5 modules diameter = 2.5 radius)
      ctx.fillStyle = backgroundColor;
      ctx.beginPath();
      ctx.arc(centerX, centerY, moduleSize * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Inner dot (3 modules diameter = 1.5 radius)
      ctx.fillStyle = eyeColor || ctx.fillStyle;
      ctx.beginPath();
      ctx.arc(centerX, centerY, moduleSize * 1.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  /**
   * Renders modules with rounded corners
   */
  private renderRoundedModules(): void {
    const {
      moduleCount,
      moduleSize,
      padding,
      moduleRadius,
      eyeColor,
      eyeRadius
    } = this.options;
    const ctx = this.ctx;

    // Save the original fill style
    const originalFillStyle = ctx.fillStyle;

    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (this.modules.get(row, col)) {
          const x = padding + col * moduleSize;
          const y = padding + row * moduleSize;

          // Determine if this is part of an eye (finder pattern)
          const isEye = this.isPartOfEye(row, col);

          // Use eye-specific color if available
          if (isEye && eyeColor) {
            ctx.fillStyle = eyeColor;
          } else {
            // Restore original fill style for non-eye modules
            ctx.fillStyle = originalFillStyle;
          }

          // Use eye-specific radius if available, otherwise use moduleRadius
          const cornerRadius =
            isEye && eyeRadius !== undefined && eyeRadius > 0
              ? moduleSize * eyeRadius
              : moduleSize * moduleRadius;

          // Check adjacent modules
          const top = this.hasModule(row - 1, col);
          const right = this.hasModule(row, col + 1);
          const bottom = this.hasModule(row + 1, col);
          const left = this.hasModule(row, col - 1);

          // Determine which corners to round
          const roundTL = !top && !left;
          const roundTR = !top && !right;
          const roundBR = !bottom && !right;
          const roundBL = !bottom && !left;

          // Small extension to eliminate gaps
          const gap = 0.5;
          const extendTop = top ? gap : 0;
          const extendRight = right ? gap : 0;
          const extendBottom = bottom ? gap : 0;
          const extendLeft = left ? gap : 0;

          this.drawRoundedModule(
            x,
            y,
            moduleSize,
            cornerRadius,
            { roundTL, roundTR, roundBR, roundBL },
            { extendTop, extendRight, extendBottom, extendLeft }
          );
        }
      }
    }
  }

  /**
   * Draws a single module with selectively rounded corners
   */
  private drawRoundedModule(
    x: number,
    y: number,
    size: number,
    radius: number,
    corners: CornerRounding,
    extensions: EdgeExtensions
  ): void {
    const ctx = this.ctx;
    const { roundTL, roundTR, roundBR, roundBL } = corners;
    const { extendTop, extendRight, extendBottom, extendLeft } = extensions;

    ctx.beginPath();

    // Top-left corner
    if (roundTL) {
      ctx.moveTo(x + radius - extendLeft, y - extendTop);
    } else {
      ctx.moveTo(x - extendLeft, y - extendTop);
    }

    // Top side and top-right corner
    if (roundTR) {
      ctx.lineTo(x + size - radius + extendRight, y - extendTop);
      ctx.quadraticCurveTo(
        x + size + extendRight,
        y - extendTop,
        x + size + extendRight,
        y + radius - extendTop
      );
    } else {
      ctx.lineTo(x + size + extendRight, y - extendTop);
    }

    // Right side and bottom-right corner
    if (roundBR) {
      ctx.lineTo(x + size + extendRight, y + size - radius + extendBottom);
      ctx.quadraticCurveTo(
        x + size + extendRight,
        y + size + extendBottom,
        x + size - radius + extendRight,
        y + size + extendBottom
      );
    } else {
      ctx.lineTo(x + size + extendRight, y + size + extendBottom);
    }

    // Bottom side and bottom-left corner
    if (roundBL) {
      ctx.lineTo(x + radius - extendLeft, y + size + extendBottom);
      ctx.quadraticCurveTo(
        x - extendLeft,
        y + size + extendBottom,
        x - extendLeft,
        y + size - radius + extendBottom
      );
    } else {
      ctx.lineTo(x - extendLeft, y + size + extendBottom);
    }

    // Left side and close path
    if (roundTL) {
      ctx.lineTo(x - extendLeft, y + radius - extendTop);
      ctx.quadraticCurveTo(
        x - extendLeft,
        y - extendTop,
        x + radius - extendLeft,
        y - extendTop
      );
    } else {
      ctx.lineTo(x - extendLeft, y - extendTop);
    }

    ctx.closePath();
    ctx.fill();
  }

  /**
   * Renders simple square modules
   */
  private renderSquareModules(): void {
    const { moduleCount, moduleSize, padding, eyeColor } = this.options;
    const ctx = this.ctx;

    // Save the original fill style
    const originalFillStyle = ctx.fillStyle;

    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (this.modules.get(row, col)) {
          const x = padding + col * moduleSize;
          const y = padding + row * moduleSize;

          // Use eye-specific color if this is part of an eye
          if (this.isPartOfEye(row, col) && eyeColor) {
            ctx.fillStyle = eyeColor;
          } else {
            // Restore original fill style for non-eye modules
            ctx.fillStyle = originalFillStyle;
          }

          ctx.fillRect(x, y, moduleSize, moduleSize);
        }
      }
    }
  }
}
