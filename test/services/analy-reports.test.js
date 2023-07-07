const assert = require('assert');
const app = require('../../src/app');

describe('\'analyReports\' service', () => {
  it('registered the service', () => {
    const service = app.service('analy-reports');

    assert.ok(service, 'Registered the service');
  });
});
