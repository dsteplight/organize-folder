'use strict';
var chokidar = require('chokidar');
const readChunk = require('read-chunk'); // npm install read-chunk 
const fileType = require('file-type');
const mv = require('mv');
const path_object = require('path');
const exec = require('child_process').exec;
const rmdir = require('rmdir');

const readConfig = require('read-config');
const configPaths = readConfig('./config-paths.json');

console.log(configPaths);

var fs = require('fs');
var Buffer = require('buffer').Buffer;

var log = console.log.bind(console);

var config = {};
  config['watched_folder'] = '/Users/dsteplight/Downloads';
  
  //documents
  config['pdf_folder'] = '/Users/dsteplight/Documents/PDF';
  config['xlsx_folder'] = '/Users/dsteplight/Documents/EXCEL';
  config['php_folder'] = '/Users/dsteplight/Documents/PHP';
  config['json_folder'] = '/Users/dsteplight/Documents/JSON';
  config['md_folder'] = '/Users/dsteplight/Documents/MD';
  config['key_folder'] = '/Users/dsteplight/Documents/KEY';
  config['js_folder'] = '/Users/dsteplight/Documents/JAVASCRIPT';
  
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
  config['threegp_folder'] = '/Users/dsteplight/Movies/3PG';
  config['mpg_folder'] = '/Users/dsteplight/Movies/MPG';
  config['mov_folder'] = '/Users/dsteplight/Movies/MOV';
  config['m4v_folder'] = '/Users/dsteplight/Movies/M4V';
  
  //audio files
  config['mp3_folder'] = '/Users/dsteplight/Music/MP3';
  config['aac_folder'] = '/Users/dsteplight/Music/AAC';
  config['m3u8_folder'] = '/Users/dsteplight/Music/M3U8';
  config['wav_folder'] = '/Users/dsteplight/Music/WAV';
  config['ogg_folder'] = '/Users/dsteplight/Music/OGG';
  
  //apps
  config['screen_saver_folder'] = '/Users/dsteplight/Documents/SCREEN-SAVER';
  config['dmg_folder'] = '/Users/dsteplight/DMG';

   //calendars
  config['ics_folder'] = '/Users/dsteplight/ICS';
  config['ical_folder'] = '/Users/dsteplight/ICAL';

  //compressed files
  config['zip_folder'] = '/Users/dsteplight/ZIP';
  config['gz_folder'] = '/Users/dsteplight/GZ';
  config['tar_folder'] = '/Users/dsteplight/TAR';
  config['phar_folder'] = '/Users/dsteplight/PHAR';
  config['bz2_folder'] = '/Users/dsteplight/BZ2';
  config['tgz_folder'] = '/Users/dsteplight/TGZ';

  //database files (todo: include .sql.gz files in SQL folder)
  config['sql_folder'] = '/Users/dsteplight/SQL';
  config['sqlite_folder'] = '/Users/dsteplight/SQLITE';

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
/* note: use convert config object to configPath 
for (var key in configPaths) 
{
   //make sure there is a path set and skipped over the watch folder
   if ((typeof configPaths[key]) != 'undefined' && key !== 'watched_folder') 
   { 
       let path_string = configPaths[key];
      if (!fs.existsSync(path_string))
      {
         fs.mkdirSync(path_string);
         console.log('A NEW FOLDER HAS BEEN CREATED: '+path_string);
      }
   } 
}
*/
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
            switch(file_type.toLowerCase())
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
               case '.3gp':
                     var target_folder = config.threegp_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.mpg':
                     var target_folder = config.mpg_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.aac':
                     var target_folder = config.aac_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.gz':
                     var target_folder = config.gz_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.tar':
                     var target_folder = config.tar_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.phar':
                     var target_folder = config.phar_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.bz2':
                     var target_folder = config.bz2_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.sql':
                     var target_folder = config.sql_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.sqlite':
                     var target_folder = config.sqlite_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.dmg':
                     var target_folder = config.dmg_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.ics':
                     var target_folder = config.ics_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.ical':
                     var target_folder = config.ical_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.xls':
               case '.xlsx':
                     var target_folder = config.xlsx_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.php':
                     var target_folder = config.php_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.json':
                     var target_folder = config.json_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.md':
                     var target_folder = config.md_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.mov':
                     var target_folder = config.mov_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.zip':
                     var target_folder = config.zip_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.tgz':
                     var target_folder = config.tgz_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.m4v':
                     var target_folder = config.m4v_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.key':
                     var target_folder = config.key_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.m3u8':
                     var target_folder = config.m3u8_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.wav':
                     var target_folder = config.wav_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.ogg':
                     var target_folder = config.ogg_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.js':
                     var target_folder = config.js_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               case '.saver':
                     var target_folder = config.screen_saver_folder;
                     moveFile( target_folder, file_name, path );
                  break;
               default:
                     //useful for targeting which files types have not be caught
                     //console.log("DEBUG: "+file_type.toLowerCase());
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

