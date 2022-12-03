// Initializes the `ussd` service on path `/ussd`
const { Ussd } = require('./ussd.class');
const hooks = require('./ussd.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/ussd', new Ussd(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('ussd');

  service.hooks(hooks);
};
