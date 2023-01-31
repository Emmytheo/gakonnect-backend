const assert = require('assert');
const app = require('../../src/app');

describe('\'paystackWebhooks\' service', () => {
  it('registered the service', () => {
    const service = app.service('paystack-webhooks');

    assert.ok(service, 'Registered the service');
  });
});
