// Initializes the `airt2CashApis` service on path `/airt-2-cash-apis`
const { Airt2CashApis } = require('./airt-2-cash-apis.class');
const hooks = require('./airt-2-cash-apis.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/airt-2-cash-apis', new Airt2CashApis(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('airt-2-cash-apis');

  service.hooks(hooks);
};
