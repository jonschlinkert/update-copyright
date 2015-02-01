/*!
 * update-copyright <http://github.com/helpers/update-copyright>
 *
 * Copyright (c) 2013-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

var assert = require('assert');
var update = require('./');

describe('update', function () {
  it('should update the year:', function () {
    assert.equal(update('Copyright (c) 2013, Jon Schlinkert.'), 'Copyright (c) 2013-2015, Jon Schlinkert.');
    // assert.equal(update('Copyright (c) 2014, Jon Schlinkert.'), 'Copyright (c) 2014-2015, Jon Schlinkert.');
    // assert.equal(update('Copyright (c) 2015, Jon Schlinkert.'), 'Copyright (c) 2015, Jon Schlinkert.');
  });

  // it('should allow an author to be passed:', function () {
  //   assert.equal(update('Copyright (c) 2013, Jon Schlinkert, contributors.', {
  //     author: 'Jon Schlinkert.'
  //   }), 'Copyright (c) 2013-2015, Jon Schlinkert.');
  // });

  // it('should add a complete copyright statement when part of it is missing:', function () {
  //   assert.equal(update('Copyright (c).', {
  //     author: 'Jon Schlinkert'
  //   }), 'Copyright (c) 2013-2015, Jon Schlinkert.');
  // });

  // it('should parse a copyright statement:', function () {
  //   var parsed = parse('abc\nCopyright (c) 2015, Jon Schlinkert.\nxyz');
  //   assert.deepEqual(parsed, [{
  //     statement: 'Copyright (c) 2015, Jon Schlinkert',
  //     prefix: 'Copyright',
  //     symbol: '(c)',
  //     dateRange: ['2015'],
  //     latest: '2015',
  //     author: 'Jon Schlinkert'
  //   }]);
  // });

  // it('should parse multiple copyright statements:', function () {
  //   var parsed = parse('abc\nCopyright (c) 2013, Jon Schlinkert.\nxyz\nabc\nCopyright (c) 2015, Jon Schlinkert.\nxyz');
  //   assert.deepEqual(parsed, [{
  //     statement: 'Copyright (c) 2013, Jon Schlinkert',
  //     prefix: 'Copyright',
  //     symbol: '(c)',
  //     dateRange: ['2013'],
  //     latest: '2013',
  //     author: 'Jon Schlinkert'
  //   }, {
  //     statement: 'Copyright (c) 2015, Jon Schlinkert',
  //     prefix: 'Copyright',
  //     symbol: '(c)',
  //     dateRange: ['2015'],
  //     latest: '2015',
  //     author: 'Jon Schlinkert'
  //   }]);
  // });

  // it('should parse a range of years:', function () {
  //   assert.deepEqual(parse('abc\nCopyright (c) 2013-2015, Jon Schlinkert.\nxyz'), [{
  //     statement: 'Copyright (c) 2013-2015, Jon Schlinkert',
  //     prefix: 'Copyright',
  //     symbol: '(c)',
  //     dateRange: ['2013', '2015'],
  //     latest: '2015',
  //     author: 'Jon Schlinkert'
  //   }]);
  //   assert.deepEqual(parse('#     Copyright (C) 1986-1993, 1998, 2004, 2007-2010 Some Guy'), [{
  //     statement: 'Copyright (C) 1986-1993, 1998, 2004, 2007-2010 Some Guy',
  //     prefix: 'Copyright',
  //     symbol: '(C)',
  //     dateRange: ['1986', '1993', '1998', '2004', '2007', '2010'],
  //     latest: '2010',
  //     author: 'Some Guy'
  //   }]);
  // });

  // it('should parse a statement without an author:', function () {
  //   assert.deepEqual(parse('#     Copyright (C) 1986-1993, 1998, 2004, 2007-2010'), [{
  //     statement: 'Copyright (C) 1986-1993, 1998, 2004, 2007-2010',
  //     prefix: 'Copyright',
  //     symbol: '(C)',
  //     dateRange: ['1986', '1993', '1998', '2004', '2007', '2010'],
  //     latest: '2010',
  //     author: ''
  //   }]);
  // });

  // it('should remove non-copyright material:', function () {
  //   assert.deepEqual(parse('." Copyright (c) 2011, Joyent, Inc.  All Rights Reserved.'), [{
  //     statement: 'Copyright (c) 2011, Joyent, Inc',
  //     prefix: 'Copyright',
  //     symbol: '(c)',
  //     dateRange: ['2011'],
  //     latest: '2011',
  //     author: 'Joyent, Inc'
  //   }]);
  // });

  // it('should parse complex statements:', function () {
  //   assert.deepEqual(parse('/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>'), [{
  //     statement: 'Copyright (C) 1999 Masanao Izumo ',
  //     prefix: 'Copyright',
  //     symbol: '(C)',
  //     dateRange: ['1999'],
  //     latest: '1999',
  //     author: 'Masanao Izumo'
  //   }]);
  // });

  // it('should return an empty array when no valid copyright statement is found:', function () {
  //   assert.deepEqual(parse('//   assert.equal(match("Copyright (c) 2013, Jon Schlinkert.")[0], "2013-2015");'), []);
  //   assert.deepEqual(parse('foo'), []);
  // });

});
