const assert = require('assert');
const app = require('../../src/app');

describe('\'bets\' service', () => {
  it('registered the service', () => {
    const service = app.service('bets');

    assert.ok(service, 'Registered the service');
  });
});
