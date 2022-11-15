const assert = require('assert');
const app = require('../../src/app');

describe('\'virt-accounts\' service', () => {
  it('registered the service', () => {
    const service = app.service('virt-accounts');

    assert.ok(service, 'Registered the service');
  });
});
