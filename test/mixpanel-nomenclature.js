var test = require('tape');
var spec = require('./spec.js');
var mixpanelApi = require('./mock-mixpanel.js');
var MixpanelNomenclature = require('../dist/mixpanel-nomenclature');

test('MixpanelNomenclature.constructor()', function (t) {
  t.throws(function() {new MixpanelNomenclature(mixpanelApi, {})});
  t.doesNotThrow(function() {new MixpanelNomenclature(mixpanelApi, spec)});
  t.end();
})

test('MixpanelNomenclature.validateSpec()', function (t) {
  var instance = new MixpanelNomenclature(mixpanelApi, spec);

  t.throws(function () {instance.validateSpec({})});
  t.doesNotThrow(function () {instance.validateSpec({'events': {}, 'superProperties': {}, 'peopleProperties':{}})});
  t.throws(function () {instance.validateSpec({'events': {'a':null,'b':123,'c': 'nope'}, 'superProperties': {}, 'peopleProperties':{}})})
  t.doesNotThrow(function () {instance.validateSpec({'events': {'a':{}, 'b':{}, 'c':{}}, 'superProperties': {}, 'peopleProperties':{}})});
  t.end();
})

test('MixpanelNomenclature.eventPath()', function (t) {
  var instance = new MixpanelNomenclature(mixpanelApi, spec);
  t.equal(instance.eventPath('name of some event'), 'events.name of some event');
  t.end();
})

test('MixpanelNomenclature.eventExists()', function (t) {
  var instance = new MixpanelNomenclature(mixpanelApi, spec);
  t.ok(instance.eventExists('Arrived to end of page'));
  t.ok(instance.eventExists('something something'));
  t.notOk(instance.eventExists('blah blah blah'));
  t.end();
})

test('MixpanelNomenclature.getEventSpec()', function (t) {
  var instance = new MixpanelNomenclature(mixpanelApi, spec);
  t.ok(instance.getEventSpec('Arrived to end of page'), spec.events['Arrived to end of page']);
  t.end();
})
