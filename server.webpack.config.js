'use strict';
const path = require('path');
// List of allowed environments
const allowedEnvs = ['development', 'production', 'test'];

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Get an allowed environment
 * @param  {String}  env
 * @return {String}
 */
function getValidEnv(env) {
  const isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1;
  return isValid ? env : 'development';
}

/**
 * Build the webpack configuration
 * @param  {String} env Environment to use
 * @return {Object} Webpack config
 */
function buildConfig(env) {
  const config = require(path.resolve(__dirname, 'cfg','server', getValidEnv(env)));
  return config;
}

module.exports = buildConfig(process.env.NODE_ENV);
