// Initializes the `analyReports` service on path `/analy-reports`
const { AnalyReports } = require('./analy-reports.class');
const hooks = require('./analy-reports.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/analy-reports', new AnalyReports(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('analy-reports');

  service.hooks(hooks);
};
