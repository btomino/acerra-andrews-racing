// Gulp
var gulp = require("gulp");
var gutil = require('gulp-util');
var path = require('path');
var del = require('del');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');

// Style
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var replace = require('gulp-replace');

// Images
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// Icon Font
var fontcustom = require('gulp-fontcustom')

// Compress SASS files to CSS
gulp.task('sass', function () {
	return gulp.src('src/style/style.scss')
	.pipe(sourcemaps.init())
	.pipe(sass()
		.on('error', function(err){
			gutil.log(err);
			this.emit('end');
		}))
	.pipe(autoprefixer({
        browsers: ['last 3 versions', 'ie 8', 'ie 9', 'ie 10', 'Android 4'],
        cascade: false
    }))
    .pipe(replace('./icons', '../fonts/icons/icons'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/style/'));
});

// Copy Images to Build Folder
gulp.task('copyimages', function() {
    return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images/'));
});

// Compress and Move Images
gulp.task('imagemin', function(cb) {
	return gulp.src('src/images/**/*.*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images/'));
});

// Copy fonts to Build Folder
gulp.task('copyfonts', function() {
    return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts/'));
});

// Check JS for any errors
gulp.task('lint', function() {
  return gulp.src('src/js/**/*')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Copy JS to Build Folder
gulp.task('copyjs', function() {
    return gulp.src('src/js/**/*')
    .pipe(gulp.dest('dist/js/'));
});

// Generate Icon Font
gulp.task('icons', function(){
	gulp.src("src/icons/*.svg")
	.pipe(fontcustom({
		font_name: 'icons',  // defaults to 'fontcustom',
		'css-selector': '.icon-{{glyph}}'
	}))
	.pipe(gulp.dest("src/fonts/icons/"))
});


// Default
gulp.task('default', ['sass', 'copyimages', 'copyfonts', 'copyjs', 'watch']);

// Build
gulp.task('build', ['icons', 'sass', 'imagemin', 'copyjs', 'copyfonts']);

// Watch for files changes
gulp.task('watch', function () {
    watch('src/style/**', batch(function (events, done) {
        gulp.start('sass', done);
    }));
    watch('src/images/**', batch(function (events, done) {
        gulp.start('copyimages', done);
    }));
    watch('src/fonts/**', batch(function (events, done) {
        gulp.start('copyfonts', done);
    }));
    watch('src/js/**', batch(function (events, done) {
        gulp.start('copyjs', done);
    }));
});

gulp.task('watch-icons', function () {
	watch('src/icons/**', batch(function (events, done) {
        gulp.start(['icons', 'sass', 'copyimages', 'copyfonts', 'copyjs'], done);
    }));
});
