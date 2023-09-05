// Initializes the `consultations` service on path `/consultations`
const { Consultations } = require('./consultations.class');
const hooks = require('./consultations.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/consultations', new Consultations(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('consultations');

  service.hooks(hooks);
};
