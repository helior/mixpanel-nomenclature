var joi = require('joi');

module.exports = {
  'events': {
    'Arrived to end of page': {
      'seconds took': joi.number().integer(),
      'random string': joi.string().min(1).max(5)
    },
    'something something': {}
  },
  'superProperties': {},
  'peopleProperties': {}
};
