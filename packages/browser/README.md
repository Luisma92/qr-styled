# @qr-styled/browser

[![npm version](https://img.shields.io/npm/v/@qr-styled/browser.svg)](https://www.npmjs.com/package/@qr-styled/browser)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A professional browser QR code generator library with advanced styling options including **gradients**, **rounded modules**, **logo support**, **specialized QR types** (vCard, WiFi, Email, SMS, Geo), and **eye customization**.

## Features

✅ **Browser-native** - Uses HTML5 Canvas API
✅ **PNG/JPEG export** - Download or convert to Blob/DataURL
✅ **SVG support** - Vector graphics export
✅ **Custom colors & gradients** - Multi-color linear gradients
✅ **Logo integration** - Circle/square shapes, customizable size
✅ **Eye customization** - Custom colors and corner radius
✅ **Rounded modules** - Smooth, professional appearance
✅ **Specialized QR types** - vCard, WiFi, Email, SMS, Geo
✅ **TypeScript** - Full type safety
✅ **Zero dependencies** - Only `qrcode` library

## Installation

```bash
npm install @qr-styled/browser
```

## Quick Start

```typescript
import { QRGenerator } from '@qr-styled/browser';

const qr = new QRGenerator({
  url: 'https://example.com',
  size: 400,
  foregroundColor: '#1a73e8',
  backgroundColor: '#ffffff',
  rounded: true
});

// Append to DOM
await qr.appendTo(document.body);

// Download as PNG
await qr.download('qrcode.png');

// Get as Blob
const blob = await qr.generateToBlob();

// Get as Data URL
const dataURL = await qr.generateToDataURL();
```

## API Reference

### Constructor

```typescript
new QRGenerator(options: QROptions)
```

### Methods

#### `generate(): Promise<HTMLCanvasElement>`
Generates and returns the QR code canvas element.

#### `appendTo(element: HTMLElement): Promise<HTMLCanvasElement>`
Generates the QR code and appends it to the specified DOM element.

#### `generateToDataURL(format?: 'png' | 'jpeg'): Promise<string>`
Generates a data URL of the QR code.

#### `generateToBlob(format?: 'png' | 'jpeg'): Promise<Blob>`
Generates a Blob of the QR code image.

#### `download(filename?: string): Promise<void>`
Generates and downloads the QR code as an image file.

#### `generateToSVG(): Promise<string>`
Generates an SVG string of the QR code.

#### `downloadSVG(filename?: string): Promise<void>`
Generates and downloads the QR code as an SVG file.

#### `updateOptions(options: Partial<QROptions>): void`
Updates the generator options.

### Helper Functions

```typescript
// Quick generation
import { generateQR, generateQRToElement, generateQRAndDownload } from '@qr-styled/browser';

// Generate canvas
const canvas = await generateQR({ url: 'https://example.com' });

// Generate and append to DOM
const canvas = await generateQRToElement({ url: 'https://example.com' }, document.body);

// Generate and download
await generateQRAndDownload({ url: 'https://example.com' }, 'qrcode.png');
```

## Options

### Basic Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `url` | `string` | - | URL or text content |
| `type` | `QRDataType` | `'url'` | Type of QR data |
| `size` | `number` | `400` | Canvas size in pixels |
| `foregroundColor` | `string` | `'#000000'` | QR code color |
| `backgroundColor` | `string` | `'#ffffff'` | Background color |
| `padding` | `number` | `20` | Canvas padding |
| `margin` | `number` | `4` | QR quiet zone (modules) |
| `errorCorrectionLevel` | `'L'\|'M'\|'Q'\|'H'` | `'M'` | Error correction |

### Styling Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `rounded` | `boolean` | `false` | Use rounded corners |
| `moduleRadius` | `number` | `0.5` | Module corner radius (0-0.5) |
| `cornerRadius` | `number` | `30` | Background corner radius |
| `gradient` | `boolean` | `false` | Enable gradient |
| `gradientColors` | `string` | - | Comma-separated colors |
| `gradientAngle` | `number` | `45` | Gradient angle |

### Logo Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `logo` | `string\|HTMLImageElement` | - | Logo path/URL or image element |
| `logoSize` | `number` | - | Logo size override |
| `logoPadding` | `number` | `20` | Padding around logo |
| `logoShape` | `'circle'\|'square'` | `'circle'` | Logo background shape |
| `logoRadius` | `number` | `10` | Square logo corner radius |

### Eye Customization

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `eyeColor` | `string` | - | Custom eye (finder) color |
| `eyeRadius` | `number` | - | Custom eye corner radius |

## Examples

### Basic QR Code

```typescript
const qr = new QRGenerator({
  url: 'https://example.com',
  size: 400
});

await qr.appendTo(document.getElementById('qr-container'));
```

### Gradient QR Code

```typescript
const qr = new QRGenerator({
  url: 'https://example.com',
  size: 400,
  gradient: true,
  gradientColors: '#667eea, #764ba2, #f093fb',
  gradientAngle: 135,
  rounded: true
});

await qr.download('gradient-qr.png');
```

### QR Code with Logo

```typescript
const qr = new QRGenerator({
  url: 'https://example.com',
  size: 400,
  foregroundColor: '#1a73e8',
  logo: 'https://example.com/logo.png',
  logoShape: 'circle',
  rounded: true
});

const blob = await qr.generateToBlob();
```

### Using HTMLImageElement

```typescript
const img = new Image();
img.src = 'logo.png';
await img.decode();

const qr = new QRGenerator({
  url: 'https://example.com',
  size: 400,
  logo: img
});

await qr.appendTo(document.body);
```

### vCard Contact QR

```typescript
import { QRGenerator, formatVCard } from '@qr-styled/browser';

const qr = new QRGenerator({
  type: 'vcard',
  data: {
    firstName: 'John',
    lastName: 'Doe',
    organization: 'Company Inc.',
    phone: '+1234567890',
    email: 'john@example.com',
    url: 'https://johndoe.com'
  },
  size: 400,
  gradient: true,
  gradientColors: '#667eea, #764ba2'
});

await qr.download('contact.png');
```

### WiFi QR Code

```typescript
const qr = new QRGenerator({
  type: 'wifi',
  data: {
    ssid: 'MyNetwork',
    password: 'mypassword',
    encryption: 'WPA'
  },
  size: 400,
  foregroundColor: '#2196f3'
});

await qr.appendTo(document.body);
```

### SVG Export

```typescript
const qr = new QRGenerator({
  url: 'https://example.com',
  size: 400,
  foregroundColor: '#ff5722'
});

const svg = await qr.generateToSVG();
console.log(svg); // SVG string

// Or download directly
await qr.downloadSVG('qrcode.svg');
```

### Custom Eyes

```typescript
const qr = new QRGenerator({
  url: 'https://example.com',
  size: 400,
  foregroundColor: '#000000',
  eyeColor: '#ff0000',
  eyeRadius: 0.5,
  rounded: true
});

await qr.download();
```

## Specialized QR Types

### Email

```typescript
const qr = new QRGenerator({
  type: 'email',
  data: {
    email: 'hello@example.com',
    subject: 'Hello',
    body: 'Message body'
  }
});
```

### SMS

```typescript
const qr = new QRGenerator({
  type: 'sms',
  data: {
    phone: '+1234567890',
    message: 'Hello from QR'
  }
});
```

### Geolocation

```typescript
const qr = new QRGenerator({
  type: 'geo',
  data: {
    latitude: 40.7128,
    longitude: -74.0060
  }
});
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

Requires support for:
- HTML5 Canvas API
- ES2020+ features
- Promises/async-await

## Related Packages

- [@qr-styled/node](../node) - Node.js version with PNG/JPEG file export

## License

MIT © Luis Manuel Yerena Sosa

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Repository

[https://github.com/Luisma92/qr-styled](https://github.com/Luisma92/qr-styled)
