// Initializes the `courses` service on path `/courses`
const { Courses } = require('./courses.class');
const hooks = require('./courses.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/courses', new Courses(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('courses');

  service.hooks(hooks);
};
