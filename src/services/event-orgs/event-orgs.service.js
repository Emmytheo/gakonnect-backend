// Initializes the `eventOrgs` service on path `/event-orgs`
const { EventOrgs } = require('./event-orgs.class');
const hooks = require('./event-orgs.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/event-orgs', new EventOrgs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('event-orgs');

  service.hooks(hooks);
};
