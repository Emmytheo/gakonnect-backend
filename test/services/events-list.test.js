const assert = require('assert');
const app = require('../../src/app');

describe('\'eventsList\' service', () => {
  it('registered the service', () => {
    const service = app.service('events-list');

    assert.ok(service, 'Registered the service');
  });
});
