// Initializes the `redbiller` service on path `/redbiller`
const { Redbiller } = require('./redbiller.class');
const hooks = require('./redbiller.hooks');
const { REDBILLER } = require("../../constants");

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/redbiller', new Redbiller(options, app));

  // Initialize our custom route
  app.use(`${process.env.RBHOOK}`, app.service('redbiller'));


  // Get our initialized service so that we can register hooks
  const service = app.service('redbiller');

  service.hooks(hooks);
};
