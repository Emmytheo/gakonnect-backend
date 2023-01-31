const { Service } = require('feathers-mongodb');

exports.Apis = class Apis extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('apis');
    });
  }
};
