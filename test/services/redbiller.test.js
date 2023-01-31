const assert = require('assert');
const app = require('../../src/app');

describe('\'redbiller\' service', () => {
  it('registered the service', () => {
    const service = app.service('redbiller');

    assert.ok(service, 'Registered the service');
  });
});
