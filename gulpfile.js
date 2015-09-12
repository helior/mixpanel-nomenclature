var gulp = require('gulp');
var babel = require('gulp-babel');
var run = require('gulp-run');

gulp.task('default', function () {
  return gulp.src("lib/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"))
    .pipe(run('npm test'));
});

gulp.watch(['lib/*.js', 'test/*.js'], ['default']);
