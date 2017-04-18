const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('watch', function () {
    gulp.watch(['*.js', 'app/*.js', 'spec/**/*.spec.js'], ['nodemon']);
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'app.js'
    }).on('restart');
});

gulp.task('default', ['nodemon']);