const assert = require('assert');
const app = require('../../src/app');

describe('\'dataApis\' service', () => {
  it('registered the service', () => {
    const service = app.service('data-apis');

    assert.ok(service, 'Registered the service');
  });
});
