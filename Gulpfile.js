var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var sync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var KarmaServer = require('karma').Server;


// start server in develpoment with default
// serve serve for deployment with gulp serve
var paths = {
  scripts: ['client/app/**/*'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/styles/styles.css'],
  test: ['spec/**/*.js']
};

gulp.task('start', ['serve'], function () {
  sync({
    notify: true,
    // address for server,
    injectChanges: true,
    files: paths.scripts.concat(paths.html, paths.styles),
    proxy: 'localhost:8000'
  });
});

gulp.task('karma', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});


// gulp.task('build', ['start'], function() {
//   return gulp.src('source/javascript/**/*.js')
//     // only uglify if gulp is ran with '--type production'
//     .pipe(concat('all.js'))
//     .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
//     .pipe(gulp.dest('/client/production/'))
// });

gulp.task('serveprod', function() {
  connect.server({
    root: './server/server.js',
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});

gulp.task('serve', function () {
  nodemon({
    script: './server/server.js',
    ignore: 'node_modules/**/*.js'
  });
});

gulp.task('default', ['serverprod']);