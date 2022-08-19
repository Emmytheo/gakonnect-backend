const assert = require('assert');
const app = require('../../src/app');

describe('\'ePins\' service', () => {
  it('registered the service', () => {
    const service = app.service('e-pins');

    assert.ok(service, 'Registered the service');
  });
});
