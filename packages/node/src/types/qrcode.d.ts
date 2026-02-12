declare module 'qrcode' {
  export interface QRCodeSegment {
    data: string;
    mode: string;
  }

  export interface QRCodeOptions {
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
    version?: number;
    maskPattern?: number;
    toSJISFunc?: (codePoint: string) => number;
  }

  export interface QRCodeData {
    modules: {
      size: number;
      data: Uint8Array;
      get(row: number, col: number): number;
    };
    version: number;
  }

  export function create(
    text: string | QRCodeSegment[],
    options?: QRCodeOptions
  ): Promise<QRCodeData>;

  export function toCanvas(
    canvas: HTMLCanvasElement,
    text: string | QRCodeSegment[],
    options?: QRCodeOptions
  ): Promise<void>;

  export function toDataURL(
    text: string | QRCodeSegment[],
    options?: QRCodeOptions
  ): Promise<string>;

  export function toString(
    text: string | QRCodeSegment[],
    options?: QRCodeOptions
  ): Promise<string>;

  export function toBuffer(
    text: string | QRCodeSegment[],
    options?: QRCodeOptions
  ): Promise<Buffer>;
}
