// Initializes the `resellers` service on path `/resellers`
const { Resellers } = require('./resellers.class');
const hooks = require('./resellers.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/resellers', new Resellers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('resellers');

  service.hooks(hooks);
};
