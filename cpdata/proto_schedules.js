#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');

var input = fs.readFileSync('/dev/stdin', 'utf8').toString();
var venues = JSON.parse(input);
var schedules = [];

venues
  .filter(venue => {
    return !!venue.schedules && venue.schedules.length > 1
  })
  .forEach(venue => {
    venue.schedules.forEach(s => {
      schedules.push(s);
        s.venue = {
          venue_name: venue.venue_name,
          location_name: venue.location_name,
          activities: venue.activities,
          lat: venue.lat,
          lon: venue.lon,
          images: venue.images.default,
          display_rating_average: String(Math.round(venue.display_rating_average*10)/10),
          display_rating_total: venue.display_rating_total,
        }
      delete s.description;
      delete s.class.description;
      delete s.tag_ids;
      delete s.late_cancellation;
      // delete klass.ratings.count
    });

  })

schedules.sort((a, b) => {
  return a.starttime - b.starttime;
})

process.stdout.write("export default ");
process.stdout.write(JSON.stringify(schedules, null, 2));
