'use strict';

var _slice = Array.prototype.slice;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

    this.validateSpec(loadedSpec);

    this.api = api;
    this.spec = loadedSpec;
  }

  _createClass(Nomenclature, [{
    key: 'validateSpec',

    // /**
    //  * Getter for property: spec.
    //  *
    //  * @return {object} Spec object.
    //  */
    // get spec() {
    //     return this._spec;
    // }
    //
    // /**
    //  * Setter for property: spec.
    //  */
    // set spec(value) {
    //   this._spec = value;
    // }
    //
    // /**
    //  * Getter for property: api
    //  *
    //  * @return {object} Analytics API object.
    //  */
    // get api() {
    //   return this._api;
    // }
    //
    // /**
    //  * Setter for property: api.
    //  *
    //  * @param  {object} value The Analytics library used to override.
    //  */
    // set api(value) {
    //   this._api = value;
    // }

    /**
     * [validateSpec description]
     * @param  {[type]} spec [description]
     * @return {[type]}      [description]
     */
    value: function validateSpec(spec) {
      if (typeof spec !== 'object') {
        throw new Error('The provided spec must be an object.');
      }
    }
  }, {
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
    key: 'validateSync',

    /**
     * [validateSync description]
     * @param  {[type]} extraBehavior [description]
     * @return {[type]}               [description]
     */
    value: function validateSync(extraBehavior) {
      return function (original) {
        return function () {
          if (extraBehavior.apply(this, arguments)) {
            original.apply(this, arguments);
          }
        };
      };
    }

    /**
     * [specDefinitionExists description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
  }, {
    key: 'specDefinitionExists',
    value: function specDefinitionExists(path) {
      return has(this.spec, path);
    }

    /**
     * [getSpecItem description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
  }, {
    key: 'getSpecItem',
    value: function getSpecItem(path) {
      return get(this.spec, path);
    }

    /**
     * [process description]
     * @return {[type]} [description]
     */
  }, {
    key: 'process',
    value: function process() {}
  }]);

  return Nomenclature;
})();

module.exports = Nomenclature;