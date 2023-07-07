// Initializes the `audiInsights` service on path `/audi-insights`
const { AudiInsights } = require('./audi-insights.class');
const hooks = require('./audi-insights.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/audi-insights', new AudiInsights(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('audi-insights');

  service.hooks(hooks);
};
