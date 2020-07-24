const Route = require('../../../services/mainRoute/route');
const _ = require('lodash');
const moment = require('moment');

exports = module.exports = function(app, db) {

    return new Route({
        url: '/request',

        buyAProduct: async function(product, user) {

            await db.query(`INSERT INTO product 
                  (product_name, product_category, description, actual_price, counter_price, created_by, created_at) 
                  VALUES 
                  ('${product.name}', '${product.category}', '${product.description}',
                    ${product.actualPrice}, ${product.counterPrice}, '${user.id}', '${moment(new Date()).format('YYYY-MM-DD HH:ss')}')`
            );

        },

        callback: async function(req, res) {

            try {

                const user = req.user;

                const product = req.body

                const result = this.buyAProduct(product, user);

                return res.status(200).json(result);

            } catch (ex) {
                return res.status(401).json(ex);
            }

        }
    });

};
