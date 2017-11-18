var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var index = require('./routes/index')
var users = require('./routes/users')

var app = express()

var news = require('../db/news.json')
var publications = require('../db/publications.json')
var alumni = require('../db/alumni.json')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', index)
// app.use('/users', users)
app.use(express.static('dist'))

// -----------------------------------------API--------------------------------
app.use('/api/test/', (req, res) => {
  res.send('hello world!')
})

app.use('/api/listNews', (req, res) => {
  res.send(news)
})

app.use('/api/listPublications', (req, res) => {
  res.send(publications)
})

app.use('/api/alumni', (req, res) => {
  res.send(alumni)
})
// -----------------------------------------API--------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send({message: 'error'})
})

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })

module.exports = app
