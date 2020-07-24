const Route = require('../../../services/mainRoute/route');
const _ = require('lodash');

exports = module.exports = function(app, db) {

    return new Route({
        url: '/buyer-products',

        fetchAllProducts: async function(user) {
            let products = await db.query(`SELECT * FROM product WHERE created_by != '${user.id}' ORDER BY product_name ASC`);

            for (let i = 0; i < products.length; i++) {
                const history = await db.query(`SELECT * FROM product_history WHERE buyer_id = '${user.id}' AND product_id = '${products[0].id}'`);
                products[0].history = history[0];
            }

            return  products;
        },

        callback: async function(req, res) {

            try {

                const user = req.user;

                const result = await this.fetchAllProducts(user);

                return res.status(200).json(result);

            } catch (ex) {
                return res.status(401).json(ex);
            }

        }
    });

};
