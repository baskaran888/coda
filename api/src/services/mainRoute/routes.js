const bPromise = require('bluebird');
const walker = require('walker');
const path = require('path');
const _ = require('lodash');

const Route = require('./route');

const routePath = path.join(__dirname, '../../routes/');

exports = module.exports = function(app, db) {
  return new bPromise(async function(resolve, reject) {
    const files = [];
    let extension;
    let basename;
    let route;
    let method;

    walker(routePath)
        .on('file', function(file) {
          extension = path.extname(file);

          files.unshift(file);
        })
        .on('error', function(error, entry, stat) {
          console.error('error',
              error, entry, stat);
          reject(error);
        })
        .on('end', function() {

          _.each(files, function(file) {
            extension = path.extname(file);
            basename = path.basename(file);
            route = require(file)(app, db);

            if (route instanceof Route) {
              method = basename.replace(extension, '');

              if (['get-all', 'get-one'].includes(_.toLower(method))) {
                method = 'get';
              }

              return app[method](route.url,
                  route.callback.bind(route));
            }

          });

          return resolve();
        });


  })
};
