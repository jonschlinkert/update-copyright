'use strict';

require('mocha');
var assert = require('assert');
var update = require('./');

describe('update', function() {
  it('should return a copyright statement with the current year', function() {
    assert.equal(update(), 'Copyright (c) 2016, Jon Schlinkert.');
  });

  it('should update the year', function() {
    assert.equal(update('Copyright (c) 2015, Jon Schlinkert.'), 'Copyright (c) 2015-2016, Jon Schlinkert.');
    assert.equal(update('Copyright (c) 2016, Jon Schlinkert.'), 'Copyright (c) 2016, Jon Schlinkert.');
  });

  it('should add a copyright symbol if it is missing', function() {
    assert.equal(update('Copyright 2014-2015, Jon Schlinkert.'), 'Copyright (c) 2014-2016, Jon Schlinkert.');
    assert.equal(update('Copyright 2016, Jon Schlinkert.'), 'Copyright (c) 2016, Jon Schlinkert.');
  });

  it('should correct the author using the one from package.json', function() {
    assert.equal(update('Copyright (c) 2013, Jon Schlinert.'), 'Copyright (c) 2013, 2016, Jon Schlinkert.');
    assert.equal(update('Copyright (c) 2013, Jon Shliner.'), 'Copyright (c) 2013, 2016, Jon Schlinkert.');
  });

  it('should use author passed on options', function() {
    assert.equal(update('Copyright (c) 2013, Jon Schlinert.', {author: 'Brian Woodward'}), 'Copyright (c) 2013, 2016, Brian Woodward.');
  });

  it('should update a range of years', function() {
    assert.equal(update('Copyright (c) 2013-2015, Jon Schlinkert.'), 'Copyright (c) 2013-2016, Jon Schlinkert.');
    assert.equal(update('Copyright (c) 2009, 2011-2015, Jon Schlinkert.'), 'Copyright (c) 2009, 2011-2016, Jon Schlinkert.');
  });

  it('should update a statement with multiple authors', function() {
    assert.equal(update('Copyright (c) 2013-2015, Jon Schlinkert, Brian Woodward.'), 'Copyright (c) 2013-2016, Jon Schlinkert, Brian Woodward.');
    assert.equal(update('Copyright (c) 2009, 2011-2015, Jon Schlinkert, Brian Woodward.'), 'Copyright (c) 2009, 2011-2016, Jon Schlinkert, Brian Woodward.');
  });

  it('should not update the year when already up to date', function() {
    assert.equal(update('Copyright (c) 2013-2016, Jon Schlinkert, Brian Woodward.'), 'Copyright (c) 2013-2016, Jon Schlinkert, Brian Woodward.');
    assert.equal(update('Copyright (c) 2013-2016, Jon Schlinkert, Brian Woodward.'), 'Copyright (c) 2013-2016, Jon Schlinkert, Brian Woodward.');
    assert.equal(update('Copyright (c) 2014, Brian Woodward.'), 'Copyright (c) 2014, 2016, Brian Woodward.');
    assert.equal(update('Copyright (c) 2016, Jon Schlinkert.'), 'Copyright (c) 2016, Jon Schlinkert.');
  });

  it('should allow an author to be passed', function() {
    assert.equal(update('Copyright (c) 2013, Jon Schlinkert, contributors.', {
      author: 'Jon Schlinkert'
    }), 'Copyright (c) 2013, 2016, Jon Schlinkert.');
  });

  it('should use a custom template', function() {
    var tmpl1 = '/* Copyright (c) <%= years %>, <%= author %>. */';

    assert.equal(update('Copyright (c) 2013, Jon Schlinkert, contributors.', {
      template: tmpl1, author: 'Jon Schlinkert'
    }), '/* Copyright (c) 2013, 2016, Jon Schlinkert. */');

    var tmpl2 = '/* Foo (c) <%= years %>, <%= author %>. */';
    assert.equal(update('Copyright (c) 2013, Jon Schlinkert, contributors.', {
      template: tmpl2, author: 'Jon Schlinkert'
    }), '/* Foo (c) 2013, 2016, Jon Schlinkert. */');
  });

  it('should add a complete copyright statement when part of it is missing', function() {
    var opts = {author: 'Jon Schlinkert'};
    assert.equal(update('Copyright (c) 2013.', opts), 'Copyright (c) 2013, 2016, Jon Schlinkert.');
    assert.equal(update('Copyright 2013', opts), 'Copyright (c) 2013, 2016, Jon Schlinkert.');
    assert.equal(update('Copyright 2013 Jeff Bob'), 'Copyright (c) 2013, 2016, Jeff Bob.');
    assert.equal(update('Copyright 2013-2014 Jeff Bob'), 'Copyright (c) 2013-2014, 2016, Jeff Bob.');
    assert.equal(update('Copyright 2013.', opts), 'Copyright (c) 2013, 2016, Jon Schlinkert.');
    assert.equal(update('Copyright (c) .', opts), 'Copyright (c) 2016, Jon Schlinkert.');
    assert.equal(update('Copyright .', opts), 'Copyright (c) 2016, Jon Schlinkert.');
    assert.equal(update('Copyright', opts), 'Copyright (c) 2016, Jon Schlinkert.');
    assert.equal(update('Copyright (c) .'), 'Copyright (c) 2016, Jon Schlinkert.');
  });
});

describe('parse', function() {
  it('should parse a copyright statement', function() {
    var parsed = update.parse('abc\n * Copyright (c) 2014-2016, Jon Schlinkert.\nxyz');
    assert.deepEqual(parsed, [{
      statement: 'Copyright (c) 2014-2016, Jon Schlinkert',
      prefix: 'Copyright',
      symbol: '(c)',
      dateRange: '2014-2016',
      first: '2014',
      latest: '2016',
      author: 'Jon Schlinkert'
    }]);
  });
});
