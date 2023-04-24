const assert = require('assert');
const app = require('../../src/app');

describe('\'eventsNotifications\' service', () => {
  it('registered the service', () => {
    const service = app.service('events-notifications');

    assert.ok(service, 'Registered the service');
  });
});
