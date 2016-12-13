var chokidar = require('chokidar');
const readChunk = require('read-chunk'); // npm install read-chunk 
const fileType = require('file-type');
const mv = require('mv');
const path_object = require('path');

var log = console.log.bind(console);

var watcher = chokidar.watch('/Users/dsteplight/Downloads', {
  ignored: /[\/\\]\./, interval: 10000, persistent: true
});

watcher
  .on('add', function(path) { 

      const allowed_file_types = ["jpg", "jpeg" ];
      const buffer = readChunk.sync(path, 0, 262);
      var path_type = fileType(buffer);
      var file_name =  path_object.basename(path);
      const target_folder = '/Users/dsteplight/Documents/JPEG';
      var targeted_file = target_folder+path_object.sep+file_name;

         if( path_type !== null )
         {
            if( allowed_file_types.indexOf(path_type.ext) !== -1)
            {
               mv(path, targeted_file, function(err) {
                   log('This file has been moved to ', targeted_file); 
               });
            }
         }

   })
  .on('addDir', function(path) { 
  })
  .on('change', function(path) {

})
  .on('unlink', function(path) { 
  })
  .on('unlinkDir', function(path) { 
  })
  .on('error', function(error) { 
  })
  .on('ready', function() { log('Initial scan complete. Ready for changes.'); })

