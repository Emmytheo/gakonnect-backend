const { authenticate } = require('@feathersjs/authentication').hooks;

const processTickets = require('../../hooks/process-tickets');

const sendMail = require('../../hooks/send-mail');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processTickets(), sendMail()],
    update: [sendMail()],
    patch: [sendMail()],
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
