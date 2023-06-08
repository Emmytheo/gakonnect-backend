// Initializes the `smFeed` service on path `/sm-feed`
const { SmFeed } = require('./sm-feed.class');
const hooks = require('./sm-feed.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sm-feed', new SmFeed(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sm-feed');

  service.hooks(hooks);
};
