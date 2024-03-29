// Initializes the `redbiller` service on path `/redbiller`
const { Redbiller } = require('./redbiller.class');
const hooks = require('./redbiller.hooks');
const { REDBILLER } = require("../../constants");
// const express = require('@feathersjs/express');
// const Path = require('path');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/redbiller', new Redbiller(options, app));

  // Initialize our custom route
  app.use(`/redbiller/:rbhook/:pointer`, app.service('redbiller'));
  
  


  // Get our initialized service so that we can register hooks
  const service = app.service('redbiller');

  service.hooks(hooks);
};
