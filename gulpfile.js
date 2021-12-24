
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var watchesw = require('gulp-watch');

function css_style(done){
    gulp.src('./assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        errorLogtoConsole: true,
        outputStyle: 'expanded'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe( gulp.dest('./assets/css/'))
    .pipe(browserSync.stream());
    done();
    }
    
    function sync(done){
        browserSync.init({
            server:{
                baseDir: "./"
            },
            port:3000
        })
    }
    
    function browserReload(done){
        browserSync.reload();
        done;
    }
    
    function second(done){
        console.log('Jisdew');
        done();
    }
    
    function watchSass(){
        gulp.watch("./scss/**/*",css_style);
    }
    
    function watchFiles(){
        gulp.watch("./assets/scss/**/*",css_style);
        gulp.watch("./**/*.html",browserReload);
    }
    
    
    
    
    gulp.task('default',gulp.parallel(sync,watchFiles));
    gulp.task(sync);