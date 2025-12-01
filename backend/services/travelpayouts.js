// ESM wrapper that re-exports the canonical CommonJS implementation in travelpayouts.cjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const travelpayouts = require('./travelpayouts.cjs');
export default travelpayouts;
