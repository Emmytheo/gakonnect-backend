// Initializes the `eventsList` service on path `/events-list`
const { EventsList } = require('./events-list.class');
const hooks = require('./events-list.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/events-list', new EventsList(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('events-list');

  service.hooks(hooks);
};
