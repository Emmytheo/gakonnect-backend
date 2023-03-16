const { Service } = require('feathers-mongodb');

exports.ElectricityApis = class ElectricityApis extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('electricity-apis');
    });
  }
};
