const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const dbInstance = require('./src/services/db');
const route = require('./src/services/mainRoute/routes');
const authentication = require('./src/services/authentication');

const cors = require('./src/services/cors');

const port = 4000;

async function appInit() {

    try {
        const db = await dbInstance.dbConnect();

        app.use(bodyParser.json());
        app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );

        app.all('*', cors);
        app.all('*', authentication(app, db));

        await route(app, db);

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}!`)
        });
    } catch (ex) {
        console.log(`Error connecting server ${ex}`);

    }
}

appInit();
