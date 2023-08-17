const { Service } = require('feathers-mongodb');

exports.Exams = class Exams extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('exams');
    });
  }
};
