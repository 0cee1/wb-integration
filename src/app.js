const express = require('express');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const { PORT } = require('../base');
const { sendMediaMessage } = require('./utils/apiCalls');
const { textAlertTemplate } = require('./utils/template');
const path = require('path');
const knex = require('./models/objection');
require('./cron/blog.job');





function createApp(routes) {
    const app = express();
    const env = 'development';
    const port = PORT || 4000;

    initializeMiddlewares(app);
    initializeRoutes(app, routes);

    return {
        listen: () => {
            const server = app.listen(port, () => {
                console.log(`🚀 App listening on the port ${port}`);
                console.log(`================================`);
            });
        },
        getServer: () => app,
    };
}

function initializeMiddlewares(app) {
    app.use(cors());
    app.use(helmet());
    app.use(hpp());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/public', express.static(path.join(__dirname, '..', 'public')));
}

function initializeRoutes(app, routes) {
    routes.forEach(route => {
        app.use('/api', route);
    });
}


module.exports = createApp;
