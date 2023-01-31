// Initializes the `eduPins` service on path `/edu-pins`
const { EduPins } = require('./edu-pins.class');
const hooks = require('./edu-pins.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/edu-pins', new EduPins(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('edu-pins');

  service.hooks(hooks);
};
