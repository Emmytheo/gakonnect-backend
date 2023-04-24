// Initializes the `eventsNotifications` service on path `/events-notifications`
const { EventsNotifications } = require('./events-notifications.class');
const hooks = require('./events-notifications.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/events-notifications', new EventsNotifications(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('events-notifications');

  service.hooks(hooks);
};
