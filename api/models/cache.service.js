const NodeCache = require('node-cache');

exports.constructor = ttlSeconds => {
  this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
};

exports.get = (key, storeFunction) => {
  const value = this.cache.get(key);
  if (value) {
    return Promise.resolve(value);
  }

  return storeFunction().then((result) => {
    this.cache.set(key, result);
    return result;
  });
}

exports.del = (keys) => {
  this.cache.del(keys);
}

exports.flush = () => {
  this.cache.flushAll();
}