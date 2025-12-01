import NodeCache from 'node-cache';

const ttl = Number(process.env.CACHE_TTL) || 3600;
const c = new NodeCache({ stdTTL: ttl });

const cache = {
  get: (k) => c.get(k),
  set: (k, v) => c.set(k, v),
  del: (k) => c.del(k)
};

export default cache;