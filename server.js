'use strict'

// Basic node express server for local testing
var PORT     = 4444,
    express  = require('express'),
    path     = require('path')

var app = express()

app.configure(function () {
  app.set('port', process.env.PORT || PORT)
  app.use(express.static(path.join(__dirname, '.')))
})

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'))
})
