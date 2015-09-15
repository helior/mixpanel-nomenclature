'use strict';

var _slice = Array.prototype.slice;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var specDefault = { 'events': {}, 'superProperties': {}, 'peopleProperties': {} };
var has = require('lodash/object/has');
var get = require('lodash/object/get');

var Nomenclature = (function () {
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

  function Nomenclature(api, loadedSpec) {
    _classCallCheck(this, Nomenclature);

    if (Nomenclature.validateSpec(loadedSpec)) {
      this.spec = loadedSpec;
      this.api = api;
    }
  }

  _createClass(Nomenclature, [{
    key: 'override',

    /**
     * [override description]
     * @param  {[type]}   methodName [description]
     * @param  {Function} callback   [description]
     * @return {[type]}              [description]
     */
    value: function override(methodName, callback) {
      this.api[methodName] = callback(this.api[methodName]);
    }
  }, {
    key: 'validate',

    /**
     * [validate description]
     * @param  {[type]} extraBehavior [description]
     * @return {[type]}               [description]
     */
    value: function validate(extraBehavior) {
      return function (original) {
        return function () {
          var _this = this,
              _arguments = arguments;

          extraBehavior.call.apply(extraBehavior, [this, function () {
            original.apply(_this, _arguments);
          }].concat(_slice.call(arguments)));
        };
      };
    }
  }, {
    key: 'specDefinitionExists',

    /**
     * [specDefinitionExists description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    value: function specDefinitionExists(path) {
      return has(this.spec, path);
    }
  }, {
    key: 'getSpecItem',

    /**
     * [getSpecItem description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    value: function getSpecItem(path) {
      return get(this.spec, path);
    }
  }, {
    key: 'process',

    /**
     * [process description]
     * @return {[type]} [description]
     */
    value: function process() {}
  }, {
    key: 'spec',

    /**
     * Getter for property: spec.
     *
     * @return {object} Spec object.
     */
    get: function get() {
      return this._spec;
    },

    /**
     * Setter for property: spec.
     */
    set: function set(value) {
      this._spec = value;
    }
  }, {
    key: 'api',

    /**
     * Getter for property: api
     *
     * @return {object} Analytics API object.
     */
    get: function get() {
      return this._api;
    },

    /**
     * Setter for property: api.
     *
     * @param  {object} value The Analytics library used to override.
     */
    set: function set(value) {
      this._api = value;
    }
  }], [{
    key: 'validateSpec',

    /**
     * [validateSpec description]
     * @param  {[type]} spec [description]
     * @return {[type]}      [description]
     */
    value: function validateSpec(spec) {
      return typeof spec == 'object';
    }
  }]);

  return Nomenclature;
})();

module.exports = Nomenclature;