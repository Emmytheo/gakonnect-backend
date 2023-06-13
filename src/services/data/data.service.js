// Initializes the `data` service on path `/data`
const { Data } = require('./data.class');
const hooks = require('./data.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/data', new Data(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('data');

  service.hooks(hooks);
};
