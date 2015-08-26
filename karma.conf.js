// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'src/client/bower_components/jquery/dist/jquery.js',
      'src/client/bower_components/angular/angular.js',
      'src/client/bower_components/angular-mocks/angular-mocks.js',
      'src/client/bower_components/angular-cookies/angular-cookies.js',
      'src/client/bower_components/angular-sanitize/angular-sanitize.js',
      'src/client/bower_components/angular-route/angular-route.js',
      'src/client/bower_components/lodash/dist/lodash.compat.js',
      'src/client/bower_components/angular-resource/angular-resource.js',
      'src/client/bower_components/angular-animate/angular-animate.js',
      'src/client/bower_components/angular-aria/angular-aria.js',
      'src/client/bower_components/angular-material/angular-material.js',
      'src/client/bower_components/toastr/toastr.js',
      'src/client/bower_components/moment/moment.js',
      'src/client/bower_components/angular-material-icons/angular-material-icons.min.js',
      'src/client/bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.min.js',

      'src/client/app/**/*.module.js',
      'src/client/app/app.js',
      'src/client/app/**/*.js',
      'src/client/app/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'html2js'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/client/'
    },

    ngJade2JsPreprocessor: {
      stripPrefix: 'src/client/'
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    colors: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],
    //    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
