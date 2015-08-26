/// <reference path="typings/node/node.d.ts"/>
var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var path = require('path');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config.js')();
var babel = require('babel/register');
var port = process.env.PORT || config.defaultPort;


gulp.task('default', ['help']);
gulp.task('help', $.taskListing);
gulp.task('serve-dev', ['inject'], serveDev);
gulp.task('inject', inject);
gulp.task('watch', watch);
gulp.task('lint', lint);
gulp.task('test', test);
gulp.task('autotest', autotest);
gulp.task('testnode', testnode);
gulp.task('mongo-start', mongoStart);
gulp.task('mongo-stop', mongoStop);

/* Tasks */

function serveDev() {
  var nodeOptions = {
    script: config.nodeServer,
    delayTime: 1,
    watch: [config.server],
    execMap: {
      "js": "npm run babel-node"
    }    
  };

  return $.nodemon(nodeOptions)
    .on('restart', function () {
      log('nodemon restarting');
      reloadBrowserSyncAfterDelay(config.startBrowsersyncDelay);
    })
    .on('start', function () {
      log('nodemon starting');
      startBrowserSync();
  });
}

function watch() {
  log('Starting to watch .scss changes');
  gulp.watch(config.styles.files, ['sass'])
  //.pipe($.plumber())
    .on('change', function (evt) {
    log('[watcher] File ' + evt.path.replace(/.*(?=sass)/, '') + ' was ' + evt.type + ', compiling...');
  });
}

function lint() {
  log('Analyzing source with JSHint and JSCS');
  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
//    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
}

function inject() {
  log('Wire up the bower js & css and app js into the index.html');
  var wiredep = require('wiredep').stream;
  var wiredepOptions = config.getWiredepOptions();
  var jsAndCss = [].concat(config.clientjs, config.css);
  var sources = gulp.src(jsAndCss, {read: false});
  var injectOptions = config.getInjectOptions();

  return gulp
    .src(config.index)
    .pipe(wiredep(wiredepOptions))
    .pipe($.inject(sources, injectOptions))
    .pipe(gulp.dest(config.client));
}

function test(done) {
  startTests(true /* singleRun */, done);
}

function autotest(done) {
  startTests(false /* singleRun */, done);
}

function testnode(done) {
  return gulp
    .src(config.server + '**/*.spec.js', {read: false})
    //.pipe($.babel())
    //.pipe($.debug())
    .pipe($.mocha({timeout: 9000}))
    .once('error', function (err) {
      console.log(err)
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
    });
}

function mongoStart() {
  log('Starting MongoDB');
  runCommand('mongod --config ' + path.join(__dirname, 'db.config'));
}

function mongoStop() {
  log('Stopping MongoDB');
  runCommand('mongo admin --eval "db.shutdownServer();"');
}

/* Utility functions */

function runCommand(command) {
  log('Running command: ' + command);
  var exec = require('child_process').exec;

  exec(command, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      logError(err);
    }
  });
}

function startBrowserSync() {
  if (!args.sync || browserSync.active) {
    return;
  }

  log('Starting browser sync on port ' + port);

  var options = {
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
    logPrefix: 'gulp',
    notify: true,
    reloadDelay: 1000
  };

  browserSync(options);
}

function reloadBrowserSyncAfterDelay(delay) {
  setTimeout(function () {
    browserSync.notify('reloading now...');
    browserSync.reload({stream: false});
  }, delay);
}

function startTests(singleRun, done) {
  var karma = require('karma').server;

  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: !!singleRun
  }, karmaCompleted);

  function karmaCompleted(karmaResult) {
    log('Karma completed!');
    if (karmaResult === 1) {
      done('karma: tests failed with code ' + karmaResult);
    } else {
      done();
    }
  }
}

function log(msg) {
  $.util.log($.util.colors.blue(msg));
}

function logError(msg) {
  $.util.log($.util.colors.red(msg));
}
