// Initializes the `eventsFeed` service on path `/events-feed`
const { EventsFeed } = require('./events-feed.class');
const hooks = require('./events-feed.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/events-feed', new EventsFeed(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('events-feed');

  service.hooks(hooks);
};
