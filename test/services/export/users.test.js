const assert = require('assert');
const app = require('../../../src/app');

describe('\'export/users\' service', () => {
  it('registered the service', () => {
    const service = app.service('export/users');

    assert.ok(service, 'Registered the service');
  });
});
