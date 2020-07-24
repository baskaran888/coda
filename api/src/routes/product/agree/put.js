const Route = require('../../../services/mainRoute/route');
const _ = require('lodash');

const email = require('../../../services/mail');

exports = module.exports = function(app, db) {

    return new Route({
        url: '/agree/:id',

        agreeAProduct: async function(product, user) {

            await db.query(`UPDATE product_history SET counter_price_agree = ${true} WHERE id = '${product.history.id}'`);

            const buyerWalletAmount = await db.query(`SELECT balance FROM wallet WHERE user_id = '${product.history.buyer_id}'`);

            const ownerWalletAmount = await db.query(`SELECT balance FROM wallet WHERE user_id = '${product.history.owner_id}'`);

            const buyerWalletBalance = buyerWalletAmount[0].balance - product.counter_price;

            const ownerWalletBalance = ownerWalletAmount[0].balance + product.counter_price;

            await db.query(`UPDATE wallet SET balance = ${ownerWalletBalance} WHERE user_id = '${product.history.owner_id}'`);

            await db.query(`UPDATE wallet SET balance = ${buyerWalletBalance} WHERE user_id = '${product.history.buyer_id}'`);

        },

        callback: async function(req, res) {

            try {

                const user = req.user;

                const product = req.body

                const result = await this.agreeAProduct(product, user);

                const toMail = await db.query(`SELECT email_id FROM users WHERE id = '${product.history.buyer_id}'`);

                const payload = {
                    email: toMail[0].email_id
                }

                await email.send(payload);

                return res.status(200).json(result);

            } catch (ex) {
                return res.status(401).json(ex);
            }

        }
    });

};
