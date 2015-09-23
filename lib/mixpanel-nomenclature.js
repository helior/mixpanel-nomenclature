var specDefault = {'events': {}, 'superProperties': {}, 'peopleProperties': {}};
var Nomenclature = require('./nomenclature');
var has = require('lodash/object/has');
var forOwn = require('lodash/object/forOwn');
var forEach = require('lodash/collection/forEach');
var Joi = require('joi');

class MixpanelNomenclature extends Nomenclature {
  eventPath(eventName) {
      return ['events', eventName].join('.');
  }

  eventExists(eventName) {
    return this.specDefinitionExists(this.eventPath(eventName));
  }

  getEventSpec(eventName) {
    return this.getSpecItem(this.eventPath(eventName));
  }

  validateSpec(spec) {
    // Let parent class do its validation first.
    super.validateSpec(spec);

    // Validate that each root-level key exists and is an object.
    ['events', 'superProperties', 'peopleProperties'].forEach( type => {
      if (!has(spec, type)) throw(new Error(`"${type}" key must exist in the spec.`));
      if (typeof spec[type] !== 'object') throw(new Error(`The value of "${type}" must be an object; "${typeof spec[type]}" was found instead.`));
    });

    // Additionally, each event should be an object as well.
    forOwn(spec['events'], (val, key) => {
      if (typeof val !== 'object') throw(new Error(`The event "${key}" must be an object of properties; "${typeof val}" was found instead.`));
    });
  }

  process() {
    this.overrideAndValidate('track', (original, event_name, properties) => {
      if (this.eventExists(event_name)) {
        Joi.validate(properties, this.getEventSpec(event_name), (err, value) => {
          if (err) {
            console.log(err.annotate());
            console.log(`Validation failed for event "${event_name}": ${err.details[0].message}, however "${err._object[err.details[0].path]}" given.`);
            return false;
          }
          console.log('running "track" before');
          original();
        });
      } else {
        console.log(`Event "${event_name}" does not exist!`);
      }
    });
  }
}

module.exports = MixpanelNomenclature;
