var allowed = [
  '127.0.0.1'
];

if (process.env.HIVE_ALLOWED_IPS)
  allowed.push.apply(allowed, process.env.HIVE_ALLOWED_IPS.split(','));

module.exports = allowed;