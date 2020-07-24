const _ = require('lodash');

function Route(options) {

    this.callback = _.noop;

    _.extend(this, _.isObject(options) ? options : {});
}

exports = module.exports = Route;
