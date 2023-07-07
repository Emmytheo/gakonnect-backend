const assert = require('assert');
const app = require('../../src/app');

describe('\'inboxNotif\' service', () => {
  it('registered the service', () => {
    const service = app.service('inbox-notif');

    assert.ok(service, 'Registered the service');
  });
});
