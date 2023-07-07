// Initializes the `inboxNotif` service on path `/inbox-notif`
const { InboxNotif } = require('./inbox-notif.class');
const hooks = require('./inbox-notif.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/inbox-notif', new InboxNotif(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('inbox-notif');

  service.hooks(hooks);
};
