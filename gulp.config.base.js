module.exports = function() {
	var client = './client/';
	var clientApp = client + 'app/';
	var server = './server/';
	var bower = client + 'bower_components/';
	var temp = './.tmp/';
	
	var config = {
		
	  // File paths
	  styles: {
	    src: clientApp,
	    files: './**/*.scss',
	    dest: clientApp
	  },
	  js: [
		  clientApp + '**/*.js',
		  '!' + bower + '**/*.js',
		  '!' + clientApp + '**/*.spec.js'
	  ],
	  build: './build/',
	  images: client + 'assets/images/**/*.*',
	  fonts: bower + 'font-awesome/fonts/**/*.*',
	  htmltemplates: clientApp + '**/*.html',
	  index: client + 'index.html',
	  client: client,
	  css: temp + 'app/app.css',
	  server: server, 
      temp: temp,

      // Template cache
	  templatecache: {
		  file: 'templates.js',
		  options: {
			  module: 'core',
			  standAlone: false,
			  root: 'app/'
		  }
	  },
	  
	  // Browser sync
	  startBrowsersyncDelay: 1000,
	  
	  // Bower and NPM locations
	  bower: {
		  json: require('./bower.json'),
		  directory: bower,
		  ignorePath: '../..'
	  },
	  
	  // Node settings
	  defaultPort: 9000,
	  nodeServer: server + 'app.js'
	};
	
	config.getWiredepDefaultOptions = function() {
		var options = {
			bowerJson: config.bower.json,
			directory: config.bower.directory,
			ignorePath: config.bower.ignorePath
		};
		
		return options;
	};
	
	return config;
};