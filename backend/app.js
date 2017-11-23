var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var app = express()

var news = require('../db/news.json')
var publications = require('../db/publications.json')
var fs = require('fs')
var comparePassword = require('./comparePassword')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser()) // req.headers => req.cookie
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('dist'))
// app.use('/', index)
// app.use('/users', users)
app.use(session({   // req.cookie => req.session
  name: 'cailab-homepage',
  secret: 'cailab-homepage', // for signing session
  store: new FileStore(),  // store in a local file
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 3600 * 1000
  }
}))

// -----------------------------------------API--------------------------------

var requireAdmin = function (req, res, next) {
  var sess = req.session
  if (sess.admin) {
    next()
  } else {
    res.status(401).send({message: 'require login'})
  }
}

app.use('/api/test2', requireAdmin, function (req, res) {
  res.send({cookie: req.cookies, sess: req.session})
})

app.post('/api/login', function (req, res, next) {
  console.log(req.body)
  let password = req.body.password

  comparePassword(password).then(
    () => {
      req.session.regenerate(function (err) {
        if (err) {
          return res.status(500).json({message: 'can not login'})
        }
        req.session.admin = true
        console.log('logged in')
        res.json({message: 'OK'})
      })
    },
    (error) => {
      console.log('401 forbidden')
      res.status(401).json({message: error})
    }
  )
})

app.post('/api/myIdentity', (req, res) => {
  var sess = req.session
  if (sess.admin) {
    res.send({id: 'admin'})
  } else {
    res.send({id: 'guest'})
  }
})

// 退出登录
app.get('/api/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      res.status(500).json({message: 'error in log out'});
      return
    }
    req.session.admin = false
    res.clearCookie('cailab-homepage')
    res.redirect('/')
  })
})

app.use('/api/test/', (req, res) => {
  res.send('hello world!')
})

app.use('/api/listNews', (req, res) => {
  res.send(news)
})

app.use('/api/listPublications', (req, res) => {
  res.send(publications)
})

app.put('/api/updatePublications', requireAdmin, (req, res) => {
  let json = JSON.stringify(req.body, null, 2)
  publications = req.body
  fs.writeFile('db/publications.json', json, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send({err})
    } else {
      res.send({message: 'OK'})
    }
  })
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
