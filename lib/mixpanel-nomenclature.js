var Nomenclature = require('./nomenclature');

class MixpanelNomenclature extends Nomenclature {
  eventExists(eventName) {
    return this.specDefinitionExists(['events', eventName].join('.'));
  }

  process() {
    this.override('track', this.validate( (event_name, properties, callback) => {
      // Validate the events and property names; return boolean.
      if (this.eventExists(event_name)) {
        console.log('running "track" before');
        return true;
      }

      return false;
    }));
  }
}

module.exports = MixpanelNomenclature;
