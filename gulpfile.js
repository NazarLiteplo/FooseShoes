var gulp = require('gulp'),
		sass = require('gulp-sass');

var includer = require('gulp-htmlincluder');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

gulp.task('connect', function() {
  connect.server({
    root: 'build/',
    livereload: true
  });
});

gulp.task('mover', function(){
	gulp.src('dev/fonts/**/*.*').pipe(gulp.dest('build/fonts/'));
	gulp.src('dev/img/**/*.*').pipe(gulp.dest('build/img/'));
	gulp.src('dev/js/**/*.js').pipe(gulp.dest('build/js/'));
	gulp.src('dev/libs/**/*.*').pipe(gulp.dest('build/libs/'));
});

gulp.task('htmlCreator', function(){
	gulp.src('dev/**/*.html')
	.pipe(includer())
	.pipe(gulp.dest('build'))
	.pipe(connect.reload());
});

gulp.task('sass', function(){
	return gulp.src(['dev/css/sass/**/*.sass', 'dev/css/sass/**/*scss'])
				.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
				.pipe(gulp.dest('build/css'))
				.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.start('connect', 'htmlCreator', 'sass', 'mover');

	gulp.watch(['dev/**/*.html'], function(event){
		gulp.start('htmlCreator');		
	});
	gulp.watch(['dev/css/sass/**/*.sass', 'dev/css/sass/**/*scss'], ['sass'])
});

gulp.task('default', ['watch']);