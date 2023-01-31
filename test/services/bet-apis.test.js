const assert = require('assert');
const app = require('../../src/app');

describe('\'betApis\' service', () => {
  it('registered the service', () => {
    const service = app.service('bet-apis');

    assert.ok(service, 'Registered the service');
  });
});
