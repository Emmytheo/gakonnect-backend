const assert = require('assert');
const app = require('../../src/app');

describe('\'flw-webhooks\' service', () => {
  it('registered the service', () => {
    const service = app.service('flw-webhooks');

    assert.ok(service, 'Registered the service');
  });
});
