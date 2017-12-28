#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var app = express()

var news = require('../db/news.json')
var publications = require('../db/publications.json')
var openpositions = require('../db/openpositions.json')
var fs = require('fs')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser()) // req.headers => req.cookie
app.use(express.static('dist'))


// -----------------------------------------API--------------------------------

app.use('/api/listNews', (req, res) => {
  console.log(req.body)
  res.send(news)
})

app.use('/api/listPublications', (req, res) => {
  res.send(publications)
})

app.use('/api/listOpenPositions', (req, res) => {
  res.send(openpositions)
})

app.use('/api/listLabPics', (req, res) => {
  let dir = './static/labPics'
  fs.readdir(dir, (err, files) => {
    if (err) {
      res.status(500).send({err})
    } else {
      files = files.filter(fileName => /.*\.jpg$/.test(fileName))
      for (let x in files) {
        files[x] = path.posix.join('/static/labPics', files[x])
      }
      console.log(files)
      res.send(files)
    }
  })
})

app.use('/favicon.ico', (req, res) => {
  res.sendFile('favicon.ico', { root: path.resolve(__dirname, '../') })
})
app.use('/robots.txt', (req, res) => {
  res.sendFile('robots.txt', { root: path.resolve(__dirname, '../') })
})
// -----------------------------------------API--------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send({message: 'error'})
})

var debug = require('debug')('backend:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort('3001');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
