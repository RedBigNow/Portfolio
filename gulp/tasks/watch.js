module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./dev/pug/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./dev/assets/styles/**/*.scss', $.gulp.series('styles:dev'));
        $.gulp.watch(['./dev/assets/images/general/**/*.{png,jpg,gif,svg}',
            './dev/assets/images/content/**/*.{png,jpg,gif,svg}'], $.gulp.series('img:dev'));
        $.gulp.watch('./dev/assets/images/svg/*.svg', $.gulp.series('svg'));
        $.gulp.watch('./dev/assets/js/**/*.js', $.gulp.series('js:dev'));
    });
};
