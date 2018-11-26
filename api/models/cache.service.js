const NodeCache = require('node-cache');


exports.construct = ttlSeconds => {
  return new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
};

exports.getValues = (key, storeFunction, cache) => {
  const value = cache.get(key);
  
  if (value) {
    return Promise.resolve(value);
  }

  return storeFunction().then((result) => {
    cache.set(key, result);
    return result;
  });
}

exports.del = keys => {
  this.cache.del(keys);
}

exports.flush = () => {
  this.cache.flushAll();
}