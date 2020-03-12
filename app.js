const express = require('express')
const path = require('path')
const httpStatus = require('./server/http_status')
const bodyParser = require('body-parser')
const applicationError = require('./server/util/applicationError')
const config = require('./config/config')
const indexRouter = require('./routes/index')
const timeout = require('connect-timeout')

const app = express()
app.use(require('cors')())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/* increase timeout for long ERC20 requests */
app.use(timeout('600s'))
app.use(function (req, res, next) {
  if (!req.timedout) next()
})

app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }))

app.use('/', indexRouter)

// api endpoints
require('./server/routes')(app)


// ensure crawlers don't generate errors and we disallow crawling
app.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error(`Not Found. Requested url: ${req.url}`);
  err.http_status_code = 404;
  next(err);
});

app.handleLogErrorToConsole = function (message) {
  console.log(message)
}

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message; // set locals, only providing error in development
  err.message = !err.message || err.message == "" ? httpStatus.STATUS_CODES[500] : err.message
  err.http_status_code = err.extra ? err.extra : err.http_status_code ? err.http_status_code : 500 // support legacy errors | todo remove this err.extra 400 check when service is using the new error pattern
  err.error_code = err.error_code ? err.error_code : 0
  err.error_context = err.context ? err.context : !err.error_context ? null : err.error_context

  let clientErrorMessage = !err.http_status_code || err.http_status_code == 500 ? httpStatus.STATUS_CODES[500] : err.message;
  let inDevMode = req.app.get('env') === 'local' || req.app.get('env') === 'development'

  // legacy error node is used by app and client need to leave this as messages only
  let error = inDevMode
    ? { message: err.message } // provide stack trace for local / development
    : { message: clientErrorMessage } // provide the message and internal error code to client

  // error detail will add more information and context to the legeacy error response (in its own node)
  let errorDetail = inDevMode
    ? { message: err.message, code: err.error_code, context: err.error_context, stack: err.stack } // provide stack trace for local / development
    : { message: clientErrorMessage, code: err.error_code } // provide the message and internal error code to client

  // if there are multiple associated errors (validation errors) then support legacy error response and put in collection at error level
  if (err.errors)
    error = err.errors;

  res.locals.error = error

  // render the error page
  res.status(err.http_status_code || 500).json({
    error: error,
    error_detail: errorDetail
  });

  if (err.http_status_code !== 404) {
    app.handleLogErrorToConsole(JSON.stringify(applicationError.formatErrorAsObject(err)))
  }
  else if (config.ERROR_LOG_404_ERRORS) {
    app.handleLogErrorToConsole(JSON.stringify(applicationError.formatErrorAsObject(err)))
  }
})

process.on('uncaughtException', function (err) {
  console.log(err);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

module.exports = app;
