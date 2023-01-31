// Initializes the `airt2Cash` service on path `/airt-2-cash`
const { Airt2Cash } = require('./airt-2-cash.class');
const hooks = require('./airt-2-cash.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/airt-2-cash', new Airt2Cash(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('airt-2-cash');

  service.hooks(hooks);
};
