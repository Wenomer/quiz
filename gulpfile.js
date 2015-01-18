var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('less', function() {
    gulp.src('app/less/style.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('public/css'));
});

var jsSource = [
    'app/bower_components/jquery/dist/jquery.min.js',
    'app/bower_components/angular/angular.js',
    'app/bower_components/angular-route/angular-route.js',
    'app/bower_components/angular-strap/dist/angular-strap.min.js',
    'app/bower_components/angular-cookies/angular-cookies.min.js',
    'app/bower_components/firebase/firebase.js',
    'app/bower_components/angular-adaptive-detection/angular-adaptive-detection.min.js',
    'app/bower_components/angularfire/dist/angularfire.min.js',
    'app/js/app.js',
    'app/js/**/*.js'
];

gulp.task('js', function() {
    gulp.src(jsSource)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
    gulp.watch('app/less/*.less', ['less']);
    gulp.watch(jsSource, ['js']);
});

gulp.task('default', ['less', 'js', 'watch']);