/**
 * update-copyright <https://github.com/jonschlinkert/update-copyright>
 *
 * Copyright (c) 2014, Jon Schlinkert.
 * Licensed under the MIT license.
 */

var currentYear = +require('year')();
var regex = require('copyright-regex');
var pkg = require('load-pkg')(process.cwd());
var utils = require('./utils');

/**
 * Parse a copyright statement and return a new, updated
 * copyright statement.
 *
 * @param  {String} `str`
 * @param  {Object} `options`
 * @return {String}
 */

function updateCopyright(str, options) {
  if (typeof str === 'undefined') {
    str = 'Copyright';
  }
  return parse(str, options).updated;
}

function parse(str, options) {
  var orig = detect(str);
  orig = str;
  var opts = utils.merge({}, options);
  var match = utils.parseCopyright(orig);
  var res = copyright(match[0], opts);
  var replaced = str.split(orig).join(res);

  var obj = {};
  obj.input = str;
  obj.orig = orig;
  obj.match = match[0];
  obj.revised = res;
  obj.updated = replaced;
  return obj;
}

function getAuthor(match, opts) {
  if (!match.author) {
    return pkg.author;
  }

  var author = utils.strip(match.author);
  if (pkg.author) {
    if (typeof pkg.author === 'string') {
      pkg.author = utils.strip(utils.parseAuthor(pkg.author).name);
    } else if (typeof pkg.author === 'object') {
      pkg.author = utils.strip(pkg.author.name);
    }
    // detect probable misspellings
    if (utils.leven(author, pkg.author) < (opts && opts.distance || 4)) {
      author = pkg.author;
    }
  }

  author = author.replace(/contributors/, '');
  author = utils.strip(author);
  return author;
}

var defaults = {
  year: currentYear,
  prefix: 'Copyright',
  symbol: '(c)'
};

var template = '<%= prefix %><%= symbol ? (" " + symbol + " ") : "" %><%= years %>, <%= author %>.';

function copyright(match, options) {
  var opts = utils.merge({verbose: true, template: template}, options);
  var engine = new utils.Engine(opts);

  var ctx = utils.merge({}, defaults, opts, utils.omitEmpty(match));
  ctx.years = opts.year || utils.updateYear(ctx.dateRange || currentYear.toString());
  ctx.author = getAuthor(ctx);

  return engine.render(opts.template, ctx);
}

function detect(str) {
  var lines = str.split('\n');
  var len = lines.length;
  var re = regex();

  while (len--) {
    var line = lines[len];
    line = line.replace(/^[- \t\W._]+/, '');
    if (/[^\w]Copyright.*\d{4}/.test(line)) {
      return line;
    }
  }
  return '';
}

module.exports = updateCopyright;
module.exports.parse = parse;
