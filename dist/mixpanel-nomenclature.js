'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Nomenclature = require('./nomenclature');

var MixpanelNomenclature = (function (_Nomenclature) {
  _inherits(MixpanelNomenclature, _Nomenclature);

  function MixpanelNomenclature() {
    _classCallCheck(this, MixpanelNomenclature);

    _get(Object.getPrototypeOf(MixpanelNomenclature.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MixpanelNomenclature, [{
    key: 'eventExists',
    value: function eventExists(eventName) {
      return this.specDefinitionExists(['events', eventName].join('.'));
    }
  }, {
    key: 'process',
    value: function process() {
      var _this = this;

      this.override(this.api, 'track', this.validate(function (event_name, properties, callback) {
        // Validate the events and property names; return boolean.
        if (_this.eventExists(event_name)) {
          console.log('running "track" before');
          return true;
        }

        return false;
      }));
    }
  }]);

  return MixpanelNomenclature;
})(Nomenclature);

module.exports = MixpanelNomenclature;