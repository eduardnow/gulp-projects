var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('hello', function () {
    console.log('Hello');
});

gulp.task('world', ['hello'], function () {
    console.log('World');
});

gulp.task('sass', function () {
    return gulp.src('src/style.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.tmp'))
        .pipe(reload({ stream: true }));
});

gulp.task('watch', function () {
    gulp.watch('src/style.sass', ['sass']);
});

gulp.task('serve', ['sass'], function () {
    browserSync({
        server: {
            baseDir: ['.tmp', 'src'],
        }
    });

    gulp.start('watch');
});

gulp.task('default', ['hello', 'world', 'sass']);
