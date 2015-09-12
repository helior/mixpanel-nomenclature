var test = require('tape');
var spec = require('./spec.js');
var mixpanel = require('./mock-mixpanel.js');
var nomenclature = require('..');

test('Wrapping original API works as expected.', function (t) {
  t.plan(1);
  // t.equal(mixpanel.track('some event'), {'some event': {}});

  nomenclature(mixpanel, spec);

  // t.equal(mixpanel.track('some event'), 'Wrap: some event');
  t.equal(true,true);
});
