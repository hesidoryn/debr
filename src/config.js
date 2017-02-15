/**
 * Environment codes
 */
exports.DEV = 0;        // DEVELOPMENT
exports.DEVOPT = 1;     // DEVELOPMENT OPTIMIZED (bundling, minification etc.)
exports.PROD = 2;       // PRODUCTION
exports.STAGE = 3;      // STAGE

/**
 * Default config params
 */
exports.environment = exports.DEV;
exports.environmentName = null;
exports.port = 3001;

/**
 * Setup environment
 * @param env - Environment code
 */
exports.setup = function(env) {
  exports.environment = env;

  switch (env) {
  case exports.DEV: {
    exports.environmentName = 'DEVELOPMENT';
    break;
  }
  case exports.DEVOPT: {
    exports.environmentName = 'DEVELOPMENT_OPTIMIZED';
    break;
  }
  case exports.STAGE: {
    exports.environmentName = 'STAGE';
    break;
  }
  case exports.PROD: {
    exports.environmentName = 'PRODUCTION';
    break;
  }
  default: {
    /* eslint-disable no-console */
    console.log('Invalid environment code');
    /* eslint-enable no-console */
    process.exit(1);
  }
  }
};
