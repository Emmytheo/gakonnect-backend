const assert = require('assert');
const app = require('../../src/app');

describe('\'audiInsights\' service', () => {
  it('registered the service', () => {
    const service = app.service('audi-insights');

    assert.ok(service, 'Registered the service');
  });
});
