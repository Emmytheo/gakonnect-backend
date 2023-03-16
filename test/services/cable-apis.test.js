const assert = require('assert');
const app = require('../../src/app');

describe('\'cableApis\' service', () => {
  it('registered the service', () => {
    const service = app.service('cable-apis');

    assert.ok(service, 'Registered the service');
  });
});
