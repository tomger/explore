npx babel tohtml.js | node | node booth.js --output output/denver.jpg
convert -crop 750x1000 output/denver.png output/denver_%d.png

cat output/denver.json |  ./proto_classes.js  > output/denver_classes.js


// NJ
// {"search_request":{"filters":{"vertical":"fitness","date":"2019-07-29","lat":40.72477651911137,"lon":-74.04397508386175,"result_type":"VENUE","tag":[],"map_bounds":"-74.0644952489028,40.69066673529619,-74.02345491884574,40.75886883028423"}}}


./get.js --request '{"search_request":{"filters":{"date":"2019-06-11","lat":40.71962920625383,"lon":-74.04500010264353,"result_type":"VENUE","tag":[],"map_bounds":"-74.05774163095468,40.708552917650735,-74.03225857432639,40.730703652111686"}}}' | ./proto_classes.js | npx babel-node tohtml.js | ./booth.js --output output/latest.png
./get.js --request '{"search_request":{"filters":{"date":"2019-07-29","lat":40.72477651911137,"lon":-74.04397508386175,"result_type":"VENUE","tag":[],"map_bounds":"-74.0644952489028,40.69066673529619,-74.02345491884574,40.75886883028423"}}}' | ./proto_venues.js | npx babel-node tohtml.js | ./booth.js --output output/latest.png && convert -crop 750x1000 output/latest.png output/%d.png


denver/littleton:


./get.js --request '{"search_request":{"filters":{"date":"2019-08-05","lat":39.586113630573315,"lon":-104.9753079589899,"result_type":"VENUE","tag":[],"map_bounds":"-105.1394331236637,39.44184646792431,-104.81118279430203,39.73008105452806"}}}' | ./proto_venues.js   > ../Explore.framerfx/code/denversouth.js
./get.js --request '{"search_request":{"filters":{"date":"2019-08-05","lat":40.71233156183358,"lon":-73.99098462896949,"result_type":"VENUE","tag":[],"map_bounds":"-74.03141647388058,40.67302527293026,-73.95055278403007,40.75161466074499"}}}' | ./proto_venues.js   > ../Explore.framerfx/code/nysouth.js



./get.js --request '{"search_request":{"filters":{"date":"2019-08-05","lat":40.69420372514628,"lon":-73.99417901845815,"result_type":"VENUE","tag":[],"map_bounds":"-74.02890659631986,40.66817958321471,-73.95945144059188,40.7202177060494"}}}' | ./proto_venues.js   > ../Explore.framerfx/code/nysouth.js
./get.js --request '{"search_request":{"filters":{"date":"2019-08-05","lat":40.727306233738986,"lon":-74.03956578723337,"result_type":"VENUE","tag":[],"map_bounds":"-74.08625489049143,40.71087300021367,-73.99287668397957,40.743735410325286"}}}' | ./proto_venues.js   > ../Explore.framerfx/code/njwestmanhattan.js
./get.js --request '{"search_request":{"filters":{"date":"2019-08-06","lat":40.7428931709069,"lon":-73.99782028680697,"result_type":"VENUE","tag":[],"map_bounds":"-74.0065544903419,40.732833910818215,-73.98908608327427,40.75295090982033"}}}' | ./proto_venues.js   > ../Explore.framerfx/code/chelsea.js
./get.js --request '{"search_request":{"filters":{"date":"2019-08-06","lat":46.8620601016578,"lon":-114.01269502470818,"result_type":"VENUE","tag":[],"map_bounds":"-114.0630629530007,46.81788484027285,-113.96232709642159,46.906199044654414"}}}' | ./proto_venues.js   > ../Explore.framerfx/code/missoula.js

DATASET=datasets/bkwest.js && ./get.js --request '{"search_request":{"filters":{"date":"2019-08-05","lat":40.68742690726565,"lon":-73.98481013576462,"result_type":"VENUE","tag":[],"map_bounds":"-74.00862899567097,40.66684323707332,-73.960991275848,40.708004221736445"}}}' | ./proto_venues.js > $DATASET && cp $DATASET ../Explore.framerfx/code/dataset.js
DATASET=datasets/bkwest_classes.js && ./get.js --request '{"search_request":{"filters":{"date":"2019-08-05","lat":40.68742690726565,"lon":-73.98481013576462,"result_type":"VENUE","tag":[],"map_bounds":"-74.00862899567097,40.66684323707332,-73.960991275848,40.708004221736445"}}}' | ./proto_classes.js > $DATASET && cp $DATASET ../Explore.framerfx/code/dataset_classes.js
DATASET=datasets/bkwest_schedules.js && ./get.js --request '{"search_request":{"filters":{"date":"2019-08-05","lat":40.68742690726565,"lon":-73.98481013576462,"result_type":"VENUE","tag":[],"map_bounds":"-74.00862899567097,40.66684323707332,-73.960991275848,40.708004221736445"}}}' | ./proto_schedules.js > $DATASET && cp $DATASET ../Explore.framerfx/code/dataset_schedules.js
DATASET=datasets/houston.js && ./get.js --request '{"search_request":{"filters":{"date":"2019-08-09","lat":29.73373033928371,"lon":-95.44385406563356,"result_type":"VENUE","tag":[],"map_bounds":"-95.57811885787346,29.59252769580948,-95.30958927337771,29.87473450237387"}}}' | ./proto_venues.js > $DATASET && cp $DATASET ../Explore.framerfx/code/dataset.js
