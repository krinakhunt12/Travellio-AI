const NodeCache = require("node-cache");
module.exports = new NodeCache({
  stdTTL: Number(process.env.CACHE_TTL) || 3600
});
