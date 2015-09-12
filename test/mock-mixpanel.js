module.exports = {
  track: function(name, properties, callback) {
    var obj = {};
    obj[name] = properties;
    console.log('original track');
    return obj;
  }
};
