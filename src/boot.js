/**
 * The following line allows application-level modules to be required as if
 * they were installed into the node_modules directory.
 * IMPORTANT: The search path should be modified before any modules are loaded!
 *
 * Instead of this:
 *    var module = require('../../../module')
 *
 * You can write this:
 *    var module = require('src/path/to/module')
 */
require('app-module-path').addPath(__dirname + '/..');

/**
 * Marko provides a custom Node.js require extension that allows Marko templates
 * to be require'd just like a standard JavaScript module.
 *
 * Instead of this:
 *     var template = require('marko').load(require.resolve('./template.marko'));
 *
 * You can write:
 *     var template = require('./template.marko');
 */
require('marko/node-require').install();

/**
 * Dependencies can be "required" inside a JavaScript module as shown in the following
 * sample JavaScript code:
 *
 *    require('./style.less');
 *
 * The only caveat to using a require() call to add a non-JavaScript module dependency is
 * that by default Node.js will try to load the required file as a JavaScript module if the
 * code runs on the server. To prevent Node.js from trying to load a Less file or other
 * non-JavaScript files as JavaScript modules you enable 'no-op' for the following extensions:
 */
require('lasso/node-require-no-op').enable('.less', '.css');


// Configure command line arguments
var yargs = require('yargs');
var argv = yargs
  .usage(
    'Run in production mode:\n' +
    '  $0 --prod \n\n' +
    'Run in stage mode:\n' +
    '  $0 --stage \n\n' +
    'Run in development mode:\n' +
    '  $0                        ')
  .option('prod',   { alias: 'p', describe: 'Run site in production mode' })
  .option('stage',  { alias: 's', describe: 'Run site in stage mode' })
  .option('dev',    { describe: 'Run site in development mode (default)' })
  .option('devopt', { describe: 'Run site in development mode with optimizations (bundling, minification etc.)' })
  .option('help',   { alias: 'h', describe: 'Show help' })
  .argv;

// Show help if --help arg is used
if (argv.help) {
  /* eslint-disable no-console */
  console.log(yargs.help());
  /* eslint-enable no-console */
  process.exit();
}

var config = require('./config');
if (argv.prod) {
  config.setup(config.PROD);
} else if (argv.stage) {
  config.setup(config.STAGE);
} else if (argv.devopt) {
  config.setup(config.DEVOPT);
} else {
  config.setup(config.DEV);
}

// Prepare lasso config
var lassoConfig = {
  plugins: [
    'lasso-marko',      // Auto compile Marko template files
    'lasso-less'        // Add support for Less files
  ],

  // Directory where generated JS and CSS bundles are written
  outputDir: require('path').join(__dirname, '../build/static'),

  // URL prefix to prepend to relative assets and bundle paths
  urlPrefix: '/static',

  // If "bundlingEnabled" is set to true then dependencies will be concatenated
  // together into one or more bundles. If set to false then each dependency
  // will be written to a separate file. (defaults to true)
  bundlingEnabled: false,

  // If "minify" is set to true then output CSS and JavaScript will run
  // through a minification transform. (defaults to false)
  minify: false,

  // If fingerprints are enabled then a shasum will be included in the URL.
  // This feature is used for cache busting.
  fingerprintsEnabled: false,

  // If you want consistent bundles across pages then those shared bundles
  // can be specified below. If a page dependency is part of a shared
  // bundle then the shared bundle will be added to the page (instead of
  // adding the dependency to the page bundle).
  bundles : [
    {
      name : 'common',
      dependencies : [
        './src/layouts/base/browser.json'
      ]
    }
  ]
};

// Enable optimization for all environments, except DEVELOPMENT
if (config.environment === config.PROD ||
    config.environment === config.STAGE ||
    config.environment === config.DEVOPT) {

  lassoConfig.cacheProfile = 'production';
  lassoConfig.minify = true;
  lassoConfig.fingerprintsEnabled = true;
  lassoConfig.bundlingEnabled = true;
}

// Special configuration for PRODUCTION environment
if (config.environment === config.PROD) {
  lassoConfig.urlPrefix = '//static.paralect.com/static';
}

// Configure the Lasso.js
require('lasso').configure(lassoConfig);
