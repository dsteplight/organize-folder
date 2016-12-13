var chokidar = require('chokidar');
const readChunk = require('read-chunk'); // npm install read-chunk 
const fileType = require('file-type');

var log = console.log.bind(console);

var watcher = chokidar.watch('/Users/dsteplight/Downloads', {
  ignored: /[\/\\]\./, interval: 10000, persistent: true
});

watcher
  .on('add', function(path) { 
 const buffer = readChunk.sync(path, 0, 262);
var path_type = fileType(buffer);

         if( path_type !== null ){
            log('File', path_type.ext, 'has been added'); 
         }

   })
  .on('addDir', function(path) { log('Directory', path, 'has been added'); })
  .on('change', function(path) {
 const buffer = readChunk.sync(path, 0, 262);
var path_type = fileType(buffer);
       log('File', path_type, 'has been changed'); 
})
  .on('unlink', function(path) { log('File', path, 'has been removed'); })
  .on('unlinkDir', function(path) { log('Directory', path, 'has been removed'); })
  .on('error', function(error) { log('Error happened', error); })
  .on('ready', function() { log('Initial scan complete. Ready for changes.'); })

