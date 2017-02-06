'use strict';
var chokidar = require('chokidar');
const readChunk = require('read-chunk'); // npm install read-chunk 
const fileType = require('file-type');
const mv = require('mv');
const path_object = require('path');
const exec = require('child_process').exec;

var fs = require('fs');
var Buffer = require('buffer').Buffer;

var log = console.log.bind(console);

var config = {};
  config['watched_folder'] = '/Users/dsteplight/Downloads';
  config['jpeg_folder'] = '/Users/dsteplight/Documents/JPEG';
  config['pdf_folder'] = '/Users/dsteplight/Documents/PDF';
  config['zip_folder'] = '/Users/dsteplight/ZIP';

for (var key in config) 
{
   //make sure there is a path set and skipped over the watch folder
   if ((typeof config[key]) != 'undefined' && key !== 'watched_folder') { 
       let path_string = config[key];
      if (!fs.existsSync(path_string)){
          fs.mkdirSync(path_string);
         console.log('A NEW FOLDER HAS BEEN CREATED: '+path_string);
      }
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

   fs.stat(path, function (err, stats){

     if (err) {
       //this should always exsits since we are only dealing with directories right now
     }

     if (stats.isDirectory()) {
      let directory_name = path_object.basename(path);
      let child = exec("zip -r "+directory_name+".zip "+path,{maxBuffer: 1024 * 500}, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
         else{
            console.log("THERE SHOULD BE A NEW ZIP FOLDER "+directory_name+".zip");
            let file_name = directory_name+".zip";
            let target_folder = config.zip_folder;
            let targeted_file = target_folder+path_object.sep+file_name;

            //the newly created zip folder will exist in the same folder where this script is running and not in the config.watched_folder path
            mv(file_name, targeted_file, function(err) {
                log('This zippped file has been moved to ', targeted_file); 
            });
         }

      });

     } 

   });

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

