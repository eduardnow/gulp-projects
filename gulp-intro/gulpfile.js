var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('hello', function () {
    console.log('Hello');
});

gulp.task('world', ['hello'], function () {
    console.log('World');
});

gulp.task('sass', function () {
    return gulp.src('style.sass')
        .pipe(sass())
        .pipe(gulp.dest('tmp'));
});

gulp.task('watch', function() {
    gulp.watch('style.sass', ['sass']);
});

gulp.task('default', ['hello', 'world', 'sass']);
