'use strict';
var chokidar = require('chokidar');
const readChunk = require('read-chunk'); // npm install read-chunk 
const fileType = require('file-type');
const mv = require('mv');
const path_object = require('path');
var fs = require('fs');
var Buffer = require('buffer').Buffer;

var log = console.log.bind(console);

var config = {};
  config['watched_folder'] = '/Users/dsteplight/Downloads';
  config['jpeg_folder'] = '/Users/dsteplight/Documents/JPEG';
  config['pdf_folder'] = '/Users/dsteplight/Documents/PDF';

for (var key in config) 
{
   if ((typeof config[key]) != 'undefined' && key != 'watched_folder') { 
       console.log(config[key]);
   } 
}

var watcher = chokidar.watch(config.watched_folder, {
  ignored: /[\/\\]\./, 
  interval: 10000, 
  persistent: true,
  depth: 0
});

watcher
  .on('add', function(path) { 

      //const buffer = readChunk.sync(path, 0, 262);
      //var path_type = fileType(buffer);

      const allowed_file_types = [".jpg", ".jpeg"];
      const file_name = path_object.basename(path);
      const file_type = path_object.extname(path);
      
      const target_folder = config.jpeg_folder;
      const targeted_file = target_folder+path_object.sep+file_name;
         if( file_type !== null )
         {
            if( allowed_file_types.indexOf(file_type) !== -1)
            {

               mv(path, targeted_file, function(err) {
                   log('This file has been moved to ', targeted_file); 
               });

            }
         }

   })
  .on('addDir', function(path) { 
  //       console.log(path);
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

