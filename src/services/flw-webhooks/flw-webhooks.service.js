// Initializes the `flw-webhooks` service on path `/flw-webhooks`
const { FlwWebhooks } = require('./flw-webhooks.class');
const hooks = require('./flw-webhooks.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/flw-webhooks', new FlwWebhooks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('flw-webhooks');

  service.hooks(hooks);
};
