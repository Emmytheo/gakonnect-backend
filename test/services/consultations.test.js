const assert = require('assert');
const app = require('../../src/app');

describe('\'consultations\' service', () => {
  it('registered the service', () => {
    const service = app.service('consultations');

    assert.ok(service, 'Registered the service');
  });
});
