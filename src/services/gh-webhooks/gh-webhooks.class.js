const { Service } = require('feathers-mongodb');

exports.GhWebhooks = class GhWebhooks extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('gh-webhooks');
    });
  }
};
