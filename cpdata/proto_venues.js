#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');

var input = fs.readFileSync('/dev/stdin', 'utf8').toString();
var venues = JSON.parse(input);

venues = venues
  .filter(venue => {
    return !!venue.schedules && venue.schedules.length
  })
  .map(venue => {
    venue.classes = [];
    let schedules = [];
    venue.images = venue.images.default;
    venue.display_rating_average = String(Math.round(venue.display_rating_average*10)/10)
    venue.schedules.forEach(s => {
      // only Monday schedules
      if (s.starttime < 60*60*(24+18) || s.starttime > 60*60*24*2 ) {
        return;
      }
      delete s.ratings
      delete s.class.ratings
      let klass = venue.classes.find(klass => s.class.id == klass.id);
      if (!klass) {
        klass = s.class;
        klass.schedules = [];
        venue.classes.push(klass)
      }
      // delete s.class;
      s.class = { name: s.class.name} // alt
      schedules.push(s)
      klass.schedules.push(s);
    })
    // delete venue.schedules;
    venue.schedules = schedules; // alt
    return venue;
  })
  .filter(venue => {
    return venue.classes.length
  })

process.stdout.write(JSON.stringify(venues, null, 2));


// Test output
// process.stdout.write("export default ");
// process.stdout.write(JSON.stringify(venues.slice(0, 4), null, 2));
