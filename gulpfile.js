var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  less = require('gulp-less'),
  http = require('http'),
  st = require('st');
var ghpages = require('gulp-gh-pages');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('less', function () {
  gulp.src('./src/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
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
  gulp.watch('./src/sites/**/*.less', ['less']);
});

// Push to gh-pages
gulp.task('deploy', function () {
	return gulp.src('./src/**/*')
		.pipe(ghpages());
});
