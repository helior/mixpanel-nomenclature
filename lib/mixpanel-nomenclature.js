var Nomenclature = require('./nomenclature');
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

  process() {
    this.override('track', this.validate( (original, event_name, properties) => {
      if (this.eventExists(event_name)) {
        Joi.validate(properties, this.getEventSpec(event_name), (err, value) => {
          if (err) {
            console.log(`Validation failed for event "${event_name}": ${err.details[0].message}, however "${err.details[0].context.value}" given.`)
            return false;
          }
          console.log('running "track" before');
          original();
        });
      } else {
        console.log(`Event "${event_name}" does not exist!`);
      }
    }));
  }
}

module.exports = MixpanelNomenclature;
