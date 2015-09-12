var specDefault = {'events': {}, 'superProperties': {}, 'peopleProperties': {}};


module.exports = function(api, spec = specDefault) {
  var loadedSpec;

  /**
   *
   */
  function override(object, methodName, callback) {
    object[methodName] = callback(object[methodName])
  }

  /**
   *
   */
  function validate(extraBehavior) {
    return function(original) {
      return function() {
        if (extraBehavior.apply(this, arguments)) {
          return original.apply(this, arguments)
        }
      }
    }
  }

  /**
   * @TODO
   */
  function validateSpec(spec) {
    return spec;
  }

  /**
   * @TODO
   */
  function eventExists() {
    return true;
  }

  /**
   *
   */
  function initialize(api, spec) {
    // Validate spec
    loadedSpec = validateSpec(spec);

    // Override track method.
    override(api, 'track', validate(function(event_name, properties, callback) {
      // Validate the events and property names; return boolean.
      if (eventExists())
      console.log('running before');
      return true;
    }));
  }

  initialize(api, spec);
}
