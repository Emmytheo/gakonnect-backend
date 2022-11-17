// Initializes the `ghWebhooks` service on path `/gh-webhooks`
const { GhWebhooks } = require('./gh-webhooks.class');
const hooks = require('./gh-webhooks.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gh-webhooks', new GhWebhooks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gh-webhooks');

  service.hooks(hooks);
};
