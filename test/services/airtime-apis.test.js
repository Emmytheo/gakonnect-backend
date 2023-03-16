const assert = require('assert');
const app = require('../../src/app');

describe('\'airtimeApis\' service', () => {
  it('registered the service', () => {
    const service = app.service('airtime-apis');

    assert.ok(service, 'Registered the service');
  });
});
