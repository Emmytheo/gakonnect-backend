const { authenticate } = require('@feathersjs/authentication').hooks;

const resolveTransfer = require('../../hooks/resolve-transfer');

const resolveWithdrawal = require('../../hooks/resolve-withdrawal');

const schedulePayment = require('../../hooks/schedule-payment');

const resolveTransaction = require('../../hooks/resolve-transaction');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      resolveTransfer(),
      resolveWithdrawal(),
      schedulePayment(),
      resolveTransaction()
    ],
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
