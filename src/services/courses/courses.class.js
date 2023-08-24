const { Service } = require('feathers-mongodb');

exports.Courses = class Courses extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('courses');
    });
  }
};
