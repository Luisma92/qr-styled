# @qr-styled

QR Code generator with advanced styling support for Node.js and Browser environments.

## Packages

This monorepo contains multiple packages:

### [@qr-styled/node](./packages/node)

QR Code generator for Node.js with support for PNG, JPEG, and SVG export.

**Features:**

- ✅ PNG/JPEG generation using node-canvas
- ✅ SVG export
- ✅ Custom colors and gradients
- ✅ Logo support (circle/square)
- ✅ Eye customization
- ✅ Specialized QR types (vCard, WiFi, Email, SMS, Geo)

```bash
npm install @qr-styled/node
```

[View Documentation →](./packages/node/README.md)

### [@qr-styled/browser](./packages/browser)

QR Code generator for browser environments using HTML5 Canvas.

**Features:**

- ✅ Canvas-based rendering
- ✅ DataURL/Blob export
- ✅ Custom colors and gradients
- ✅ Logo support
- ✅ Eye customization
- ✅ Specialized QR types

```bash
npm install @qr-styled/browser
```

🎮 **[Try Live Demo](https://luisma92.github.io/qr-styled/)** | [View Documentation →](./packages/browser/README.md)

## Development

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Test all packages
npm run test

# Build specific package
npm run node:build
npm run browser:build

# Test specific package
npm run node:test
npm run browser:test
```

## Repository Structure

```
qr-styled/
├── packages/
│   ├── node/          # Node.js package (@qr-styled/node)
│   └── browser/       # Browser package (@qr-styled/browser)
├── package.json       # Root workspace configuration
└── README.md         # This file
```

## License

MIT © Luis Manuel Yerena Sosa
