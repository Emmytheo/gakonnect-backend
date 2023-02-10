

const rb3D = require('../../hooks/rb3d');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [rb3D()],
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
