// Initializes the `verifyCustomer` service on path `/verify-customer`
const { VerifyCustomer } = require('./verify-customer.class');
const hooks = require('./verify-customer.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/verify-customer', new VerifyCustomer(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('verify-customer');

  service.hooks(hooks);
};
