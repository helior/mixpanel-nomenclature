'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var specDefault = { 'events': {}, 'superProperties': {}, 'peopleProperties': {} };
var has = require('lodash/object/has');

var Nomenclature = (function () {
  function Nomenclature(api, loadedSpec) {
    _classCallCheck(this, Nomenclature);

    if (Nomenclature.validateSpec(loadedSpec)) {
      this.spec = loadedSpec;
      this.api = api;
    }
  }

  _createClass(Nomenclature, [{
    key: 'override',
    value: function override(methodName, callback) {
      this.api[methodName] = callback(this.api[methodName]);
    }
  }, {
    key: 'validate',
    value: function validate(extraBehavior) {
      return function (original) {
        return function () {
          if (extraBehavior.apply(this, arguments)) {
            return original.apply(this, arguments);
          }
        };
      };
    }
  }, {
    key: 'specDefinitionExists',
    value: function specDefinitionExists(path) {
      return has(this.spec, path);
    }
  }, {
    key: 'process',
    value: function process() {}
  }, {
    key: 'spec',
    get: function get() {
      return this._spec;
    },
    set: function set(value) {
      this._spec = value;
    }
  }, {
    key: 'api',
    get: function get() {
      return this._api;
    },
    set: function set(value) {
      this._api = value;
    }
  }], [{
    key: 'validateSpec',
    value: function validateSpec(spec) {
      return typeof spec == 'object';
    }
  }]);

  return Nomenclature;
})();

module.exports = Nomenclature;