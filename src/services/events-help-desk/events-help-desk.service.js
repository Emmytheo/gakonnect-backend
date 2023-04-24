// Initializes the `eventsHelpDesk` service on path `/events-help-desk`
const { EventsHelpDesk } = require('./events-help-desk.class');
const hooks = require('./events-help-desk.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/events-help-desk', new EventsHelpDesk(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('events-help-desk');

  service.hooks(hooks);
};
