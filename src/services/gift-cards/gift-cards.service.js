// Initializes the `gift-cards` service on path `/gift-cards`
const { GiftCards } = require('./gift-cards.class');
const hooks = require('./gift-cards.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gift-cards', new GiftCards(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gift-cards');

  service.hooks(hooks);
};
