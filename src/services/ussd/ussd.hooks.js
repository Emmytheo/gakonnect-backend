

const processUssd = require('../../hooks/process-ussd');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [processUssd()],
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
