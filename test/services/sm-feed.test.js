const assert = require('assert');
const app = require('../../src/app');

describe('\'smFeed\' service', () => {
  it('registered the service', () => {
    const service = app.service('sm-feed');

    assert.ok(service, 'Registered the service');
  });
});
