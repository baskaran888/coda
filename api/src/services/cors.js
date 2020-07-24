// constants/variables
const supportedMethods = [
  'GET',
  'PUT',
  'POST',
  'DELETE',
  'OPTIONS',
  'PATCH'
];
const supportedHeaders = [
  'Content-Type',
  'Authorization',
  'X-PINGOTHER',
  'X-File-Name',
  'X-Requested-With',
  'Cache-Control',
  'Accept',
  'Origin',
  'X-Session-ID'
];

// logic
exports = module.exports = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', supportedMethods.join(', '));
  res.setHeader('Access-Control-Allow-Headers', supportedHeaders.join(', '));

  // we allow ANY origins at this point
  res.setHeader('Access-Control-Allow-Origin', req.get('origin') || '*');

  // if this is a CORS options request, respond 200
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // otherwise, do nothing and continue on
  next();
};
