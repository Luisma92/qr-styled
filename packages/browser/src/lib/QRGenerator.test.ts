import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QRGenerator, generateQR } from './QRGenerator.js';

// Mock canvas context for testing
const mockContext = {
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
  save: vi.fn(),
  restore: vi.fn(),
  beginPath: vi.fn(),
  closePath: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  clip: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  arcTo: vi.fn(),
  arc: vi.fn(),
  fillRect: vi.fn(),
  strokeRect: vi.fn(),
  rect: vi.fn(),
  quadraticCurveTo: vi.fn(),
  bezierCurveTo: vi.fn(),
  drawImage: vi.fn(),
  createLinearGradient: vi.fn(() => ({
    addColorStop: vi.fn()
  })),
  createRadialGradient: vi.fn(() => ({
    addColorStop: vi.fn()
  })),
  shadowColor: '',
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  globalAlpha: 1,
  globalCompositeOperation: 'source-over'
};

// Mock canvas
const mockCanvas = {
  width: 0,
  height: 0,
  getContext: vi.fn(() => mockContext),
  toDataURL: vi.fn((type: string) => `data:${type};base64,mockeddata`),
  toBlob: vi.fn((callback: any, type: string) => {
    callback(new Blob(['mock'], { type }));
  })
};

// Override document.createElement for canvas
const originalCreateElement = document.createElement.bind(document);
document.createElement = ((tagName: string) => {
  if (tagName === 'canvas') {
    return mockCanvas as any;
  }
  return originalCreateElement(tagName);
}) as any;

describe('QRGenerator (Browser)', () => {
  describe('Constructor', () => {
    it('should create a QRGenerator instance with basic options', () => {
      const qr = new QRGenerator({
        url: 'https://example.com',
        size: 400
      });

      expect(qr).toBeInstanceOf(QRGenerator);
    });

    it('should create a QRGenerator with custom colors', () => {
      const qr = new QRGenerator({
        url: 'https://example.com',
        foregroundColor: '#FF0000',
        backgroundColor: '#FFFFFF'
      });

      expect(qr).toBeInstanceOf(QRGenerator);
    });

    it('should throw error for invalid options', () => {
      expect(() => {
        new QRGenerator({
          url: 'https://example.com',
          size: -100
        });
      }).toThrow();
    });
  });

  describe('generate()', () => {
    beforeEach(() => {
      // Reset canvas dimensions
      mockCanvas.width = 0;
      mockCanvas.height = 0;
    });

    it('should generate an HTMLCanvasElement', async () => {
      const qr = new QRGenerator({
        url: 'https://example.com',
        size: 400
      });

      const canvas = await qr.generate();

      expect(canvas).toBe(mockCanvas);
      expect(mockCanvas.width).toBe(400);
      expect(mockCanvas.height).toBe(400);
    });

    it('should generate with custom size', async () => {
      const qr = new QRGenerator({
        url: 'https://example.com',
        size: 600
      });

      const canvas = await qr.generate();

      expect(mockCanvas.width).toBe(600);
      expect(mockCanvas.height).toBe(600);
    });

    it('should generate with gradient', async () => {
      const qr = new QRGenerator({
        url: 'https://example.com',
        size: 400,
        gradient: true,
        gradientColors: '#FF0000, #0000FF'
      });

      const canvas = await qr.generate();

      expect(canvas).toBe(mockCanvas);
      expect(mockContext.createLinearGradient).toHaveBeenCalled();
    });

    it('should generate with rounded modules', async () => {
      const qr = new QRGenerator({
        url: 'https://example.com',
        size: 400,
        rounded: true,
        moduleRadius: 0.5
      });

      const canvas = await qr.generate();

      expect(canvas).toBe(mockCanvas);
    });
  });

  describe('generateToDataURL()', () => {
    it('should generate a PNG data URL', async () => {
      const qr = new QRGenerator({
        url: 'https://example.com',
        size: 400
      });

      const dataURL = await qr.generateToDataURL('png');

      expect(dataURL).toContain('data:image/png;base64,');
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png');
    });

    it('should generate a JPEG data URL', async () => {
      const qr = new QRGenerator({
        url: 'https://example.com',
        size: 400
      });

      const dataURL = await qr.generateToDataURL('jpeg');

      expect(dataURL).toContain('data:image/jpeg;base64,');
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/jpeg');
    });
  });

  describe('generateToBlob()', () => {
    it('should generate a PNG blob', async () => {
      const qr = new QRGenerator({
        url: 'https://example.com',
        size: 400
      });

      const blob = await qr.generateToBlob('png');

      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('image/png');
      expect(mockCanvas.toBlob).toHaveBeenCalled();
    });

    it('should generate a JPEG blob', async () => {
      const qr = new QRGenerator({
        url: 'https://example.com',
        size: 400
      });

      const blob = await qr.generateToBlob('jpeg');

      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('image/jpeg');
      expect(mockCanvas.toBlob).toHaveBeenCalled();
    });
  });

  describe('generateToSVG()', () => {
    it('should generate SVG string', async () => {
      const qr = new QRGenerator({
        url: 'https://example.com',
        size: 400
      });

      const svg = await qr.generateToSVG();

      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    });

    it('should generate SVG with custom colors', async () => {
      const qr = new QRGenerator({
        url: 'https://example.com',
        size: 400,
        foregroundColor: '#FF0000',
        backgroundColor: '#FFFFFF'
      });

      const svg = await qr.generateToSVG();

      expect(svg).toContain('fill="#FF0000"');
      expect(svg).toContain('fill="#FFFFFF"');
    });
  });

  describe('updateOptions()', () => {
    it('should update options', async () => {
      const qr = new QRGenerator({
        url: 'https://example.com',
        size: 400
      });

      qr.updateOptions({
        foregroundColor: '#00FF00'
      });

      const canvas = await qr.generate();
      expect(canvas).toBe(mockCanvas);
    });
  });

  describe('Helper functions', () => {
    it('generateQR should work', async () => {
      const canvas = await generateQR({
        url: 'https://example.com',
        size: 400
      });

      expect(canvas).toBe(mockCanvas);
      expect(mockCanvas.width).toBe(400);
    });
  });
});
