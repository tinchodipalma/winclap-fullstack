'use strict';

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('public/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Sass task
gulp.task('sass', function() {
    return gulp.src([
            'app/styles/*.scss',
            '!app/styles/_*.scss'
        ])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css'));
});

// Scripts task
gulp.task('scripts', function() {
    return gulp.src([
            'app/js/app.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
});

// Scripts task
gulp.task('scripts', function() {
    return gulp.src([
            'app/js/app.js'
        ])
        .pipe(concat('app.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));
});

// Vendor scripts and styles task
gulp.task('vendor', ['vendor-scripts', 'vendor-styles']);

gulp.task('vendor-scripts', function() {
    return gulp.src([
            'bower_components/plotlyjs/plotly.js',
            'bower_components/vue/dist/vue.min.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/moment/min/moment-with-locales.min.js',
            'bower_components/vanilla-datatables/vanilla-dataTables.min.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('vendor-styles', function() {
    return gulp.src([
            'bower_components/vanilla-datatables/vanilla-dataTables.min.css',
            'bower_components/bootstrap/dist/css/bootstrap.min.css'
        ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('dist/css'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/js/*.js', ['lint', 'scripts']);
    gulp.watch('app/styles/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'vendor', 'scripts', 'watch']);
