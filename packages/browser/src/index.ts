export { QRGenerator, generateQR, generateQRToElement, generateQRAndDownload } from './lib/QRGenerator.js';
export type {
  QROptions,
  QRDataType,
  VCardData,
  WiFiData,
  EmailData,
  SMSData,
  GeoData
} from './lib/utils/types.js';
export {
  formatVCard,
  formatWiFi,
  formatEmail,
  formatSMS,
  formatGeo
} from './lib/utils/formatters.js';
