var test = require('tape')
  , concat = require('./index')
  , through = require('through')

test('test that it emits once at the end', function(assert) {
  var stream = through()
    , cstream = concat()
    , num = Math.random() * 1024 | 1 
    , size = Math.random() * 16 | 1
    , done = false
    , written = num

  stream.pipe(cstream)

  cstream.on('data', function(data) {
    if(!done) {
      assert.fail('should not emit yet')
    }
    assert.equal(data.length, size * num)
    assert.end()
  })

  while(written--) {
    var arr = []
    while(arr.length !== size) {
      arr[arr.length] = Math.random() * 0xFF | 0
    }
    stream.write(arr)
  }
  done = true
  stream.end()
})
