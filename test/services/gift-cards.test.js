const assert = require('assert');
const app = require('../../src/app');

describe('\'gift-cards\' service', () => {
  it('registered the service', () => {
    const service = app.service('gift-cards');

    assert.ok(service, 'Registered the service');
  });
});
