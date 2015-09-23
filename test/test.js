var test = require('tape');
var spec = require('./spec.js');
var mixpanelApi = require('./mock-mixpanel.js');
var nomenclature = require('../dist/nomenclature');
var MixpanelNomenclature = require('..');

test('Wrapping original API works as expected.', function (t) {
  var spec = {};

  t.doesNotThrow(function() {new nomenclature(mixpanelApi, spec)});
  var goodNomen = new nomenclature(mixpanelApi, spec);

  t.equal(goodNomen.spec, spec);
  t.equal(goodNomen.api, mixpanelApi);
  t.end();
});

test('Expect behavior of a bad nomenclature', function(t) {
  var badSpec = null;
  t.throws(function () {new nomenclature(mixpanelApi, badSpec)});
  t.end();
});
