// Initializes the `dataApis` service on path `/data-apis`
const { DataApis } = require('./data-apis.class');
const hooks = require('./data-apis.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/data-apis', new DataApis(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('data-apis');


  service.hooks(hooks);
};
