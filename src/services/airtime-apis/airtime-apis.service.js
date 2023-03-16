// Initializes the `airtimeApis` service on path `/airtime-apis`
const { AirtimeApis } = require('./airtime-apis.class');
const hooks = require('./airtime-apis.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/airtime-apis', new AirtimeApis(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('airtime-apis');

  service.hooks(hooks);
};
