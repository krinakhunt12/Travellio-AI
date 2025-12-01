// ESM wrapper to re-export canonical CommonJS fallback
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serpapi = require('./serpapi.cjs');
export default serpapi;