require('./boot');

// Enable logging for 'lasso-marko-extras'
require('raptor-logging').configure({
  loggers: {
    'lasso-marko-extras': 'INFO'
  }
});

// Build static assets
require('lasso-marko-extras').build({
  baseDir: __dirname,
  files: [
    'layouts/base/assets/favicon.ico'
  ],
  pages: [
    'pages/home'
  ]
});
