// Initializes the `electricity` service on path `/electricity`
const { Electricity } = require('./electricity.class');
const hooks = require('./electricity.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/electricity', new Electricity(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('electricity');

  service.hooks(hooks);
};
