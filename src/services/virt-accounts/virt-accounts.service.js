// Initializes the `virt-accounts` service on path `/virt-accounts`
const { VirtAccounts } = require('./virt-accounts.class');
const hooks = require('./virt-accounts.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/virt-accounts', new VirtAccounts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('virt-accounts');

  service.hooks(hooks);
};
