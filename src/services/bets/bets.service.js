// Initializes the `bets` service on path `/bets`
const { Bets } = require('./bets.class');
const hooks = require('./bets.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/bets', new Bets(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('bets');

  service.hooks(hooks);
};
