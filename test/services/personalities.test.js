const assert = require('assert');
const app = require('../../src/app');

describe('\'personalities\' service', () => {
  it('registered the service', () => {
    const service = app.service('personalities');

    assert.ok(service, 'Registered the service');
  });
});
