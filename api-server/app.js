var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var app = express()

var news = require('./db/news.json')
var publications = require('./db/publications.json')
var openpositions = require('./db/openpositions.json')
var labPics = require('./db/labPics.json')
var fs = require('fs')
var comparePassword = require('./comparePassword')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser()) // req.headers => req.cookie
app.use(session({ // req.cookie => req.session
  name: 'cailab-homepage',
  secret: 'cailab-homepage', // for signing session
  store: new FileStore(), // store in a local file
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
    res.status(401).json({message: 'require login'})
  }
}

app.all('*', function (req, res, next) {
  // res.header('Access-Control-Allow-Origin','*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('Cache-Control','no-store')
  res.header('X-Powered-By', 'HilaryDeng')
  next()
})

app.post('/api/login', function (req, res, next) {
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

app.get('/api/myIdentity', (req, res) => {
  var sess = req.session
  if (sess.admin) {
    res.json({id: 'admin'})
  } else {
    res.json({id: 'guest'})
  }
})

// logout
app.post('/api/logout', function (req, res, next) {
  // req.session.admin = false
  let message
  if (req.session && req.session.admin) {
    message = 'admin logged out'
  } else {
    message = 'not logged in'
  }

  req.session.destroy(function (err) {
    if (err) {
      res.status(500).json({message: 'error in log out'})
      return
    }
    res.clearCookie('cailab-homepage')
    res.json({ message })
  })
})

app.use('/api/test', (req, res) => {
  res.json({'message':'hello world!'})
})

app.get('/api/news', (req, res) => {
  console.log(req.body)
  res.json(news)
})

app.get('/api/publications', (req, res) => {
  res.json(publications)
})

app.get('/api/openPositions', (req, res) => {
  res.json(openpositions)
})

app.get('/api/labPics', (req, res) => {
  res.json(labPics.map(fileName => '/static/labPics/' + fileName))
})

app.put('/api/publications', requireAdmin, (req, res) => {
  let json = JSON.stringify(req.body, null, 2)
  fs.writeFile('db/publications.json', json, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({err})
    } else {
      publications = req.body
      res.json({message: 'OK'})
    }
  })
  let date = new Date()
  fs.writeFile('db/publications_' + date.toISOString().replace(/:/g, '-') + '.json', json, 'utf-8', (err, data) => {
    if (err) console.log('backup failed')
  })
})

app.put('/api/news', requireAdmin, (req, res) => {
  let json = JSON.stringify(req.body, null, 2)
  fs.writeFile('db/news.json', json, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({err})
    } else {
      news = req.body
      res.json({message: 'OK'})
    }
  })
  let date = new Date()
  fs.writeFile('db/news_' + date.toISOString().replace(/:/g, '-') + '.json', json, 'utf-8', (err, data) => {
    if (err) console.log('backup failed')
  })
})

app.put('/api/openPositions', requireAdmin, (req, res) => {
  let json = JSON.stringify(req.body, null, 2)
  fs.writeFile('db/openpositions.json', json, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({err})
    } else {
      openpositions = req.body
      res.json({message: 'OK'})
    }
  })
  let date = new Date()
  fs.writeFile('db/openpositions_' + date.toISOString().replace(/:/g, '-') + '.json', json, 'utf-8', (err, data) => {
    if (err) console.log('backup failed')
  })
})
// -----------------------------------------API--------------------------------

// catch 404 and return error message
app.use(function (req, res, next) {
  res.status(404).json({message: 'error'})
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
