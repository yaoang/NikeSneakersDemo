var express = require('express')
var http = require('http')
// var debug = require('debug')
const bodyParser = require('body-parser');

const app = express()
var port = process.env.PORT || '3000'
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = {
    sneakers: require('./routes/sneakers'),
    users: require('./routes/users')
}

function makeHandlerAwareOfAsyncErrors(handler) {
    return async function(req, res, next) {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    };
}

for (const [routeName, routeController] of Object.entries(routes)) {
    // console.log(routeName)
    // console.log(routeController)
    if(routeName === "sneakers") {
        app.get('/api/sneakers/getAll', makeHandlerAwareOfAsyncErrors(routeController.getAll))
        app.get(`/api/sneakers/:id`, makeHandlerAwareOfAsyncErrors(routeController.get))
        app.get('/api/sneakers/price/:id', makeHandlerAwareOfAsyncErrors(routeController.getPrice))
    }
}

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ', bind);
}