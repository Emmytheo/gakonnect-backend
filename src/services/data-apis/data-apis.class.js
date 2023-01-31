const { Service } = require('feathers-mongodb');

exports.DataApis = class DataApis extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('data-apis');
    });
  }
};
