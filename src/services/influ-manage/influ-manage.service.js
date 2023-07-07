// Initializes the `influManage` service on path `/influ-manage`
const { InfluManage } = require('./influ-manage.class');
const hooks = require('./influ-manage.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/influ-manage', new InfluManage(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('influ-manage');

  service.hooks(hooks);
};
