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
    venue.schedules.forEach(s => {
      // if (s.starttime < 60*60*24 || s.starttime > 60*60*24*2 ) {
      //   return;
      // }
      let klass = classes.find(klass => s.class.id == klass.id);
      if (!klass) {
        klass = s.class
        classes.push(klass);
        // klass.venue = venue;
        klass.venue = {
          venue_name: venue.venue_name,
          activities: venue.activities,
          images: venue.images.default,
          display_rating_average: String(Math.round(venue.display_rating_average*10)/10),
        }
        klass.schedules = [];
      }
      klass.schedules.push(s)
      delete s.class;
      delete klass.ratings.count
      delete klass.venue.schedules
    });

  })
classes
  .forEach(klass => {
    klass.schedules.sort((a, b) => {
      return a.starttime - b.starttime;
    })
  })

// process.stdout.write(JSON.stringify(classes.slice(0,200), null, 2));
process.stdout.write("export default ");
process.stdout.write(JSON.stringify(classes, null, 2));
