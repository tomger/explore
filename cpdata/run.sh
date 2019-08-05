npx babel tohtml.js | node | node booth.js --output output/denver.jpg
convert -crop 750x1000 output/denver.png output/denver_%d.png

cat output/denver.json |  ./proto_classes.js  > output/denver_classes.js


// NJ
// {"search_request":{"filters":{"vertical":"fitness","date":"2019-07-29","lat":40.72477651911137,"lon":-74.04397508386175,"result_type":"VENUE","tag":[],"map_bounds":"-74.0644952489028,40.69066673529619,-74.02345491884574,40.75886883028423"}}}


./get.js --request '{"search_request":{"filters":{"date":"2019-06-11","lat":40.71962920625383,"lon":-74.04500010264353,"result_type":"VENUE","tag":[],"map_bounds":"-74.05774163095468,40.708552917650735,-74.03225857432639,40.730703652111686"}}}' | ./proto_classes.js | npx babel-node tohtml.js | ./booth.js --output output/latest.png
./get.js --request '{"search_request":{"filters":{"date":"2019-07-29","lat":40.72477651911137,"lon":-74.04397508386175,"result_type":"VENUE","tag":[],"map_bounds":"-74.0644952489028,40.69066673529619,-74.02345491884574,40.75886883028423"}}}' | ./proto_venues.js | npx babel-node tohtml.js | ./booth.js --output output/latest.png && convert -crop 750x1000 output/latest.png output/%d.png


denver/littleton:


./get.js --request '{"search_request":{"filters":{"date":"2019-08-05","lat":39.586113630573315,"lon":-104.9753079589899,"result_type":"VENUE","tag":[],"map_bounds":"-105.1394331236637,39.44184646792431,-104.81118279430203,39.73008105452806"}}}' | ./proto_venues.js   > ../Explore.framerfx/code/denversouth.js
