const { Service } = require('feathers-mongodb');

exports.Webhooks = class Webhooks extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('webhooks');
    });
  }
};
