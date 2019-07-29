#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');
const http = require("https");
const queue = require("async").queue;
const moment = require("moment");
const output = [];

let request =
{"search_request":{"filters":{"date":"2019-06-11","lat":39.7392358,"lon":-104.990251,"place_id":"ChIJzxcfI6qAa4cR1jaKJ_j0jhE","result_type":"VENUE","tag":[],"radius":30.8}}}


const postData = argv.request || JSON.stringify( request);
cprequest('/_api/unisearch/v1/layout/web_search_page', 'POST', postData, handleVenues)

var q = queue(function(request, cb) {
  // rewrite the timestamps to start counting from last Sunday 00:00.
  const day = moment().add(request.dayIndex, 'days');
  const dayOfWeek = day.day();
  const cachePath = `cache/${request.venue_id}-${dayOfWeek}.json`;
  const startOfWeekOffset = moment().day(0).hour(0).minute(0).unix();
  const startDayOfWeek = moment().add(1, 'days').day();
  let offset = startOfWeekOffset;
  if (dayOfWeek < startDayOfWeek) {
    offset += 7 * 86400; //week * day * sec
  }

  if (fs.existsSync(cachePath)) {
    cb(JSON.parse(fs.readFileSync(cachePath)))
  } else {
      let path = '/_api/v1/venues/' + request.venue_id + '/schedules?date=' + day.format('YYYY-MM-DD');;
      cprequest(path, 'GET', null, function(response) {
        let data = JSON.parse(response);
        data.schedules.forEach(s => {
          s.starttime -= offset;
          s.endtime -= offset;
        })
        fs.writeFileSync(cachePath, JSON.stringify(data));
        cb(data);

      });
  }

}, 20);

q.drain = function() {
  // console.log('Done! 🎉');
  // const outputFile = `${request.search_request.filters.lat}x${request.search_request.filters.lon}x${request.search_request.filters.radius||'auto'}.json`;
  // fs.writeFileSync(outputFile, JSON.stringify(output))
  process.stdout.write(JSON.stringify(output))
};


function cprequest(path, method, data, onSuccess) {
  const options = {
    hostname: 'classpass.com',
    port: 443,
    path: path,
    method: method,

    headers: {
      'content-type': 'application/json',
      'cp-authorization': 'Token 711016a6872c11e5a72022000bca01dd' ,
    },
  };
  let request = http.request(options, function(response) {
      var body = '';
      response.on('data', function(d) {
          body += d;
      });
      response.on('end', function() {
        onSuccess(body)
      });
  });
  if (data) {
    request.write(data);
  }
  request.end();
}

function handleVenues(response) {
  let venueData = JSON.parse(response).data;
  let venues = venueData.modules.web_search_results_01.data.venue_tab_items;
  let mapItems = venueData.modules.web_search_results_01.data.map_items;
  // console.log(response.substr(0, 300), "...");
  // console.info('// Loading venues:', venues.length);

  venues.forEach((venue, i) => {
    output[i] = venue;
    let mapItem = mapItems.find(n => n.venue_id === venue.venue_id);
    if (mapItem) {
      venue.lat = mapItem.lat;
      venue.lon = mapItem.lon;
    }
    delete venue.attended;
    delete venue.facebook_page_url;
    delete venue.phone_number;
    delete venue.requirements;
    delete venue.source;
    delete venue.tz;
    delete venue.website;
    delete venue.when_to_arrive;

    // start from tomorrow and get 7 days
    for (var j = 1; j < 8; j++) {
      (() => {
        q.push({ venue_id: venue.venue_id, dayIndex:j}, (data) => {
          process.stderr.write('s(' + i + ', '+ data.schedules.length + ') ');
          data.schedules.forEach(function(s) {
            if (s.ratings) delete s.ratings.count;
            delete s.venue;
            delete s.deprecated;
            delete s.cancellation_policy;
            delete s.source;
            delete s.org_visits_including_plus;
            if (!output[i].schedules) {
              output[i].schedules = [];
            }
            output[i].schedules.push(s);
          });
        });
      })();
    }
  })
}
