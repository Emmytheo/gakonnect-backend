const assert = require('assert');
const app = require('../../src/app');

describe('\'contentGen\' service', () => {
  it('registered the service', () => {
    const service = app.service('content-gen');

    assert.ok(service, 'Registered the service');
  });
});
