var test = require('tape');

test('check check..', function (t) {
  t.plan(1);
  t.equal(typeof Date.now, 'function');
});
