'use strict';

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('engine', 'Engine');
require('leven');
require('ansi-red', 'red');
require('ansi-green', 'green');
require('ansi-gray', 'gray');
require('mixin-deep', 'merge');
require('omit-empty');
require('parse-author');
require('parse-copyright');
require('update-year');
require = fn;

/**
 * Utils
 */

utils.strip = function(str) {
  return str.replace(/^\W+|\W+$/g, '');
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
