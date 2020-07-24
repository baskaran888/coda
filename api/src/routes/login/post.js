const Route = require('../../../src/services/mainRoute/route');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

exports = module.exports = function(app, db) {

    return new Route({
        url: '/login',

        generateJwt: async function(user) {
            const requiredOptions = {
                algorithm: 'HS256',
                issuer: 'api'
            };

            const payload = {
                type: 'access',
                userId: _.get(user, 'id', 0)
            };

            const authentication_key = 'fkjdfkjdshfkjsdhfkjldskfdshfdhkjfhwehqihiew';

            user.access_token = await jwt.sign(payload, authentication_key, requiredOptions);

            await db.query(`UPDATE users SET access_token = '${user.access_token}' WHERE id = ${user.id}`);

            return user;
        },

        fetchUser: async function(data) {
            const user = await db.query(`SELECT * FROM users WHERE email_id = '${data.email}' AND password = '${data.password}'`);

            return user[0];
        },

        callback: async function(req, res) {

            try {
                const body = req.body;

                let user = await this.fetchUser(body);

                user = await this.generateJwt(user);

                return res.status(200).json(user);

            } catch (ex) {
                console.log('ex ', ex)
                return res.status(401).json(ex);
            }

        }
    });

};
