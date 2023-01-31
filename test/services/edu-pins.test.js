const assert = require('assert');
const app = require('../../src/app');

describe('\'eduPins\' service', () => {
  it('registered the service', () => {
    const service = app.service('edu-pins');

    assert.ok(service, 'Registered the service');
  });
});
