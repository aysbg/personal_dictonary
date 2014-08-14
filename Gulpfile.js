var gulp = require('gulp'),
  gulpUtil = require('gulp-util'),
  sass = require('gulp-sass'),
  coffee = require('gulp-coffee'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch');

var paths = {
  styles: ['public/scss/*.scss'],
  coffees: [
    'karma/coffee/*.spec.coffee',
    'karma/coffee/controllers/*.spec.coffee',
    'karma/coffee/services/*.spec.coffee'
  ]
};

gulp.task('scripts', function() {
  gulp.src('public/js/app/*.js')
    .pipe(concat('dictionary.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function() {
  return gulp.src('public/scss/style.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      sourceComments: 'map',
      sourceMap: 'sass',
      includePaths : ['public/scss']
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('coffee', function() {
  gulp.src('karma/coffee/*.spec.coffee')
    .pipe(coffee({ bare: true }).on('error', gulpUtil.log))
    .pipe(gulp.dest('karma'));

  gulp.src('karma/coffee/controllers/*.spec.coffee')
    .pipe(coffee({ bare: true }).on('error', gulpUtil.log))
    .pipe(gulp.dest('karma/controllers'));

  gulp.src('karma/coffee/services/*.spec.coffee')
    .pipe(coffee({ bare: true }).on('error', gulpUtil.log))
    .pipe(gulp.dest('karma/services'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.coffees, ['coffee']);
});
