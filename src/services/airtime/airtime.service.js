// Initializes the `airtime` service on path `/airtime`
const { Airtime } = require('./airtime.class');
const hooks = require('./airtime.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/airtime', new Airtime(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('airtime');

  service.hooks(hooks);
};
