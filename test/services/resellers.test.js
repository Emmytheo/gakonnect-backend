const assert = require('assert');
const app = require('../../src/app');

describe('\'resellers\' service', () => {
  it('registered the service', () => {
    const service = app.service('resellers');

    assert.ok(service, 'Registered the service');
  });
});
