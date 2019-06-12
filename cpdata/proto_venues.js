#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');

var venues = JSON.parse(fs.readFileSync(argv.input, 'utf8'));

venues = venues
  .filter(venue => {
    return !!venue.schedules && venue.schedules.length
  })
  .map(venue => {
    venue.classes = [];
    venue.images = venue.images.default;
    venue.display_rating_average = String(Math.round(venue.display_rating_average*10)/10)
    venue.schedules.forEach(s => {
      delete s.ratings
      delete s.class.ratings
      let klass = venue.classes.find(klass => s.class.id == klass.id);
      if (!klass) {
        klass = s.class;
        klass.schedules = [];
        venue.classes.push(klass)
      }
      delete s.class;
      klass.schedules.push(s);
    })
    delete venue.schedules;
    return venue;
  })


process.stdout.write("export default ");
process.stdout.write(JSON.stringify(venues, null, 2));
