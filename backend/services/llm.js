// ESM wrapper to re-export canonical CommonJS fallback
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const llm = require('./llm.cjs');
export default llm;