var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

gulp.task('copy-media', function() {
	return gulp.src('./public/media/*')
		.pipe(gulp.dest('dist/assets/svg-media'));
});

gulp.task('build', function () {
	return browserify('./src/')
		.transform(babelify)
		.bundle()
		.pipe(source('svg-admin.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
});