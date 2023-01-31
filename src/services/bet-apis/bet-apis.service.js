// Initializes the `betApis` service on path `/bet-apis`
const { BetApis } = require('./bet-apis.class');
const hooks = require('./bet-apis.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/bet-apis', new BetApis(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('bet-apis');

  service.hooks(hooks);
};
