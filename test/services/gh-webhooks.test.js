const assert = require('assert');
const app = require('../../src/app');

describe('\'ghWebhooks\' service', () => {
  it('registered the service', () => {
    const service = app.service('gh-webhooks');

    assert.ok(service, 'Registered the service');
  });
});
