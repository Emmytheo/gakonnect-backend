// Initializes the `students` service on path `/students`
const { Students } = require('./students.class');
const hooks = require('./students.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/students', new Students(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('students');

  service.hooks(hooks);
};
