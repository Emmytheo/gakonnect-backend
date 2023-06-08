// Initializes the `personalities` service on path `/personalities`
const { Personalities } = require('./personalities.class');
const hooks = require('./personalities.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/personalities', new Personalities(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('personalities');

  service.hooks(hooks);
};
