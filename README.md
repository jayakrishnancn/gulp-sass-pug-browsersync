# gulp-sass-pug-browsersync
A starter project for gulp-sass-pug-browsersync 
contains 
  * gulp
  * gulp-jpug
  * gulp-sass
  * browserSync 
  * gulp-autoprefixer
  * gulp-imagemin
  * gulp-html-minifier
  * gulp-jsbeautifier
  * gulp-uglify
  * gulp-plumber
  * gulp-rename
  * gulp-if
  
#Local Installation
  1. Clone this repo, or download it into a directory of your choice.
  2. cd into  directory, run npm install.
  3. To create default directories run sh createdirs.sh  (in linux) 
  
#Usage
###development mode
  ```javascript
    $ gulp
  ```

###for image minification use:  

  ```javascript
    $ gulp imgmin
  ```
###  To copy vendor files to dest directory 

  ```javascript
    $ gulp vendor
  ```
###configuration
  * var minificaiton=true ;  for minification of image,css,html,js use this , in config portion of gulpfile.js
