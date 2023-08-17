const { Service } = require('feathers-mongodb');

exports.Students = class Students extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('students');
    });
  }
};
