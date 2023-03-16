const assert = require('assert');
const app = require('../../src/app');

describe('\'electricityApis\' service', () => {
  it('registered the service', () => {
    const service = app.service('electricity-apis');

    assert.ok(service, 'Registered the service');
  });
});
