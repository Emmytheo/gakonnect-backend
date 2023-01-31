const assert = require('assert');
const app = require('../../src/app');

describe('\'electricity\' service', () => {
  it('registered the service', () => {
    const service = app.service('electricity');

    assert.ok(service, 'Registered the service');
  });
});
