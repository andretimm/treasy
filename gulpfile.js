var gulp = require('gulp');

var uglify = require('gulp-uglify');

var minify = require('gulp-minify-css');

var browserSync = require('browser-sync').create();

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("./*.*").on('change', browserSync.reload);    
});

gulp.task('copy', function() {
    var _dirJs = 'dist/public/js/component/';
    /*Components*/
    gulp.src("components/angular/angular.min.js")
        .pipe(gulp.dest(_dirJs));

    gulp.src("components/angular-ivh-treeview/dist/ivh-treeview.min.js")
        .pipe(gulp.dest(_dirJs));

    gulp.src("components/jquery/dist/jquery.min.js")
        .pipe(gulp.dest(_dirJs));

    gulp.src("components/tether/dist/js/tether.min.js")
        .pipe(gulp.dest(_dirJs));

    gulp.src("components/bootstrap/dist/js/bootstrap.min.js")
        .pipe(gulp.dest(_dirJs));

    // Index
    gulp.src("app/index.html")
        .pipe(gulp.dest('dist/'));

});

gulp.task('js', function() {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/public/js'));

});

gulp.task('css', function() {
    gulp.src('app/css/*.css')
        .pipe(minify())
        .pipe(gulp.dest('dist/public/css'));

});


gulp.task('build',['copy','js','css']);

gulp.task('default', ['server']);
 