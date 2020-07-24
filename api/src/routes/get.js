const Route = require('../../src/services/mainRoute/route');
const _ = require('lodash');

exports = module.exports = function(app, db) {

    return new Route({
        url: '/',

        callback: async function(req, res) {

            try {
                const data = {
                    status: 'ok',
                    authenticated: Boolean(req.user)
                };

                return res.status(200).json(data);

            } catch (ex) {
                return ex;
            }

        }
    });

};
