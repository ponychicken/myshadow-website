var gulp = require('gulp');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var http = require('http');
var st = require('st');
var ghpages = require('gulp-gh-pages');
var sourcemaps = require('gulp-sourcemaps');
var debug = require('gulp-debug');



gulp.task('less', function () {
  gulp.src('./src/**/*.less')
    .pipe(debug({title: 'unicorn:'}))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(debug({title: 'be:'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/'))
    .pipe(livereload());
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname + '/src', index: 'index.html', cache: false })
  ).listen(8080, done);
});

gulp.task('default', ['less', 'server'], function() {
  livereload.listen();
  gulp.watch('./src/**/*.less', ['less']);
});

// Push to gh-pages
gulp.task('deploy', function () {
	return gulp.src('./src/**/*')
		.pipe(ghpages());
});
