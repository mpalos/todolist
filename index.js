/**
 * Dependências do módulo
 */
const config = require('./config/config');
const restify = require('restify');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');

/**
 * Inicialização do servidor
 */
const server = restify.createServer({
    name: config.name,
    version: config.version,
});

/**
 * Middleware
 */
server.use(restifyPlugins.jsonBodyParser({mapParams: true}));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({mapParams: true}));
server.use(restifyPlugins.fullResponse());

/**
 * Inicia servidor, conecta no BD e requisita rotas
 */
server.listen(config.port, () => {
    // conecta no mongoDB
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db.uri, {useMongoClient: true});

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error(err);
        process.exit(1);
    });

    db.once('open', () => {
        require('./routes')(server);
        console.log(`Server is listening on port ${config.port}`);

    })


})