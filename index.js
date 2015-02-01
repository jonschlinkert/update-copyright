/**
 * update-copyright <https://github.com/jonschlinkert/update-copyright>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

var parseAuthor = require('parse-author');
var parseCopyright = require('parse-copyright');
var updateYear = require('update-year');
var extend = require('extend-shallow');
var omit = require('omit-empty');
var currentYear = +require('year')();
var leven = require('leven');
var jsdiff = require('diff');
var chalk = require('chalk');
var pkg = require('load-pkg');
var _ = require('lodash');

/**
 * Parse a copyright statement and return a new, updated
 * copyright statement.
 *
 * @param  {String} `str`
 * @param  {Object} `options`
 * @return {String}
 */

function updateCopyright (str, options) {
  return parse(str, options).updated;
}

function parse(str, options) {
  var opts = extend({}, options);
  var matches = parseCopyright(str);
  var len = matches.length;
  if (len === 0) { len = 1; }

  var res = '', i = -1;

  while (len--) {
    res += copyright(matches[++i], opts);
  }

  if (opts.diff) { diff(str, res); }
  var obj = {};
  obj.original = str;
  obj.matches = matches;
  obj.updated = res;
  return obj;
}

function getAuthor(match, opts) {
  if (!match.author) { return pkg.author; }

  var author = clean(match.author);
  if (pkg.author) {
    if (typeof pkg.author === 'string') {
      pkg.author = clean(parseAuthor(pkg.author).name);
    } else if (typeof pkg.author === 'object') {
      pkg.author = clean(pkg.author.name);
    }
    // detect probable misspellings
    if (leven(author, pkg.author) < (opts && opts.distance || 4)) {
      author = pkg.author;
    }
  }
  return author;
}

var template = '<%= prefix %><%= symbol ? (" " + symbol + " ") : "" %><%= years %>, <%= author %>.';


function copyright(match, options) {
  var defaults = {year: currentYear, prefix: 'Copyright', symbol: '(c)'};
  var opts = extend({verbose: true, template: template}, options);
  var ctx = extend(defaults, opts, omit(match));
  ctx.author = opts.author || getAuthor(ctx);
  ctx.years = opts.year || updateYear(ctx.dateRange || currentYear.toString());
  return _.template(opts.template)(ctx);
}

function diff(a, b) {
  jsdiff.diffChars(a, b).forEach(function (part) {
    var color = part.added ? chalk.green : (part.removed ? chalk.red : chalk.gray);
    process.stderr.write(color(part.value));
  });
  console.log();
}

function clean(str) {
  return str.replace(/^\W+|\W+$/g, '');
}


module.exports = updateCopyright;
module.exports.parse = parse;
