const Route = require('../../../services/mainRoute/route');
const _ = require('lodash');
const moment = require('moment');

exports = module.exports = function(app, db) {

    return new Route({
        url: '/buy',

        buyAProduct: async function(product, user) {

            await db.query(`INSERT INTO product_history 
                  (product_id, owner_id, buyer_id, counter_price_request, counter_price_agree, created_at) 
                  VALUES 
                  ('${product.id}', '${product.created_by}', '${user.id}', ${true},
                    ${false}, '${moment(new Date()).format('YYYY-MM-DD HH:ss')}')`
            );

        },

        callback: async function(req, res) {

            try {

                const user = req.user;

                const product = req.body

                const result = await this.buyAProduct(product, user);

                return res.status(200).json({message: 'requested for Buy'});

            } catch (ex) {
                return res.status(401).json(ex);
            }

        }
    });

};
