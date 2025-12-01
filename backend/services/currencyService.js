// ESM wrapper to re-export canonical CommonJS implementation
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const currency = require('./currencyService.cjs');
export const convertToINR = currency.convertToINR;
export default currency;