var spec = require('./spec.js');
var mixpanel = require('./mock-mixpanel.js');
var nomenclature = require('..');

nomenclature(mixpanel, spec);

mixpanel.track('somekey', 'somevalue');
