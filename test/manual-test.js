var mixpanel = require('./mock-mixpanel.js');
var nomenclature = require('..');
var spec = require('./spec.js');

nomenclature(mixpanel, spec);

mixpanel.track('Arrived to end of page', {
  'seconds took': 4,
  'random string': 'ddfs'
});

mixpanel.otherThing('stuff');
