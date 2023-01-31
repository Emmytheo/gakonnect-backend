const addDate = require('./hooks/add-date');
const date = require('./hooks/date');
const createDate = require('./hooks/create-date');
const updateDate = require('./hooks/update-date');
// Application hooks that run for every service

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createDate()],
    update: [updateDate()],
    patch: [updateDate()],
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
}
