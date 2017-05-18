var assert = require('assert')
var download = require('..')
var read = require('fs-readdir-recursive')
var rm = require('rimraf').sync

describe('download-git-repo', function () {
  this.timeout(10000)
  var filter = function (x) {
    return x[0] !== '.' || x === ".git"
  }

  beforeEach(function () {
    rm('test/tmp')
  })

  describe('via github', function () {
    it('downloads the master branch by default', function (done) {
      download('github:flipxfx/download-git-repo-fixture', 'test/tmp', function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/master')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('downloads branches too', function (done) {
      download('github:flipxfx/download-git-repo-fixture#my-branch', 'test/tmp', function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/my-branch')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('clones the master branch by default', function (done) {
      download('github:flipxfx/download-git-repo-fixture', 'test/tmp', { clone: true }, function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/master')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('clones branches too', function (done) {
      download('github:flipxfx/download-git-repo-fixture#my-branch', 'test/tmp', { clone: true }, function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/my-branch')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('downloads branches with slashes', function (done) {
      download('github:flipxfx/download-git-repo-fixture#my/branch/with/slashes', 'test/tmp', function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/my-branch-with-slashes')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('downloads from github by default', function (done) {
      download('flipxfx/download-git-repo-fixture', 'test/tmp', function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/master')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('downloads the master branch with specific origin', function (done) {
      download('github:github.com:flipxfx/download-git-repo-fixture', 'test/tmp', function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/master')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('clones the master branch with specific origin and protocol', function (done) {
      download('github:https://github.com:flipxfx/download-git-repo-fixture', 'test/tmp', function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/master')
        assert.deepEqual(actual, expected)
        done()
      })
    })
  })

  describe('via gitlab', function () {
    it('downloads the master branch by default', function (done) {
      download('gitlab:flipxfx/download-git-repo-fixture', 'test/tmp', function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/master')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('downloads branches too', function (done) {
      download('gitlab:flipxfx/download-git-repo-fixture#my-branch', 'test/tmp', function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/my-branch')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('clones the master branch by default', function (done) {
      download('gitlab:flipxfx/download-git-repo-fixture', 'test/tmp', { clone: true }, function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/master')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('clones branches too', function (done) {
      download('gitlab:flipxfx/download-git-repo-fixture#my-branch', 'test/tmp', { clone: true }, function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/my-branch')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('errors when trying to download private repo', function (done) {
      download('gitlab:infinitesecond/for-my-flippy', 'test/tmp', function (err) {
        if (err) {
          if (err.message == "Response code 406 (Not Acceptable)")
            return done()
          else
            return done(err)
        }
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/master')
        assert.deepEqual(actual, expected)
        done()
      })
    })
  })

  describe('via bitbucket', function () {
    it('downloads the master branch by default', function (done) {
      download('bitbucket:flipxfx/download-git-repo-fixture', 'test/tmp', function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/master')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('downloads branches too', function (done) {
      download('bitbucket:flipxfx/download-git-repo-fixture#my-branch', 'test/tmp', function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/my-branch')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('clones the master branch by default', function (done) {
      download('bitbucket:flipxfx/download-git-repo-fixture', 'test/tmp', { clone: true }, function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/master')
        assert.deepEqual(actual, expected)
        done()
      })
    })

    it('clones branches too', function (done) {
      download('bitbucket:flipxfx/download-git-repo-fixture#my-branch', 'test/tmp', { clone: true }, function (err) {
        if (err) return done(err)
        var actual = read('test/tmp', filter)
        var expected = read('test/fixtures/my-branch')
        assert.deepEqual(actual, expected)
        done()
      })
    })
  })
})
