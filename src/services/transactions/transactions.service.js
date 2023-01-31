// Initializes the `transactions` service on path `/transactions`
const { Transactions } = require('./transactions.class');
const hooks = require('./transactions.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/transactions', new Transactions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('transactions');

  service.hooks(hooks);
};
