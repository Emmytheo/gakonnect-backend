const addDate = require('./hooks/add-date');
const date = require('./hooks/date');
const createDate = require('./hooks/create-date');
const updateDate = require('./hooks/update-date');
const processResell = require('./hooks/process-resell');
// Application hooks that run for every service

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createDate(), processResell()],
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
