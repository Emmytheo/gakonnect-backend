// Initializes the `ePins` service on path `/e-pins`
const { EPins } = require('./e-pins.class');
const hooks = require('./e-pins.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/e-pins', new EPins(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('e-pins');

  service.hooks(hooks);
};
