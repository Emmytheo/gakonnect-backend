const assert = require('assert');
const app = require('../../src/app');

describe('\'eventOrgs\' service', () => {
  it('registered the service', () => {
    const service = app.service('event-orgs');

    assert.ok(service, 'Registered the service');
  });
});
