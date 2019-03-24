const gulp = require('gulp');
const ts = require('gulp-typescript');
const sass = require("gulp-sass");
const minifyCss = require('gulp-csso');
const run = require('gulp-run');

const tsProject = ts.createProject('tsconfig.json');
const tsFilesDir = './src/**/*.ts';
const scssFilesDir = './public/styles/**/*.scss';

gulp.task('compile-ts', function () {
    return gulp.src(tsFilesDir)
        .pipe(tsProject())
        .pipe(gulp.dest('./dist'));
});

gulp.task('compile-scss', function () {
    return gulp.src('./public/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('build', function () {
    gulp.watch(tsFilesDir, gulp.series('compile-ts'));
    gulp.watch(scssFilesDir, gulp.series('compile-scss'));
});