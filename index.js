module.exports = typed_concat

var through = require('through')
  , EE = require('events').EventEmitter

function typed_concat(out) {
  var buffer = []
    , push = buffer.push.bind(buffer)
    , stream = through(push, end)
    
  return stream

  function end() {
    var len = buffer.length
      , size = 0
      , i = 0
      , c = 0
      , getch
      , out

    if(!out) {
      for(; i < len; ++i) {
        size += buffer[i].length
      }
    }

    out = out || new Uint8Array(size)

    for(i = 0; i < len; ++i) {
      getch = getch || (buffer[i][0] === undefined ? bad_getch : good_getch)
      for(var x = 0; x < buffer[i].length; ++x) {
        out[c++] = getch(buffer[i], x)
      }
    }

    stream.queue(out)
    stream.queue(null)
  }
}

function good_getch(b, i) {
  return b[i]
}

function bad_getch(b, i) {
  return b.get(i)
}
