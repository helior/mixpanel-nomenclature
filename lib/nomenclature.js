var has = require('lodash/object/has');
var get = require('lodash/object/get');

class Nomenclature {
  /**
   * Class contstructor.
   *
   * @param  {object} api
   *   The Analytics object to override.
   *
   * @param  {object} loadedSpec
   *   The spec definition to validate calls.
   *
   * @return {nomenclature}
   */
  constructor(api, loadedSpec) {
    this.validateSpec(loadedSpec);

    this._api = api;
    this._spec = loadedSpec;
  };

  /**
   * Getter for property: spec.
   *
   * @return {object} Spec object.
   */
  get spec() {
      return this._spec;
  }

  /**
   * Setter for property: spec.
   */
  set spec(value) {
    if (value) {
      this._spec = value;
    }
  }

  /**
   * Getter for property: api
   *
   * @return {object} Analytics API object.
   */
  get api() {
    return this._api;
  }

  /**
   * Setter for property: api.
   *
   * @param  {object} value The Analytics library used to override.
   */
  set api(value) {
    if (value) {
      this._api = value;
    }
  }

  /**
   * [validateSpec description]
   * @param  {[type]} spec [description]
   * @return {[type]}      [description]
   */
  validateSpec(spec) {
    if (typeof spec !== 'object') {
      throw(new Error('The provided spec must be an object.'));
    }
  };

  /**
   * [override description]
   * @param  {[type]}   methodName [description]
   * @param  {Function} callback   [description]
   * @return {[type]}              [description]
   */
  override(methodName, callback) {
    this.api[methodName] = callback(this.api[methodName]);
  };

  overrideAndValidate(methodName, callback) {
    this.override(methodName, this.validate(callback));
  }

  /**
   * [validate description]
   * @param  {[type]} extraBehavior [description]
   * @return {[type]}               [description]
   */
  validate(extraBehavior) {
    return function(original) {
      return function() {
        extraBehavior.call(this, () => {
          original.apply(this, arguments);
        }, ...arguments);
      }
    }
  };

  /**
   * [validateSync description]
   * @param  {[type]} extraBehavior [description]
   * @return {[type]}               [description]
   */
  validateSync(extraBehavior) {
    return function(original) {
      return function() {
        if (extraBehavior.apply(this,arguments)) {
          original.apply(this, arguments);
        }
      }
    }
  }

  /**
   * [specDefinitionExists description]
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  specDefinitionExists(path) {
    return has(this.spec, path);
  }

  /**
   * [getSpecItem description]
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  getSpecItem(path) {
    return get(this.spec, path);
  }

  /**
   * [process description]
   * @return {[type]} [description]
   */
  process() {}
}

module.exports = Nomenclature;
