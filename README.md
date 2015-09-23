## Mixpanel Nomenclature
Mixpanel nomenclature wraps around the existing Mixpanel library and uses a spec (which you provide) to validate that a tracking call is valid before sending off to Mixpanel. This will ensure the integrity of your data.

Responsible for:
- Mixpanel-specific schema
- proxy mixpanel object to inject validation/conversion


###### TODOS:
- handle exceptions/logging properly
- write some tests
- document methods
- override register method
- override register_once method
- override people.set method
- override people.set_once method
- override track_links method
- override track_forms method
- generate docs from spec?
