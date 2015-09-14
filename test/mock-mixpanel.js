module.exports = {
  track: function(name, properties, callback) {
    var obj = {};
    obj[name] = properties;
    console.log('original track');
    return obj;
  },

  otherThing: function (name) {
    console.log("I do another thing: " + name);
  }
};
