const assert = require('assert');
const app = require('../../src/app');

describe('\'eventsHelpDesk\' service', () => {
  it('registered the service', () => {
    const service = app.service('events-help-desk');

    assert.ok(service, 'Registered the service');
  });
});
