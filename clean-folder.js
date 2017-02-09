'use strict';
var chokidar = require('chokidar');
const readChunk = require('read-chunk'); // npm install read-chunk 
const fileType = require('file-type');
const mv = require('mv');
const path_object = require('path');
const exec = require('child_process').exec;
const rmdir = require('rmdir');

var fs = require('fs');
var Buffer = require('buffer').Buffer;

var log = console.log.bind(console);

var config = {};
  config['watched_folder'] = '/Users/dsteplight/Downloads';
  
  //documents
  config['pdf_folder'] = '/Users/dsteplight/Documents/PDF';
  
  //todo: make these go into the pictures folder

  //picture files
  config['jpeg_folder'] = '/Users/dsteplight/Documents/JPEG';
  config['gif_folder'] = '/Users/dsteplight/Documents/GIF';
  config['png_folder'] = '/Users/dsteplight/Documents/PNG';
  
  //video files
  config['wmv_folder'] = '/Users/dsteplight/Movies/WMV';
  config['mp4_folder'] = '/Users/dsteplight/Movies/MP4';
  config['flv_folder'] = '/Users/dsteplight/Movies/FLV';
  config['avi_folder'] = '/Users/dsteplight/Movies/AVI';
  config['webm_folder'] = '/Users/dsteplight/Movies/WEBM';
  config['mkv_folder'] = '/Users/dsteplight/Movies/MKV';
  config['ts_folder'] = '/Users/dsteplight/Movies/TS';
  config['threepg_folder'] = '/Users/dsteplight/Movies/3PG';
  config['mpg_folder'] = '/Users/dsteplight/Movies/MPG';
  
  //music files
  config['mp3_folder'] = '/Users/dsteplight/Music/MP3';
  
  //apps
  config['screen_saver_folder'] = '/Users/dsteplight/Documents/SCREEN-SAVER';

  //compressed files
  config['zip_folder'] = '/Users/dsteplight/ZIP';

for (var key in config) 
{
   //make sure there is a path set and skipped over the watch folder
   if ((typeof config[key]) != 'undefined' && key !== 'watched_folder') 
   { 
       let path_string = config[key];
      if (!fs.existsSync(path_string))
      {
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

function moveFile( folder, file, path_of_current_file)
{
         let targeted_file = folder+path_object.sep+file;

         mv(path_of_current_file, targeted_file, function(err) 
         {
             log('This file has been moved to ', targeted_file); 
         });

return true;
}

watcher
  .on('add', function(path) { 

      const file_name = path_object.basename(path);
      const file_type = path_object.extname(path);

         if( file_type !== null )
         {
            switch(file_type)
            {
               case '.jpg':
               case '.jpeg':
                     var target_folder = config.jpeg_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.gif':
                     var target_folder = config.gif_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.png':
                     var target_folder = config.png_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.pdf':
                     var target_folder = config.pdf_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.wmv':
                     var target_folder = config.wmv_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.mp4':
                     var target_folder = config.mp4_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.flv':
                     var target_folder = config.flv_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.avi':
                     var target_folder = config.avi_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.mp3':
                     var target_folder = config.mp3_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.webm':
                     var target_folder = config.webm_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.mkv':
                     var target_folder = config.mkv_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.ts':
                     var target_folder = config.ts_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.3pg':
                     var target_folder = config.threepg_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.mpg':
                     var target_folder = config.mpg_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.saver':
                     var target_folder = config.screen_saver_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               default:
                  break;
            }
         }

   })
  .on('addDir', function(path) { 

      let directory_name = path_object.basename(path);
      let file_name = directory_name+".zip";
      let target_folder = config.zip_folder;
      let targeted_file = target_folder+path_object.sep+file_name;

         fs.stat(path, function (err, stats)
         {

           if (err) 
           {
             //this should always exsits since we are only dealing with directories right now
           }

           //make sure not to also zip up the actual folder that is being watched
           if (stats.isDirectory() && path !== config.watched_folder ) 
           {
            let child = exec("zip -r "+directory_name+".zip "+path,{maxBuffer: 1024 * 1000}, function (error, stdout, stderr) 
                        {
                             if (error !== null) 
                             {
                               console.log('exec error: ' + error);
                             }
                             else
                             {
                                 console.log("THERE SHOULD BE A NEW ZIP FOLDER "+directory_name+".zip");

                                 //the newly created zip folder will exist in the same folder where this script is running and not in the config.watched_folder path
                                 mv(file_name, targeted_file, function(err) 
                                 {
                                     log('This zippped file has been moved to ', targeted_file); 
                                     //now delete the folder from the config.watched_files directory
                                     rmdir(path, function (err, dirs, files) 
                                     {
                                      console.log(dirs);
                                      console.log(files);
                                      console.log('all files are removed from '+ path);
                                     });

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
         console.log('DEBUG: The script caught an error', error);
  })
  .on('ready', function() { log('Initial scan complete. Ready for changes.'); })

