
var gulp = require('gulp');
var webserver = require('gulp-webserver');

targets = [
  './scripts/*.js',
  './*.html'
];

/*
gulp.task('reload', () => {
	gulp.src(targets)
		.pipe(webserver.reload());
});

gulp.task('watch', () => {
	gulp.watch(targets, ['reload']);
});
*/

gulp.task('webserver', () => {
	gulp.src('./')
		.pipe(webserver({
			host: 'localhost',
			port: 8000,
			livereload: true,
			open: true
		}));
});

gulp.task('default', ['webserver']);
