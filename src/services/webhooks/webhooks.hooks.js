

const processWebhookRequests = require('../../hooks/process-webhook-requests');

module.exports = {
  before: {
    all: [],
    find: [processWebhookRequests()],
    get: [processWebhookRequests()],
    create: [processWebhookRequests()],
    update: [processWebhookRequests()],
    patch: [processWebhookRequests()],
    remove: [processWebhookRequests()]
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
