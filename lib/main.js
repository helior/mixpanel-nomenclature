var MixpanelNomenclature = require('./mixpanel-nomenclature');

module.exports = function(api, spec) {
  var nomenclature = new MixpanelNomenclature(api, spec);
  nomenclature.process();
}
