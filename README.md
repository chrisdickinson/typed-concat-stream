# typed-concat-stream

like [concat-stream](http://npm.im/concat-stream), but for collecting
input into a single `Uint8Array`.

```javascript

var fs = require('fs')
  , concat = require('typed-concat-stream')

fs.createReadStream('/usr/share/dict/words')
  .pipe(concat())
  .on('data', function(typed_data) {
    // typed_data contains all of the data from 
    // /usr/share/dict/words
  })

```

## api

#### stream = concat([optional uint8array out])

creates a concat-stream. does not write into output until the
source stream emits `end` (so it might be slow!).

if `out` is provided, it'll use that variable to write into instead
of creating a new typed array instance.

# license

MIT
