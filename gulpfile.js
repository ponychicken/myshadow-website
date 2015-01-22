var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  less = require('gulp-less'),
  es6transpiler = require('gulp-es6-transpiler'),
  cached = require('gulp-cached');

gulp.task('less', function () {
  gulp.src('./public/css/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('public/css/*.less', ['less']);
  gulp.watch('src/**/*.js', ['es6']);
});

gulp.task('es6', function() {
  return gulp.src('src/**/*.js')
        .pipe(cached('es6'))
        .pipe(es6transpiler())
        .pipe(gulp.dest('dist'));
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade',
    ignore: ['public/*', 'src/*']
  }).on('restart', function () {
    setTimeout(function () {
      //livereload.changed();
    }, 1500);
  });
});

gulp.task('default', [
  'less',
  'es6',
  'develop',
  'watch'
]);
