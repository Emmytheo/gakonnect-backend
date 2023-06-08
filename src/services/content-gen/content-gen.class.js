const { Service } = require('feathers-mongodb');

exports.ContentGen = class ContentGen extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('content-gen');
    });
  }
};
