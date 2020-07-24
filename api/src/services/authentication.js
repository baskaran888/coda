const _ = require('lodash');
const jwt = require('jsonwebtoken');

exports = module.exports = function(app, db) {

  return async function(req, res, next) {
    try {
      let token;

      req.user = null;

      if (_.has(req.headers, 'authorization')) {
        token = req.headers.authorization.replace(/^bearer\s/i, '');
      } else if (_.has(req.query, 'token')) {
        token = req.query.token;
      } else {
        return next();
      }

      const payload = await jwt.decode(token);

      if (_.toLower(payload.type) !== 'access') {
        return next();
      }
      let user = await db.query(`SELECT * FROM users WHERE id = '${payload.userId}'`);

      if (!user[0].id) {
        return next();
      }
      req.user = user[0];

      return next();

    } catch (ex) {
      if (ex.message === 'Invalid token') {
        return next();
      }

      return next();
    }
  };

};
