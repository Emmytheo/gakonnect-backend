const assert = require('assert');
const app = require('../../src/app');

describe('\'giftCardApis\' service', () => {
  it('registered the service', () => {
    const service = app.service('gift-card-apis');

    assert.ok(service, 'Registered the service');
  });
});
