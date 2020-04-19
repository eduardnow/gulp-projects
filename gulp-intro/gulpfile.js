var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

gulp.task('hello', function () {
    console.log('Hello');
});

gulp.task('world', ['hello'], function () {
    console.log('World');
});

gulp.task('watch', function () {
    gulp.watch('src/style.sass', ['sass']);
    gulp.watch('src/*.pug', ['pug:reload']);
    gulp.watch('.tmp/*.html').on('change', reload);
});

gulp.task('serve', ['sass', 'pug'], function () {
    browserSync({
        server: {
            baseDir: ['.tmp', 'src'],
        }
    });

    gulp.start('watch');
});

gulp.task('sass', function () {
    return gulp.src('src/style.sass')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.tmp'))
        .pipe(reload({ stream: true }));
});

gulp.task('pug', function () {
    return gulp.src('src/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('.tmp'))
})

gulp.task('sass:prod', function () {
    return gulp.src('src/style.sass')
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'compressed' })
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('pug:prod', function () {
    return gulp.src('src/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('dist'))
});

gulp.task('js', function () {
    gulp.src('./src/app.js')
        .pipe(plumber())
        .pipe(uglify({ compress: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['hello', 'world', 'sass']);

gulp.task('build', ['sass:prod', 'pug:prod', 'js']);