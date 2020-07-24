const Route = require('../../services/mainRoute/route');
const _ = require('lodash');
const moment = require('moment');

exports = module.exports = function(app, db) {

    return new Route({
        url: '/product',

        addProduct: async function(product, user) {

            let productData = '';

            await db.query(`INSERT INTO product 
                  (product_name, product_category, description, actual_price, counter_price, created_by, created_at) 
                  VALUES 
                  ('${product.name}', '${product.category}', '${product.description}',
                    ${product.actualPrice}, ${product.counterPrice}, '${user.id}', '${moment(new Date()).format('YYYY-MM-DD HH:ss')}')`
            );

            return productData;
        },

        callback: async function(req, res) {

            try {

                const user = req.user;

                const product = req.body

                const result = await this.addProduct(product, user);

                return res.status(200).json(result);

            } catch (ex) {
                console.log('ex ', ex);
                return res.status(401).json(ex);
            }

        }
    });

};
