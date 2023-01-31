const assert = require('assert');
const app = require('../../src/app');

describe('\'airtime\' service', () => {
  it('registered the service', () => {
    const service = app.service('airtime');

    assert.ok(service, 'Registered the service');
  });
});
