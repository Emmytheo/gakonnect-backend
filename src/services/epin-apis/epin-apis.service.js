// Initializes the `epinApis` service on path `/epin-apis`
const { EpinApis } = require('./epin-apis.class');
const hooks = require('./epin-apis.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/epin-apis', new EpinApis(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('epin-apis');

  service.hooks(hooks);
};
