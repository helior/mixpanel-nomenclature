var test = require('tape');
var spec = require('./spec.js');
var mixpanelApi = require('./mock-mixpanel.js');
var nomenclature = require('../dist/nomenclature');
var MixpanelNomenclature = require('..');

test('Contstructor and property accessors work as expected.', function (t) {
  var spec = {};
  t.doesNotThrow(function() {new nomenclature(mixpanelApi, spec)});

  var instance = new nomenclature(mixpanelApi, spec);

  t.equal(instance.spec, spec);
  t.equal(instance.api, mixpanelApi);
  t.end();
});

test('Negative test for constructor', function(t) {
  var spec = null;
  t.throws(function () {new nomenclature(mixpanelApi, spec)});
  t.end();
});

test('Helper methods', function(t) {
  spec = {'foo' : 'bar'};
  var instance = new nomenclature(mixpanelApi, spec);
  t.ok(instance.specDefinitionExists('foo'), 'foo should exist in spec');
  t.notOk(instance.specDefinitionExists('baz'), 'baz should not exist in spec');

  t.equal(instance.getSpecItem('foo'), 'bar', 'foo should equal bar');
  t.notEqual(instance.getSpecItem('foo', 'baz', 'foo should not equal baz'));
  t.equal(instance.getSpecItem('fakeProperty'), undefined, 'fakeProperty should be undefined');
  t.end();
});
