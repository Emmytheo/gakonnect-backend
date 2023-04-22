const assert = require('assert');
const app = require('../../src/app');

describe('\'eventsFeed\' service', () => {
  it('registered the service', () => {
    const service = app.service('events-feed');

    assert.ok(service, 'Registered the service');
  });
});
