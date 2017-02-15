require('./boot');
var config = require('./config');

var port = config.port;
var express = require('express');
var app = express();

/**
 * Lasso includes optional middleware for both Express and Koa that can be used to serve
 * up the static files that it generates:
 */
app.use(require('lasso/middleware').serveStatic());

app.use(function(req, res, next) {
  res.contentType('text/html');
  next();
});

app.get('/', require('./pages/home'));

app.listen(port, function() {
  /* eslint-disable no-console */
  console.log('Running %s environment', config.environmentName);
  console.log('Listening on port %d', port);
  /* eslint-enable no-console */

  // This is how we communicate to "browser-refresh"
  // that application is ready to start serving traffic:
  if ((config.environment !== config.PROD) && process.send) {
    process.send('online');
  }
});
