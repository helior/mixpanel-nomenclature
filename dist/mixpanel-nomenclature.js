'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var specDefault = { 'events': {}, 'superProperties': {}, 'peopleProperties': {} };
var Nomenclature = require('./nomenclature');
var has = require('lodash/object/has');
var forOwn = require('lodash/object/forOwn');
var forEach = require('lodash/collection/forEach');
var Joi = require('joi');

var MixpanelNomenclature = (function (_Nomenclature) {
  _inherits(MixpanelNomenclature, _Nomenclature);

  function MixpanelNomenclature() {
    _classCallCheck(this, MixpanelNomenclature);

    _get(Object.getPrototypeOf(MixpanelNomenclature.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MixpanelNomenclature, [{
    key: 'eventPath',
    value: function eventPath(eventName) {
      return ['events', eventName].join('.');
    }
  }, {
    key: 'eventExists',
    value: function eventExists(eventName) {
      return this.specDefinitionExists(this.eventPath(eventName));
    }
  }, {
    key: 'getEventSpec',
    value: function getEventSpec(eventName) {
      return this.getSpecItem(this.eventPath(eventName));
    }
  }, {
    key: 'validateSpec',
    value: function validateSpec(spec) {
      // Let parent class do its validation first.
      _get(Object.getPrototypeOf(MixpanelNomenclature.prototype), 'validateSpec', this).call(this, spec);

      // Validate that each root-level key exists and is an object.
      ['events', 'superProperties', 'peopleProperties'].forEach(function (type) {
        if (!has(spec, type)) throw new Error('"' + type + '" key must exist in the spec.');
        if (typeof spec[type] !== 'object') throw new Error('The value of "' + type + '" must be an object; "' + typeof spec[type] + '" was found instead.');
      });

      // Additionally, each event should be an object as well.
      forOwn(spec['events'], function (val, key) {
        if (typeof val !== 'object') throw new Error('The event "' + key + '" must be an object of properties; "' + typeof val + '" was found instead.');
      });
    }
  }, {
    key: 'process',
    value: function process() {
      var _this = this;

      this.override('track', this.validate(function (original, event_name, properties) {
        if (_this.eventExists(event_name)) {
          Joi.validate(properties, _this.getEventSpec(event_name), function (err, value) {
            if (err) {
              console.log('Validation failed for event "' + event_name + '": ' + err.details[0].message + ', however "' + err.details[0].context.value + '" given.');
              return false;
            }
            console.log('running "track" before');
            original();
          });
        } else {
          console.log('Event "' + event_name + '" does not exist!');
        }
      }));
    }
  }]);

  return MixpanelNomenclature;
})(Nomenclature);

module.exports = MixpanelNomenclature;