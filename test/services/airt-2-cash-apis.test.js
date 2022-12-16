const assert = require('assert');
const app = require('../../src/app');

describe('\'airt2CashApis\' service', () => {
  it('registered the service', () => {
    const service = app.service('airt-2-cash-apis');

    assert.ok(service, 'Registered the service');
  });
});
