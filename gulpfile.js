var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('live-sync', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("./*.*").on('change', browserSync.reload);    
});

gulp.task('copy', function() {
    var _dirJs = 'dist/js/component/';
    var _dirCss = 'dist/css/component/';
    /*Components*/
    gulp.src("components/angular/angular.min.js")
        .pipe(gulp.dest(_dirJs));

    gulp.src("components/angular-ivh-treeview/dist/ivh-treeview.min.js")
        .pipe(gulp.dest(_dirJs));
    
    gulp.src("components/angular-ivh-treeview/dist/ivh-treeview.min.css")
        .pipe(gulp.dest(_dirCss));

    gulp.src("components/jquery/dist/jquery.min.js")
        .pipe(gulp.dest(_dirJs));

    gulp.src("components/tether/dist/js/tether.min.js")
        .pipe(gulp.dest(_dirJs));

    gulp.src("components/bootstrap/dist/js/bootstrap.min.js")
        .pipe(gulp.dest(_dirJs));

    gulp.src("components/bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest(_dirCss));

    gulp.src("components/font-awesome/css/font-awesome.min.css")
        .pipe(gulp.dest(_dirCss));

    gulp.src('components/font-awesome/fonts/**')
        .pipe(gulp.dest('dist/css/fonts/'));

    // HTML
    gulp.src("app/index.html")
        .pipe(gulp.dest('dist/'));
    gulp.src("app/js/directive/modal.view.html")
        .pipe(gulp.dest('dist/js/directive'));

});

gulp.task('js', function() {
    gulp.src(['app/js/tree.module.js', 'app/js/tree.config.js', 'app/js/tree.controller.js'])
        .pipe(plumber())
            .pipe(concat('tree.min.js', { newline: ';' }))
            .pipe(ngAnnotate({ add : true }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/js'));

    gulp.src(['app/js/directive/modal.directive.js'])
        .pipe(plumber())        
        .pipe(ngAnnotate({ add : true }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/js/directive'));
});

gulp.task('css', function() {
    gulp.src('app/css/*.css')
        .pipe(minify())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('inject', function() {
    setTimeout(function() {
    var resources = gulp.src(
        [      
            'dist/css/component/bootstrap.min.css',
            'dist/css/component/font-awesome.min.css',
            'dist/css/component/ivh-treeview.min.css',
            'dist/css/style.css',
            'dist/js/component/angular.min.js',
            'dist/js/component/jquery.min.js',
            'dist/js/component/tether.min.js',
            'dist/js/component/ivh-treeview.min.js',
            'dist/js/component/bootstrap.min.js',
            'dist/js/tree.min.js',
            'dist/js/directive/modal.directive.js',
        ], 
        {read: false});
    gulp.src('dist/index.html')
        .pipe(inject(resources, {
            ignorePath: 'dist'
        }))
        .pipe(gulp.dest('dist'));
    },1500);
        
});

gulp.task('build',['copy','js','css','inject']);

gulp.task('default', ['live-sync']);
 