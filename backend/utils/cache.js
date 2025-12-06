import NodeCache from "node-cache";
export default new NodeCache({
  stdTTL: Number(process.env.CACHE_TTL) || 3600
});
