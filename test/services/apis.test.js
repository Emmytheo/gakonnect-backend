const assert = require('assert');
const app = require('../../src/app');

describe('\'apis\' service', () => {
  it('registered the service', () => {
    const service = app.service('apis');

    assert.ok(service, 'Registered the service');
  });
});
