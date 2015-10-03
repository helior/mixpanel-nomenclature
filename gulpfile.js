var gulp = require('gulp');
var babel = require('gulp-babel');
var run = require('gulp-run');

gulp.task('default', function() {
  gulp.watch(['lib/*.js', 'test/*.js'], ['test']);
});

gulp.task('test', function () {
  return gulp.src("lib/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"))
    .pipe(run('clear && tape test/* | tap-spec'));
});
