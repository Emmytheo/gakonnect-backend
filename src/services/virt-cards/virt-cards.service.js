// Initializes the `virt-cards` service on path `/virt-cards`
const { VirtCards } = require('./virt-cards.class');
const hooks = require('./virt-cards.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/virt-cards', new VirtCards(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('virt-cards');

  service.hooks(hooks);
};
