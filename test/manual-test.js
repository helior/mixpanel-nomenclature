var spec = require('./spec.js');
var mixpanel = require('./mock-mixpanel.js');
var nomenclature = require('..');

nomenclature(mixpanel, spec);

mixpanel.track('Arrived to end of page', 'somevalue');
