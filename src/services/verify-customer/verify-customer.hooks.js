const { authenticate } = require('@feathersjs/authentication').hooks;

const verifyCustBefore = require('../../hooks/verify-cust-before');

const verifyCustAfter = require('../../hooks/verify-cust-after');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [verifyCustBefore()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [verifyCustAfter()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
