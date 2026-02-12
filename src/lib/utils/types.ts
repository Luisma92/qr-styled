/**
 * QR generation options interface
 */
export interface QROptions {
  /** URL or text content for the QR code */
  url: string;
  /** Canvas size in pixels */
  size?: number;
  /** Padding around QR code */
  padding?: number;
  /** QR code color (hex format) */
  color?: string;
  /** Path or URL to logo image */
  logo?: string;
  /** Use rounded module corners */
  rounded?: boolean;
  /** Module corner radius (0.0-0.5) */
  moduleRadius?: number;
  /** Padding around logo */
  logoPadding?: number;
  /** Logo background shape */
  logoShape?: 'circle' | 'square';
  /** Corner radius for square logo background */
  logoRadius?: number;
  /** Use gradient colors */
  gradient?: boolean;
  /** Comma-separated gradient colors */
  gradientColors?: string;
  /** Gradient angle in degrees (0-360) */
  gradientAngle?: number;
  /** Background corner radius */
  cornerRadius?: number;
  /** Background color */
  backgroundColor?: string;
  /** QR error correction level */
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
}

/**
 * Default configuration options for QR code generation
 */
export const DEFAULT_OPTIONS: Required<Omit<QROptions, 'url'>> = {
  size: 600,
  padding: 40,
  color: '#000000',
  logo: '',
  rounded: true,
  moduleRadius: 0.35,
  logoPadding: 10,
  logoShape: 'circle',
  logoRadius: 20,
  gradient: false,
  gradientColors: '#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5',
  gradientAngle: 45,
  cornerRadius: 60,
  backgroundColor: '#ffffff',
  errorCorrectionLevel: 'H'
};

/**
 * Valid logo shapes
 */
export const VALID_LOGO_SHAPES = ['circle', 'square'] as const;

/**
 * Valid error correction levels
 */
export const VALID_ERROR_CORRECTION_LEVELS = ['L', 'M', 'Q', 'H'] as const;

export type LogoShape = (typeof VALID_LOGO_SHAPES)[number];
export type ErrorCorrectionLevel =
  (typeof VALID_ERROR_CORRECTION_LEVELS)[number];
