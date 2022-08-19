const assert = require('assert');
const app = require('../../src/app');

describe('\'cable\' service', () => {
  it('registered the service', () => {
    const service = app.service('cable');

    assert.ok(service, 'Registered the service');
  });
});
