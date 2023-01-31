const assert = require('assert');
const app = require('../../src/app');

describe('\'epinApis\' service', () => {
  it('registered the service', () => {
    const service = app.service('epin-apis');

    assert.ok(service, 'Registered the service');
  });
});
