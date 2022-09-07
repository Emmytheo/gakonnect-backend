/* eslint-disable no-console */
const https = require('https');
const logger = require('./logger')
const app = require('./app')
const port =  process.env.PORT || app.get('port')
const fs = require('fs');
const path = require("path");

// const server = app.listen(port)

const server = https.createServer({
  key: fs.readFileSync(path.resolve(__dirname, 'privatekey.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'certificate.pem'))
}, app).listen(port);

// Call app.setup to initialize all services and SocketIO
app.setup(server);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  logger.info('Feathers application started on https://%s:%d', app.get('host'), port)
)
