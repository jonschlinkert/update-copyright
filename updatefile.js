'use strict';

var copyright = require('./');
var regex = require('copyright-regex');

module.exports = function(app, base, env) {
  var options = base.option('copyright') || {};

  base.onLoad(/index\.js$/, function(file, next) {
    var str = file.contents.toString();
    var re = regex();

    if (!re.test(str)) {
      return next();
    }

    var parsed = copyright.parse(str);

    // console.log(parsed)

    next();
  });
};
