const assert = require('assert');
const app = require('../../src/app');

describe('\'virt-cards\' service', () => {
  it('registered the service', () => {
    const service = app.service('virt-cards');

    assert.ok(service, 'Registered the service');
  });
});
