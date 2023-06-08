// Initializes the `contentGen` service on path `/content-gen`
const { ContentGen } = require('./content-gen.class');
const hooks = require('./content-gen.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/content-gen', new ContentGen(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('content-gen');

  service.hooks(hooks);
};
