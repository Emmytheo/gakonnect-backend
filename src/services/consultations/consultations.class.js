const { Service } = require('feathers-mongodb');

exports.Consultations = class Consultations extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('consultations');
    });
  }
};
