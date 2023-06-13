const { authenticate } = require('@feathersjs/authentication').hooks;

const processEventOrgs = require('../../hooks/process-event-orgs');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processEventOrgs()],
    update: [processEventOrgs()],
    patch: [processEventOrgs()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
