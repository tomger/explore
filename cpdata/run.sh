npx babel tohtml.js | node | node booth.js --output output/denver.jpg
convert -crop 750x1000 output/denver.png output/denver_%d.png

cat output/denver.json |  ./proto_classes.js  > output/denver_classes.js



./get.js --request '{"search_request":{"filters":{"lat":40.71962920625383,"lon":-74.04500010264353,"result_type":"VENUE","tag":[],"map_bounds":"-74.05774163095468,40.708552917650735,-74.03225857432639,40.730703652111686"}}}' | ./proto_classes.js | npx babel-node tohtml.js | ./booth.js --output output/latest.png
