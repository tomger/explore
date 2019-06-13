npx babel tohtml.js | node | node booth.js --output output/denver.jpg
convert -crop 750x1000 output/latest.png output/%d.png

cat output/denver.json |  ./proto_classes.js  > output/denver_classes.js
cat output/denver.json |  ./proto_venues.js  > output/denver_classes.js


./get.js --request '{"search_request":{"filters":{"date":"2019-06-13","lat":52.3679843,"lon":4.9035614,"place_id":"ChIJVXealLU_xkcRja_At0z9AGY","result_type":"VENUE","tag":[],"radius":13.3}}}' | ./proto_venues.js | npx babel-node tohtml.js | node booth.js --output output/latest.jpg
