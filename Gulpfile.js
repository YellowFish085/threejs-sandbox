'use strict';

var gulp       = require('gulp');									// Base gulp package
var babelify   = require('babelify');							// Used to convert ES6 & JSX to ES5
var browserify = require('browserify'); 					// Providers "require" support, CommonJS
var notify     = require('gulp-notify');					// Provides notification to both the console and Growel
var rename     = require('gulp-rename');					// Rename sources
var sourcemaps = require('gulp-sourcemaps');			// Provide external sourcemap files
var gutil      = require('gulp-util');						// Provides gulp utilities, including logging and beep
var glob       = require('glob');
var chalk      = require('chalk');								// Allows for coloring for logging
var source     = require('vinyl-source-stream');	// Vinyl stream support
var buffer     = require('vinyl-buffer');					// Vinyl stream support
var watchify   = require('watchify');							// Watchify for source changes
var merge      = require('utils-merge');					// Object merge tool
var duration   = require('gulp-duration');				// Time aspects of your gulp process

// Configuration for Gulp
var config = {
	js: {
		src: './src/js/**/main.js',
		outputDir: './www/assets/js',
		outputFile: '.build.js'
	}
};

// Error log fuction
function mapError(err) {
	if (err.fileName) {
    // Regular js error
    gutil.log(chalk.red(err.name)
      + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ', ' + 'Line ' + chalk.magenta(err.lineNumber)
      + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + '\n>> ' + chalk.blue(err.description));
  } else {
    // Browserify error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message));
  }
}

function bundle(bundler) {
	var bundleTimer = duration('Javascript bundle time');

	bundler
		.bundle()
		.on('error', mapError)														// Map error if any
		.pipe(source('main.js'))													// Set source name
		.pipe(buffer())																		// Convert to gulp pipeline for gulp actions
		.pipe(rename(function(path) {
			var p        = bundler._options.entries[0].split('/')
			path.dirname = '/' + p[p.length - 2];
			path.extname = ".build.js";
		}))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write('./_map'))
		.pipe(gulp.dest(config.js.outputDir))							// Set the output directory
		.pipe(notify({
			onLast: true,
      message: 'Generated file: <%= file.relative %>',
    }))
		.pipe(bundleTimer);																// Output time
}

// Task to build three.js scripts
gulp.task('threejs', function() {
	var args = merge(watchify.args, { debug: true });

	glob(config.js.src, function(err, files) {
		if (err) {
			done(err);
		}
 
		gutil.log(chalk.blue('Files to build:') + files.map(function(entry) { return ' ' + chalk.green(entry); }))

		files.map(function(entry) {
			var bundler = browserify(entry, args)
				.plugin(watchify, { ignoreWatch: ['**/node_modules/**'] })
				.transform(babelify, { presets: ['es2015'] });

			// Run the bundle the first time, required for Watchify
			bundle(bundler);

			// Update on changes
			bundler.on('update', function() {
				bundle(bundler);
			});
		});
	});
})

gulp.task('default', ['threejs']);