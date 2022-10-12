// Initializes the `tickets` service on path `/tickets`
const { Tickets } = require('./tickets.class');
const hooks = require('./tickets.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/tickets', new Tickets(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('tickets');

  service.hooks(hooks);
};
