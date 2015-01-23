var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  less = require('gulp-less'),
  http = require('http'),
  st = require('st');
var ghpages = require('gulp-gh-pages');

gulp.task('less', function () {
  gulp.src('./src/sites/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./src/sites/'))
    .pipe(livereload());
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname + '/src', index: 'index.html', cache: false })
  ).listen(8080, done);
});

gulp.task('default', ['server'], function() {
  livereload.listen();
  gulp.watch('./src/sites/**/*.less', ['less']);
});

// Push to gh-pages
gulp.task('deploy', function () {
	return gulp.src('./src/')
		.pipe(ghpages());
});
