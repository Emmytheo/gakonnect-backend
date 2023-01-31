// Initializes the `webhooks` service on path `/webhooks`
const { Webhooks } = require('./webhooks.class');
const hooks = require('./webhooks.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/webhooks', new Webhooks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('webhooks');

  service.hooks(hooks);
};
