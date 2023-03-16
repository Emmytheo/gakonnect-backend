const assert = require('assert');
const app = require('../../src/app');

describe('\'eduPinsApis\' service', () => {
  it('registered the service', () => {
    const service = app.service('edu-pins-apis');

    assert.ok(service, 'Registered the service');
  });
});
