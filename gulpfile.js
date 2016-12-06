var gulp =require('gulp'),
    pug=require('gulp-pug'),
    autoprefixer=require('gulp-autoprefixer'),
    sass=require('gulp-sass'),
    browserSync=require('browser-sync'),
    rename=require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    htmlmin = require('gulp-html-minifier'),
    uglify = require('gulp-uglify'),
    prettify = require('gulp-jsbeautifier'),
    gulpif = require('gulp-if');


/* ------------------------ Directory Settings ---------------------- */
var devPath  = './dev',
    pugPath = devPath + "/pug",
    sassPath = devPath + "/sass",
    devCssPath  = devPath + "/css",
    devJsPath  = devPath + "/js",
    devImgPath  = devPath + "/images"
    devVendorPath  = devPath + "/vendor";

var destPath = "./site",
    cssPath = destPath  +"/assets/css",
    imgPath = destPath  +"/assets/images",
    jsPath = destPath  +"/assets/js";
    vendorPath = destPath  +"/assets/vendor";



/* ------------------------ task config Settings ---------------------- */

var  portNumber= 8001; /* port for browserSync UI */
var minification =false; /* set to false if output showld not be minified html,css,js */

var sassSettings={
      outputStyle: (minification===true)?'compressed': 'expanded',
      onError: browserSync.notify
    };

var pugSettings={
      pretty: true
    };

var autoprefixerSettings={
      browsers: ['last 35 versions'],
      cascade: false
    };

var browserSyncSettings={
      server: {
        baseDir: destPath
      },
      ui: {
        port: portNumber
      }
    };
var uglifySettings={
      sequences: true,
      dead_code: true,
      drop_debugger: true,
      conditionals: true,
      booleans: true,
      loops: true,
      evaluate: true,
      unused: true,
      if_return: true,
      join_vars: true,
      cascade: true,
      drop_console: true
    };
var htmlSettings={
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      removeAttributeQuotes: true,
      removeComments:true,
      removeEmptyAttributes:true
    };
var plumberSettings=function(error){
  console.log(error);
  this.emit('end');
}
/* ------------------------ Exprn match ---------------------- */

var htmlmatch=[
                destPath +"/*.html"
              ],
    pugmatch=[
                pugPath  + "/**/*.pug" ,
                '!' + pugPath  + '/**/_*/**/*'
              ],
    sassmatch=[
                sassPath  + "/**/*.sass",
                sassPath  + "/**/*.scss",
                '!' +  sassPath  + '/**/_*/**/*'
              ],
    sassallmatch=[
                sassPath  + "/**/*.sass",
                sassPath  + "/**/*.scss" 
              ],
    jsmatch=[
              devJsPath+"/**/*.js",
              "!"+devJsPath+"/**/*.min.js",
              '!' + devJsPath  + '/**/_*/**/*'
            ],
    imgmatch=[devImgPath+'/**/*'],
    vendormatch=[devVendorPath+'/**/*'],
    pugallmatch=[
                pugPath  + "/**/*.pug"
              ];

/* ------------------------ Vendor Copy  ---------------------- */
gulp.task('vendor',function(){
  return gulp.src(vendormatch)
        .pipe(plumber(plumberSettings))
        .pipe(gulp.dest(vendorPath))
});

/* ------------------------ sass  task ---------------------- */
gulp.task('sass',function(){
  return gulp.src(sassmatch)
        .pipe(plumber(plumberSettings))
        .pipe(sass(sassSettings)).on('error',function(e){console.log(e);})
        .pipe(autoprefixer(autoprefixerSettings)) 
        .pipe(gulp.dest(cssPath))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest(devCssPath))
});
 
 

/* ------------------------ pug  task ---------------------- 
*
*	 Compile pug files to html
*
**/
gulp.task('pug',function(){
 
  return gulp.src(pugmatch)
        .pipe(plumber(plumberSettings))
        .pipe(pug(pugSettings))
        .pipe(gulpif(minification===true, htmlmin(htmlSettings)))
        .pipe(gulp.dest(destPath)) 

});
 

/* ------------------------ js  task ---------------------- */
gulp.task('scripts',function(){
  return gulp.src(jsmatch) 
        .pipe(plumber(plumberSettings))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulpif(minification===true,uglify(uglifySettings))) 
        .pipe(prettify())
        .pipe(gulp.dest(jsPath))
});


/* ------------------------ image min  task ---------------------- */
gulp.task('imgmin',function(){
  return gulp.src(imgmatch)
        .pipe(plumber(plumberSettings))
        .pipe(gulpif(minification===true,imagemin()))  
        .pipe(gulp.dest(imgPath))
});


/* ------------------------ browserSync  task ---------------------- */
gulp.task('browser-sync', ['sass', 'pug','scripts'], function() {
  return browserSync(browserSyncSettings);
});


/* ------------------------  watch  task -------------------------- */
gulp.task('watch',function(){
  gulp.watch(sassallmatch,['sass']);
  gulp.watch(imgmatch,['imgmin']);
  gulp.watch(jsmatch,['scripts']);
  gulp.watch(pugallmatch,['pug']);
  gulp.watch(htmlmatch).on('change',browserSync.reload);

});


/* ------------------------ default gulp task -------------------------- */
gulp.task('default',['vendor','browser-sync','watch']);