## Nomenclature

Responsible for:
- Parsing a spec file, translate to Joi
- Validate that property name strictly matches
- Creating documentation page from schema

## Nomenclature Mixpanel

Responsible for:
- Mixpanel-specific schema
- proxy mixpanel object to inject validation/conversion


## New notes
- parses a spec file and holds in memory
- monkey patches Mixpanel (before)
- Checks whether a track call is valid before calling Mixpanel.track
- If fails validation, log something.


## problems
- spec file should contain documentation notes, but should reduce to a simple object for production.
