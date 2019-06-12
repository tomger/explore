npx babel tohtml.js | node | node booth.js --output output/denver.jpg
convert -crop 750x1000 output/denver.png output/denver_%d.png

cat output/denver.json |  ./proto_classes.js  > output/denver_classes.js
