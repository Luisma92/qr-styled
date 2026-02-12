import {
  QROptions,
  VALID_LOGO_SHAPES,
  VALID_ERROR_CORRECTION_LEVELS
} from './types.js';

/**
 * Validates QR generation options
 * @throws {Error} If options are invalid
 */
export function validateOptions(options: QROptions): void {
  if (!options.url) {
    throw new Error('URL or text content is required');
  }

  if (options.size && (options.size < 100 || options.size > 5000)) {
    throw new Error('Size must be between 100 and 5000 pixels');
  }

  if (
    options.moduleRadius &&
    (options.moduleRadius < 0 || options.moduleRadius > 0.5)
  ) {
    throw new Error('Module radius must be between 0.0 and 0.5');
  }

  if (
    options.gradientAngle &&
    (options.gradientAngle < 0 || options.gradientAngle > 360)
  ) {
    throw new Error('Gradient angle must be between 0 and 360 degrees');
  }

  if (
    options.logoShape &&
    !VALID_LOGO_SHAPES.includes(options.logoShape as any)
  ) {
    throw new Error(
      `Logo shape must be one of: ${VALID_LOGO_SHAPES.join(', ')}`
    );
  }

  if (
    options.errorCorrectionLevel &&
    !VALID_ERROR_CORRECTION_LEVELS.includes(options.errorCorrectionLevel as any)
  ) {
    throw new Error(
      `Error correction level must be one of: ${VALID_ERROR_CORRECTION_LEVELS.join(', ')}`
    );
  }

  if (options.color && !/^#([0-9A-F]{3}){1,2}$/i.test(options.color)) {
    throw new Error('Color must be in hex format (e.g., #000000)');
  }

  if (options.gradientColors) {
    const colors = options.gradientColors.split(',').map(c => c.trim());
    colors.forEach(color => {
      if (!/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
        throw new Error(
          `Invalid gradient color: ${color}. Must be in hex format`
        );
      }
    });
  }
}

/**
 * Normalizes and merges options with defaults
 */
export function normalizeOptions<T extends Partial<QROptions>>(
  options: T,
  defaults: Partial<QROptions>
): T & Partial<QROptions> {
  return {
    ...defaults,
    ...options
  };
}
