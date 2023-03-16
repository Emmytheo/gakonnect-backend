// Initializes the `electricityApis` service on path `/electricity-apis`
const { ElectricityApis } = require('./electricity-apis.class');
const hooks = require('./electricity-apis.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/electricity-apis', new ElectricityApis(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('electricity-apis');

  service.hooks(hooks);
};
