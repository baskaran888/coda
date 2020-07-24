const massive = require('massive');

let db = null;

const fn = {
    databaseConnection: function() {
        return {
            host              : 'localhost',
            port              :  5433,
            user              : 'postgres',
            password          : '123456',
            database          : 'coda',
            min               : 1,
            max               : 3,
            idleTimeoutMillis : 20000
        };
    },

    dbConnect: async function(force) {
        if (!force && db) {
            return db;
        }

        db = await massive(fn.databaseConnection(), {enhancedFunctions: true});

        return db;
    }
};

exports = module.exports = fn;
