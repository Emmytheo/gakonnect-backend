// Initializes the `paystackWebhooks` service on path `/paystack-webhooks`
const { PaystackWebhooks } = require('./paystack-webhooks.class');
const hooks = require('./paystack-webhooks.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/paystack-webhooks', new PaystackWebhooks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('paystack-webhooks');

  service.hooks(hooks);
};
