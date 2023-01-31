

const processGhWebhooks = require('../../hooks/process-gh-webhooks');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [processGhWebhooks()],
    update: [],
    patch: [],
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
