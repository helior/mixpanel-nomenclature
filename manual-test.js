var mixpanel = require('./test/mock-mixpanel.js');
var nomenclature = require('./index');
var spec = require('./test/spec.js');

nomenclature(mixpanel, spec);

mixpanel.track('Arrived to end of page', {
  'seconds took': '422',
  'random string': 'ddxxxxxxxxfs'
});

mixpanel.otherThing('stuff');
