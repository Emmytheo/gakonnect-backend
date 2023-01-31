// Initializes the `apis` service on path `/apis`
const { Apis } = require('./apis.class');
const hooks = require('./apis.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/apis', new Apis(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('apis');

  service.hooks(hooks);
};
