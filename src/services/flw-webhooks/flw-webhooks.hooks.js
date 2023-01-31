

const resolvePayment = require('../../hooks/resolve-payment');

module.exports = {
  before: {
    all: [],
    find: [resolvePayment(),],
    get: [resolvePayment(),],
    create: [resolvePayment(),],
    update: [resolvePayment(),],
    patch: [resolvePayment(),],
    remove: [resolvePayment(),]
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
