const assert = require('assert');
const app = require('../../src/app');

describe('\'ussd\' service', () => {
  it('registered the service', () => {
    const service = app.service('ussd');

    assert.ok(service, 'Registered the service');
  });
});
