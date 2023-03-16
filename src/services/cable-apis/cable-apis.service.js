// Initializes the `cableApis` service on path `/cable-apis`
const { CableApis } = require('./cable-apis.class');
const hooks = require('./cable-apis.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cable-apis', new CableApis(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cable-apis');

  service.hooks(hooks);
};
