// Initializes the `giftCardApis` service on path `/gift-card-apis`
const { GiftCardApis } = require('./gift-card-apis.class');
const hooks = require('./gift-card-apis.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gift-card-apis', new GiftCardApis(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gift-card-apis');

  service.hooks(hooks);
};
