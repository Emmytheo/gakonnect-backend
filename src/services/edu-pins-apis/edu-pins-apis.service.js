// Initializes the `eduPinsApis` service on path `/edu-pins-apis`
const { EduPinsApis } = require('./edu-pins-apis.class');
const hooks = require('./edu-pins-apis.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/edu-pins-apis', new EduPinsApis(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('edu-pins-apis');

  service.hooks(hooks);
};
