const assert = require('assert');
const app = require('../../src/app');

describe('\'influManage\' service', () => {
  it('registered the service', () => {
    const service = app.service('influ-manage');

    assert.ok(service, 'Registered the service');
  });
});
