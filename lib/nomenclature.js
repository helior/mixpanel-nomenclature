var specDefault = {'events': {}, 'superProperties': {}, 'peopleProperties': {}};
var has = require('lodash/object/has');

class Nomenclature {
  constructor(api, loadedSpec) {
    if (Nomenclature.validateSpec(loadedSpec)) {
      this.spec = loadedSpec;
      this.api = api;
    }
  };

  get spec() {
      return this._spec;
  }

  set spec(value) {
    this._spec = value;
  }

  get api() {
    return this._api;
  }

  set api(value) {
    this._api = value; 
  }

  static validateSpec(spec) {
    return typeof spec == 'object';
  };

  override(object, methodName, callback) {
    object[methodName] = callback(object[methodName]);
  };

  validate(extraBehavior) {
    return function(original) {
      return function() {
        if (extraBehavior.apply(this, arguments)) {
          return original.apply(this, arguments);
        }
      }
    }
  };

  specDefinitionExists(path) {
    return has(this.spec, path);
  }

  process() {

  }
}

module.exports = Nomenclature;
