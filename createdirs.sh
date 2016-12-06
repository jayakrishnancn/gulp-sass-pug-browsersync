lists="site dev ./site/assets ./site/assets/css ./site/assets/js ./site/assets/images  ./site/assets/vendor ./dev/pug ./dev/sass ./dev/css ./dev/js ./dev/images ./dev/vendor "
for dir in $lists
do
  if [ -d $dir ] 
  	then
  		echo " $dir already exist"
  	else
  		mkdir $dir
  		echo " $dir created"
  fi
done