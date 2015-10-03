var test = require('tape');
var spec = require('./spec.js');
var mixpanelApi = require('./mock-mixpanel.js');
var nomenclature = require('../dist/nomenclature');

test('Nomenclature.constructor()', function (t) {
  t.throws(function () {new nomenclature(mixpanelApi, null)});
  t.throws(function () {new nomenclature(mixpanelApi, 123)});
  t.throws(function () {new nomenclature(mixpanelApi, 'will not work')});
  t.doesNotThrow(function() {new nomenclature(mixpanelApi, {})});

  t.end();
});

test('Nomenclature.get', function (t) {
  var instance = new nomenclature(mixpanelApi, spec);
  t.equal(instance.spec, spec);
  t.equal(instance.api, mixpanelApi);
  t.end();
});

test('Nomenclature.validateSpec()', function (t) {
  var instance = new nomenclature(mixpanelApi, {});

  t.throws(function () {instance.validateSpec(null)});
  t.throws(function () {instance.validateSpec(123)});
  t.doesNotThrow(function () {instance.validateSpec({})});
  t.doesNotThrow(function () {instance.validateSpec({'foo': 'bar'})});
  t.end();
});

test('Nomenclature.specDefinitionExists()', function (t) {
  spec = {'foo' : 'bar'};
  var instance = new nomenclature(mixpanelApi, spec);

  t.ok(instance.specDefinitionExists('foo'), 'foo should exist in spec');
  t.notOk(instance.specDefinitionExists('baz'), 'baz should not exist in spec');
  t.end();
});

test('Nomenclature.getSpecItem()', function (t) {
  spec = {'foo' : 'bar'};
  var instance = new nomenclature(mixpanelApi, spec);

  t.equal(instance.getSpecItem('foo'), 'bar', 'foo should equal bar');
  t.notEqual(instance.getSpecItem('foo', 'baz', 'foo should not equal baz'));
  t.equal(instance.getSpecItem('fakeProperty'), undefined, 'fakeProperty should be undefined');
  t.end();

  // TODO: override(), overrideAndValidate(), validate(), validateSync()
});
