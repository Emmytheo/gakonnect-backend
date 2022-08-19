// Initializes the `cable` service on path `/cable`
const { Cable } = require('./cable.class');
const hooks = require('./cable.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cable', new Cable(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cable');

  service.hooks(hooks);
};
