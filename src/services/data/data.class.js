const { Service } = require('feathers-mongodb');

exports.Data = class Data extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('data');
    });
  }
};
