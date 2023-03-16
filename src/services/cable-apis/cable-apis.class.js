const { Service } = require('feathers-mongodb');

exports.CableApis = class CableApis extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('cable-apis');
    });
  }
};
