const Route = require('../../../services/mainRoute/route');
const _ = require('lodash');

exports = module.exports = function(app, db) {

    return new Route({
        url: '/search-products',

        fetchAllItems: async function(user, search, type) {
            let products;

            if (type === '1000') {
                products = await db.query(`SELECT * FROM product WHERE created_by = '${user.id}' AND product_name = '${search}'`);

                for (let i = 0; i < products.length; i++) {
                    const history = await db.query(`SELECT * FROM product_history WHERE owner_id = '${user.id}' AND product_id = '${products[0].id}'`);
                    products[0].history = history[0];
                }
            } else {
                products = await db.query(`SELECT * FROM product WHERE created_by != '${user.id}' AND product_name = '${search}'`);

                for (let i = 0; i < products.length; i++) {
                    const history = await db.query(`SELECT * FROM product_history WHERE buyer_id = '${user.id}' AND product_id = '${products[0].id}'`);
                    products[0].history = history[0];
                }
            }

            return  products;
        },

        callback: async function(req, res) {

            try {

                const user = req.user;
                const search = req.query.search;
                const type = req.query.type;

                const result = await this.fetchAllItems(user, search, type);

                return res.status(200).json(result);

            } catch (ex) {
                return res.status(401).json(ex);
            }

        }
    });

};
