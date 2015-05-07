var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config.js')();
var port = process.env.PORT || config.defaultPort;

gulp.task('default', ['help']);

gulp.task('help', $.taskListing);

gulp.task('serve-dev', ['inject'], function() {
  var nodeOptions = {
    script: config.nodeServer,
    delayTime: 1,
    watch: [config.server]
  };

  return $.nodemon(nodeOptions)
//    .on('restart', function() {
//      log('nodemon restarting');
//      reloadBrowserSyncAfterDelay(config.startBrowsersyncDelay);
//    })
    .on('start', function() {
      log('nodemon starting');
      startBrowserSync();
    });
});

gulp.task('clean', ['clean-fonts', 'clean-images']);

gulp.task('clean-fonts', function(done) {
  clean(config.build + 'fonts/**/*.*', done);
});

gulp.task('clean-images', function(done) {
  clean(config.build + 'images/**/*.*', done);
});

gulp.task('clean-code', function(done) {
  var files = [].concat(
    config.temp + '**/*.js',
    config.build + 'js/**/*.html'
  )
  clean(files, done);
});

gulp.task('fonts', ['clean-fonts'], function() {
  log('Copying fonts');
  return gulp
    .src(config.fonts)
    .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function() {
  log('Copying/compressing images');
  return gulp
    .src(config.images)
    .pipe($.imagemin({optimizationLevel: 4}))
    .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('sass', function (){
  return gulp
    .src(config.styles.files)
    .pipe($.sass({
      outputStyle: 'compressed',
      sourceComments: 'map',
      includePaths : [config.styles.src]
    }))
    .on('error', function(err){
      displayError(err);
    })
    .pipe($.autoprefixer(
      'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
    ))
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('watch', function() {
  log('Starting to watch .scss changes');
  gulp.watch(config.styles.files, ['sass'])
    //.pipe($.plumber())
    .on('change', function(evt) {
      log('[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...');
    });
});

gulp.task('templatecache', ['clean-code'], function() {
  log('Creating AngularJS $templateCache');
  
  return gulp
    .src(config.htmltemplates)
    .pipe($.minifyHtml({empty: true}))
    .pipe($.angularTemplatecache(
      config.templatecache.file,
      config.templatecache.options
    ))
    .pipe(gulp.dest(config.temp));
});

gulp.task('wiredep', function() {
  log('Wire up the bower js & css and app js into the index.html');
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;

  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep'], function() {  // sass dependency!
  log('Wire up the app css into the index.html');
  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.css)))
    .pipe(gulp.dest(config.client));
});

gulp.task('js', function() {
  return gulp
    .src('./client/**/*.js')
//    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});


////////////////////////////////////////////////////////////

function startBrowserSync() {
  if (args.nosync || browserSync.active) {
    return;
  }

  log('Starting browser sync on port ' + port);

  var options =  {
    proxy: 'localhost:' + port,
    port: 3000,
    files: [
      config.client + '**/*.*',
      '!' + config.client + '**/*.scss',
      config.temp + '**/*.css'
      ],
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 1000
  };

  browserSync(options);
}

/*function reloadBrowserSyncAfterDelay(delay) {
  setTimeout(function() {
    browserSync.notify('reloading now...');
    browserSync.reload({stream: false});
  }, delay);
}*/

// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output
function displayError(error) {

  // Initial building up of the error
  var errorString = '[' + error.plugin + ']';
  errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

  // If the error contains the filename or line number add it to the string
  if(error.fileName)
    errorString += ' in ' + error.fileName;

  if(error.lineNumber)
    errorString += ' on line ' + error.lineNumber;

  // This will output an error like the following:
  // [gulp-sass] error message in file_name on line 1
  console.error(errorString);
};

function clean(path, done) {
  log('Cleaning ' + path);
  del(path, done);
}

function log(msg) {
	$.util.log($.util.colors.blue(msg));
}
