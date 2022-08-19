const { Service } = require('feathers-mongodb');

exports.Electricity = class Electricity extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('electricity');
    });
  }
};
