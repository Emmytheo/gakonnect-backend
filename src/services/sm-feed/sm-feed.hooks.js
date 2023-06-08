const { authenticate } = require('@feathersjs/authentication').hooks;

const twitterApi = require('../../hooks/twitter-api');

module.exports = {
  before: {
    all: [authenticate('jwt'), twitterApi()],
    find: [],
    get: [],
    create: [],
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
