#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');

var input = fs.readFileSync('/dev/stdin', 'utf8').toString();
var venues = JSON.parse(input);
var classes = [];

venues
  .filter(venue => {
    return !!venue.schedules && venue.schedules.length
  })
  .forEach(venue => {
    venue.images = venue.images.default;
    venue.display_rating_average = String(Math.round(venue.display_rating_average*10)/10)
    venue.schedules.forEach(s => {
      let klass = classes.find(klass => s.class.id == klass.id);
      if (!klass) {
        klass = s.class
        classes.push(klass);
        klass.venue = venue;
        klass.schedules = [];
      }
      klass.schedules.push(s)
      delete s.class;
      delete klass.ratings.count
      delete klass.venue.schedules
    });
  })

// Real output
process.stdout.write("exports.data = ");
process.stdout.write(JSON.stringify(classes.slice(0,50), null, 2));


// Test output
// process.stdout.write("export default ");
// process.stdout.write(JSON.stringify(classes.slice(0, 4), null, 2));
