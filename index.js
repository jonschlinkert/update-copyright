/**
 * update-copyright <https://github.com/jonschlinkert/update-copyright>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

var parse = require('parse-copyright');
var extend = require('extend-shallow');
var currentYear = +require('year')();
var jsdiff = require('diff');
var chalk = require('chalk');


module.exports = function update(str, options) {
  var opts = extend({year: currentYear, verbose: true}, options);
  var re = new RegExp('(Copyright[^\\d]*)(20\\d{2})([^\\n]+)', 'i');

  var matches = parse(str);
  console.log(matches)

  // var match = str.match(re) || [];

  // var prefix = opts.prefix || match[1];
  // var author = cleanAuthor(opts.author || match[3]);
  // var prev = opts.prev || match[2] || opts.year;
  // var year = opts.year;

  // var range = (+prev === +year ? year : (prev + '-' + year)).toString();
  // var updated = (prefix + range + formatAuthor(author));
  // var orig = match[0];
  // str = str.replace(orig, updated);

  // var ctx = {};
  // ctx.prefix = prefix;
  // ctx.author = author;
  // ctx.prev = prev;
  // ctx.year = year;

  // ctx.range = range;
  // ctx.updated = updated;
  // ctx.original = orig;
  // render(ctx);

  // if (opts.verbose === true) {
  //   diff(orig, updated);
  //   // console.log(prev + ' => ' + range);
  // }
  return str;
};


function render(context) {
  console.log(context)
}

function diff(a, b) {
  jsdiff.diffChars(a, b).forEach(function (part) {
    var color = part.added
      ? chalk.green
      : (part.removed ? chalk.red : chalk.gray);

    process.stderr.write(color(part.value));
  });
  console.log()
}

function formatAuthor(str) {
  return ', ' + str + '.';
}

var template = '<%= prefix %><%= symbol ? ' ' + symbol + ' ' %><%= date %>, <%= author %>.';
