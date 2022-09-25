const assert = require('assert');
const app = require('../../src/app');

describe('\'verifyCustomer\' service', () => {
  it('registered the service', () => {
    const service = app.service('verify-customer');

    assert.ok(service, 'Registered the service');
  });
});
