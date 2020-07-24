const Route = require('../../../src/services/mainRoute/route');
const _ = require('lodash');

exports = module.exports = function(app, db) {

    return new Route({
        url: '/balance',

        getBal: async function(user) {
            let balance = await db.query(`SELECT balance FROM wallet WHERE user_id = '${user.id}'`);

            return  balance[0];
        },

        callback: async function(req, res) {

            try {

                const user = req.user;

                const result = await this.getBal(user);

                return res.status(200).json(result);

            } catch (ex) {
                return ex;
            }

        }
    });

};
