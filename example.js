'use strict';

var update = require('./');

var str = [
  '/*!',
  ' * foo <https://github.com/jonschlinkert/foo>',
  ' *',
  ' * Copyright (c) 2014, Jon Schlinkert.',
  ' * Licensed under the MIT License.',
  ' */'
].join('\n');

console.log(update(str))
